<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'

const { pageTitle, currentPageKey } = useNavigation()

/**
 * Page registry — maps menu item keys to Vue components.
 *
 * To add a new page:
 *   1. Create  app/components/pages/YourPage.vue
 *   2. Add an entry here:  'Menu label': defineAsyncComponent(() => import('~/components/pages/YourPage.vue'))
 */
const pageRegistry: Record<string, Component> = {
  'Home':           defineAsyncComponent(() => import('~/components/pages/HomePage.vue')),
  'Sales invoices': defineAsyncComponent(() => import('~/components/pages/SalesInvoicesPage.vue')),
  // 'Financials':  defineAsyncComponent(() => import('~/components/pages/FinancialsPage.vue')),
}

const PlaceholderPage = defineAsyncComponent(() => import('~/components/pages/PlaceholderPage.vue'))

const currentComponent = computed<Component>(
  () => pageRegistry[currentPageKey.value] ?? PlaceholderPage,
)
</script>

<template>
  <div class="page-title-bar">
    <h1 class="page-title-text">{{ pageTitle }}</h1>
  </div>
  <div class="stage">
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.page-title-bar {
  height: 72px;
  background: var(--mp-background-neutral-subtle);
  display: flex;
  align-items: center;
  padding: 0 24px;
  flex-shrink: 0;
}

.page-title-text {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.2px;
  color: var(--mp-text-default);
}

.stage {
  flex: 1;
  background: var(--mp-background-stage);
  border-radius: 12px 12px 0 0;
  overflow: auto;
}
</style>
