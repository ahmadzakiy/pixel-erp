<script setup lang="ts">
// Activate Pixel Enterprise theme — Token v2.4 + Enterprise product theme.
// This is the single place to set it; do not repeat in any other component.
import { usePixelTheme } from '@mekari/pixel3'

const { setNextTheme, setProductTheme } = usePixelTheme()
setNextTheme(true)            // Design Token v2.4
setProductTheme('enterprise') // Enterprise theme
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { usePixelTheme } from "@mekari/pixel3";

const { setNextTheme, setDarkMode, setProductTheme } = usePixelTheme();

onMounted(() => {
  setNextTheme(true);
  setDarkMode(false);
  setProductTheme("enterprise");
});
</script>
