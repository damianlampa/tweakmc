import { useState } from 'react';
import { site } from '@/shared/config/site';
import { NICK_RE } from '@/shared/utils/player-name';
import { formatPln } from '@/shared/utils/format-shop-amount';
import { Icon as icons } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { clampAmount } from '../utils/clamp-amount';
import { useWalletBalance } from '../hooks/use-wallet-balance';
import { useStripeCheckout } from '../hooks/use-stripe-checkout';

export function TopUpForm() {
  const [nick, setNick] = useState('');
  const [amount, setAmount] = useState(25);
  const [amountText, setAmountText] = useState('25');
  const [avatarErr, setAvatarErr] = useState(false);
  const { mutate: startCheckout, isPending: submitting } = useStripeCheckout();
  const [error, setError] = useState('');
  const [checkoutNotice, setCheckoutNotice] = useState('');

  const trimmedNick = nick.trim();
  const validNick = NICK_RE.test(trimmedNick);

  const wallet = useWalletBalance(trimmedNick);

  const setCleanAmount = (next: number | string) => {
    const clamped = clampAmount(next);
    setAmount(clamped);
    setAmountText(Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(2));
    setCheckoutNotice('');
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAmountText(val);
    setCheckoutNotice('');
    const num = parseFloat(val.replace(',', '.'));

    if (!Number.isNaN(num) && num >= site.shopMin && num <= site.shopMax) {
      setAmount(Math.round(num * 100) / 100);
    }
  };

  const handleAmountBlur = () => setCleanAmount(amountText);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    if (!validNick) {
      setError('Podaj poprawny nick z Minecrafta (3–16 znaków: litery, cyfry lub _).');
      setCheckoutNotice('');

      return;
    }

    setError('');
    startCheckout(
      { nick: trimmedNick, amount },
      {
        onSuccess(result, input) {
          if (result.mode === 'live') {
            window.location.assign(result.checkoutUrl);
            return;
          }

          setCheckoutNotice(
            `Tryb podglądu UI — gotowe do podpięcia Stripe + pluginu MC: ${input.nick} → +${formatPln(input.amount)} do /portfel (${site.stripeCheckoutEndpoint}).`,
          );
        },
      },
    );
  };

  const currentBalText =
    wallet.status === 'loading'
      ? 'Sprawdzanie…'
      : wallet.status === 'connected'
        ? formatPln(wallet.balance)
        : validNick
          ? 'Po podpięciu pluginu'
          : '—';

  const afterBalText =
    wallet.status === 'connected' ? formatPln(wallet.balance + amount) : `+${formatPln(amount)}`;

  return (
    <form className="shop-grid shop-grid-top" onSubmit={handleSubmit} noValidate>
      <div className="shop-panel glow-card" onPointerMove={onCardMove}>
        <div className="field tw-grid tw-gap-[10px]">
          <label htmlFor="shop-nick">Nick z Minecrafta</label>
          <div className={`nick-wrap ${error ? 'has-error' : ''}`}>
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
              spellCheck={false}
              placeholder="np. Steve_PL"
              value={nick}
              onChange={(e) => {
                const value = e.target.value;
                setNick(value);
                setAvatarErr(false);
                if (error) setError('');
                if (checkoutNotice) setCheckoutNotice('');
              }}
            />
          </div>
          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="field tw-grid tw-gap-[10px]">
          <span className="field-label">Szybki wybór kwoty</span>
          <div
            className="presets tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[10px]"
            role="group"
            aria-label="Gotowe kwoty doładowania"
          >
            {site.shopAmounts.map((presetAmount) => {
              return (
                <button
                  key={presetAmount}
                  type="button"
                  className={`preset-btn ${amount === presetAmount ? 'is-active' : ''}`}
                  onClick={() => setCleanAmount(presetAmount)}
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
              Własna kwota ({site.shopMin}–{site.shopMax} PLN)
            </label>
            <div className="tw-inline-flex tw-gap-[6px]">
              <button
                type="button"
                className="step-btn"
                onClick={() => setCleanAmount(amount - 5)}
                aria-label="Zmniejsz o 5 PLN"
              >
                −5
              </button>
              <button
                type="button"
                className="step-btn"
                onClick={() => setCleanAmount(amount + 5)}
                aria-label="Zwiększ o 5 PLN"
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
              step="0.5"
              inputMode="decimal"
              value={amountText}
              onChange={handleAmountInput}
              onBlur={handleAmountBlur}
            />
            <span className="tw-font-mono tw-text-[0.92rem] tw-font-semibold tw-text-muted">
              PLN
            </span>
          </div>
          <input
            type="range"
            className="amount-slider"
            min={site.shopMin}
            max={site.shopSliderMax}
            step={5}
            value={amount}
            onChange={(e) => setCleanAmount(e.target.value)}
            aria-label="Suwak kwoty doładowania"
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
        aria-label="Podsumowanie doładowania"
      >
        <h3>Podsumowanie</h3>

        <dl className="summary-rows">
          <div>
            <dt>Konto gracza</dt>
            <dd className={validNick ? 'is-set' : ''}>{trimmedNick || 'Nie wpisano'}</dd>
          </div>

          <div>
            <dt>
              Aktualne <code className="inline-code">/portfel</code>
            </dt>
            <dd className={wallet.status === 'connected' ? 'is-set' : ''}>{currentBalText}</dd>
          </div>

          <div>
            <dt>Doładowanie z pluginu</dt>
            <dd className="is-accent">{afterBalText}</dd>
          </div>

          <div>
            <dt>Prowizja</dt>
            <dd className="is-set">0,00 PLN</dd>
          </div>
        </dl>

        <div className="summary-total">
          <span>Do zapłaty</span>
          <strong>{formatPln(amount)}</strong>
        </div>

        <button type="submit" className="btn btn-primary pay-submit" disabled={submitting}>
          {icons.lock}
          <span>
            {submitting ? 'Łączenie ze Stripe…' : `Przejdź do płatności · ${formatPln(amount)}`}
          </span>
        </button>

        {checkoutNotice && (
          <p className="checkout-notice" role="status">
            {checkoutNotice}
          </p>
        )}

        <div className="stripe-meta">
          <span>
            Stripe → webhook → plugin MC (<code className="inline-code">/portfel</code>)
          </span>
          <ul
            className="pay-list tw-flex tw-flex-wrap tw-gap-[7px] tw-list-none tw-m-0 tw-p-0"
            aria-label="Obsługiwane metody płatności"
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
