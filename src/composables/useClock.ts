import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "../utils/dayjs";

export function useClock() {
  const currentTime = ref(dayjs());
  let intervalId: number | null = null;

  const updateTime = () => {
    currentTime.value = dayjs();
  };

  onMounted(() => {
    updateTime();
    intervalId = window.setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return {
    currentTime,
  };
}
