import { classes } from '@/shared/utils/classes';

const base = [
  'btn inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[22px] py-0 rounded-[var(--radius)]',
  'border border-solid border-transparent font-body font-semibold text-base/none no-underline',
  'cursor-pointer whitespace-nowrap',
  '[transition:transform_0.22s_var(--ease),_background-color_0.2s,_border-color_0.2s,_box-shadow_0.22s_var(--ease)]',
  'hover:[transform:translateY(-2px)] active:[transform:translateY(1px)] [.ip-bar_&]:min-h-[44px]',
  '[.ip-bar_&]:px-[18px] [.ip-bar_&]:py-0 [.ip-bar_&]:rounded-[8px]',
];

const variants = {
  primary: [
    'relative overflow-hidden',
    '[background:linear-gradient(135deg,var(--tw-gradient-stops))]',
    'from-0% via-[62%] to-100%',
    'from-purple-600 via-purple-500 to-purple-400',
    'christmas:from-sky-600 christmas:via-sky-500 christmas:to-sky-300',
    'halloween:from-orange-600 halloween:via-orange-500 halloween:to-orange-300',
    'spring:from-emerald-600 spring:via-emerald-500 spring:to-emerald-300',
    'text-white [box-shadow:0_10px_26px_-6px_theme(colors.purple.600/65%)] christmas:[box-shadow:0_10px_26px_-6px_theme(colors.sky.500/65%)]',
    'halloween:[box-shadow:0_10px_26px_-6px_theme(colors.orange.600/65%)] spring:[box-shadow:0_10px_26px_-6px_theme(colors.emerald.500/65%)]',
    "[&::after]:[content:'']",
    '[&::after]:absolute [&::after]:top-0 [&::after]:left-[-120%] [&::after]:w-[65%] [&::after]:h-full',
    '[&::after]:[background:linear-gradient(_105deg,_transparent_20%,_theme(colors.white/28%)_50%,_transparent_80%_)]',
    '[&::after]:animate-button-sheen [&::after]:pointer-events-none hover:bg-purple-500 christmas:hover:bg-sky-500 halloween:hover:bg-orange-500 spring:hover:bg-emerald-500',
    'hover:[box-shadow:0_12px_28px_-6px_theme(colors.purple.600/72%)] christmas:hover:[box-shadow:0_12px_28px_-6px_theme(colors.sky.500/72%)]',
    'halloween:hover:[box-shadow:0_12px_28px_-6px_theme(colors.orange.600/72%)] spring:hover:[box-shadow:0_12px_28px_-6px_theme(colors.emerald.500/72%)]',
  ],
  secondary: [
    'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface text-ink border-white/[0.18] hover:bg-surface-hover',
    'christmas:hover:bg-christmas-surface-hover halloween:hover:bg-halloween-surface-hover spring:hover:bg-spring-surface-hover',
    'hover:border-purple-400/45 christmas:hover:border-sky-300/45 halloween:hover:border-orange-300/45 spring:hover:border-emerald-300/45 max-sm:[.hero-actions_&]:w-full',
  ],
  discord: [
    'relative overflow-hidden bg-discord text-white',
    '[box-shadow:0_10px_26px_-6px_theme(colors.discord/65%)] hover:bg-discord-hover',
    "hover:[box-shadow:0_14px_30px_-6px_theme(colors.discord/80%)] [&::after]:[content:''] [&::after]:absolute",
    '[&::after]:top-0 [&::after]:left-[-120%] [&::after]:w-[65%] [&::after]:h-full',
    '[&::after]:[background:linear-gradient(_105deg,_transparent_20%,_theme(colors.white/28%)_50%,_transparent_80%_)]',
    '[&::after]:animate-discord-sheen [&::after]:pointer-events-none',
  ],
};

export function buttonClasses(variant: keyof typeof variants, className?: string) {
  return classes([base, variants[variant], className]);
}
