export function formatPln(val: number) {
  return (
    Number(val || 0)
      .toFixed(2)
      .replace('.', ',') + ' PLN'
  );
}
