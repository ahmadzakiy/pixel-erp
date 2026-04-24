<template>
  <div class="app-shell">
    <ErpHeader />
    <div class="main-container">
      <ErpSidebar />
      <div class="content-area">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --mp-background-header: #142D26;
  --mp-background-surface-bold: #272B32;
  --mp-background-neutral-subtle: #F0F1F3;
  --mp-background-neutral-subtle-hovered: #DCDFE4;
  --mp-background-neutral-pressed: #DCDFE4;
  --mp-background-stage: #FFFFFF;
  --mp-border-default: #DCDFE4;
  --mp-text-default: #272B32;
  --mp-text-inverse: #FFFFFF;
  --mp-text-interactive-default: #165082;
  --mp-text-success-default: #1A6E48;
}

*, *::before, *::after { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: var(--mp-background-surface-bold);
  color: var(--mp-text-default);
}

#__nuxt { height: 100%; }

.app-shell {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: var(--mp-background-neutral-subtle);
  border-left: 2px solid #142D26;
  border-right: 2px solid #142D26;
  border-radius: 12px 12px 0 0;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
