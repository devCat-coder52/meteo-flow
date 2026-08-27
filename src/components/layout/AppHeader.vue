<template>
  <div class="flex justify-between items-center flex-wrap gap-[15px] mb-[15px]">
    <Button @click="showCitySelector" plain text>
      <Image v-if="countryLinkIcon" :src="countryLinkIcon" />
      <span style="margin-left: 8px;">{{ store.selectedLocation.city?.[locale] }}</span>
      <i class="pi ml-[4px]" :class="{'pi-chevron-down': true}"></i>
    </Button>
    <ConfirmPopup group="citySelector">
      <template #container="{ rejectCallback }">
        <div class="p-[1rem]">
          <CitySelector 
            :initial-city="store.selectedLocation.city[locale]" 
            @city-change="onCityChange" 
            @close="rejectCallback"
          />
        </div>
      </template>
    </ConfirmPopup>
    <div class="flex flex-wrap items-center gap-[15px]">
      <div class="flex items-center gap-[10px]">
        <!--<h2 class="mx-5 text-base font-semibold" style="color: var(--text-color)">{{ formattedWeekRange }}</h2>-->
        <span class="mx-5 text-base" style="color: var(--text-color)">{{ t('localTimeTitle') }}: {{ localTime }}</span>
      </div>
    </div>
    <div class="controls">
      <LanguageSelector />
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
import { useConfirm } from 'primevue/useconfirm'
import { useClock } from '@/composables/useClock'
import { useWeatherStore } from '@/stores/weather.store'
import { Location } from '@/types/locationTypes'
import { useLanguage } from '@/composables/useLanguage'

const confirm = useConfirm()
const store = useWeatherStore()
const { t, locale } = useLanguage()
const { currentTime } = useClock()

const countryLinkIcon = computed(() => {
  return store.selectedLocation.country ? `https://flagsapi.com/${store.selectedLocation.country}/shiny/24.png` : null;
})

const localTime = computed(() => {
  return currentTime.value.utc().add(store.selectedLocation.timezone || 0, 'hour').format('DD MMMM YYYY HH:mm:ss')
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

</script>