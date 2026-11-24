import { useEffect, useRef, useState } from 'react';

export function useAdminToast() {
  const [message, setMessage] = useState('');
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const showToast = (nextMessage: string) => {
    window.clearTimeout(timeout.current);
    setMessage(nextMessage);
    timeout.current = window.setTimeout(() => setMessage(''), 2600);
  };

  return { message, showToast };
}
