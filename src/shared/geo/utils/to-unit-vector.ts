export function toUnitVector(lat: number, lon: number) {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;

  return [Math.cos(la) * Math.cos(lo), Math.sin(la), -Math.cos(la) * Math.sin(lo)];
}
