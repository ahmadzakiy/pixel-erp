<script setup lang="ts">
/**
 * ErpTablePage — standard index page pattern: filter bar + table + pagination.
 *
 * ⚠️  MpTable (Enterprise) does not match the ERP table design in Figma.
 *     This is a CUSTOM implementation using Pixel design tokens.
 *     Request to Pixel team: update MpTable Enterprise to match this spec:
 *       • Header: bg surface (#f1f5f9), 28px height, uppercase 12px semibold, pl-8 pr-16 py-4
 *       • Row: 40px min-height, border-bottom, pl-8 pr-16 py-6, 14px regular
 *       • Sticky right column with inset left box-shadow
 *
 * Props:
 *   columns     – column definitions (see TableColumn)
 *   rows        – current page's data (already paginated)
 *   total       – total record count
 *   currentPage – active page number (1-based)
 *   perPage     – rows per page (default 10)
 *   sortKey     – active sort column key
 *   sortDir     – 'asc' | 'desc'
 *   hasCheckbox – show row-selection checkboxes (default false)
 *
 * Slots:
 *   filters          – filter bar content (search, selects, buttons)
 *   cell-{key}       – custom cell renderer: { row, value }
 *   actions          – per-row action cell: { row }  — enables sticky-right actions column
 *   empty            – empty state content
 *
 * Emits:
 *   pageChange(page)
 *   perPageChange(perPage)
 *   sort(key)
 */

import { MpCheckbox } from '@mekari/pixel3'
import ErpPagination from './ErpPagination.vue'

export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  isFixed?: boolean  // sticky right (for a data column; actions are always sticky)
  noHeader?: boolean // render empty <th> — use for icon-only columns (e.g. attachment)
}

const props = withDefaults(defineProps<{
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  total: number
  currentPage: number
  perPage?: number
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  hasCheckbox?: boolean
}>(), {
  perPage: 10,
  sortKey: '',
  sortDir: 'asc',
  hasCheckbox: false,
})

const emit = defineEmits<{
  pageChange: [page: number]
  perPageChange: [perPage: number]
  sort: [key: string]
}>()

// ─── Row selection ────────────────────────────────────────────────────────────

const selectedRows = ref(new Set<number>())

const allSelected = computed(() =>
  props.rows.length > 0 && props.rows.every((_, i) => selectedRows.value.has(i))
)

function toggleAll() {
  selectedRows.value = allSelected.value
    ? new Set()
    : new Set(props.rows.map((_, i) => i))
}

function toggleRow(i: number) {
  const s = new Set(selectedRows.value)
  s.has(i) ? s.delete(i) : s.add(i)
  selectedRows.value = s
}

// Reset selection when rows change (page change, filter, sort)
watch(() => props.rows, () => { selectedRows.value = new Set() })
</script>

<template>
  <div class="erp-table-page">

    <!-- ── Filter bar ── -->
    <div v-if="$slots.filters" class="erp-filter-bar">
      <slot name="filters" />
    </div>

    <!-- ── Table wrapper — handles horizontal overflow ── -->
    <div class="erp-table-wrapper">
      <table class="erp-table">

        <!-- ── Header ── -->
        <thead class="erp-thead">
          <tr>
            <!-- Checkbox th -->
            <th v-if="hasCheckbox" class="erp-th erp-th--checkbox">
              <MpCheckbox
                id="erp-select-all"
                :model-value="allSelected"
                @change="toggleAll"
              />
            </th>

            <!-- Column headers -->
            <th
              v-for="col in columns"
              :key="col.key"
              class="erp-th"
              :class="{
                'erp-th--sortable': col.sortable,
                'erp-th--right':    col.align === 'right',
                'erp-th--center':   col.align === 'center',
                'erp-th--fixed':    col.isFixed,
              }"
              :style="col.width ? { width: col.width, minWidth: col.width } : {}"
              @click="col.sortable ? emit('sort', col.key) : undefined"
            >
              <span v-if="!col.noHeader" class="th-label">
                {{ col.label }}
                <span v-if="col.sortable" class="sort-arrows" aria-hidden="true">
                  <span :class="{ 'sort-active': sortKey === col.key && sortDir === 'asc' }">▲</span>
                  <span :class="{ 'sort-active': sortKey === col.key && sortDir === 'desc' }">▼</span>
                </span>
              </span>
            </th>

            <!-- Actions th — sticky right, no label -->
            <th
              v-if="$slots.actions"
              class="erp-th erp-th--actions erp-th--fixed"
            />
          </tr>
        </thead>

        <!-- ── Body ── -->
        <tbody>

          <!-- Data rows -->
          <template v-if="rows.length > 0">
            <tr
              v-for="(row, ri) in rows"
              :key="ri"
              class="erp-tr"
            >
              <!-- Checkbox td -->
              <td v-if="hasCheckbox" class="erp-td erp-td--checkbox">
                <MpCheckbox
                  :id="`erp-row-${ri}`"
                  :model-value="selectedRows.has(ri)"
                  @change="() => toggleRow(ri)"
                />
              </td>

              <!-- Data cells -->
              <td
                v-for="col in columns"
                :key="col.key"
                class="erp-td"
                :class="{
                  'erp-td--right':  col.align === 'right',
                  'erp-td--center': col.align === 'center',
                  'erp-td--fixed':  col.isFixed,
                }"
              >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                  {{ row[col.key] }}
                </slot>
              </td>

              <!-- Actions td — sticky right -->
              <td
                v-if="$slots.actions"
                class="erp-td erp-td--actions erp-td--fixed"
              >
                <slot name="actions" :row="row" />
              </td>
            </tr>
          </template>

          <!-- Empty state -->
          <tr v-else>
            <td
              class="erp-td erp-td--empty"
              :colspan="columns.length + (hasCheckbox ? 1 : 0) + ($slots.actions ? 1 : 0)"
            >
              <slot name="empty">
                <div class="empty-default">
                  <p class="empty-title">No data found</p>
                  <p class="empty-hint">Try adjusting your filters.</p>
                </div>
              </slot>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- ── Pagination ── -->
    <ErpPagination
      v-if="total > 0"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
      @page-change="emit('pageChange', $event)"
      @per-page-change="emit('perPageChange', $event)"
    />

  </div>
</template>

<style scoped>
/* ─── Layout ──────────────────────────────────────────────────────────────── */

.erp-table-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Filter bar */
.erp-filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--mp-border-default);
  flex-shrink: 0;
  flex-wrap: wrap;
}

/* Table scroll container */
.erp-table-wrapper {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

/* ─── Table base ──────────────────────────────────────────────────────────── */

.erp-table {
  width: 100%;
  min-width: max-content;     /* force overflow so sticky works */
  border-collapse: collapse;
  font-size: 14px;
  color: var(--mp-text-default);
}

/* ─── Header ──────────────────────────────────────────────────────────────── */

/*
 * Figma spec:
 *   background : var(--color/background/surface, #f1f5f9)
 *   height     : 28px
 *   padding    : 4px 16px 4px 8px  (left-col) | 4px 8px 4px 16px (right-col)
 *   font       : 12px, semiBold (600), uppercase
 *   border-bot : 1px solid var(--color/border/default, #dcdfe4)
 *   position   : sticky top:0
 */

.erp-thead {
  position: sticky;
  top: 0;
  z-index: 2;
}

.erp-th {
  height: 28px;
  padding: 4px 16px 4px 8px;
  background: var(--mp-background-neutral-subtle);
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0;
  color: var(--mp-text-default, #272b32);
  border-bottom: 1px solid var(--mp-border-default);
  text-align: left;
  white-space: nowrap;
  user-select: none;
  vertical-align: middle;
}

/* Right-aligned header — flip padding (Figma: pl-16 pr-8) */
.erp-th--right {
  text-align: right;
  padding: 4px 8px 4px 16px;
}

.erp-th--center {
  text-align: center;
  padding: 4px 8px;
}

/* Checkbox column */
.erp-th--checkbox {
  width: 36px;
  min-width: 36px;
  text-align: center;
  padding: 4px 8px;
}

/* Sortable header */
.erp-th--sortable {
  cursor: pointer;
}
.erp-th--sortable:hover {
  background: var(--mp-background-neutral-subtle, #e8eaed);
}

/* Sticky right column */
.erp-th--fixed {
  position: sticky;
  right: 0;
  z-index: 3;
  box-shadow: inset 2px 0 var(--mp-border-default);
}

/* Actions header (no label) */
.erp-th--actions {
  width: 44px;
  min-width: 44px;
}

/* Sort arrows */
.th-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.sort-arrows {
  display: inline-flex;
  flex-direction: column;
  font-size: 8px;
  line-height: 1;
  gap: 1px;
  color: var(--mp-text-disabled, #c0c6d0);
  margin-top: 1px;
}
.sort-active {
  color: var(--mp-text-selected);
}

/* ─── Body rows ───────────────────────────────────────────────────────────── */

/*
 * Figma spec:
 *   min-height : 40px
 *   padding    : 6px 16px 6px 8px  (left-col) | 6px 8px 6px 16px (right-col)
 *   font       : 14px, regular (400)
 *   border-bot : 1px solid var(--color/border/default, #dcdfe4)
 */

.erp-tr {
  background: var(--mp-background-neutral, #ffffff);
}
.erp-tr:not(:last-child) {
  border-bottom: 1px solid var(--mp-border-default);
}
.erp-tr:hover .erp-td {
  background: var(--mp-background-neutral-hovered);
}

/* ─── Body cells ──────────────────────────────────────────────────────────── */

.erp-td {
  height: 40px;
  padding: 6px 16px 6px 8px;
  font-size: 14px;
  font-weight: 400;
  color: var(--mp-text-default, #272b32);
  vertical-align: middle;
  white-space: nowrap;
  background: inherit;
}

/* Right-aligned cells — flip padding */
.erp-td--right {
  text-align: right;
  padding: 6px 8px 6px 16px;
  font-variant-numeric: tabular-nums;
}

.erp-td--center {
  text-align: center;
  padding: 6px 8px;
}

/* Checkbox cell */
.erp-td--checkbox {
  width: 36px;
  min-width: 36px;
  text-align: center;
  padding: 6px 8px;
}

/* Sticky right cell */
.erp-td--fixed {
  position: sticky;
  right: 0;
  z-index: 1;
  box-shadow: inset 2px 0 var(--mp-border-default);
}

/* Actions cell */
.erp-td--actions {
  width: 44px;
  min-width: 44px;
  text-align: center;
  padding: 6px 4px;
}

/* ─── Empty state ─────────────────────────────────────────────────────────── */

.erp-td--empty {
  text-align: center;
  padding: 64px 16px !important;
  height: auto;
  white-space: normal;
}

.empty-default {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--mp-text-default);
  margin: 0;
}

.empty-hint {
  font-size: 14px;
  color: var(--mp-text-subtle);
  margin: 0;
}
</style>
