const FormatRupiah = (value: number): string => {
  if (value == null || isNaN(value)) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export default FormatRupiah;
