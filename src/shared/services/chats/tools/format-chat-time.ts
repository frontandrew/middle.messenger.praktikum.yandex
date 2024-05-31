const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export function formatChatTime(date: Date): string {
  const dayOfMonth = date.getDate().toString();
  const dayOfWeek = days[date.getDay()];

  return `${dayOfMonth} ${dayOfWeek}`;
}
