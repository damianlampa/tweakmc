import { useEffect, useRef, useState } from 'react';

type MapStatus = 'loading' | 'ready' | 'unavailable';

export function useDynmapFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<MapStatus>('loading');

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: MutationObserver | undefined;
    let timer: number;

    const stopWaiting = () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };

    const finish = (result: MapStatus) => {
      stopWaiting();
      setStatus(result);
    };

    const inspectMap = () => {
      stopWaiting();
      const container = frame.contentDocument?.getElementById('mcmap');
      if (!container) {
        finish('unavailable');
        return;
      }

      const checkReady = () => {
        if (container.querySelector('.leaflet-map-pane')) finish('ready');
      };

      setStatus('loading');
      observer = new MutationObserver(checkReady);
      observer.observe(container, { childList: true, subtree: true });
      timer = window.setTimeout(() => finish('unavailable'), 15000);
      checkReady();
    };

    timer = window.setTimeout(() => finish('unavailable'), 15000);
    frame.addEventListener('load', inspectMap);
    const doc = frame.contentDocument;
    if (doc?.readyState === 'complete' && doc.URL !== 'about:blank') inspectMap();

    return () => {
      stopWaiting();
      frame.removeEventListener('load', inspectMap);
    };
  }, [attempt]);

  const reload = () => {
    setStatus('loading');
    setAttempt((previous) => previous + 1);
  };

  return { attempt, frameRef, status, reload };
}
