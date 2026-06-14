import { TailwindColor } from '../types/main';
/**
 * Tailwind 4 各色系的基準色（500 階，OKLCH）。
 * 僅在使用者以「色名」（如 'indigo'）指定主色時用來查表；
 * 若使用者直接傳入 hex / rgb / oklch，則原樣採用，不需查表。
 */
export declare const tailwindBaseColors: Record<TailwindColor, string>;
export declare function isTailwindColorName(color: string): color is TailwindColor;
//# sourceMappingURL=tailwind4-color.d.ts.map