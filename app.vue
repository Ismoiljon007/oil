<template>
  <NuxtLayout />
</template>
<script setup lang="ts">
import { useStore } from "~~/store/store";
const store = useStore();

onMounted(() => {
  if (process.client) {
    store.token = localStorage.getItem("auth")
      ? localStorage.getItem("auth")
      : null;
  }
});
</script>
