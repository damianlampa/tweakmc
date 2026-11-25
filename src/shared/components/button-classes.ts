import { classes } from '@/shared/utils/classes';

const base =
  'btn inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[22px] py-0 rounded-[var(--radius)] ' +
  'border border-solid border-transparent font-body font-semibold text-base/none no-underline ' +
  'cursor-pointer whitespace-nowrap ' +
  '[transition:transform_0.22s_var(--ease),_background-color_0.2s,_border-color_0.2s,_box-shadow_0.22s_var(--ease)] ' +
  'hover:[transform:translateY(-2px)] active:[transform:translateY(1px)] [.ip-bar_&]:min-h-[44px] ' +
  '[.ip-bar_&]:px-[18px] [.ip-bar_&]:py-0 [.ip-bar_&]:rounded-[8px]';

const variants = {
  primary:
    'relative overflow-hidden ' +
    '[background:linear-gradient(_135deg,_var(--accent)_0%,_var(--accent-hover)_62%,_var(--accent-bright)_100%_)] ' +
    "[color:#ffffff] [box-shadow:0_10px_26px_-6px_rgba(var(--accent-rgb),_0.65)] [&::after]:[content:''] " +
    '[&::after]:absolute [&::after]:top-0 [&::after]:left-[-120%] [&::after]:w-[65%] [&::after]:h-full ' +
    '[&::after]:[background:linear-gradient(_105deg,_transparent_20%,_rgba(255,_255,_255,_0.28)_50%,_transparent_80%_)] ' +
    '[&::after]:animate-button-sheen [&::after]:pointer-events-none hover:bg-accent-hover ' +
    'hover:[box-shadow:0_12px_28px_-6px_rgba(var(--accent-rgb),_0.72)]',
  secondary:
    'bg-surface text-ink border-line-strong hover:bg-surface-hover ' +
    'hover:[border-color:rgba(var(--bright-rgb),_0.45)] max-sm:[.hero-actions_&]:w-full',
  discord:
    'relative overflow-hidden [background:#5865f2] [color:#ffffff] ' +
    '[box-shadow:0_10px_26px_-6px_rgba(88,_101,_242,_0.65)] hover:[background:#6c77f7] ' +
    "hover:[box-shadow:0_14px_30px_-6px_rgba(88,_101,_242,_0.8)] [&::after]:[content:''] [&::after]:absolute " +
    '[&::after]:top-0 [&::after]:left-[-120%] [&::after]:w-[65%] [&::after]:h-full ' +
    '[&::after]:[background:linear-gradient(_105deg,_transparent_20%,_rgba(255,_255,_255,_0.28)_50%,_transparent_80%_)] ' +
    '[&::after]:animate-discord-sheen [&::after]:pointer-events-none',
};

export function buttonClasses(variant: keyof typeof variants, className?: string) {
  return classes(base, variants[variant], className);
}
