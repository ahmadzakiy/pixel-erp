# Mekari ERP — App Shell Boilerplate

Boilerplate Nuxt 4 + Mekari Pixel 3 untuk Mekari ERP. Header, sidebar navigasi 3-level, dan dynamic page routing sudah siap — tim cukup fokus mengisi konten per halaman.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | [Nuxt 4](https://nuxt.com) (compat mode) + Vue 3 |
| Design System | [@mekari/pixel3](https://docs.mekari.design/) |
| Language | TypeScript |
| Styling | CSS Variables (Pixel tokens) |

---

## Quick Start

```bash
# 1. Clone
git clone <repo-url>
cd erp-app

# 2. Install
npm install

# 3. Run dev server
npm run dev
```

Buka `http://localhost:3000`.

---

## Cara Tambah Halaman Baru

Untuk mengerjakan halaman baru (misalnya **Sales invoices**), cukup 2 langkah:

### Langkah 1 — Buat component

Buat file di `app/components/pages/`:

```
app/components/pages/SalesInvoicesPage.vue
```

```vue
<template>
  <div>
    <!-- konten halaman di sini -->
  </div>
</template>
```

### Langkah 2 — Daftarkan di registry

Buka `app/pages/index.vue`, tambahkan entry di `pageRegistry`:

```ts
const pageRegistry: Record<string, Component> = {
  'Home': defineAsyncComponent(() => import('~/components/pages/HomePage.vue')),

  // Tambahkan halaman baru di bawah ini:
  'Sales invoices': defineAsyncComponent(() => import('~/components/pages/SalesInvoicesPage.vue')),
}
```

> **Key harus sama persis** dengan label menu di sidebar (case-sensitive).
> Halaman yang belum didaftarkan akan otomatis tampil `PlaceholderPage`.

---

## Daftar Key Navigasi

Berikut semua key yang bisa didaftarkan di `pageRegistry`:

### Home
| Key | Menu |
|-----|------|
| `'Home'` | Home |

### Reports
| Key | Menu |
|-----|------|
| `'Financials'` | Reports → Financials |
| `'Sales'` | Reports → Sales |
| `'Purchases'` | Reports → Purchases |
| `'Inventory'` | Reports → Inventory |
| `'Tax'` | Reports → Tax |
| `'Cash & bank'` | Reports → Cash & bank |
| `'Production'` | Reports → Production |
| `'Fixed assets'` | Reports → Fixed assets |

### Accounting
| Key | Menu |
|-----|------|
| `'Cash management'` | Accounting → Cash management |
| `'Reconciliations'` | Accounting → Reconciliations |
| `'Consolidation'` | Accounting → Consolidation |
| `'Chart of accounts'` | Accounting → Chart of accounts |
| `'Close books'` | Accounting → Close books |
| `'Fixed assets'` | Accounting → Fixed assets |
| `'Bank rules'` | Accounting → Bank rules |

### Sales
| Key | Menu |
|-----|------|
| `'Sales invoices'` | Sales → Sales invoices |
| `'Sales deliveries'` | Sales → Sales deliveries |
| `'Sales orders'` | Sales → Sales orders |
| `'Sales quotes'` | Sales → Sales quotes |

### Purchases
| Key | Menu |
|-----|------|
| `'Purchase invoices'` | Purchases → Purchase invoices |
| `'Purchase deliveries'` | Purchases → Purchase deliveries |
| `'Purchase orders'` | Purchases → Purchase orders |
| `'Purchase quotes'` | Purchases → Purchase quotes |
| `'Purchase requests'` | Purchases → Purchase requests |

### Expenses
| Key | Menu |
|-----|------|
| `'Expenses'` | Expenses |

### Inventory
| Key | Menu |
|-----|------|
| `'Products'` | Inventory → Products → Products |
| `'Categories'` | Inventory → Products → Categories |
| `'Variant options'` | Inventory → Products → Variant options |
| `'Units'` | Inventory → Products → Units |
| `'Price rules'` | Inventory → Products → Price rules |
| `'Stock adjustments'` | Inventory → Products → Stock adjustments |

### Warehouses
| Key | Menu |
|-----|------|
| `'All warehouses'` | Warehouses → Warehouse → All warehouses |
| `'Stock adjustments'` | Warehouses → Warehouse → Stock adjustments |
| `'Warehouse transfers'` | Warehouses → Warehouse → Warehouse transfers |
| `'Stock requests'` | Warehouses → Warehouse → Stock requests |
| `'Storage locations'` | Warehouses → Warehouse → Storage locations |
| `'Sales orders'` | Warehouses → Fulfillments → Sales orders |
| `'Purchase orders'` | Warehouses → Fulfillments → Purchase orders |

### Production
| Key | Menu |
|-----|------|
| `'Production plans'` | Production → Production plans |
| `'Work orders'` | Production → Work orders |
| `'Bill of materials'` | Production → Bill of materials |

### Contacts
| Key | Menu |
|-----|------|
| `'Customers'` | Contacts → Customers → Customers |
| `'Contact groups'` | Contacts → Customers → Contact groups |
| `'Vendors'` | Contacts → Vendors → Vendors |
| `'Employees'` | Contacts → Employees → Employees |
| `'Other contacts'` | Contacts → Other contacts → Other contacts |

### Settings
| Key | Menu |
|-----|------|
| `'Company profile'` | Settings → Company profile |
| `'Users & roles'` | Settings → Users & roles |
| `'Billing'` | Settings → Billing |
| `'Default accounts'` | Settings → Default accounts |
| `'Templates'` | Settings → Templates |
| `'Custom fields'` | Settings → Custom fields |
| `'Approval workflows'` | Settings → Approval workflows |
| `'Tagging rules'` | Settings → Tagging rules |
| `'Tax rates'` | Settings → Tax rates |
| `'Currencies'` | Settings → Currencies |
| `'Payment terms'` | Settings → Payment terms |
| `'Payment methods'` | Settings → Payment methods |
| `'Tags'` | Settings → Tags |

---

## Struktur File

```
erp-app/
├── app/
│   ├── app.vue                        # Entry point
│   ├── layouts/
│   │   └── default.vue                # Shell: Header + Sidebar (jangan diubah)
│   ├── pages/
│   │   └── index.vue                  # Page title bar + stage + pageRegistry ← tambah halaman di sini
│   ├── components/
│   │   ├── ErpHeader.vue              # Header bar (jangan diubah)
│   │   ├── ErpSidebar.vue             # Navigasi 3-level (jangan diubah)
│   │   └── pages/
│   │       ├── HomePage.vue           # ✅ Contoh halaman
│   │       ├── PlaceholderPage.vue    # Fallback (jangan diubah)
│   │       └── YourPage.vue           # ← buat file baru di sini
│   ├── composables/
│   │   └── useNavigation.ts           # Shared nav state (jangan diubah)
│   ├── assets/
│   │   └── css/pixel.css              # Pixel design tokens
│   └── public/
│       ├── mekari-erp-logo.svg
│       ├── sidebar-toggle.svg
│       └── shortcut-icon.svg
├── nuxt.config.ts
└── package.json
```

---

## Navigasi

Sidebar mendukung 3 level navigasi:

```
Level 1  Nav icon (selalu visible, collapsed/expanded)
Level 2  Flyout popover (muncul saat hover) — untuk menu dengan sub-item
Level 3  Panel sidebar (muncul saat klik item di flyout) — untuk section dengan banyak halaman
```

Menu yang langsung buka panel tanpa flyout: **Reports** dan **Settings**.

---

## Pixel Design System

Semua komponen dan token tersedia dari `@mekari/pixel3`.

```vue
<script setup lang="ts">
import { MpButton, MpTable } from '@mekari/pixel3'
</script>
```

Dokumentasi: [docs.mekari.design](https://docs.mekari.design/)
