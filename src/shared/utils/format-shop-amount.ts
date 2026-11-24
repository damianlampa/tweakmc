export function formatPln(value: number, language: string) {
  return (
    value.toLocaleString(language, {
      useGrouping: false,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' PLN'
  );
}
