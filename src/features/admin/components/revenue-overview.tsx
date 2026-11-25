import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { formatRevenue } from '../utils/format-revenue';
import { useAdminStats } from '../hooks/use-admin-stats';

export function RevenueOverview() {
  const { t, i18n } = useTranslation();

  const stats = useAdminStats();

  if (!stats) return null;

  const maxDay = Math.max(...stats.daily.map((day) => day.amount), 1);

  return (
    <div className="grid gap-5">
      {stats.isPreview && (
        <div className="p-[14px_18px] rounded-[12px] [border:1px_solid_rgba(var(--bright-rgb),_0.35)] [background:rgba(var(--accent-rgb),_0.1)] text-sm/relaxed text-muted">
          <strong>{t('revenue.preview')}</strong>
          {t('revenue.explanation')}
          <code className="code-label">shopApiEnabled: true</code>
          {t('revenue.source')}
          <code className="code-label">/api/admin/stats</code>
          {t('revenue.integration')}
        </div>
      )}

      <div className="max-lg:grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-4">
        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_var(--line-strong)] bg-bg-elev grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.total')}</span>
          <strong>{formatRevenue(stats.totalRevenue, i18n.language)}</strong>
        </div>

        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_var(--line-strong)] bg-bg-elev grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.month')}</span>
          <strong className="text-accent-bright">
            {formatRevenue(stats.monthRevenue, i18n.language)}
          </strong>
        </div>

        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_var(--line-strong)] bg-bg-elev grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.payments')}</span>
          <strong>{stats.totalTransactions}</strong>
        </div>

        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_var(--line-strong)] bg-bg-elev grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.average')}</span>
          <strong>{formatRevenue(stats.avgOrder, i18n.language)}</strong>
        </div>
      </div>

      <div className="max-lg:grid-cols-[minmax(0,_1fr)] grid grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)] gap-5">
        <div className="admin-card">
          <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
            <h2>{t('revenue.days')}</h2>
            <span className="font-mono text-xs/relaxed text-muted p-[3px_8px] rounded-[6px] [border:1px_solid_var(--line)] bg-surface">
              {t('revenue.daily')}
            </span>
          </div>

          <div
            className="grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-2.5 h-[210px] [align-items:end] pt-[10px]"
            role="img"
            aria-label={t('revenue.chart')}
          >
            {stats.daily.map((day) => {
              return (
                <div className="flex flex-col items-center gap-[6px] h-full" key={day.day}>
                  <span className="font-mono text-xs/relaxed text-muted">{day.amount}</span>
                  <div className="w-full [flex:1] rounded-[8px] bg-surface flex items-end overflow-hidden">
                    <div
                      className="w-full rounded-[8px_8px_0_0] [background:linear-gradient(180deg,_var(--accent-bright),_var(--accent))] [transition:height_0.4s_var(--ease)]"
                      style={{ height: `${Math.round((day.amount / maxDay) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs/relaxed text-muted">
                    {stats.isPreview ? t(day.day, { defaultValue: day.day }) : day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-card">
          <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
            <h2>{t('revenue.transactions')}</h2>
            <Link
              to={paths.shop}
              className={
                'text-ink underline [text-underline-offset:4px] [text-decoration-color:rgba(var(--bright-rgb),_0.55)] ' +
                '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-accent-bright ' +
                'hover:[text-decoration-color:var(--accent-bright)]'
              }
            >
              {t('revenue.shop')}
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table
              className={
                'w-full [border-collapse:collapse] text-sm/relaxed [&_th]:p-[10px_8px] [&_th]:text-left ' +
                '[&_th]:[border-bottom:1px_solid_var(--line)] [&_th]:whitespace-nowrap [&_td]:p-[10px_8px] [&_td]:text-left ' +
                '[&_td]:[border-bottom:1px_solid_var(--line)] [&_td]:whitespace-nowrap [&_th]:text-muted ' +
                '[&_th]:font-semibold [&_th]:text-xs/relaxed [&_th]:uppercase [&_th]:tracking-wide'
              }
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('revenue.player')}</th>
                  <th>{t('revenue.amount')}</th>
                  <th>{t('revenue.method')}</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.transactions.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td>
                        <code>{transaction.id}</code>
                      </td>
                      <td>
                        <strong>{transaction.nick}</strong>
                      </td>
                      <td className="font-mono font-semibold text-accent-bright">
                        +{formatRevenue(transaction.amount, i18n.language)}
                      </td>
                      <td>
                        {stats.isPreview
                          ? t(transaction.method, { defaultValue: transaction.method })
                          : transaction.method}
                      </td>
                      <td>
                        <span className="p-[3px_8px] rounded-[6px] [background:rgba(34,_197,_94,_0.14)] [color:#86efac] text-xs/relaxed font-semibold">
                          {stats.isPreview
                            ? t(transaction.status, { defaultValue: transaction.status })
                            : transaction.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
