import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/shared/i18n/i18n';

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  return (
    <select
      className="language-select"
      aria-label={t('common.language')}
      value={i18n.language}
      onChange={(event) => changeLanguage(event.target.value === 'en' ? 'en' : 'pl')}
    >
      <option value="pl" lang="pl">
        Polski
      </option>
      <option value="en" lang="en">
        English
      </option>
    </select>
  );
}
