# ErpTablePage — Design Spec

Component path: `app/components/patterns/ErpTablePage.vue`

> **Why custom?** `MpTable` Enterprise does not match the ERP Figma design. This is a custom `<table>` implementation using Pixel design tokens. Request to Pixel team: update MpTable Enterprise to match this spec.

---

## Header

| Property | Value | Token |
|----------|-------|-------|
| Background | neutral subtle gray | `var(--mp-background-neutral-subtle)` |
| Height | 28px | — |
| Font size | 12px | — |
| Font weight | 600 (semibold) | — |
| Text transform | uppercase | — |
| Padding (left-aligned) | `4px 16px 4px 8px` | — |
| Padding (right-aligned) | `4px 8px 4px 16px` | — |
| Border bottom | 1px solid | `var(--mp-border-default)` |
| Position | sticky top: 0 | — |

## Row

| Property | Value | Token |
|----------|-------|-------|
| Min-height | 40px | — |
| Font size | 14px | — |
| Font weight | 400 (regular) | — |
| Text color | default | `var(--mp-text-default)` |
| Padding (left-aligned) | `6px 16px 6px 8px` | — |
| Padding (right-aligned) | `6px 8px 6px 16px` | — |
| Border bottom | 1px solid | `var(--mp-border-default)` |
| Hover background | neutral hovered | `var(--mp-background-neutral-hovered)` |

## Sticky Right Column (Actions)

```css
position: sticky;
right: 0;
box-shadow: inset 2px 0 var(--mp-border-default);
background: inherit;
```

Handled automatically by `ErpTablePage` when the `#actions` slot is used.

---

## Standard Columns

| Column | Width | Align | Notes |
|--------|-------|-------|-------|
| Checkbox | 36px | center | `MpCheckbox`, via `has-checkbox` prop |
| Date | 120px | left | `DD/MM/YYYY` |
| Document number | 200px | left | link style |
| Attachment | 40px | center | `noHeader: true`, `MpIcon name="attachment"` |
| Customer / Vendor | 240px | left | |
| Due date | 108px | left | `DD/MM/YYYY` |
| Status | 160px | left | `ErpStatusBadge` + optional sub-label |
| Balance due | 160px | right | IDR format |
| Total | 160px | right | IDR format |
| Tags | 160px | left | `MpBadge for="additionalInformation"` |
| Actions | 44px | center | `MpButton variant="tertiary" left-icon="more-vertical"`, sticky right |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | required | Column definitions |
| `rows` | `Record<string, unknown>[]` | required | Current page data (already paginated) |
| `total` | `number` | required | Total record count |
| `currentPage` | `number` | required | Active page (1-based) |
| `perPage` | `number` | `10` | Rows per page |
| `sortKey` | `string` | `''` | Active sort column key |
| `sortDir` | `'asc' \| 'desc'` | `'asc'` | Sort direction |
| `hasCheckbox` | `boolean` | `false` | Show row-selection checkboxes |

## TableColumn Interface

```ts
interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  isFixed?: boolean   // sticky right (for a data column; actions are always sticky)
  noHeader?: boolean  // render empty <th> — use for icon-only columns (e.g. attachment)
}
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `#filters` | — | Filter bar content (search, selects, buttons) |
| `#cell-{key}` | `{ row, value }` | Custom cell renderer |
| `#actions` | `{ row }` | Per-row action cell — enables sticky right column |
| `#empty` | — | Empty state content |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `pageChange` | `number` | New page number |
| `perPageChange` | `number` | New rows-per-page value |
| `sort` | `string` | Column key to sort by |

---

## Usage

```vue
<ErpTablePage
  :columns="columns"
  :rows="paginated"
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
  <template #filters>
    <MpInputGroup id="search">...</MpInputGroup>
    <MpSelect id="filter">...</MpSelect>
    <MpButton variant="primary" style="margin-left: auto">Create</MpButton>
  </template>

  <template #cell-status="{ value }">
    <ErpStatusBadge :status="value" />
  </template>

  <template #actions>
    <MpButton variant="tertiary" size="sm" left-icon="more-vertical" />
  </template>
</ErpTablePage>
```

---

## Formatters

### IDR Currency
```ts
new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 2,
}).format(amount)
// → "Rp9.000.000,00"
```

### Date
```ts
new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: '2-digit', year: 'numeric',
}).format(new Date(isoString))
// → "19/03/2026"
```
