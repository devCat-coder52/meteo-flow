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
      v-for="(day, index) in calendarDays.filter(day => windowWidth >= 760 || day.weather?.find(weather => weather))" 
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
        <div class="day-number">{{ windowWidth >= 760 ? day.date.date() : dayjs(day.date).format('DD.MM') }}</div>
        <div class="weather-widget">
          <template v-for="(weather, index) in day.weather">
            <div class="weather-indicator">
              <template v-if="weather">
                {{ windowWidth >= 760 ? '' : (index == 0 ? 'Днём: ' : 'Ночью: ') }}
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
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

const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

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
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: clamp(16px, 4vw, 30px);
}

.calendar-day {
  min-height: clamp(80px, 20vw, 140px);
  background: rgb(0, 0, 0, 0.1);
  position: relative;
  padding: clamp(4px, 1.5vw, 8px);
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day-header {
  background: rgb(0, 0, 0, 0.2);
  padding: clamp(8px, 2vw, 12px) clamp(4px, 1.5vw, 8px);
  text-align: center;
  font-weight: 600;
  color: white;
  border-bottom: 1px solid var(--surface-border);
  font-size: clamp(0.7rem, 2vw, 0.9rem);
}

.calendar-day-header.today-header {
  background: rgb(227, 242, 253, 0.3);
  color: rgb(256, 256, 256, 0.3);
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

.calendar-day:hover {
  background: rgb(256, 256, 256, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,.08);
}

.day-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.day-number {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 600;
  align-self: flex-end;
  margin-bottom: 5px;
  opacity: 0.8;
}

.weather-indicator {
  display: flex;
  align-items: center;
  height: clamp(30px, 8vw, 40px);
  justify-content: center;
}

.weather-icon {
  width: clamp(40px, 10vw, 56px);
  height: clamp(40px, 10vw, 56px);
}

@media (max-width: 760px) {
  .calendar-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    background: transparent;
  }

  .calendar-day {
    min-height: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
  }

  .calendar-day-header {
    display: none;
  }

  .day-number {
    align-self: center;
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  .day-content {
    flex-direction: row;
  }

  .weather-indicator {
    height: auto;
  }

  .weather-widget {
    display: flex;
    gap: 15px;
  }
}
</style>