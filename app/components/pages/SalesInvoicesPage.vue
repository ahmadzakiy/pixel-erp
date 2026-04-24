<script setup lang="ts">
import {
  MpInputGroup,
  MpInputLeftAddon,
  MpInput,
  MpSelect,
  MpButton,
  MpIcon,
  MpBadge,
} from '@mekari/pixel3'
import ErpTablePage, { type TableColumn } from '~/components/patterns/ErpTablePage.vue'
import ErpStatusBadge from '~/components/patterns/ErpStatusBadge.vue'
import { salesInvoices } from '~/data'
import type { SalesInvoice } from '~/data'

// ─── Column definitions — match Figma Sales Invoices table exactly ────────────
//
//  Figma structure (left → right):
//  [checkbox 36px] DATE 120px | NUMBER 200px | attachment 40px |
//  CUSTOMER 240px | DUE DATE 108px | STATUS 160px |
//  BALANCE DUE 160px ← right | TOTAL 160px ← right |
//  TAGS 160px | [actions 44px sticky]

const columns: TableColumn[] = [
  { key: 'date',         label: 'Date',        width: '120px'                                  },
  { key: 'number',       label: 'Number',      width: '200px', sortable: true                  },
  { key: 'attachment',   label: '',            width: '40px',  noHeader: true, align: 'center' },
  { key: 'customerName', label: 'Customer',    width: '240px', sortable: true                  },
  { key: 'dueDate',      label: 'Due date',    width: '108px'                                  },
  { key: 'status',       label: 'Status',      width: '160px'                                  },
  { key: 'balance',      label: 'Balance due', width: '160px', align: 'right', sortable: true  },
  { key: 'total',        label: 'Total',       width: '160px', align: 'right', sortable: true  },
  { key: 'tags',         label: 'Tags',        width: '160px'                                  },
]

// ─── Row type ─────────────────────────────────────────────────────────────────

type Row = SalesInvoice & {
  customerName: string
  attachment: boolean
  overdueLabel: string | null
}

// ─── Flatten + enrich ─────────────────────────────────────────────────────────

const rows = computed<Row[]>(() =>
  salesInvoices.map(inv => {
    const overdueLabel = inv.status === 'overdue'
      ? (() => {
          const days = Math.floor((Date.now() - new Date(inv.dueDate).getTime()) / 86_400_000)
          return days > 0 ? `Overdue by ${days} day${days !== 1 ? 's' : ''}` : null
        })()
      : null

    return {
      ...inv,
      customerName: inv.customer.name,
      attachment:   inv.hasAttachment ?? false,
      overdueLabel,
    }
  })
)

// ─── Table state ──────────────────────────────────────────────────────────────

const {
  search, statusFilter, currentPage, paginated, total, perPage,
  setPage, setPerPage, sortKey, sortDir, toggleSort,
} = useTableState(rows, {
  filterFn: (row: Row, s, status) =>
    (row.number.toLowerCase().includes(s) || row.customerName.toLowerCase().includes(s)) &&
    (!status || row.status === status),
})

// ─── Filter options ───────────────────────────────────────────────────────────

const statusOptions = [
  { label: 'All status', value: ''          },
  { label: 'Draft',      value: 'draft'     },
  { label: 'Pending',    value: 'pending'   },
  { label: 'Approved',   value: 'approved'  },
  { label: 'Paid',       value: 'paid'      },
  { label: 'Overdue',    value: 'overdue'   },
  { label: 'Cancelled',  value: 'cancelled' },
]

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatIDR(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(amount)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  }).format(new Date(iso))
}

// Tag → MpBadge type (for="additionalInformation")
const tagTypeMap: Record<string, string> = {
  VIP:    'announcement',
  B2B:    'information',
  Retail: 'completed',
}
function tagType(tag: string) {
  return tagTypeMap[tag] ?? 'information'
}
</script>

<template>
  <ErpTablePage
    :columns="columns"
    :rows="(paginated as Record<string, unknown>[])"
    :total="total"
    :current-page="currentPage"
    :per-page="perPage"
    :sort-key="sortKey"
    :sort-dir="sortDir"
    has-checkbox
    @page-change="setPage"
    @per-page-change="setPerPage"
    @sort="toggleSort"
  >

    <!-- ── Filter bar ── -->
    <template #filters>
      <MpInputGroup id="si-search" size="md">
        <MpInputLeftAddon id="si-search-addon">
          <MpIcon name="search" size="sm" />
        </MpInputLeftAddon>
        <MpInput
          id="si-search-input"
          v-model="search"
          placeholder="Example: invoice number or customer name"
          is-clearable
          style="min-width: 240px; max-width: 320px"
        />
      </MpInputGroup>

      <MpSelect id="si-status" v-model="statusFilter" size="md">
        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </MpSelect>

      <MpButton variant="primary" left-icon="add-circular" style="margin-left: auto">
        Create invoice
      </MpButton>
    </template>

    <!-- ── Cell: Date ── -->
    <template #cell-date="{ value }">
      {{ formatDate(value as string) }}
    </template>

    <!-- ── Cell: Number (link style) ── -->
    <template #cell-number="{ value }">
      <span class="invoice-link">{{ value }}</span>
    </template>

    <!-- ── Cell: Attachment icon (narrow column, no header) ── -->
    <template #cell-attachment="{ value }">
      <MpIcon
        v-if="value"
        name="attachment"
        size="sm"
        class="attachment-icon"
      />
    </template>

    <!-- ── Cell: Due Date ── -->
    <template #cell-dueDate="{ value }">
      {{ formatDate(value as string) }}
    </template>

    <!-- ── Cell: Status (badge + optional overdue sub-label) ── -->
    <template #cell-status="{ row, value }">
      <div class="status-cell">
        <ErpStatusBadge :status="value as string" />
        <span v-if="(row as Row).overdueLabel" class="status-sub-label">
          {{ (row as Row).overdueLabel }}
        </span>
      </div>
    </template>

    <!-- ── Cell: Balance Due ── -->
    <template #cell-balance="{ value }">
      {{ formatIDR(value as number) }}
    </template>

    <!-- ── Cell: Total ── -->
    <template #cell-total="{ value }">
      {{ formatIDR(value as number) }}
    </template>

    <!-- ── Cell: Tags ── -->
    <template #cell-tags="{ value }">
      <div v-if="(value as string[])?.length" class="tags-cell">
        <MpBadge
          v-for="tag in (value as string[])"
          :key="tag"
          for="additionalInformation"
          :type="tagType(tag)"
        >{{ tag }}</MpBadge>
      </div>
    </template>

    <!-- ── Actions ── -->
    <template #actions>
      <MpButton
        variant="tertiary"
        size="sm"
        left-icon="more-vertical"
        aria-label="More actions"
      />
    </template>

  </ErpTablePage>
</template>

<style scoped>
/* Invoice link */
.invoice-link {
  font-weight: 500;
  color: var(--mp-text-link);
  cursor: pointer;
}
.invoice-link:hover { text-decoration: underline; }

/* Attachment icon */
.attachment-icon {
  color: var(--mp-text-subtle);
}

/* Status cell: badge stacked above overdue sub-label */
.status-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  white-space: normal;
}

.status-sub-label {
  font-size: 11px;
  line-height: 1.2;
  color: var(--mp-text-danger);
}

/* Tags */
.tags-cell {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
