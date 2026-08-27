<template>
  <Dropdown
    v-model="selectedLocale"
    :options="locales"
    optionLabel="label"
    class="language-dropdown"
    :showClear="false"
    @change="onLanguageChange"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-baseline gap-2">
        <i class="fa-classic fa-language"></i>{{ slotProps.value.label }}
      </div>
    </template>
    
    <template #option="slotProps">
      <div class="flex align-items-center gap-2">
        <span>{{ slotProps.option.label }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useLanguage } from '@/composables/useLanguage'
import { useWeatherStore } from '@/stores/weather.store'

const { locale, setLocale } = useLanguage()
const store = useWeatherStore()

const locales = [
  { label: 'Русский', code: 'ru' },
  { label: 'English', code: 'en' }
] as const

const selectedLocale = ref(locales.find(lang => lang.code === locale.value))

//watch(locale, (val) => { selectedLocale.code = val })

const onLanguageChange = async (event: any) => {
  setLocale(event.value.code)
  store.selectedLocation.isIp 
    ? await store.detectUserLocation()
    : await store.loadWeatherAndForecast()
}
</script>

<style scoped>

.language-dropdown {
  width: 120px;
  border: 0;
  background: transparent;
}

.p-dropdown.p-focus {
  box-shadow: none;
}

.language-dropdown :deep(.p-dropdown-label) {
  padding: 0.25rem 0.5rem;
}

.language-dropdown :deep(.p-dropdown-trigger) {
  display: none;
}
</style>