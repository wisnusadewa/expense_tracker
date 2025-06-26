export function ensureArray<T>(value: unknown) {
  return Array.isArray(value) ? value : [];
}
