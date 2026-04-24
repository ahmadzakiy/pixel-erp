// Registers Mekari Pixel 3 as a Vue plugin.
// `.client.ts` ensures this only runs in the browser (SSR-safe).
import { PixelPlugin, type PixelPluginConfig } from '@mekari/pixel3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PixelPlugin, {
    pixelTheme: true, // enables usePixelTheme watcher
  } as PixelPluginConfig)
})
