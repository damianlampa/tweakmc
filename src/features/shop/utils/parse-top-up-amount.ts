export function parseTopUpAmount(value: string, min: number, max: number): number | null {
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(value)) return null;

  const amount = Number(value.replace(',', '.'));

  return amount >= min && amount <= max ? amount : null;
}
