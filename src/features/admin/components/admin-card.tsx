import { classes } from '@/shared/utils/classes';
import type { ReactNode } from 'react';

export function AdminCard({ children }: { children: ReactNode }) {
  return (
    <div
      className={classes([
        'min-w-0 rounded-[16px] border border-solid border-white/[0.18] bg-background-elevated christmas:bg-christmas-background-elevated',
        'halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated p-[clamp(20px,2.6vw,26px)]',
      ])}
    >
      {children}
    </div>
  );
}
