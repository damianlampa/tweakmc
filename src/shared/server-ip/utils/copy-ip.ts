import { site } from '@/shared/config/site';

const copiedListeners = new Set<(copied: boolean) => void>();

let copyTimer: ReturnType<typeof setTimeout> | undefined;

export async function copyIp() {
  try {
    await navigator.clipboard.writeText(site.serverIpCopy);
  } catch {
    const t = document.createElement('textarea');
    t.value = site.serverIpCopy;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  copiedListeners.forEach((fn) => fn(true));
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copiedListeners.forEach((fn) => fn(false));
  }, 2400);
}

export function subscribeToCopy(listener: (copied: boolean) => void) {
  copiedListeners.add(listener);
  return () => {
    copiedListeners.delete(listener);
  };
}
