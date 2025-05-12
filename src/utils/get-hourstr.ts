export default function getHourstr(hour: number): "새벽" | "오전" | "오후" | "저녁" | "밤" {
  const h = ((hour % 24) + 24) % 24;

  if (h < 6) return '새벽';
  if (h < 12) return '오전';
  if (h < 18) return '오후';
  if (h < 21) return '저녁';
  return '밤';
}