import { site } from '@/shared/config/site';
import { useCopied } from '../hooks/use-copy-ip';

export function CopyStatus() {
  const copied = useCopied();

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {copied ? `Skopiowano adres ${site.serverIpCopy}` : ''}
    </p>
  );
}
