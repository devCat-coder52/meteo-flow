import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import minMax from "dayjs/plugin/minMax"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import dayOfYear from "dayjs/plugin/dayOfYear"
import utc from "dayjs/plugin/utc"

dayjs.locale("ru")
dayjs.extend(utc)
dayjs.extend(minMax)
dayjs.extend(isSameOrBefore)
dayjs.extend(dayOfYear)

export default dayjs
