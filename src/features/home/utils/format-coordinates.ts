export function formatCoordinates(lat: number, lon: number) {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'W';

  return `${Math.abs(Math.round(lat))}°${ns} ${Math.abs(Math.round(lon))}°${ew}`;
}
