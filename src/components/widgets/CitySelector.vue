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
      <template #itemslot="slotProps">
        <div class="flex align-items-center">
          <div>{{ slotProps.item.fullName }}</div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex align-options-center">
          {{ slotProps.option.name[locale] }}
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
  console.log(city.shortName[locale.value])
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
</style>