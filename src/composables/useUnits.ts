import { ref, computed } from "vue";
import { useWeatherStore } from "@/stores/weather.store";

export type UnitType = "metric" | "imperial";

interface UnitOption {
  icon: string;
  value: UnitType;
}

export function useUnits() {
  const unit = ref<UnitType>(
    (localStorage.getItem("meteoflow_unit") as UnitType) || "metric"
  );

  const store = useWeatherStore();

  const options: UnitOption[] = [
    { icon: "℉", value: "imperial" },
    { icon: "℃", value: "metric" },
  ];

  const setUnit = async (newUnit: UnitType) => {
    unit.value = newUnit;
    localStorage.setItem("meteoflow_unit", newUnit);
    await store.loadWeatherAndForecast();
  };

  return {
    unit,
    options,
    setUnit,
  };
}
