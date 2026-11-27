import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/shared/i18n/i18n';

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  return (
    <select
      className="cursor-pointer [border:0] bg-transparent py-1 font-body text-sm text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted"
      aria-label={t('common.language')}
      value={i18n.language}
      onChange={(event) => changeLanguage(event.target.value === 'en' ? 'en' : 'pl')}
    >
      <option
        className="bg-background christmas:bg-christmas-background halloween:bg-halloween-background spring:bg-spring-background text-ink"
        value="pl"
        lang="pl"
      >
        Polski
      </option>
      <option
        className="bg-background christmas:bg-christmas-background halloween:bg-halloween-background spring:bg-spring-background text-ink"
        value="en"
        lang="en"
      >
        English
      </option>
    </select>
  );
}
