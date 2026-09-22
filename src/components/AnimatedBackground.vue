<template>
  <div class="background-container">
    <video 
      v-if="videoSrc"
      :key="videoSrc" 
      ref="bgVideo"
      class="bg-video"
      autoplay 
      loop 
      muted 
      playsinline 
      preload="auto"
    >
      <source :src="videoSrc" type="video/mp4" />
      <div :class="['fallback-bg', weatherType]"></div>
    </video>
    
    <div v-else :class="['fallback-bg', weatherType]"></div>
    
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useWeatherStore } from '@/stores/weather.store';
import d01 from '@/assets/videos/01d.mp4';
import d02 from '@/assets/videos/02d.mp4';
import d03 from '@/assets/videos/03d.mp4';
import d04 from '@/assets/videos/04d.mp4';
import d09 from '@/assets/videos/09d.mp4';
import d10 from '@/assets/videos/10d.mp4';
import d11 from '@/assets/videos/11d.mp4';
import d13 from '@/assets/videos/13d.mp4';
import d50 from '@/assets/videos/50d.mp4';
import n01 from '@/assets/videos/01n.mp4';
import n11 from '@/assets/videos/11n.mp4';

const weatherStore = useWeatherStore();
const bgVideo = ref<HTMLVideoElement | null>(null);

const videoMap: Record<string, string> = {
  "01d": d01,
  "02d": d02,
  "03d": d03,
  "04d": d04,
  "09d": d09,
  "10d": d10,
  "11d": d11,
  "13d": d13,
  "50d": d50,
  "01n": n01,
  "11n": n11,
};

const weatherType = computed(() => {
  return weatherStore?.weatherData?.main?.icon;
});

const videoSrc = computed(() => weatherType.value ? videoMap[weatherType.value] : null);

watch(() => videoSrc, () => {
  reloadVideo();
});

const reloadVideo = () => {
  if (bgVideo.value) {
    bgVideo.value.load();
    bgVideo.value.play().catch(e => console.log('Autoplay blocked:', e));
  }
};
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.fallback-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background 1s ease;
}

.fallback-bg.clear { background: linear-gradient(to bottom, #4facfe, #00f2fe); }
.fallback-bg.rain { background: linear-gradient(to bottom, #3a4b5c, #1e252b); }
.fallback-bg.clouds { background: linear-gradient(to bottom, #bdc3c7, #2c3e50); }
.fallback-bg.snow { background: linear-gradient(to bottom, #83a4d4, #b6fbff); }

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}
</style>