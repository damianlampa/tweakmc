import { classes } from '@/shared/utils/classes';
import type { ReactNode } from 'react';

export function CodeLabel({ children }: { children: ReactNode }) {
  return (
    <code
      className={classes([
        'rounded-[6px] border border-solid border-white/[0.18] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface',
        'spring:bg-spring-surface p-[0.12em_0.45em] font-mono text-[0.9em] text-purple-400 christmas:text-sky-300',
        'halloween:text-orange-300 spring:text-emerald-300',
      ])}
    >
      {children}
    </code>
  );
}
