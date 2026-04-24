<script setup lang="ts">
/**
 * ErpPagination — standard pagination bar for index pages.
 *
 * ⚠️  MpPagination does not exist in Pixel Enterprise yet.
 *     Request to Pixel team: add MpPagination with this layout:
 *       Left  — "Rows per page: [N ▾]" (dropdown)
 *       Center — "Showing X–Y of Z"
 *       Right  — "Page X of Y"  ‹  › buttons
 *
 * Props:
 *   currentPage – active page (1-based)
 *   perPage     – rows per page
 *   total       – total record count
 *
 * Emits:
 *   pageChange(page)
 *   perPageChange(perPage)
 */

import { MpSelect, MpButton } from '@mekari/pixel3'

const props = withDefaults(defineProps<{
  currentPage: number
  perPage: number
  total: number
}>(), {
  currentPage: 1,
  perPage: 10,
  total: 0,
})

const emit = defineEmits<{
  pageChange: [page: number]
  perPageChange: [perPage: number]
}>()

const perPageOptions = [10, 25, 50, 100]

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
const rangeStart = computed(() => props.total === 0 ? 0 : (props.currentPage - 1) * props.perPage + 1)
const rangeEnd   = computed(() => Math.min(props.currentPage * props.perPage, props.total))
</script>

<template>
  <div class="erp-pagination">

    <!-- Left: Rows per page -->
    <div class="pagination-section">
      <span class="pagination-label">Rows per page:</span>
      <MpSelect
        id="erp-pagination-per-page"
        :model-value="String(perPage)"
        size="sm"
        @update:model-value="emit('perPageChange', Number($event))"
      >
        <option v-for="n in perPageOptions" :key="n" :value="String(n)">{{ n }}</option>
      </MpSelect>
    </div>

    <!-- Center: Showing X–Y of Z -->
    <span class="pagination-showing">
      Showing {{ rangeStart }}–{{ rangeEnd }} of {{ total }}
    </span>

    <!-- Right: Page X of Y + prev/next -->
    <div class="pagination-section">
      <span class="pagination-label">Page {{ currentPage }} of {{ totalPages }}</span>
      <MpButton
        variant="secondary"
        size="sm"
        :is-disabled="currentPage <= 1"
        @click="emit('pageChange', currentPage - 1)"
      >
        ‹
      </MpButton>
      <MpButton
        variant="secondary"
        size="sm"
        :is-disabled="currentPage >= totalPages"
        @click="emit('pageChange', currentPage + 1)"
      >
        ›
      </MpButton>
    </div>

  </div>
</template>

<style scoped>
.erp-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid var(--mp-border-default);
  flex-shrink: 0;
  gap: 16px;
}

.pagination-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-label {
  font-size: 13px;
  color: var(--mp-text-secondary);
  white-space: nowrap;
}

.pagination-showing {
  font-size: 13px;
  color: var(--mp-text-secondary);
  white-space: nowrap;
}
</style>
