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
  const { mutate: startCheckout, isPending: submitting } = useStripeCheckout();
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
    <form className="shop-grid shop-grid-top" onSubmit={handleSubmit} noValidate>
      <div className="shop-panel glow-card" onPointerMove={onCardMove}>
        <div className="field tw-grid tw-gap-[10px]">
          <label htmlFor="shop-nick">{t('checkout.username')}</label>
          <div className={`nick-wrap ${error === 'nick' ? 'has-error' : ''}`}>
            <div className="avatar-box" aria-hidden="true">
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
            <p id="shop-nick-error" className="field-error" role="alert">
              {t('checkout.invalid')}
            </p>
          )}
        </div>

        <div className="field tw-grid tw-gap-[10px]">
          <span className="field-label">{t('checkout.quick')}</span>
          <div
            className="presets tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[10px]"
            role="group"
            aria-label={t('checkout.presets')}
          >
            {site.shopAmounts.map((presetAmount) => {
              return (
                <button
                  key={presetAmount}
                  type="button"
                  className={`preset-btn ${amount === presetAmount ? 'is-active' : ''}`}
                  onClick={() => changeAmount(String(presetAmount))}
                >
                  <strong>{presetAmount}</strong>
                  <span>PLN</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="field tw-grid tw-gap-[10px]">
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-[12px]">
            <label htmlFor="shop-amount">
              {t('checkout.custom')}
              {site.shopMin}–{site.shopMax} PLN)
            </label>
            <div className="tw-inline-flex tw-gap-[6px]">
              <button
                type="button"
                className="step-btn"
                onClick={() => stepAmount(-5)}
                aria-label={t('checkout.decrease')}
              >
                −5
              </button>
              <button
                type="button"
                className="step-btn"
                onClick={() => stepAmount(5)}
                aria-label={t('checkout.increase')}
              >
                +5
              </button>
            </div>
          </div>

          <div className="amount-input-wrap">
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
            <span className="tw-font-mono tw-text-[0.92rem] tw-font-semibold tw-text-muted">
              PLN
            </span>
          </div>
          {error === 'amount' && (
            <p id="shop-amount-error" className="field-error" role="alert">
              {t('checkout.invalidAmount', { min: site.shopMin, max: site.shopMax })}
            </p>
          )}
          <input
            type="range"
            className="amount-slider"
            min={site.shopMin}
            max={site.shopSliderMax}
            step={5}
            value={amount ?? site.shopMin}
            onChange={(event) => changeAmount(event.target.value)}
            aria-label={t('checkout.slider')}
          />
          <div
            className="tw-flex tw-justify-between tw-mt-[2px] tw-font-mono tw-text-[0.74rem] tw-text-muted"
            aria-hidden="true"
          >
            <span>{site.shopMin} PLN</span>
            <span>250 PLN</span>
            <span>500 PLN</span>
            <span>{site.shopSliderMax} PLN</span>
          </div>
        </div>
      </div>

      <aside
        className="shop-summary glow-card"
        onPointerMove={onCardMove}
        aria-label={t('checkout.summaryLabel')}
      >
        <h3>{t('checkout.summary')}</h3>

        <dl className="summary-rows">
          <div>
            <dt>{t('checkout.player')}</dt>
            <dd className={validNick ? 'is-set' : ''}>{trimmedNick || t('checkout.missing')}</dd>
          </div>

          <div>
            <dt>
              {t('checkout.balance')}
              <code className="inline-code">/portfel</code>
            </dt>
            <dd className={wallet.status === 'connected' ? 'is-set' : ''}>{currentBalText}</dd>
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

        <div className="summary-total">
          <span>{t('checkout.total')}</span>
          <strong>{formattedAmount}</strong>
        </div>

        <button type="submit" className="btn btn-primary pay-submit" disabled={submitting}>
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
          <p className="field-error" role="alert">
            {t('checkout.failed')}
          </p>
        )}

        {checkoutNotice && (
          <p className="checkout-notice" role="status">
            {t('checkout.notice', {
              nick: checkoutNotice.nick,
              amount: formatPln(checkoutNotice.amount, i18n.language),
              endpoint: site.stripeCheckoutEndpoint,
            })}
          </p>
        )}

        <div className="stripe-meta">
          <span>
            {t('checkout.pipeline')}
            <code className="inline-code">/portfel</code>)
          </span>
          <ul
            className="pay-list tw-flex tw-flex-wrap tw-gap-[7px] tw-list-none tw-m-0 tw-p-0"
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
