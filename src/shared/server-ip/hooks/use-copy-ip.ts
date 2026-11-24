import { useEffect, useState } from 'react';
import { subscribeToCopy } from '../utils/copy-ip';

export function useCopied() {
  const [copied, setCopied] = useState(false);

  useEffect(() => subscribeToCopy(setCopied), []);

  return copied;
}
