import { buttonClasses } from '@/shared/components/button-classes';
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
      className="[align-items:start] grid grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] gap-[24px] max-wide:grid-cols-[minmax(0,_1fr)] mt-0"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset
        className={
          'min-w-0 p-[clamp(22px,_3.2vw,_36px)] rounded-[18px] [border:1px_solid_rgba(var(--bright-rgb),_0.26)] ' +
          '[background:radial-gradient(420px_280px_at_0%_0%,_rgba(var(--accent-rgb),_0.22),_transparent_68%),_linear-gradient(_150deg,_rgba(var(--accent-rgb),_0.1)_0%,_var(--bg)_56%,_rgba(var(--accent-rgb),_0.08)_100%_)] ' +
          '[box-shadow:inset_0_1px_0_rgba(var(--bright-rgb),_0.24),_0_24px_56px_-28px_rgba(0,_0,_0,_0.85)] grid ' +
          "gap-[28px] relative [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 " +
          '[&::before]:rounded-[inherit] ' +
          '[&::before]:[background:radial-gradient(_320px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(var(--bright-rgb),_0.12),_transparent_62%_)] ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(129,_140,_248,_0.2),_transparent_62%_)] ' +
          'm-0'
        }
        disabled={submitting}
        onPointerMove={onCardMove}
      >
        <div className="[&_label]:text-[0.92rem] [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
          <label htmlFor="shop-nick">{t('checkout.username')}</label>
          <div
            className={classes(
              'flex items-center gap-[12px] p-[6px_14px_6px_8px] rounded-[12px] [border:1px_solid_var(--line-strong)] ' +
                'bg-surface [transition:border-color_0.2s] focus-within:[border-color:var(--accent-bright)] ' +
                '[&.has-error]:[border-color:var(--war)] [&_input]:w-full [&_input]:min-h-[42px] [&_input]:bg-transparent ' +
                '[&_input]:[border:0] [&_input]:text-ink [&_input]:[font:600_1.05rem/1_var(--display)] ' +
                '[&_input]:[outline:none] [&_input::placeholder]:text-muted [&_input::placeholder]:font-normal ' +
                '[&_input::placeholder]:font-body',
              error === 'nick' ? 'has-error' : '',
            )}
          >
            <div
              className="w-[40px] h-[40px] shrink-0 rounded-[8px] bg-bg [border:1px_solid_var(--line)] grid place-items-center text-muted overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:[image-rendering:pixelated]"
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
            <p id="shop-nick-error" className="text-[0.88rem] [color:#fca5a5]" role="alert">
              {t('checkout.invalid')}
            </p>
          )}
        </div>

        <div className="[&_label]:text-[0.92rem] [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
          <span className="text-[0.92rem] font-semibold text-ink">{t('checkout.quick')}</span>
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
                      '[border:1px_solid_var(--line-strong)] bg-surface text-ink cursor-pointer ' +
                      '[transition:border-color_0.2s,_background-color_0.2s,_transform_0.2s_var(--ease)] ' +
                      'hover:[border-color:rgba(var(--bright-rgb),_0.55)] hover:bg-surface-hover ' +
                      'hover:[transform:translateY(-2px)] ' +
                      '[&.is-active]:[background:linear-gradient(_135deg,_var(--accent)_0%,_var(--accent-hover)_58%,_var(--accent-bright)_100%_)] ' +
                      '[&.is-active]:[border-color:rgba(255,_255,_255,_0.35)] ' +
                      '[&.is-active]:[box-shadow:0_12px_28px_-8px_rgba(var(--accent-rgb),_0.8)] [&_strong]:font-display ' +
                      '[&_strong]:text-[1.45rem] [&_strong]:[font-variant-numeric:tabular-nums] [&_span]:text-[0.8rem] ' +
                      '[&_span]:text-muted [&_span]:font-semibold [&.is-active_span]:[color:rgba(255,_255,_255,_0.9)]',
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

        <div className="[&_label]:text-[0.92rem] [&_label]:font-semibold [&_label]:text-ink grid gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="shop-amount">
              {t('checkout.custom')}
              {site.shopMin}–{site.shopMax} PLN)
            </label>
            <div className="inline-flex gap-[6px]">
              <button
                type="button"
                className={
                  'step-btn min-w-[44px] min-h-[36px] px-2.5 py-0 rounded-[8px] [border:1px_solid_var(--line-strong)] ' +
                  'bg-surface text-ink [font:600_0.85rem/1_var(--mono)] cursor-pointer ' +
                  '[transition:background-color_0.2s,_border-color_0.2s] hover:bg-surface-hover ' +
                  'hover:[border-color:var(--accent-bright)]'
                }
                onClick={() => stepAmount(-5)}
                aria-label={t('checkout.decrease')}
              >
                −5
              </button>
              <button
                type="button"
                className={
                  'step-btn min-w-[44px] min-h-[36px] px-2.5 py-0 rounded-[8px] [border:1px_solid_var(--line-strong)] ' +
                  'bg-surface text-ink [font:600_0.85rem/1_var(--mono)] cursor-pointer ' +
                  '[transition:background-color_0.2s,_border-color_0.2s] hover:bg-surface-hover ' +
                  'hover:[border-color:var(--accent-bright)]'
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
              'flex items-center p-[4px_16px] rounded-[12px] [border:1px_solid_var(--line-strong)] bg-surface ' +
              'focus-within:[border-color:var(--accent-bright)] [&_input]:w-full [&_input]:min-h-[46px] ' +
              '[&_input]:bg-transparent [&_input]:[border:0] [&_input]:text-ink ' +
              '[&_input]:font-display [&_input]:font-bold [&_input]:text-[1.45rem]/none [&_input]:[font-variant-numeric:tabular-nums] ' +
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
            <span className="font-mono text-[0.92rem] font-semibold text-muted">PLN</span>
          </div>
          {error === 'amount' && (
            <p id="shop-amount-error" className="text-[0.88rem] [color:#fca5a5]" role="alert">
              {t('checkout.invalidAmount', { min: site.shopMin, max: site.shopMax })}
            </p>
          )}
          <input
            type="range"
            className="w-full h-[6px] mt-[6px] [accent-color:var(--accent-hover)] cursor-pointer"
            min={site.shopMin}
            max={site.shopSliderMax}
            step={5}
            value={amount ?? site.shopMin}
            onChange={(event) => changeAmount(event.target.value)}
            aria-label={t('checkout.slider')}
          />
          <div
            className="flex justify-between mt-[2px] font-mono text-[0.74rem] text-muted"
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
          'min-w-0 p-[clamp(22px,_3.2vw,_36px)] rounded-[18px] [border:1px_solid_rgba(var(--bright-rgb),_0.26)] ' +
          '[background:radial-gradient(420px_280px_at_0%_0%,_rgba(var(--accent-rgb),_0.22),_transparent_68%),_linear-gradient(_150deg,_rgba(var(--accent-rgb),_0.1)_0%,_var(--bg)_56%,_rgba(var(--accent-rgb),_0.08)_100%_)] ' +
          '[box-shadow:inset_0_1px_0_rgba(var(--bright-rgb),_0.24),_0_24px_56px_-28px_rgba(0,_0,_0,_0.85)] ' +
          '[background:radial-gradient(420px_280px_at_92%_0%,_rgba(var(--accent-rgb),_0.34),_transparent_68%),_radial-gradient(360px_260px_at_8%_100%,_rgba(var(--bright-rgb),_0.16),_transparent_70%),_linear-gradient(_160deg,_rgba(var(--accent-rgb),_0.14)_0%,_var(--bg)_62%,_rgba(var(--accent-rgb),_0.12)_100%_)] ' +
          "[&_h3]:text-[1.4rem] [&_h3]:mb-[20px] relative [&::before]:[content:''] [&::before]:absolute " +
          '[&::before]:inset-0 [&::before]:rounded-[inherit] ' +
          '[&::before]:[background:radial-gradient(_320px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(var(--bright-rgb),_0.12),_transparent_62%_)] ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(129,_140,_248,_0.2),_transparent_62%_)]'
        }
        onPointerMove={onCardMove}
        aria-label={t('checkout.summaryLabel')}
      >
        <h3>{t('checkout.summary')}</h3>

        <dl
          className={
            'm-0 grid gap-[14px] pb-[20px] [border-bottom:1px_solid_var(--line)] [&_div]:flex [&_div]:items-center ' +
            '[&_div]:justify-between [&_div]:gap-[12px] [&_dt]:text-muted [&_dt]:text-[0.94rem] [&_dd]:m-0 ' +
            '[&_dd]:font-semibold [&_dd]:[font-variant-numeric:tabular-nums] [&_dd]:text-muted [&_dd.is-set]:text-ink ' +
            '[&_dd.is-accent]:text-accent-bright'
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
              <code className="code-label">/portfel</code>
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
            'flex items-baseline justify-between [padding-block:20px_24px] [&_span]:text-[0.95rem] [&_span]:text-muted ' +
            '[&_strong]:font-display [&_strong]:text-[2rem] [&_strong]:[font-variant-numeric:tabular-nums] ' +
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
            'pay-submit w-full min-h-[54px] text-[0.96rem]/none whitespace-normal text-center py-2.5',
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
          <p className="text-[0.88rem] [color:#fca5a5]" role="alert">
            {t('checkout.failed')}
          </p>
        )}

        {checkoutNotice && (
          <p
            className="mt-[14px] p-[12px_14px] rounded-[10px] [border:1px_solid_rgba(var(--bright-rgb),_0.45)] [background:rgba(var(--accent-rgb),_0.14)] text-ink text-[0.88rem] leading-[1.45] [overflow-wrap:anywhere]"
            role="status"
          >
            {t('checkout.notice', {
              nick: checkoutNotice.nick,
              amount: formatPln(checkoutNotice.amount, i18n.language),
              endpoint: site.stripeCheckoutEndpoint,
            })}
          </p>
        )}

        <div className="mt-[22px] pt-[18px] [border-top:1px_solid_var(--line)] [&>span]:block [&>span]:text-[0.84rem] [&>span]:text-muted [&>span]:mb-[10px]">
          <span>
            {t('checkout.pipeline')}
            <code className="code-label">/portfel</code>)
          </span>
          <ul
            className="[&_li]:p-[6px_10px] [&_li]:rounded-[7px] [&_li]:bg-surface [&_li]:[border:1px_solid_var(--line)] [&_li]:text-[0.8rem] [&_li]:font-medium [&_li]:text-muted flex flex-wrap gap-[7px] list-none m-0 p-0"
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
