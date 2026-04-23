// @ts-ignore
import dayjs from "dayjs";

export function toDayjs(date: Date | string | number): dayjs.Dayjs {
  return dayjs(date);
}

/** 格式化日期 */
export function formatDate(date: Date | string | number, format = "YYYY-MM-DD HH:mm"): string | null {
  if (!date) return null;
  return dayjs(date).format(format);
}

/** 是否合法日期 */
export function isValidDate(date: Date | string | number): boolean {
  return dayjs(date).isValid();
}
