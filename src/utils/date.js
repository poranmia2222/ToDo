import { differenceInCalendarDays, format, parseISO } from "date-fns";

/* Today as a `yyyy-MM-dd` string, matching <input type="date"> values. */
export const todayISO = () => format(new Date(), "yyyy-MM-dd");

/*
  Turn a stored `yyyy-MM-dd` date into friendly, display-ready metadata.
  Returns null when there is no (valid) date on the task.
*/
export function dueMeta(dateStr) {
  if (!dateStr) return null;

  const date = parseISO(dateStr);
  if (Number.isNaN(date.getTime())) return null;

  const diff = differenceInCalendarDays(date, new Date());

  let relative;
  if (diff < 0) relative = "Overdue";
  else if (diff === 0) relative = "Today";
  else if (diff === 1) relative = "Tomorrow";
  else relative = format(date, "EEE, MMM d");

  return {
    date,
    diff,
    relative,
    short: format(date, "MMM d"),
    isOverdue: diff < 0,
    isToday: diff === 0,
    isTomorrow: diff === 1,
  };
}

/* Text color classes for a due date, based on urgency. */
export function dueToneClass(meta) {
  if (!meta) return "text-base-content/60";
  if (meta.isOverdue) return "text-error font-medium";
  if (meta.isToday) return "text-warning font-medium";
  return "text-base-content/60";
}

/* "Good morning" based on the current hour. */
export function greetingForHour(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
