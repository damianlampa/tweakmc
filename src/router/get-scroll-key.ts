import type { Location } from 'react-router';

export function getScrollKey({ key, pathname, search, hash }: Location) {
  // Fresh document loads share the key "default", even at different URLs.
  return key === 'default' ? pathname + search + hash : key;
}
