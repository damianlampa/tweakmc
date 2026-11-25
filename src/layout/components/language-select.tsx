import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/shared/i18n/i18n';

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  return (
    <select
      className="cursor-pointer [border:0] bg-transparent py-1 font-body text-sm text-muted"
      aria-label={t('common.language')}
      value={i18n.language}
      onChange={(event) => changeLanguage(event.target.value === 'en' ? 'en' : 'pl')}
    >
      <option className="bg-bg text-ink" value="pl" lang="pl">
        Polski
      </option>
      <option className="bg-bg text-ink" value="en" lang="en">
        English
      </option>
    </select>
  );
}
