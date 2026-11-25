import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
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
    <section
      className={
        'relative min-h-[100svh] ' +
        '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden ' +
        '[background:radial-gradient(620px_380px_at_85%_20%,_rgba(var(--accent-rgb),_0.12),_transparent_72%),_var(--bg)] ' +
        'admin-login-page'
      }
    >
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="ADMIN // AUTH"
        labelRight="TWEAKMC.PL"
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <form
          className="max-w-[480px] m-[clamp(28px,_7vh,_72px)_auto] p-[clamp(24px,_4vw,_38px)] rounded-[18px] [border:1px_solid_var(--line-strong)] bg-bg-elev grid gap-[18px] [&_h1]:text-3xl/tight"
          onSubmit={handleLogin}
        >
          <Link
            to={paths.home}
            className="inline-flex items-center min-h-[36px] text-sm/relaxed font-medium text-muted no-underline [transition:color_0.2s] hover:text-accent-bright"
          >
            {t('login.back')}
          </Link>
          <h1>{t('login.title')}</h1>
          <p className="mt-4 max-w-[58ch] text-muted text-base/relaxed">{t('login.description')}</p>

          <div className="[&_label]:text-sm/relaxed [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
            <label htmlFor="admin-pin">{t('login.password')}</label>
            <div
              className={classes(
                'flex items-center gap-[12px] p-[6px_14px_6px_8px] rounded-[12px] [border:1px_solid_var(--line-strong)] ' +
                  'bg-surface [transition:border-color_0.2s] focus-within:[border-color:var(--accent-bright)] ' +
                  '[&.has-error]:[border-color:var(--war)] [&_input]:w-full [&_input]:min-h-[42px] [&_input]:bg-transparent ' +
                  '[&_input]:[border:0] [&_input]:text-ink [&_input]:font-display [&_input]:font-semibold [&_input]:text-base/none ' +
                  '[&_input]:[outline:none] [&_input::placeholder]:text-muted [&_input::placeholder]:font-normal ' +
                  '[&_input::placeholder]:font-body',
                pinErr ? 'has-error' : '',
              )}
            >
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
            {pinErr && <p className="text-sm/relaxed [color:#fca5a5]">{t(pinErr)}</p>}
          </div>

          <button
            type="submit"
            className={buttonClasses(
              'primary',
              'pay-submit w-full min-h-[54px] text-base/none whitespace-normal text-center py-2.5',
            )}
          >
            {t('login.submit')}
          </button>
          <p className="text-sm/relaxed text-muted">
            {t('login.demo')}
            <code className="code-label">{DEMO_PIN}</code>
            {t('login.production')}
          </p>
        </form>
      </div>
    </section>
  );
}
