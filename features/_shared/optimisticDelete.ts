export function optimisticDelete<T extends { id: number | string }>(array: T[] = [], idRemove: string | number): T[] {
  return array.filter((item) => item.id !== idRemove);
}
