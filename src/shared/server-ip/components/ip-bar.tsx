import { Icon } from '@/shared/components/icons';
import { copyIp } from '../utils/copy-ip';
import { useCopied } from '../hooks/use-copy-ip';
import { IpText } from './ip-text';

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
