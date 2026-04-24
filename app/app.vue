<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { usePixelTheme } from "@mekari/pixel3";

const { setNextTheme, setDarkMode, setProductTheme } = usePixelTheme();

setNextTheme(true);
setDarkMode(false);
setProductTheme("enterprise");
</script>
