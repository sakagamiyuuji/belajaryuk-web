export function formatLikes(count: number): string {
  if (count > 999) {
    const k = count / 1000;
    const rounded = k >= 10 ? Math.round(k) : Math.round(k * 10) / 10;
    return `${rounded}K`;
  }
  return count.toLocaleString('id-ID');
}
