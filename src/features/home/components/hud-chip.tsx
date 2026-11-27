import type { ComponentPropsWithoutRef } from 'react';
import { classes } from '@/shared/utils/classes';

export function HudChip({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={classes([
        'pointer-events-none absolute z-[4] inline-flex items-center gap-[8px] rounded-[999px] border border-solid',
        'border-purple-400/[0.32] christmas:border-sky-300/[0.32] halloween:border-orange-300/[0.32] spring:border-emerald-300/[0.32]',
        'bg-background-elevated/[0.88] christmas:bg-christmas-background-elevated/[0.88]',
        'halloween:bg-halloween-background-elevated/[0.88] spring:bg-spring-background-elevated/[0.88]',
        'p-[7px_12px] font-mono text-[0.75rem] tracking-[0.03em] [box-shadow:0_10px_26px_-10px_theme(colors.black/80%)]',
        '[backdrop-filter:blur(10px)] max-sm:p-[5px_10px] max-sm:text-xs/relaxed',
        className,
      ])}
    />
  );
}
