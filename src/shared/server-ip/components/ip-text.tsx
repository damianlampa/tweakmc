import { classes } from '@/shared/utils/classes';
import { site } from '@/shared/config/site';

export function IpText({ className = '' }) {
  const handleManualCopy = (e: React.ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.clipboardData?.setData('text/plain', site.serverIpCopy);
  };

  return (
    <span
      className={classes('font-display font-bold tracking-[-0.02em] whitespace-nowrap', className)}
      onCopy={handleManualCopy}
    >
      <span className="text-ink">{site.serverIpName}</span>
      <span className="text-accent-bright">{site.serverIpTld}</span>
    </span>
  );
}
