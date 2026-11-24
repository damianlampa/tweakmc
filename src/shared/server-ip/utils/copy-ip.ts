import { site } from '@/shared/config/site';

const copiedListeners = new Set<(copied: boolean) => void>();

let copyTimer: ReturnType<typeof setTimeout> | undefined;

function copyWithSelection() {
  const previousFocus = document.activeElement;
  const input = document.createElement('textarea');
  input.value = site.serverIpCopy;
  input.readOnly = true;
  input.style.position = 'fixed';
  document.body.appendChild(input);

  try {
    input.select();
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    input.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  }
}

export async function copyIp() {
  let copied = true;

  try {
    await navigator.clipboard.writeText(site.serverIpCopy);
  } catch {
    copied = copyWithSelection();
  }

  clearTimeout(copyTimer);
  copiedListeners.forEach((listener) => listener(copied));

  if (copied) {
    copyTimer = setTimeout(() => {
      copiedListeners.forEach((listener) => listener(false));
    }, 2400);
  }

  return copied;
}

export function subscribeToCopy(listener: (copied: boolean) => void) {
  copiedListeners.add(listener);
  return () => {
    copiedListeners.delete(listener);
  };
}
