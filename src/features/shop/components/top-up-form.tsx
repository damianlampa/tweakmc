import { cardSpotlight } from '@/shared/styles/background-classes';
import { buttonClasses } from '@/shared/components/button-classes';
import { CodeLabel } from '@/shared/components/code-label';
import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { site } from '@/shared/config/site';
import { NICK_RE } from '@/shared/utils/player-name';
import { formatPln } from '@/shared/utils/format-shop-amount';
import { Icon as icons } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { parseTopUpAmount } from '../utils/parse-top-up-amount';
import { useWalletBalance } from '../hooks/use-wallet-balance';
import { useStripeCheckout } from '../hooks/use-stripe-checkout';

export function TopUpForm() {
  const { t, i18n } = useTranslation();

  const [nick, setNick] = useState('');
  const [amountText, setAmountText] = useState('25');
  const [avatarErr, setAvatarErr] = useState(false);
  const { startCheckout, submitting } = useStripeCheckout();
  const [error, setError] = useState<'nick' | 'amount' | 'checkout' | null>(null);
  const [checkoutNotice, setCheckoutNotice] = useState<{ nick: string; amount: number } | null>(
    null,
  );

  const trimmedNick = nick.trim();
  const validNick = NICK_RE.test(trimmedNick);
  const amount = parseTopUpAmount(amountText, site.shopMin, site.shopMax);
  const formattedAmount = amount === null ? '-' : formatPln(amount, i18n.language);

  const wallet = useWalletBalance(trimmedNick);

  const changeAmount = (value: string) => {
    setAmountText(value);
    setCheckoutNotice(null);
    if (error !== 'nick') setError(null);
  };

  const stepAmount = (step: number) => {
    const next = Math.min(site.shopMax, Math.max(site.shopMin, (amount ?? site.shopMin) + step));
    changeAmount(String(Number(next.toFixed(2))));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    setCheckoutNotice(null);

    if (!validNick || amount === null) {
      setError(validNick ? 'amount' : 'nick');
      return;
    }

    setError(null);
    startCheckout(
      { nick: trimmedNick, amount },
      {
        onSuccess(result, input) {
          if (result.mode === 'live') {
            window.location.assign(result.checkoutUrl);
            return;
          }

          setCheckoutNotice(input);
        },
        onError: () => setError('checkout'),
      },
    );
  };

  const currentBalText =
    wallet.status === 'loading'
      ? t('checkout.checking')
      : wallet.status === 'connected'
        ? formatPln(wallet.balance, i18n.language)
        : validNick
          ? t('checkout.unavailable')
          : '—';

  const afterBalText =
    amount === null
      ? '-'
      : wallet.status === 'connected'
        ? formatPln(wallet.balance + amount, i18n.language)
        : `+${formattedAmount}`;

  return (
    <form
      className="[align-items:start] grid grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] gap-[24px] max-lg:grid-cols-[minmax(0,_1fr)] mt-0"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset
        className={
          'min-w-0 p-[clamp(22px,_3.2vw,_36px)] rounded-[18px] [border:1px_solid_theme(colors.purple.400/26%)] ' +
          'christmas:[border:1px_solid_theme(colors.sky.300/26%)] halloween:[border:1px_solid_theme(colors.orange.300/26%)] ' +
          'spring:[border:1px_solid_theme(colors.emerald.300/26%)] ' +
          '[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.purple.600/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.purple.600/10%)_0%,_theme(colors.background)_56%,_theme(colors.purple.600/8%)_100%_)] ' +
          'christmas:[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.sky.500/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.sky.500/10%)_0%,_theme(colors.christmas.background)_56%,_theme(colors.sky.500/8%)_100%_)] ' +
          'halloween:[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.orange.600/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.orange.600/10%)_0%,_theme(colors.halloween.background)_56%,_theme(colors.orange.600/8%)_100%_)] ' +
          'spring:[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.emerald.500/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.emerald.500/10%)_0%,_theme(colors.spring.background)_56%,_theme(colors.emerald.500/8%)_100%_)] ' +
          '[box-shadow:inset_0_1px_0_theme(colors.purple.400/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          'christmas:[box-shadow:inset_0_1px_0_theme(colors.sky.300/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          'halloween:[box-shadow:inset_0_1px_0_theme(colors.orange.300/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          'spring:[box-shadow:inset_0_1px_0_theme(colors.emerald.300/24%),_0_24px_56px_-28px_theme(colors.black/85%)] grid ' +
          "gap-[28px] relative [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 " +
          '[&::before]:rounded-[inherit] ' +
          cardSpotlight +
          ' ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)] ' +
          'm-0'
        }
        disabled={submitting}
        onPointerMove={onCardMove}
      >
        <div className="[&_label]:text-sm/relaxed [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
          <label htmlFor="shop-nick">{t('checkout.username')}</label>
          <div
            className={classes(
              'flex items-center gap-[12px] p-[6px_14px_6px_8px] rounded-[12px] [border:1px_solid_theme(colors.white/18%)] ' +
                'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface [transition:border-color_0.2s] ' +
                'focus-within:border-purple-400 christmas:focus-within:border-sky-300 halloween:focus-within:border-orange-300 spring:focus-within:border-emerald-300 ' +
                '[&.has-error]:border-red-500 [&_input]:w-full [&_input]:min-h-[42px] [&_input]:bg-transparent ' +
                '[&_input]:[border:0] [&_input]:text-ink [&_input]:font-display [&_input]:font-semibold [&_input]:text-base/none ' +
                '[&_input]:[outline:none] [&_input::placeholder]:text-muted christmas:[&_input::placeholder]:text-christmas-muted ' +
                'halloween:[&_input::placeholder]:text-halloween-muted spring:[&_input::placeholder]:text-spring-muted [&_input::placeholder]:font-normal ' +
                '[&_input::placeholder]:font-body',
              error === 'nick' ? 'has-error' : '',
            )}
          >
            <div
              className={
                'w-[40px] h-[40px] shrink-0 rounded-[8px] bg-background christmas:bg-christmas-background halloween:bg-halloween-background ' +
                'spring:bg-spring-background [border:1px_solid_theme(colors.white/9%)] grid place-items-center text-muted christmas:text-christmas-muted ' +
                'halloween:text-halloween-muted spring:text-spring-muted overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:[image-rendering:pixelated]'
              }
              aria-hidden="true"
            >
              {validNick && !avatarErr ? (
                <img
                  src={`https://mc-heads.net/avatar/${encodeURIComponent(trimmedNick)}/48`}
                  alt=""
                  width="36"
                  height="36"
                  onError={() => setAvatarErr(true)}
                />
              ) : (
                icons.user
              )}
            </div>
            <input
              id="shop-nick"
              type="text"
              maxLength={16}
              autoComplete="off"
              aria-invalid={error === 'nick'}
              aria-describedby={error === 'nick' ? 'shop-nick-error' : undefined}
              spellCheck={false}
              placeholder={t('checkout.placeholder')}
              value={nick}
              onChange={(e) => {
                const value = e.target.value;
                setNick(value);
                setAvatarErr(false);
                if (error !== 'amount') setError(null);
                if (checkoutNotice) setCheckoutNotice(null);
              }}
            />
          </div>
          {error === 'nick' && (
            <p id="shop-nick-error" className="text-sm/relaxed text-red-300" role="alert">
              {t('checkout.invalid')}
            </p>
          )}
        </div>

        <div className="[&_label]:text-sm/relaxed [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
          <span className="text-sm/relaxed font-semibold text-ink">{t('checkout.quick')}</span>
          <div
            className="grid max-sm:grid-cols-2 grid-cols-[repeat(4,_minmax(0,_1fr))] gap-2.5"
            role="group"
            aria-label={t('checkout.presets')}
          >
            {site.shopAmounts.map((presetAmount) => {
              return (
                <button
                  key={presetAmount}
                  type="button"
                  className={classes(
                    'preset-btn flex items-baseline justify-center gap-[5px] min-h-[56px] p-[12px_8px] rounded-[10px] ' +
                      '[border:1px_solid_theme(colors.white/18%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface text-ink cursor-pointer ' +
                      '[transition:border-color_0.2s,_background-color_0.2s,_transform_0.2s_var(--ease)] ' +
                      'hover:border-purple-400/55 christmas:hover:border-sky-300/55 halloween:hover:border-orange-300/55 spring:hover:border-emerald-300/55 ' +
                      'hover:bg-surface-hover christmas:hover:bg-christmas-surface-hover halloween:hover:bg-halloween-surface-hover spring:hover:bg-spring-surface-hover ' +
                      'hover:[transform:translateY(-2px)] ' +
                      '[&.is-active]:[background:linear-gradient(135deg,var(--tw-gradient-stops))] ' +
                      'from-0% via-[58%] to-100% ' +
                      'from-purple-600 via-purple-500 to-purple-400 ' +
                      'christmas:from-sky-600 christmas:via-sky-500 christmas:to-sky-300 ' +
                      'halloween:from-orange-600 halloween:via-orange-500 halloween:to-orange-300 ' +
                      'spring:from-emerald-600 spring:via-emerald-500 spring:to-emerald-300 ' +
                      '[&.is-active]:border-white/35 ' +
                      '[&.is-active]:[box-shadow:0_12px_28px_-8px_theme(colors.purple.600/80%)] ' +
                      'christmas:[&.is-active]:[box-shadow:0_12px_28px_-8px_theme(colors.sky.500/80%)] ' +
                      'halloween:[&.is-active]:[box-shadow:0_12px_28px_-8px_theme(colors.orange.600/80%)] ' +
                      'spring:[&.is-active]:[box-shadow:0_12px_28px_-8px_theme(colors.emerald.500/80%)] [&_strong]:font-display ' +
                      '[&_strong]:text-2xl/tight [&_strong]:[font-variant-numeric:tabular-nums] [&_span]:text-xs/relaxed ' +
                      '[&_span]:text-muted christmas:[&_span]:text-christmas-muted halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted ' +
                      '[&_span]:font-semibold [&.is-active_span]:text-white/90',
                    amount === presetAmount ? 'is-active' : '',
                  )}
                  onClick={() => changeAmount(String(presetAmount))}
                >
                  <strong>{presetAmount}</strong>
                  <span>PLN</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="[&_label]:text-sm/relaxed [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="shop-amount">
              {t('checkout.custom')}
              {site.shopMin}–{site.shopMax} PLN)
            </label>
            <div className="inline-flex gap-[6px]">
              <button
                type="button"
                className={
                  'step-btn min-w-[44px] min-h-[36px] px-2.5 py-0 rounded-[8px] [border:1px_solid_theme(colors.white/18%)] ' +
                  'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface text-ink font-mono font-semibold text-sm/none cursor-pointer ' +
                  '[transition:background-color_0.2s,_border-color_0.2s] hover:bg-surface-hover christmas:hover:bg-christmas-surface-hover ' +
                  'halloween:hover:bg-halloween-surface-hover spring:hover:bg-spring-surface-hover ' +
                  'hover:border-purple-400 christmas:hover:border-sky-300 halloween:hover:border-orange-300 spring:hover:border-emerald-300'
                }
                onClick={() => stepAmount(-5)}
                aria-label={t('checkout.decrease')}
              >
                −5
              </button>
              <button
                type="button"
                className={
                  'step-btn min-w-[44px] min-h-[36px] px-2.5 py-0 rounded-[8px] [border:1px_solid_theme(colors.white/18%)] ' +
                  'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface text-ink font-mono font-semibold text-sm/none cursor-pointer ' +
                  '[transition:background-color_0.2s,_border-color_0.2s] hover:bg-surface-hover christmas:hover:bg-christmas-surface-hover ' +
                  'halloween:hover:bg-halloween-surface-hover spring:hover:bg-spring-surface-hover ' +
                  'hover:border-purple-400 christmas:hover:border-sky-300 halloween:hover:border-orange-300 spring:hover:border-emerald-300'
                }
                onClick={() => stepAmount(5)}
                aria-label={t('checkout.increase')}
              >
                +5
              </button>
            </div>
          </div>

          <div
            className={
              'flex items-center p-[4px_16px] rounded-[12px] [border:1px_solid_theme(colors.white/18%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface ' +
              'focus-within:border-purple-400 christmas:focus-within:border-sky-300 halloween:focus-within:border-orange-300 spring:focus-within:border-emerald-300 [&_input]:w-full [&_input]:min-h-[46px] ' +
              '[&_input]:bg-transparent [&_input]:[border:0] [&_input]:text-ink ' +
              '[&_input]:font-display [&_input]:font-bold [&_input]:text-2xl/none [&_input]:[font-variant-numeric:tabular-nums] ' +
              '[&_input]:[outline:none]'
            }
          >
            <input
              id="shop-amount"
              type="number"
              min={site.shopMin}
              max={site.shopMax}
              step="0.01"
              inputMode="decimal"
              aria-invalid={error === 'amount'}
              aria-describedby={error === 'amount' ? 'shop-amount-error' : undefined}
              value={amountText}
              onChange={(event) => changeAmount(event.target.value)}
            />
            <span className="font-mono text-sm/relaxed font-semibold text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
              PLN
            </span>
          </div>
          {error === 'amount' && (
            <p id="shop-amount-error" className="text-sm/relaxed text-red-300" role="alert">
              {t('checkout.invalidAmount', { min: site.shopMin, max: site.shopMax })}
            </p>
          )}
          <input
            type="range"
            className="w-full h-[6px] mt-[6px] accent-purple-500 christmas:accent-sky-500 halloween:accent-orange-500 spring:accent-emerald-500 cursor-pointer"
            min={site.shopMin}
            max={site.shopSliderMax}
            step={5}
            value={amount ?? site.shopMin}
            onChange={(event) => changeAmount(event.target.value)}
            aria-label={t('checkout.slider')}
          />
          <div
            className="flex justify-between mt-[2px] font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted"
            aria-hidden="true"
          >
            <span>{site.shopMin} PLN</span>
            <span>250 PLN</span>
            <span>500 PLN</span>
            <span>{site.shopSliderMax} PLN</span>
          </div>
        </div>
      </fieldset>

      <aside
        className={
          'min-w-0 p-[clamp(22px,_3.2vw,_36px)] rounded-[18px] [border:1px_solid_theme(colors.purple.400/26%)] ' +
          'christmas:[border:1px_solid_theme(colors.sky.300/26%)] halloween:[border:1px_solid_theme(colors.orange.300/26%)] ' +
          'spring:[border:1px_solid_theme(colors.emerald.300/26%)] ' +
          '[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.purple.600/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.purple.600/10%)_0%,_theme(colors.background)_56%,_theme(colors.purple.600/8%)_100%_)] ' +
          'christmas:[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.sky.500/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.sky.500/10%)_0%,_theme(colors.christmas.background)_56%,_theme(colors.sky.500/8%)_100%_)] ' +
          'halloween:[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.orange.600/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.orange.600/10%)_0%,_theme(colors.halloween.background)_56%,_theme(colors.orange.600/8%)_100%_)] ' +
          'spring:[background:radial-gradient(420px_280px_at_0%_0%,_theme(colors.emerald.500/22%),_transparent_68%),_linear-gradient(_150deg,_theme(colors.emerald.500/10%)_0%,_theme(colors.spring.background)_56%,_theme(colors.emerald.500/8%)_100%_)] ' +
          '[box-shadow:inset_0_1px_0_theme(colors.purple.400/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          'christmas:[box-shadow:inset_0_1px_0_theme(colors.sky.300/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          'halloween:[box-shadow:inset_0_1px_0_theme(colors.orange.300/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          'spring:[box-shadow:inset_0_1px_0_theme(colors.emerald.300/24%),_0_24px_56px_-28px_theme(colors.black/85%)] ' +
          '[background:radial-gradient(420px_280px_at_92%_0%,_theme(colors.purple.600/34%),_transparent_68%),_radial-gradient(360px_260px_at_8%_100%,_theme(colors.purple.400/16%),_transparent_70%),_linear-gradient(_160deg,_theme(colors.purple.600/14%)_0%,_theme(colors.background)_62%,_theme(colors.purple.600/12%)_100%_)] ' +
          'christmas:[background:radial-gradient(420px_280px_at_92%_0%,_theme(colors.sky.500/34%),_transparent_68%),_radial-gradient(360px_260px_at_8%_100%,_theme(colors.sky.300/16%),_transparent_70%),_linear-gradient(_160deg,_theme(colors.sky.500/14%)_0%,_theme(colors.christmas.background)_62%,_theme(colors.sky.500/12%)_100%_)] ' +
          'halloween:[background:radial-gradient(420px_280px_at_92%_0%,_theme(colors.orange.600/34%),_transparent_68%),_radial-gradient(360px_260px_at_8%_100%,_theme(colors.orange.300/16%),_transparent_70%),_linear-gradient(_160deg,_theme(colors.orange.600/14%)_0%,_theme(colors.halloween.background)_62%,_theme(colors.orange.600/12%)_100%_)] ' +
          'spring:[background:radial-gradient(420px_280px_at_92%_0%,_theme(colors.emerald.500/34%),_transparent_68%),_radial-gradient(360px_260px_at_8%_100%,_theme(colors.emerald.300/16%),_transparent_70%),_linear-gradient(_160deg,_theme(colors.emerald.500/14%)_0%,_theme(colors.spring.background)_62%,_theme(colors.emerald.500/12%)_100%_)] ' +
          "[&_h3]:text-2xl/tight [&_h3]:mb-[20px] relative [&::before]:[content:''] [&::before]:absolute " +
          '[&::before]:inset-0 [&::before]:rounded-[inherit] ' +
          cardSpotlight +
          ' ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]'
        }
        onPointerMove={onCardMove}
        aria-label={t('checkout.summaryLabel')}
      >
        <h3>{t('checkout.summary')}</h3>

        <dl
          className={
            'm-0 grid gap-[14px] pb-[20px] [border-bottom:1px_solid_theme(colors.white/9%)] [&_div]:flex [&_div]:items-center ' +
            '[&_div]:justify-between [&_div]:gap-[12px] [&_dt]:text-muted christmas:[&_dt]:text-christmas-muted halloween:[&_dt]:text-halloween-muted ' +
            'spring:[&_dt]:text-spring-muted [&_dt]:text-base/relaxed [&_dd]:m-0 ' +
            '[&_dd]:font-semibold [&_dd]:[font-variant-numeric:tabular-nums] [&_dd]:text-muted christmas:[&_dd]:text-christmas-muted ' +
            'halloween:[&_dd]:text-halloween-muted spring:[&_dd]:text-spring-muted [&_dd.is-set]:text-ink ' +
            '[&_dd.is-accent]:text-purple-400 christmas:[&_dd.is-accent]:text-sky-300 halloween:[&_dd.is-accent]:text-orange-300 spring:[&_dd.is-accent]:text-emerald-300'
          }
        >
          <div>
            <dt>{t('checkout.player')}</dt>
            <dd className={classes(validNick ? 'is-set' : '')}>
              {trimmedNick || t('checkout.missing')}
            </dd>
          </div>

          <div>
            <dt>
              {t('checkout.balance')}
              <CodeLabel>/portfel</CodeLabel>
            </dt>
            <dd className={classes(wallet.status === 'connected' ? 'is-set' : '')}>
              {currentBalText}
            </dd>
          </div>

          <div>
            <dt>{t('checkout.credit')}</dt>
            <dd className="is-accent">{afterBalText}</dd>
          </div>

          <div>
            <dt>{t('checkout.fee')}</dt>
            <dd className="is-set">{t('checkout.zero')}</dd>
          </div>
        </dl>

        <div
          className={
            'flex items-baseline justify-between [padding-block:20px_24px] [&_span]:text-base/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted ' +
            'halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted ' +
            '[&_strong]:font-display [&_strong]:text-3xl/tight [&_strong]:[font-variant-numeric:tabular-nums] ' +
            '[&_strong]:text-ink'
          }
        >
          <span>{t('checkout.total')}</span>
          <strong>{formattedAmount}</strong>
        </div>

        <button
          type="submit"
          className={buttonClasses(
            'primary',
            'pay-submit w-full min-h-[54px] text-base/none whitespace-normal text-center py-2.5',
          )}
          disabled={submitting}
        >
          {icons.lock}
          <span>
            {submitting
              ? t('checkout.connecting')
              : amount === null
                ? t('checkout.continue')
                : t('checkout.pay', { amount: formattedAmount })}
          </span>
        </button>

        {error === 'checkout' && (
          <p className="text-sm/relaxed text-red-300" role="alert">
            {t('checkout.failed')}
          </p>
        )}

        {checkoutNotice && (
          <p
            className={
              'mt-[14px] p-[12px_14px] rounded-[10px] [border:1px_solid_theme(colors.purple.400/45%)] christmas:[border:1px_solid_theme(colors.sky.300/45%)] ' +
              'halloween:[border:1px_solid_theme(colors.orange.300/45%)] spring:[border:1px_solid_theme(colors.emerald.300/45%)] bg-purple-600/[0.14] ' +
              'christmas:bg-sky-500/[0.14] halloween:bg-orange-600/[0.14] spring:bg-emerald-500/[0.14] text-ink text-sm/normal [overflow-wrap:anywhere]'
            }
            role="status"
          >
            {t('checkout.notice', {
              nick: checkoutNotice.nick,
              amount: formatPln(checkoutNotice.amount, i18n.language),
              endpoint: site.stripeCheckoutEndpoint,
            })}
          </p>
        )}

        <div
          className={
            'mt-[22px] pt-[18px] [border-top:1px_solid_theme(colors.white/9%)] [&>span]:block [&>span]:text-sm/relaxed [&>span]:text-muted ' +
            'christmas:[&>span]:text-christmas-muted halloween:[&>span]:text-halloween-muted spring:[&>span]:text-spring-muted [&>span]:mb-[10px]'
          }
        >
          <span>
            {t('checkout.pipeline')}
            <CodeLabel>/portfel</CodeLabel>)
          </span>
          <ul
            className={
              '[&_li]:p-[6px_10px] [&_li]:rounded-[7px] [&_li]:bg-surface christmas:[&_li]:bg-christmas-surface halloween:[&_li]:bg-halloween-surface ' +
              'spring:[&_li]:bg-spring-surface [&_li]:[border:1px_solid_theme(colors.white/9%)] [&_li]:text-xs/relaxed [&_li]:font-medium [&_li]:text-muted ' +
              'christmas:[&_li]:text-christmas-muted halloween:[&_li]:text-halloween-muted spring:[&_li]:text-spring-muted flex flex-wrap gap-[7px] list-none m-0 p-0'
            }
            aria-label={t('checkout.methods')}
          >
            {site.payments.map((paymentMethod) => {
              return <li key={paymentMethod}>{paymentMethod}</li>;
            })}
          </ul>
        </div>
      </aside>
    </form>
  );
}
