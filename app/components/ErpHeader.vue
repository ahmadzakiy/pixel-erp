<template>
  <header class="header-bar">
    <!-- Left: Logo -->
    <div class="header-logo-col">
      <img
        class="header-logo"
        :src="logoSrc"
        alt="Mekari ERP"
      />
    </div>

    <!-- Center: Search -->
    <div class="header-search-col">
      <div class="search-pill">
        <MpIcon name="search" variant="outline" class="search-icon" />
        <span class="search-label">Search or jump to...</span>
        <span class="search-badge">⌘K</span>
      </div>
    </div>

    <!-- Right: Actions + User -->
    <div class="header-right-col">
      <button class="header-icon-btn" title="Add">
        <MpIcon name="add" variant="outline" />
      </button>
      <button class="header-icon-btn btn-hide-mobile" title="Help">
        <MpIcon name="help" variant="outline" />
      </button>
      <button class="header-icon-btn btn-hide-mobile" title="Monitor">
        <MpIcon name="desktop" variant="outline" />
      </button>
      <button class="header-icon-btn" title="Notifications">
        <MpIcon name="notification" variant="outline" />
      </button>

      <div class="header-user" role="button" tabindex="0" title="User menu">
        <div class="user-avatar">
          <span>RC</span>
        </div>
        <div class="user-info header-hide-tablet">
          <span class="user-name">Rizal Candra</span>
          <span class="user-company">PT Central Perk Indonesia</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MpIcon } from '@mekari/pixel3'
const logoSrc = '/mekari-erp-logo.svg'
</script>

<style scoped>
.header-bar {
  height: 56px;
  background: var(--mp-background-header);
  display: flex;
  align-items: center;
  padding: 0 12px 0 0;
  gap: 8px;
  flex-shrink: 0;
  z-index: 100;
}

.header-logo-col {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 8px;
  padding-left: 16px;
}

.header-logo {
  height: 20px;
  width: auto;
  display: block;
  flex-shrink: 0;
}

.header-product-name {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
}

.header-search-col {
  flex: 0 0 400px;
  width: 400px;
}

.search-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  padding: 0 12px;
  cursor: text;
  border: none;
}

.search-icon {
  color: rgba(255,255,255,0.5);
  flex-shrink: 0;
}

.search-label {
  flex: 1;
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-badge {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.12);
  border-radius: 4px;
  padding: 1px 6px;
  white-space: nowrap;
}

.header-right-col {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.header-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: rgba(255,255,255,0.8);
  transition: background-color 100ms;
}

.header-icon-btn svg {
  color: white;
}

.header-icon-btn svg path {
  stroke: white;
  fill: none;
}

.header-icon-btn:hover {
  background: rgba(255,255,255,0.12);
}

.header-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 100ms;
  margin-left: 4px;
}

.header-user:hover {
  background: rgba(255,255,255,0.12);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #D6DBF7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #3B4A8A;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.2;
}

.user-company {
  font-size: 12px;
  color: rgba(255,255,255,0.75);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

@media (max-width: 1024px) {
  .header-hide-tablet { display: none; }
  .header-search-col { flex: 0 0 280px; width: 280px; }
}

@media (max-width: 768px) {
  .header-logo-col { display: none; }
  .btn-hide-mobile { display: none; }
  .header-search-col { flex: 1; }
}
</style>
