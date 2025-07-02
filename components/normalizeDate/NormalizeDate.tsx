export const NormalizeDate = (date: string | Date) => {
  return new Date(date).toISOString().slice(0, 10); // jadi format: '2025-07-01'
};
