import { useTranslation } from 'react-i18next';
import { site } from '@/shared/config/site';
import { useCopied } from '../hooks/use-copy-ip';

export function CopyStatus() {
  const { t } = useTranslation();
  const copied = useCopied();

  return (
    <p className="sr-only m-0" role="status" aria-live="polite">
      {copied ? t('nav.copiedAddress', { ip: site.serverIpCopy }) : ''}
    </p>
  );
}
