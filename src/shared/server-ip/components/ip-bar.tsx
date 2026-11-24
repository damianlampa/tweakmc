import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/components/icons';
import { useCopyIp } from '../hooks/use-copy-ip';
import { IpText } from './ip-text';

export function IpBar({ id, compact = false }: { id?: string; compact?: boolean }) {
  const { t } = useTranslation();

  const { copied, handleCopy } = useCopyIp();

  return (
    <div className={`ip-bar ${compact ? 'ip-bar-compact' : ''} ${copied ? 'is-copied' : ''}`}>
      <IpText className="ip-bar-text" />
      <button type="button" id={id} className="btn btn-primary" onClick={handleCopy}>
        {copied ? Icon.check : Icon.copy}
        <span>{copied ? t('nav.copied') : t('nav.copy')}</span>
      </button>
    </div>
  );
}
