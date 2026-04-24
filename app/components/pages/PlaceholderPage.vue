<script setup lang="ts">
const { currentPageKey } = useNavigation()
</script>

<template>
  <div class="placeholder-page">
    <div class="placeholder-content">
      <p class="placeholder-label">{{ currentPageKey }}</p>
      <p class="placeholder-hint">Page content goes here.</p>
    </div>
  </div>
</template>

<style scoped>
.placeholder-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 240px;
}

.placeholder-content {
  text-align: center;
}

.placeholder-label {
  font-size: 18px;
  font-weight: 600;
  color: var(--mp-text-default);
  margin: 0 0 8px;
}

.placeholder-hint {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}
</style>
