<script setup lang="ts">
/**
 * ErpFilterBar — layout container for filter controls on index pages.
 *
 * ⚠️  MpFilterBar does not exist in Pixel Enterprise yet.
 *     Request to Pixel team: add MpFilterBar as a standard container for
 *     search + dropdown filters + action buttons on index pages.
 *
 * Usage:
 *   <ErpFilterBar>
 *     <MpInputGroup id="...">...</MpInputGroup>
 *     <MpSelect id="...">...</MpSelect>
 *     <MpButton variant="primary" style="margin-left: auto">+ Create</MpButton>
 *   </ErpFilterBar>
 */
</script>

<template>
  <div class="erp-filter-bar">
    <slot />
  </div>
</template>

<style scoped>
.erp-filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--mp-colors-border-default);
  flex-shrink: 0;
  flex-wrap: wrap;
}
</style>
