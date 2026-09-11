<template>
  <div class="city-selector-container">
    <AutoComplete
      v-model="selectedCity"
      :suggestions="filteredCities"
      @complete="searchCities($event)"
      @item-select="onCitySelect"
      placeholder="Введите город..."
      field="name"
      class="w-full md:w-30rem"
      :emptySearchMessage="t('emptySearchMessage')"
    >
      <template #option="slotProps">
        <div class="flex align-options-center complete-option">
          {{ slotProps.option.name[locale] }}
        </div>
      </template>
      <template #empty>
        <div class="flex align-options-center complete-option">
          Города не найдены
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { City } from '@/types/locationTypes'
import AutoComplete from 'primevue/autocomplete'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps<{
  initialCity?: string
}>()

const emit = defineEmits(['city-change'])

const selectedCity = ref(props.initialCity)
const filteredCities = ref<City[]>([])
const { t, locale } = useLanguage()

const searchCities = async (event: { query: string }) => {
  if (event.query.length < 2) return
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(event.query)}&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      console.error('Ошибка поиска городов:', response.statusText)
      return
    }
    
    const citiesData = await response.json()
    filteredCities.value = citiesData.map((city: any) => ({
      shortName: {
        ru: city.local_names?.ru,
        en: city.local_names?.en
      },
      name: {
        ru: `${city.local_names?.ru || city.name} (${city.state})`,
        en: `${city.local_names?.en || city.name} (${city.state})`,
      },
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }))
  } catch (error) {
    console.error('Ошибка поиска городов:', error)
  }
}

const onCitySelect = (event: { value: City }) => {
  const city = event.value
  selectedCity.value = city.shortName[locale.value] ?? city.name[locale.value]
  const location = { 
    lat: city.lat, 
    lon: city.lon, 
    city: {
      ru: city.shortName.ru ?? city.name.ru,
      en: city.shortName.en ?? city.name.en
    }, 
    country: city.country 
  }
  emit('city-change', location)
}
</script>

<style scoped>
.city-selector-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
}

:deep(.p-autocomplete) {
  max-width: 600px;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

:deep(.complete-option) {
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

:deep(.p-autocomplete-input) {
  font-size: clamp(0.7rem, 2.5vw, 1rem);
  padding: clamp(8px, 2vw, 12px);
}

:deep(.p-autocomplete-dropdown) {
  width: clamp(40px, 10vw, 50px);
}

:deep(.p-autocomplete-panel) {
  max-height: 300px;
  overflow-y: auto;
}

:deep(.p-autocomplete-item) {
  padding: clamp(8px, 2vw, 12px);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

:deep(.p-autocomplete-empty-message) {
  padding: clamp(8px, 2vw, 12px);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

@media (max-width: 400px) {
  :deep(.p-autocomplete-input) {
    font-size: 12px;
  }

  .complete-option {
    font-size: 12px;
  }
}

</style>