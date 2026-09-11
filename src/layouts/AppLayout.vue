<template>
  <div class="flex flex-col max-w-[1200px] px-[16px] sm:px-[20px] py-[12px] sm:py-[20px] mx-auto my-0 min-h-screen bg-white">
    <AppHeader />
    <div v-if="store.loading" class="flex justify-center items-center py-[40px] text-(--text-color-secondary)">
      <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
      <span class="ml-3">Загрузка данных...</span>
    </div>
    <div v-else>
      <WeatherView />
      <CalendarView />
      <ForecastView />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import WeatherView from '@/views/WeatherView.vue'
import ForecastView from '@/views/ForecastView.vue'
import CalendarView from '@/views/CalendarView.vue'
import { useWeatherStore } from '@/stores/weather.store'

const store = useWeatherStore()
</script>