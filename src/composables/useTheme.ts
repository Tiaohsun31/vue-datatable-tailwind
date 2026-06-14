/**
 * useTheme.ts
 * 以 Vue 響應式方式把主題綁定到元件根元素：
 *  - 主色：解析後輸出單一 CSS 變數 `--color-vdt-primary`，其餘狀態色由 CSS 的 color-mix() 衍生。
 *  - 深淺模式：輸出 `data-vdt-mode` 屬性；未指定時不設，交由 CSS 的 prefers-color-scheme 跟隨系統。
 * 不再使用全域單例 / setTimeout / querySelector / getComputedStyle。
 */
import { computed, type Ref } from 'vue';
import type { TailwindColor } from '../types/main';
import { tailwindBaseColors, isTailwindColorName } from '../utils/tailwind4-color';

export type ThemeMode = 'light' | 'dark';

/**
 * 將使用者傳入的主色解析為可用的 CSS 顏色字串。
 * 色名 → 查表取基準色；hex / rgb / oklch / 任意 CSS 顏色 → 原樣採用。
 */
export function resolvePrimaryColor(input?: TailwindColor | string): string {
    if (!input) return tailwindBaseColors.indigo;
    if (isTailwindColorName(input)) return tailwindBaseColors[input];
    return input;
}

export function useTheme(
    theme: Ref<TailwindColor | string | undefined>,
    mode: Ref<ThemeMode | undefined>,
) {
    // 綁定到根元素的 inline style（只需一個變數，其餘由 CSS 衍生）
    const themeStyle = computed<Record<string, string>>(() => ({
        '--color-vdt-primary': resolvePrimaryColor(theme.value),
    }));

    // 明確指定模式時設 data-vdt-mode；未指定則不設，跟隨系統偏好
    const themeAttrs = computed<Record<string, string>>(() => {
        const attrs: Record<string, string> = {};
        if (mode.value) attrs['data-vdt-mode'] = mode.value;
        return attrs;
    });

    return {
        themeStyle,
        themeAttrs,
    };
}

export default useTheme;
