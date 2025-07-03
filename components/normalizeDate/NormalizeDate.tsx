export const NormalizeDate = (date: string | Date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return ''; // invalid date
  return d.toLocaleDateString('en-CA');
};
