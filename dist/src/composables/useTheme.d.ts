import { Ref, ComputedRef } from 'vue';
import { TailwindColor } from '../types/main';
export type ThemeMode = 'light' | 'dark';
/**
 * 將使用者傳入的主色解析為可用的 CSS 顏色字串。
 * 色名 → 查表取基準色；hex / rgb / oklch / 任意 CSS 顏色 → 原樣採用。
 */
export declare function resolvePrimaryColor(input?: TailwindColor | string): string;
export declare function useTheme(theme: Ref<TailwindColor | string | undefined>, mode: Ref<ThemeMode | undefined>): {
    themeStyle: ComputedRef<Record<string, string>>;
    themeAttrs: ComputedRef<Record<string, string>>;
};
export default useTheme;
//# sourceMappingURL=useTheme.d.ts.map