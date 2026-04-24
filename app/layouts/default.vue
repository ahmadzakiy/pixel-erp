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
/*
 * ── Pixel Token v2.4 — Enterprise theme ─────────────────────────────────────
 *
 * Pixel's PostCSS plugin generates utility classes but does NOT inject semantic
 * CSS custom property definitions globally. We define them here so all custom
 * components (ErpHeader, ErpSidebar, ErpTablePage, etc.) can reference them.
 *
 * Values are the ENTERPRISE theme values from Token v2.4.
 * Source: https://docs.mekari.design/docs/design-token-v2-4.html
 */

:root {
  /* Background */
  --mp-background-surface-bold:          #142D26;
  --mp-background-surface:               #F8F9F9;
  --mp-background-stage:                 #FFFFFF;
  --mp-background-neutral:               #FFFFFF;
  --mp-background-neutral-subtle:        #F8F9F9;
  --mp-background-neutral-hovered:       #F8F9F9;
  --mp-background-neutral-pressed:       #EBF0F1;
  --mp-background-neutral-subtle-hovered:#EBF0F1;
  --mp-background-nav-stack-hovered:     #D6F4E9;

  /* Border */
  --mp-border-default:                   #E3E7E9;
  --mp-border-bold:                      #8C9596;

  /* Text */
  --mp-text-default:                     #080D0E;
  --mp-text-inverse:                     #FFFFFF;
  --mp-text-secondary:                   #3A4749;
  --mp-text-selected:                    #0F6D4D;
  --mp-text-link:                        #165082;
  --mp-text-disabled:                    #8C9596;
  --mp-text-danger:                      #A8352D;

  /* Typography */
  --mp-fonts-body: "Inter", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;

  /* Radius */
  --mp-radii-md: 0.375rem;

  /* Shadow (Enterprise uses #1D1F2429 as shadow color) */
  --mp-shadows-sm: 0px 10px 15px -3px #1D1F2429, 0px 4px 6px -2px #1D1F2429;
}

*, *::before, *::after { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: var(--mp-fonts-body);
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
  border-left: 2px solid var(--mp-background-surface-bold);
  border-right: 2px solid var(--mp-background-surface-bold);
  border-radius: 12px 12px 0 0;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
