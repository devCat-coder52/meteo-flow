<template>
  <div class="sun-times-content">
    <div class="sun-time-row">
      <div class="sun-time-item" :class="isDay ? 'sunrise-item' : 'sunset-item'">
        <div class="sun-icon" :class="isDay ? 'sunrise-icon' : 'sunset-icon'">
          <i class="pi" :class="isDay ? 'pi-sun' : 'pi-moon'"></i>
        </div>
        <div class="sun-time-info">
          <div class="sun-label">{{ isDay ? t('sunrise') : t('sunset') }}</div>
          <div class="sun-time">{{ isDay ? sunriseTime : sunsetTime }}</div>
        </div>
      </div>

      <div class="sun-time-item" :class="isDay ? 'sunset-item' : 'sunrise-item'">
        <div class="sun-icon" :class="isDay ? 'sunset-icon' : 'sunrise-icon'">
          <i class="pi" :class="isDay ? 'pi-moon' : 'pi-sun'"></i>
        </div>
        <div class="sun-time-info">
          <div class="sun-label">{{ isDay ? t('sunset') : t('sunrise') }}</div>
          <div class="sun-time">{{ isDay ? sunsetTime : sunriseTime }}</div>
        </div>
      </div>
    </div>
        
    <div class="sun-progress-bar">
      <div class="progress-track">
        <div :class="isDay ? 'sun-progress-fill' : 'moon-progress-fill'" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import dayjs from '@/utils/dayjs'

interface Props {
  sunrise: number
  sunset: number
  timezone: number
}

const { t } = useLanguage()
const props = defineProps<Props>()

const sunrise = computed(() => {
  return dayjs.unix(props.sunrise).utc().add(props.timezone / 3600, 'hour')
})

const sunset = computed(() => {
  return dayjs.unix(props.sunset).utc().add(props.timezone / 3600, 'hour')
})

const now = computed(() => {
  return dayjs().utc().add(props.timezone / 3600, 'hour')
})

const sunriseTime = computed(() => {
  return sunrise.value.format('HH:mm')
})

const sunsetTime = computed(() => {
  return sunset.value.format('HH:mm')
})

const isDay = computed(() => {
  return now.value < sunset.value && now.value >= sunrise.value
})

const progressPercentage = computed(() => {
  const sunriseDate = (sunrise.value < now.value && sunset.value < now.value) ? sunrise.value.add(1, 'day') : sunrise.value
  const sunsetDate = (sunrise.value > now.value && sunset.value > now.value) ? sunset.value.subtract(1, 'day') : sunset.value
  
  const totalDaylight = isDay.value ? sunsetDate.diff(sunriseDate, 'minute') : sunriseDate.diff(sunsetDate, 'minute')
  const elapsedFromSunrise = isDay.value ? now.value.diff(sunriseDate, 'minute') : now.value.diff(sunsetDate, 'minute')
  return Math.min(100, Math.max(0, (elapsedFromSunrise / totalDaylight) * 100))
})
</script>

<style scoped>
.sun-times-card {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.sun-times-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: clamp(200px, 50vw, 250px);
}

.sun-time-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.sun-time-item {
  display: flex;
  align-items: center;
  min-width: clamp(80px, 25vw, 100px);
}

.sunrise-item {
  justify-content: flex-start;
}

.sunset-item {
  justify-content: flex-end;
}

.sun-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(28px, 7vw, 36px);
  height: clamp(28px, 7vw, 36px);
  border-radius: 50%;
}

.pi-moon, .pi-sun {
  font-size: clamp(2rem, 2.5vw, 2.3rem);
}

.sunrise-icon {
  color: #ff9800;
}

.sunset-icon {
  color: #4c50af;
}

.sun-time-info {
  flex: 1;
  text-align: center;
}

.sun-label {
  font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  margin-bottom: 1px;
}

.sun-time {
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 600;
  color: white;
}

.sun-progress-bar {
  width: 100%;
  padding: 0 clamp(6px, 2vw, 10px);
  position: relative;
  margin-top: 5px;
}

.progress-track {
  position: relative;
  height: clamp(6px, 1.5vw, 8px);
  background-color: var(--surface-border);
  border-radius: 4px;
  overflow: hidden;
}

.sun-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd599, #ff9800);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.moon-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #99d5ff, #4c50af);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.pi {
  vertical-align: middle;
}

@media (max-width: 400px) {
  .sun-times-content {
    width: 100%;
  }

  .sun-time-item {
    min-width: 70px;
  }
}
</style>