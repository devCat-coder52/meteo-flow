<template>
  <div class="time-forecasts">
    <h4>{{ t('forecastTitle') }} {{ dateForecasts }}</h4>
    <DataView 
      :value="forecasts" 
      layout='list'
      :paginator="false"
      dataKey="index"
    >
      <template #list="slotProps">
        <div v-for="(forecast, index) in slotProps.items" :key="index" class="forecast-item p-3 mb-3">
          <div class="forecast-time">
            <i class="pi pi-clock mr-2"></i>{{ forecast.time }}
          </div>
          
          <div class="forecast-main">
            <img 
              :src="`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`" 
              :alt="forecast.description"
              class="forecast-icon"
            />
            <div class="temperature">{{ forecast.temp }}</div>
            <div class="forecast-desc">
              {{ forecast.description }}
            </div>
          </div>
          
          <div class="forecast-stats">
            <div v-for="subTitle in subTitles" class="stat-item" v-tooltip.top="t(subTitle.item)">
              <i v-if="subTitle.class" :class="subTitle.class" class="mr-1 text-gray-500"></i>
              {{ forecast[subTitle.item] }}{{ subTitle.unit[locale] }}
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        {{ t('noData') }}
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DataView from 'primevue/dataview'
import dayjs from '@/utils/dayjs'
import { useWeatherStore } from '@/stores/weather.store'
import { useLanguage } from '@/composables/useLanguage'

const { t, locale } = useLanguage()
const store = useWeatherStore()

const selectedDate = computed(() => store.selectedDateForecasts)

const forecasts = computed(() => {
  const dateKey = selectedDate.value.format('YYYY-MM-DD') as keyof typeof store.forecastData
  return store.forecastData?.[dateKey] || []
})

const dateForecasts = computed(() => {
  const today = dayjs().startOf('day')
  if (selectedDate.value.isSame(today)) {
    return 'сегодня'
  } else if (selectedDate.value.isSame(today.add(1, 'day'))) {
    return 'завтра'
  } else if (selectedDate.value.isSame(today.subtract(1, 'day'))) {
    return 'вчерашний день'
  } else {
    return selectedDate.value.format('DD.MM.YYYY')
  }
})

const subTitles = [{
  item: "pressure",
  class: "fa-classic fa-temperature-quarter",
  unit: {
    ru: " мм рт.ст.",
    en: " mmHg"
  }
},{
  item: "humidity",
  class: "fa-classic fa-water",
  unit: {
    ru: "%",
    en: "%"
  }
}, {
  item: "wind_speed",
  class: "fa-classic fa-wind",
  unit: {
    ru: " м/с",
    en: " m/s"
  }
}, {
  item: "clouds",
  class: "fa-regular fa-cloud",
  unit: {
    ru: "%",
    en: "%"
  }
}]
</script>

<style scoped>

.forecast-main {
  display: flex;
  align-items: center;
  flex: 1;
}

.forecast-icon {
  width: 50px;
  height: 50px;
}

.forecast-temp {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--primary-color);
  min-width: 60px;
  text-align: center;
}

.forecast-desc {
  font-size: 1em;
  color: var(--text-color);
  padding-left: 25px;
  flex: 1;
}

.forecast-stats {
  display: flex;
  gap: 15px;
}

.time-forecasts h4 {
  margin: 25px 0 15px 0;
  color: var(--text-color);
  font-size: 1.1em;
  border-bottom: 2px solid var(--surface-border);
  padding-bottom: 5px;
}
</style>