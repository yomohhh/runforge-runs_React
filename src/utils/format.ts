const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Дата не указана"
    : dateFormatter.format(date);
}

export function formatDuration(seconds?: number): string {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0)
    return "—";
  const total = Math.floor(seconds);
  if (total < 60) return `${total} с`;
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return remainder ? `${minutes} мин ${remainder} с` : `${minutes} мин`;
}
