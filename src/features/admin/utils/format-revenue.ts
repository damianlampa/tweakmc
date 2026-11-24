export function formatRevenue(val: number, language: string) {
  return (
    Number(val || 0).toLocaleString(language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' PLN'
  );
}
