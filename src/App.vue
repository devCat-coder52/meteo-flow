<template>
  <AppLayout />
</template>

<script setup lang="ts">
  import AppLayout from './layouts/AppLayout.vue'
  import { onMounted } from 'vue'
  import { useWeatherStore } from '@/stores/weather.store'

  const store = useWeatherStore()

  onMounted(async () => {
    await store.detectUserLocation();
  });
</script>
