<template>
  <div class="flex justify-between items-center flex-wrap gap-[10px] sm:gap-[15px] mb-[12px] sm:mb-[15px] forecast-item">
    <div class="flex items-center ml-4 gap-[10px] w-full sm:w-auto">
      <span class="flex items-center gap-2 text-xs sm:text-base w-[250px] text-white"><i class="pi pi-calendar-clock" style="font-size: 17px"></i> {{ localTime }}</span>
    </div>
    <Button v-if="store.selectedLocation?.city?.[locale]" @click="showCitySelector" plain text class="min-w-0">
      <Image v-if="countryLinkIcon" :src="countryLinkIcon" class="shrink-0" />
      <span class="truncate" style="margin-left: 8px; color: white; font-weight: 500; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">
        {{ store.selectedLocation.city[locale] }} 
        {{store.selectedLocation.timezone ? '(UTC' + (store.selectedLocation.timezone > 0 ? '+' : '') + store.selectedLocation.timezone + ')' : ''}}
      </span>
    </Button>
    <ConfirmPopup group="citySelector">
      <template #container="{ rejectCallback }">
        <div class="p-[1rem]">
          <CitySelector
            :initial-city="store.selectedLocation?.city[locale]" 
            @city-change="onCityChange" 
            @close="rejectCallback"
          />
        </div>
      </template>
    </ConfirmPopup>
    <div class="flex flex-wrap items-center controls w-full sm:w-auto mr-2">
      <LanguageSelector />
      <SelectButton 
        v-model="unit" 
        :allowEmpty="false" 
        :options="options"
        @change="onUnitChange"
        optionLabel="icon"
        optionValue="value"
        dataKey="value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Image from 'primevue/image'
import ConfirmPopup from 'primevue/confirmpopup'
import CitySelector from '../widgets/CitySelector.vue'
import LanguageSelector from '../widgets/LanguageSelector.vue'
import SelectButton from 'primevue/selectbutton'
import { useConfirm } from 'primevue/useconfirm'
import { useClock } from '@/composables/useClock'
import { useLanguage } from '@/composables/useLanguage'
import { useUnits } from '@/composables/useUnits'
import { useWeatherStore } from '@/stores/weather.store'
import { Location } from '@/types/locationTypes'


const confirm = useConfirm()
const store = useWeatherStore()
const { locale } = useLanguage()
const { currentTime } = useClock()
const { unit, options, setUnit } = useUnits()

const countryLinkIcon = computed(() => {
  return store.selectedLocation?.country ? `https://flagsapi.com/${store.selectedLocation.country}/shiny/24.png` : null;
})

const localTime = computed(() => {
  return currentTime.value.utc().add(store.selectedLocation?.timezone || 0, 'hour').format('DD MMMM YYYY HH:mm:ss')
})

const showCitySelector = () => {
  confirm.require({
    group: 'citySelector',
    message: ' ',
    header: ' ',
    icon: 'pi pi-map-marker',
    acceptLabel: ' ',
    rejectLabel: ' '
  })
}

const onCityChange = async (location : Location) => {
  await store.setUserLocation(location, false)
  confirm.close()
}

const onUnitChange = async (unit: any) => {
  setUnit(unit.value);
}

</script>

<style scoped>
.p-button {
  padding: 0.5rem 1rem
}

:deep(.p-button) {
  padding: 0.5rem 0.75rem
}

:deep(.p-selectbutton) {
  background: rgb(0, 0, 0, 0.1);
  border-radius: 8px;
}

:deep(.p-selectbutton .p-button) {
  background: transparent;
  color: white;
  padding: 0.1rem 0.25rem;
  border: none;
  border-radius: 8px;
  width: 30px;
}

:deep(.p-button.p-highlight) {
  background: rgb(227, 242, 253, 0.3);
}

:deep(.p-button:not(:disabled):hover) {
  background: rgb(256, 256, 256, 0.2);
}
</style>