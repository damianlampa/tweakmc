import { site } from '@/shared/config/site';
import { copyIp, useCopied } from './hooks/use-copy-ip';
import { Icon } from '@/shared/components/icons';

export function IpText({ className = '' }) {
  const handleManualCopy = (e: React.ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.clipboardData?.setData('text/plain', site.serverIpCopy);
  };
  return (
    <span className={`ip-brand ${className}`} onCopy={handleManualCopy}>
      <span className="tw-text-ink">{site.serverIpName}</span>
      <span className="tw-text-accent-bright">{site.serverIpTld}</span>
    </span>
  );
}

export function IpBar({ id, compact = false }: { id?: string; compact?: boolean }) {
  const copied = useCopied();
  return (
    <div className={`ip-bar ${compact ? 'ip-bar-compact' : ''} ${copied ? 'is-copied' : ''}`}>
      <IpText className="ip-bar-text" />
      <button type="button" id={id} className="btn btn-primary" onClick={copyIp}>
        {copied ? Icon.check : Icon.copy}
        <span>{copied ? 'Skopiowano' : 'Skopiuj IP'}</span>
      </button>
    </div>
  );
}

export function CopyStatus() {
  const copied = useCopied();
  return (
    <p className="sr-only" role="status" aria-live="polite">
      {copied ? `Skopiowano adres ${site.serverIpCopy}` : ''}
    </p>
  );
}
