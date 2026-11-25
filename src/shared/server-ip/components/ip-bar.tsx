import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/components/icons';
import { useCopyIp } from '../hooks/use-copy-ip';
import { IpText } from './ip-text';

export function IpBar({ id, compact = false }: { id?: string; compact?: boolean }) {
  const { t } = useTranslation();

  const { copied, handleCopy } = useCopyIp();

  return (
    <div
      className={classes(
        'ip-bar inline-flex items-center p-[5px_5px_5px_20px] gap-[16px] bg-surface ' +
          '[border:1px_solid_var(--line-strong)] rounded-[12px] [transition:border-color_0.25s] ' +
          '[&.is-copied]:[border-color:var(--accent-bright)] [.foot-ip_&]:p-[4px_4px_4px_16px] ' +
          '[.foot-ip_&]:gap-[12px] max-sm:w-full max-sm:justify-between',
        compact ? 'ip-bar-compact' : '',
        copied ? 'is-copied' : '',
      )}
    >
      <IpText className="ip-bar-text text-[1.18rem] !tracking-[-0.015em] [.foot-ip_&]:text-[1rem]" />
      <button type="button" id={id} className={buttonClasses('primary')} onClick={handleCopy}>
        {copied ? Icon.check : Icon.copy}
        <span>{copied ? t('nav.copied') : t('nav.copy')}</span>
      </button>
    </div>
  );
}
