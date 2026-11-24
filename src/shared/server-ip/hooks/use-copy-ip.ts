import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { site } from '@/shared/config/site';
import { copyIp, subscribeToCopy } from '../utils/copy-ip';

export function useCopied() {
  const [copied, setCopied] = useState(false);

  useEffect(() => subscribeToCopy(setCopied), []);

  return copied;
}

export function useCopyIp() {
  const { t } = useTranslation();
  const copied = useCopied();

  const handleCopy = async () => {
    if (!(await copyIp())) {
      window.prompt(t('nav.copyManually'), site.serverIpCopy);
    }
  };

  return { copied, handleCopy };
}
