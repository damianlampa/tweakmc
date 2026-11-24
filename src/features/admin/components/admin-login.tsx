import { useTranslation } from 'react-i18next';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import type { Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';

const DEMO_PIN = 'tweakmc2026';

export function AdminLogin({ settings, onLogin }: { settings: Settings; onLogin: () => void }) {
  const { t } = useTranslation();

  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin.trim() === DEMO_PIN) {
      onLogin();
    } else {
      setPinErr('login.invalid');
    }
  };

  return (
    <section className="page-shell sec-dark admin-login-page">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="ADMIN // AUTH"
        labelRight="TWEAKMC.PL"
      />

      <div className="wrap">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <Link to={paths.home} className="back-link">
            {t('login.back')}
          </Link>
          <h1>{t('login.title')}</h1>
          <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
            {t('login.description')}
          </p>

          <div className="field tw-grid tw-gap-[10px]">
            <label htmlFor="admin-pin">{t('login.password')}</label>
            <div className={`nick-wrap ${pinErr ? 'has-error' : ''}`}>
              <input
                id="admin-pin"
                type="password"
                placeholder={t('login.placeholder')}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (pinErr) setPinErr('');
                }}
              />
            </div>
            {pinErr && <p className="field-error">{t(pinErr)}</p>}
          </div>

          <button type="submit" className="btn btn-primary pay-submit">
            {t('login.submit')}
          </button>
          <p className="tw-text-[0.82rem] tw-text-muted">
            {t('login.demo')}
            <code className="inline-code">{DEMO_PIN}</code>
            {t('login.production')}
          </p>
        </form>
      </div>
    </section>
  );
}
