export function optimisticDelete<T extends { id: string }>(array: T[] = [], idRemove: string): T[] {
  return array.filter((item) => item.id !== idRemove);
}
