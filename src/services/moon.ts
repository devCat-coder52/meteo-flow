import dayjs from "../utils/dayjs";

interface MoonPhaseData {
  phase: string;
  illumination: number;
  icon: string;
  description: string;
}

export class MoonService {
  static getMoonPhase(date: dayjs.Dayjs): MoonPhaseData {
    const epoch = dayjs("2000-01-06");
    const lunarCycle = 29.53;

    const daysSinceEpoch = date.diff(epoch, "day");
    const lunation = (daysSinceEpoch % lunarCycle) / lunarCycle;

    let phaseName = "";
    let description = "";
    let icon = "";

    if (lunation < 0.0625 || lunation >= 0.9375) {
      phaseName = "new_moon";
      description = "Новолуние";
      icon = "🌑";
    } else if (lunation < 0.1875) {
      phaseName = "waxing_crescent";
      description = "Молодая луна";
      icon = "🌒";
    } else if (lunation < 0.3125) {
      phaseName = "first_quarter";
      description = "Первая четверть";
      icon = "🌓";
    } else if (lunation < 0.4375) {
      phaseName = "waxing_gibbous";
      description = "Прибывающая луна";
      icon = "🌔";
    } else if (lunation < 0.5625) {
      phaseName = "full_moon";
      description = "Полнолуние";
      icon = "🌕";
    } else if (lunation < 0.6875) {
      phaseName = "waning_gibbous";
      description = "Убывающая луна";
      icon = "🌖";
    } else if (lunation < 0.8125) {
      phaseName = "last_quarter";
      description = "Последняя четверть";
      icon = "🌗";
    } else {
      phaseName = "waning_crescent";
      description = "Старая луна";
      icon = "🌘";
    }

    const illumination = Math.round(Math.abs(0.5 - lunation) * 200);
    return {
      phase: phaseName,
      illumination,
      icon,
      description,
    };
  }

  static getMoonPhasesForRange(
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ): Record<string, MoonPhaseData> {
    const phases: Record<string, MoonPhaseData> = {};
    let currentDate = startDate.startOf("day");

    while (currentDate.isSameOrBefore(endDate)) {
      const dateStr = currentDate.format("YYYY-MM-DD");
      phases[dateStr] = MoonService.getMoonPhase(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    return phases;
  }
}
