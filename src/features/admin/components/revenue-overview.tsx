import { Link } from 'react-router';
import { paths } from '@/router/paths';
import type { AdminStats } from '../types/admin-stats';

function formatPln(val: number) {
  return (
    Number(val || 0).toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' PLN'
  );
}

export function RevenueOverview({ stats }: { stats: AdminStats }) {
  const maxDay = Math.max(...stats.daily.map((d) => d.amount), 1);
  return (
    <div className="tw-grid tw-gap-[20px]">
      {stats.isPreview && (
        <div className="admin-banner">
          <strong>Tryb podglądu danych:</strong>
          {' liczby poniżej są przykładowe. Po włączeniu '}
          <code className="inline-code">shopApiEnabled: true</code> panel automatycznie czyta realne
          zarobki z <code className="inline-code">/api/admin/stats</code> (Stripe + plugin MC).
        </div>
      )}

      <div className="kpi-grid tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[16px]">
        <div className="kpi-card">
          <span>Łączne zarobki</span>
          <strong>{formatPln(stats.totalRevenue)}</strong>
        </div>
        <div className="kpi-card">
          <span>Zarobki (ten miesiąc)</span>
          <strong className="tw-text-accent-bright">{formatPln(stats.monthRevenue)}</strong>
        </div>
        <div className="kpi-card">
          <span>Liczba wpłat</span>
          <strong>{stats.totalTransactions}</strong>
        </div>
        <div className="kpi-card">
          <span>Średnie doładowanie</span>
          <strong>{formatPln(stats.avgOrder)}</strong>
        </div>
      </div>

      <div className="admin-two-col tw-grid tw-grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)] tw-gap-[20px]">
        <div className="admin-box">
          <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
            <h2>Wpłaty z ostatnich 7 dni</h2>
            <span className="board-tag">PLN / dzień</span>
          </div>
          <div
            className="tw-grid tw-grid-cols-[repeat(7,_minmax(0,_1fr))] tw-gap-[10px] tw-h-[210px] [align-items:end] tw-pt-[10px]"
            role="img"
            aria-label="Wykres dziennych wpłat z ostatnich 7 dni"
          >
            {stats.daily.map((d) => (
              <div
                className="tw-flex tw-flex-col tw-items-center tw-gap-[6px] tw-h-full"
                key={d.day}
              >
                <span className="tw-font-mono tw-text-[0.72rem] tw-text-muted">{d.amount}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ height: `${Math.round((d.amount / maxDay) * 100)}%` }}
                  />
                </div>
                <span className="tw-text-[0.78rem] tw-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-box">
          <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
            <h2>Ostatnie transakcje Stripe → MC</h2>
            <Link to={paths.shop} className="inline-link">
              Otwórz sklep
            </Link>
          </div>
          <div className="tw-overflow-x-auto">
            <table className="tx-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Gracz</th>
                  <th>Kwota</th>
                  <th>Metoda</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <code>{tx.id}</code>
                    </td>
                    <td>
                      <strong>{tx.nick}</strong>
                    </td>
                    <td className="tw-font-mono tw-font-semibold tw-text-accent-bright">
                      +{formatPln(tx.amount)}
                    </td>
                    <td>{tx.method}</td>
                    <td>
                      <span className="tx-ok">{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
