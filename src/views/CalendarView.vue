<template>
  <div class="calendar-grid">
    <div 
      v-for="(day, index) in weekdays" 
      :key="day" 
      class="calendar-day-header"
      :class="{ 'today-header': isToday(index) }"
    >
      <div class="text-sm">{{ day }}</div>
    </div>
    <div 
      v-for="(day, index) in calendarDays" 
      :key="day.date.toString()"
      class="calendar-day"
      :class="{ 
        'other-month': !day.isCurrentMonth,
        'today': day.isToday,
        'past-day': isPastDay(index),
        'calendar-day_hover': day.forecast
      }"
      @click="store.switchForecastData(day.date)"
    >
      <div class="day-content">
        <div class="day-number">{{ day.date.date() }}</div>
        <template v-for="(weather) in day.weather">
          <div class="weather-indicator">
            <template v-if="weather">
              <img 
                :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" 
                :alt="weather.description"
                class="weather-icon"
              />
              <div class="temperature">{{ weather.temp }}</div>
            </template>
            <template v-else>
              <div class="temperature__empty">–</div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '@/stores/weather.store'
import { useCalendar } from '@/composables/useCalendar'
import { useLanguage } from '@/composables/useLanguage';
import dayjs from '@/utils/dayjs'

const store = useWeatherStore()
const { calendarDays } = useCalendar()
const { locale } = useLanguage()

const isToday = (index: number) => {
  if (calendarDays.value.length === 0) return false
  return calendarDays.value[index]?.isToday
}

const isPastDay = (index: number) => {
  if (calendarDays.value.length === 0) return false
  return calendarDays.value[index]?.date.isBefore(dayjs(), 'day')
}

const weekdays = computed(() => {
  return locale.value === 'ru'
    ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
})

/*const formattedWeekRange = computed(() => {
  if (calendarDays.value.length === 0) return ''
  
  const firstDay = calendarDays.value[0].date
  const lastDay = calendarDays.value[calendarDays.value.length - 1].date
  
  if (firstDay.month() === lastDay.month()) {
    return `${firstDay.format('D MMM')} - ${lastDay.format('D MMM YYYY')}`
  } else {
    return `${firstDay.format('D MMM')} - ${lastDay.format('D MMM YYYY')}`
  }
})*/

</script>

<style scoped>

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--surface-border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}
.calendar-day {
  min-height: 140px;
  background: var(--surface-card);
  position: relative;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day-header {
  background: var(--surface-section);
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  color: var(--text-color);
  border-bottom: 1px solid var(--surface-border);
}

.calendar-day-header.today-header {
  background: #e3f2fd;
  color: #1976d2;
}

.calendar-day.today {
  border: 2px solid #2196f3;
}

.calendar-day.past-day {
  opacity: 0.7;
  filter: grayscale(0.3);
}

.calendar-day.other-month {
  background: var(--surface-ground);
  color: var(--text-color-secondary);
}

.calendar-day_hover:hover {
  background: var(--surface-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,.08);
}

.day-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.day-number {
  font-size: 1.2rem;
  font-weight: 500;
  align-self: flex-end;
  color: #1976d2;
  margin-bottom: 5px;
  opacity: 0.8;
}

.weather-indicator {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
}

.weather-icon {
  width: 56px;
  height: 56px;
}

</style>