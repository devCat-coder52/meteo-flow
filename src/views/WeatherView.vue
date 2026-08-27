<template>
  <div v-if="weather?.main" class="forecast-item p-10 mb-8 mx-10">
    <div class="flex flex-wrap gap-8 items-center w-full">
      <div class="grid grid-flow-col grow grid-rows-4 gap-1">
        <div class="row-span-3 text-8xl text-(--text-color) font-medium leading-none shrink-2">{{ weather.main.temp }}</div>
        <div class="text-base text-(--text-color-secondary)">{{ t('feelsLike') }} {{ weather.main.feels_like }}</div>
        <div class="row-span-4">
          <div class="flex">
            <img 
              :src="`https://openweathermap.org/img/wn/${weather.main.icon}@2x.png`" 
              :alt="weather.main.description"
              class="size-[120px] self-start"
            />
            <div class="flex flex-wrap items-center text-xl text-(--text-color) font-medium max-w-[130px]">
              {{ weather.main.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-[5px]">
        <div v-for="subTitle in subTitles" :class="[{ [`col-span-${subTitle.colspan}`]: subTitle.colspan}]" class="stat-item" v-tooltip.top="t(subTitle.item)">
          <i v-if="subTitle.class" :class="subTitle.class" class="mr-1 text-gray-500"></i>
          {{ weather.stats[subTitle.item] }}{{ subTitle.unit[locale] }}
        </div>
      </div>
      <div>
        <SunTimes :sunrise="weather.sys.sunrise" :sunset="weather.sys.sunset" :timezone="weather.timezone" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWeatherStore } from "@/stores/weather.store"
import { useLanguage } from '@/composables/useLanguage'
import SunTimes from "@/components/widgets/SunTimes.vue"

const { t, locale } = useLanguage()
const store = useWeatherStore()

const weather = computed(() => {
  return store.weatherData
})

interface StatSubtitle {
  item: keyof NonNullable<typeof weather.value>['stats']
  class?: string
  unit: {
    ru: string,
    en: string
  }
  colspan?: number
}

const subTitles : StatSubtitle[] = [{
  item: "pressure",
  class: "fa-classic fa-temperature-quarter",
  unit: {
    ru: " мм рт.ст.",
    en: " mmHg"
  },
  colspan: 2
},{
  item: "humidity",
  class: "fa-classic fa-water",
  unit: {
    ru: "%",
    en: "%"
  },
}, {
  item: "clouds",
  class: "fa-regular fa-cloud",
  unit: {
    ru: "%",
    en: "%"
  },
}, {
  item: "wind_speed",
  class: "fa-classic fa-wind",
  unit: {
    ru: " м/с",
    en: " m/s"
  },
},{
  item: "visibility",
  class: "fa-regular fa-eye",
  unit: {
    ru: " км",
    en: " km"
  },
}]
</script>