export function optimisticUpdate<T extends { id: string }>(array: T[] = [], newItem: T): T[] {
  return array.map((item) => (item.id === newItem.id ? newItem : item));
}
