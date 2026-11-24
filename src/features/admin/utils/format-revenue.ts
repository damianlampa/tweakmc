export function formatRevenue(val: number) {
  return (
    Number(val || 0).toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' PLN'
  );
}
