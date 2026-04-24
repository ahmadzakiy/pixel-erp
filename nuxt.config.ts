export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  srcDir: 'app/',

  css: ['~/assets/css/pixel.css'],

  postcss: {
    plugins: {
      '@mekari/pixel3-postcss': {
        content: [
          './app/**/*.{vue,js,ts}',
          './plugins/**/*.{js,ts}',
        ],
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: ['@mekari/pixel3'],
    },
  },
})
