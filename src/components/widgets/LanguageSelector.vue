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
      <div v-if="slotProps.value" class="flex items-baseline gap-2 text-white">
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
]

const selectedLocale = ref(locales.find(lang => lang.code === locale.value))

//watch(locale, (val) => { selectedLocale.code = val })

const onLanguageChange = async (event: any) => {
  setLocale(event.value.code)
  store.selectedLocation?.isIp 
    ? await store.detectUserLocation()
    : await store.loadWeatherAndForecast()
}
</script>

<style scoped>

.language-dropdown {
  width: clamp(100px, 25vw, 120px);
  border: 0;
  background: transparent;
}

.p-dropdown.p-focus {
  box-shadow: none;
}

.language-dropdown :deep(.p-dropdown-label) {
  padding: clamp(4px, 1vw, 0.25rem) clamp(6px, 1.5vw, 0.5rem);
  font-size: clamp(0.85rem, 2vw, 1rem);
}

.language-dropdown :deep(.p-dropdown-trigger) {
  display: none;
}

@media (max-width: 480px) {
  .language-dropdown {
    width: auto;
    min-width: 80px;
  }

  .language-dropdown :deep(.p-dropdown) {
    padding: 4px;
  }
}

@media (max-width: 400px) {
  .language-dropdown :deep(.p-dropdown-label) {
    font-size: 16px;
  }
}
</style>