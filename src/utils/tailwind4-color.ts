import type { TailwindColor } from '../types/main';

/**
 * Tailwind 4 各色系的基準色（500 階，OKLCH）。
 * 僅在使用者以「色名」（如 'indigo'）指定主色時用來查表；
 * 若使用者直接傳入 hex / rgb / oklch，則原樣採用，不需查表。
 */
export const tailwindBaseColors: Record<TailwindColor, string> = {
    slate: 'oklch(55.4% 0.046 257.417)',
    gray: 'oklch(55.1% 0.027 264.364)',
    zinc: 'oklch(55.2% 0.016 285.938)',
    neutral: 'oklch(55.6% 0 0)',
    stone: 'oklch(55.3% 0.013 58.071)',
    red: 'oklch(63.7% 0.237 25.331)',
    orange: 'oklch(70.5% 0.213 47.604)',
    amber: 'oklch(76.9% 0.188 70.08)',
    yellow: 'oklch(79.5% 0.184 86.047)',
    lime: 'oklch(76.8% 0.233 130.85)',
    green: 'oklch(72.3% 0.219 149.579)',
    emerald: 'oklch(69.6% 0.17 162.48)',
    teal: 'oklch(70.4% 0.14 182.503)',
    cyan: 'oklch(71.5% 0.143 215.221)',
    sky: 'oklch(68.5% 0.169 237.323)',
    blue: 'oklch(62.3% 0.214 259.815)',
    indigo: 'oklch(58.5% 0.233 277.117)',
    violet: 'oklch(60.6% 0.25 292.717)',
    purple: 'oklch(62.7% 0.265 303.9)',
    fuchsia: 'oklch(66.7% 0.295 322.15)',
    pink: 'oklch(65.6% 0.241 354.308)',
    rose: 'oklch(64.5% 0.246 16.439)',
};

export function isTailwindColorName(color: string): color is TailwindColor {
    return color in tailwindBaseColors;
}
