import { site } from '@/shared/config/site';

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
