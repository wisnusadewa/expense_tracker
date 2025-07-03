export function optimisticUpdate<T extends { id: string | number }>(array: T[] = [], newItem: T): T[] {
  return array.map((item) => (item.id === newItem.id ? newItem : item));
}
