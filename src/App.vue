<template>
  <AnimatedBackground />
  <AppLayout />
</template>

<script setup lang="ts">
  import AppLayout from './layouts/AppLayout.vue'
  import AnimatedBackground from './components/AnimatedBackground.vue'
  import { onMounted } from 'vue'
  import { useWeatherStore } from '@/stores/weather.store'

  const store = useWeatherStore()

  onMounted(async () => {
    await store.detectUserLocation();
  });
</script>
