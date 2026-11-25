import { CodeLabel } from '@/shared/components/code-label';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { formatRevenue } from '../utils/format-revenue';
import { useAdminStats } from '../hooks/use-admin-stats';
import { AdminCard } from './admin-card';

export function RevenueOverview() {
  const { t, i18n } = useTranslation();

  const stats = useAdminStats();

  if (!stats) return null;

  const maxDay = Math.max(...stats.daily.map((day) => day.amount), 1);

  return (
    <div className="grid gap-5">
      {stats.isPreview && (
        <div
          className={
            'p-[14px_18px] rounded-[12px] [border:1px_solid_theme(colors.purple.400/35%)] christmas:[border:1px_solid_theme(colors.sky.300/35%)] ' +
            'halloween:[border:1px_solid_theme(colors.orange.300/35%)] spring:[border:1px_solid_theme(colors.emerald.300/35%)] bg-purple-600/10 ' +
            'christmas:bg-sky-500/10 halloween:bg-orange-600/10 spring:bg-emerald-500/10 text-sm/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted'
          }
        >
          <strong>{t('revenue.preview')}</strong>
          {t('revenue.explanation')}
          <CodeLabel>shopApiEnabled: true</CodeLabel>
          {t('revenue.source')}
          <CodeLabel>/api/admin/stats</CodeLabel>
          {t('revenue.integration')}
        </div>
      )}

      <div className="max-lg:grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-4">
        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] bg-background-elevated christmas:bg-christmas-background-elevated ' +
            'halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.total')}</span>
          <strong>{formatRevenue(stats.totalRevenue, i18n.language)}</strong>
        </div>

        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] bg-background-elevated christmas:bg-christmas-background-elevated ' +
            'halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.month')}</span>
          <strong className="text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300">
            {formatRevenue(stats.monthRevenue, i18n.language)}
          </strong>
        </div>

        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] bg-background-elevated christmas:bg-christmas-background-elevated ' +
            'halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.payments')}</span>
          <strong>{stats.totalTransactions}</strong>
        </div>

        <div
          className={
            'p-[20px_22px] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] bg-background-elevated christmas:bg-christmas-background-elevated ' +
            'halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated grid gap-[8px] ' +
            '[&_span]:text-sm/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted [&_strong]:font-display ' +
            '[&_strong]:text-revenue-value [&_strong]:[font-variant-numeric:tabular-nums]'
          }
        >
          <span>{t('revenue.average')}</span>
          <strong>{formatRevenue(stats.avgOrder, i18n.language)}</strong>
        </div>
      </div>

      <div className="max-lg:grid-cols-[minmax(0,_1fr)] grid grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)] gap-5">
        <AdminCard>
          <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
            <h2>{t('revenue.days')}</h2>
            <span
              className={
                'font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted p-[3px_8px] rounded-[6px] ' +
                '[border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface'
              }
            >
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
                  <span className="font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                    {day.amount}
                  </span>
                  <div className="w-full [flex:1] rounded-[8px] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface flex items-end overflow-hidden">
                    <div
                      className={
                        'w-full rounded-[8px_8px_0_0] [background:linear-gradient(180deg,_theme(colors.purple.400),_theme(colors.purple.600))] ' +
                        'christmas:[background:linear-gradient(180deg,_theme(colors.sky.300),_theme(colors.sky.600))] ' +
                        'halloween:[background:linear-gradient(180deg,_theme(colors.orange.300),_theme(colors.orange.600))] ' +
                        'spring:[background:linear-gradient(180deg,_theme(colors.emerald.300),_theme(colors.emerald.600))] [transition:height_0.4s_var(--ease)]'
                      }
                      style={{ height: `${Math.round((day.amount / maxDay) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                    {stats.isPreview ? t(day.day, { defaultValue: day.day }) : day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard>
          <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
            <h2>{t('revenue.transactions')}</h2>
            <Link
              to={paths.shop}
              className={
                'text-ink underline [text-underline-offset:4px] decoration-purple-400/55 christmas:decoration-sky-300/55 halloween:decoration-orange-300/55 spring:decoration-emerald-300/55 ' +
                '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-purple-400 christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300 ' +
                'hover:decoration-purple-400 christmas:hover:decoration-sky-300 halloween:hover:decoration-orange-300 spring:hover:decoration-emerald-300'
              }
            >
              {t('revenue.shop')}
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table
              className={
                'w-full [border-collapse:collapse] text-sm/relaxed [&_th]:p-[10px_8px] [&_th]:text-left ' +
                '[&_th]:[border-bottom:1px_solid_theme(colors.white/9%)] [&_th]:whitespace-nowrap [&_td]:p-[10px_8px] [&_td]:text-left ' +
                '[&_td]:[border-bottom:1px_solid_theme(colors.white/9%)] [&_td]:whitespace-nowrap [&_th]:text-muted christmas:[&_th]:text-christmas-muted ' +
                'halloween:[&_th]:text-halloween-muted spring:[&_th]:text-spring-muted ' +
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
                      <td className="font-mono font-semibold text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300">
                        +{formatRevenue(transaction.amount, i18n.language)}
                      </td>
                      <td>
                        {stats.isPreview
                          ? t(transaction.method, { defaultValue: transaction.method })
                          : transaction.method}
                      </td>
                      <td>
                        <span className="p-[3px_8px] rounded-[6px] bg-green-500/[0.14] text-green-300 text-xs/relaxed font-semibold">
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
        </AdminCard>
      </div>
    </div>
  );
}
