/**
 * Tailwind4 ThemeManager.ts
 * 主題管理器，動態更新主題色的 CSS 變數，只影響特定組件，不影響全域網頁
 * - 偵測系統偏好 (prefers-color-scheme)
 * - 管理 light/dark 狀態
 * - 持久化到 localStorage
 * - 應用到 DOM (添加/移除 dark class)
 */

import type { TailwindColor } from '../types/main';
import { findClosestTailwindColor, getColorShades } from './colorUtils';

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
    // 當前實際應用的模式
    currentMode: 'light' | 'dark';
    // 用戶設定的偏好（auto = 跟隨系統）
    userPreference: ThemeMode | 'auto';
    // 系統偏好
    systemPreference: 'light' | 'dark';
    // 主題顏色
    color: TailwindColor;
    // 組件實例 ID（用於區分不同的 DatePicker 實例）
    instanceId: string;
}

interface CreateInstanceOptions {
    defaultColor?: TailwindColor | string;
    defaultMode?: ThemeMode | 'auto';
}

class ThemeManager {
    private instances: Map<string, ThemeState> = new Map();
    private mediaQuery: MediaQueryList | null = null;
    private listeners: Map<string, Array<(state: ThemeState) => void>> = new Map();

    constructor() {
        this.initializeSystemPreference();
    }

    /**
     * 初始化系統偏好檢測
     */
    private initializeSystemPreference(): void {
        if (typeof window !== 'undefined' && window.matchMedia) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
        }
    }

    /**
     * 處理系統主題變化
     */
    private handleSystemThemeChange(event: MediaQueryListEvent): void {
        const systemPreference = event.matches ? 'dark' : 'light';

        // 更新所有實例的系統偏好
        this.instances.forEach((state, instanceId) => {
            state.systemPreference = systemPreference;

            // 如果是 auto 模式，更新當前模式
            if (state.userPreference === 'auto') {
                this.updateCurrentMode(instanceId);
            }
        });
    }

    /**
     * 獲取當前系統偏好
     */
    private getSystemPreference(): 'light' | 'dark' {
        if (this.mediaQuery) {
            return this.mediaQuery.matches ? 'dark' : 'light';
        }
        return 'light';
    }

    /**
     * 創建新的主題實例
     */
    createInstance(instanceId?: string, options: CreateInstanceOptions = {}): string {
        const id = instanceId || this.generateInstanceId();

        const initialState: ThemeState = {
            currentMode: 'light',
            userPreference: options.defaultMode || 'auto',
            systemPreference: this.getSystemPreference(),
            color: findClosestTailwindColor(options.defaultColor || 'violet'),
            instanceId: id
        };

        this.instances.set(id, initialState);
        this.listeners.set(id, []);

        // 初始化當前模式
        this.updateCurrentMode(id);

        // 立即應用顏色（如果瀏覽器環境存在）
        if (typeof document !== 'undefined') {
            // 使用 setTimeout 確保 DOM 元素已經存在
            setTimeout(() => {
                this.applyColorToDOM(id);
                this.applyModeToDOM(id);
            }, 0);
        }

        return id;
    }

    /**
     * 銷毀主題實例
     */
    destroyInstance(instanceId: string): void {
        this.instances.delete(instanceId);
        this.listeners.delete(instanceId);
    }

    /**
     * 生成實例 ID
     */
    private generateInstanceId(): string {
        return `vdt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 更新當前模式
     */
    private updateCurrentMode(instanceId: string): void {
        const state = this.instances.get(instanceId);
        if (!state) return;

        const previousMode = state.currentMode;

        if (state.userPreference === 'auto') {
            state.currentMode = state.systemPreference;
        } else {
            state.currentMode = state.userPreference;
        }

        // 如果模式發生變化，應用到 DOM 並通知監聽器
        if (previousMode !== state.currentMode) {
            this.applyModeToDOM(instanceId);
            this.notifyListeners(instanceId);
        }
    }

    /**
     * 應用模式到特定的 DOM 元素
     */
    private applyModeToDOM(instanceId: string): void {
        if (typeof document === 'undefined') return;

        const state = this.instances.get(instanceId);
        if (!state) return;

        // 找到對應的組件容器
        const container = document.querySelector(`[data-vdt-instance="${instanceId}"]`);
        if (!container) {
            // 如果 DOM 元素還不存在，稍後重試
            setTimeout(() => this.applyModeToDOM(instanceId), 10);
            return;
        }

        // 設置局部的 data-vdt-mode 屬性
        if (state.userPreference === 'auto') {
            // auto 模式時移除屬性，讓它跟隨系統偏好
            container.removeAttribute('data-vdt-mode');
        } else {
            // 明確設定模式時設置屬性
            container.setAttribute('data-vdt-mode', state.currentMode);
        }
    }

    /**
     * 應用顏色到特定的 DOM 元素
     */
    private applyColorToDOM(instanceId: string): void {
        if (typeof document === 'undefined') return;

        const state = this.instances.get(instanceId);
        if (!state) return;

        const container = document.querySelector(`[data-vdt-instance="${instanceId}"]`) as HTMLElement;
        if (!container) {
            // 如果 DOM 元素還不存在，稍後重試
            setTimeout(() => this.applyColorToDOM(instanceId), 10);
            return;
        }

        const colorShades = getColorShades(state.color);

        // 檢查用戶是否有 CSS 覆蓋（通過檢查計算樣式與預期值的差異）
        const hasUserOverride = this.checkForUserOverride(container, colorShades);

        if (hasUserOverride) {
            // 用戶有 CSS 覆蓋，清除內聯樣式讓 CSS 生效
            Object.keys(colorShades).forEach(shade => {
                container.style.removeProperty(`--color-vdt-theme-${shade}`);
            });
        } else {
            // 沒有用戶覆蓋，設置內聯樣式
            Object.entries(colorShades).forEach(([shade, value]) => {
                container.style.setProperty(`--color-vdt-theme-${shade}`, value);
            });
        }

        // 動態更新主題色變數（僅在該容器內）
        // const colorShades = getColorShades(state.color);
        // Object.entries(colorShades).forEach(([shade, value]) => {
        //     container.style.setProperty(`--color-vdt-theme-${shade}`, value);
        // });
    }

    /**
     * 檢查用戶是否有 CSS 覆蓋
     */
    private checkForUserOverride(container: HTMLElement, expectedShades: Record<string, string>): boolean {
        // 臨時清除內聯樣式以檢查 CSS 設定
        const inlineBackup: Record<string, string> = {};

        // 備份並清除現有內聯樣式
        Object.keys(expectedShades).forEach(shade => {
            const property = `--color-vdt-theme-${shade}`;
            inlineBackup[property] = container.style.getPropertyValue(property);
            container.style.removeProperty(property);
        });

        // 檢查計算樣式
        const computedStyle = getComputedStyle(container);
        const theme500FromCSS = computedStyle.getPropertyValue('--color-vdt-theme-500').trim();

        // 恢復內聯樣式
        Object.entries(inlineBackup).forEach(([property, value]) => {
            if (value) {
                container.style.setProperty(property, value);
            }
        });

        // 如果 CSS 中沒有值，肯定沒有覆蓋
        if (!theme500FromCSS) return false;

        // 預設 violet 500 值
        const defaultViolet500 = 'oklch(60.6% 0.25 292.717)';
        const expectedValue = expectedShades['500'];

        // 使用數值比較
        const isDefaultColor = this.isOklchEqual(theme500FromCSS, defaultViolet500);
        const isExpectedColor = this.isOklchEqual(theme500FromCSS, expectedValue);

        // 如果既不是預設值也不是期待值，才認為是用戶覆蓋
        const hasOverride = !isDefaultColor && !isExpectedColor;

        return hasOverride;
    }

    /**
     * 解析 OKLCH 值為數值以便比較
     */
    private parseOklchForComparison(color: string): { l: number, c: number, h: number } | null {
        const match = color.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/);
        if (!match) return null;

        return {
            l: parseFloat(match[1]),
            c: parseFloat(match[2]),
            h: parseFloat(match[3])
        };
    }

    /**
     * 比較兩個 OKLCH 顏色是否相等（容許小數點誤差）
     */
    private isOklchEqual(color1: string, color2: string, tolerance = 0.001): boolean {
        const parsed1 = this.parseOklchForComparison(color1);
        const parsed2 = this.parseOklchForComparison(color2);

        if (!parsed1 || !parsed2) {
            return color1.trim() === color2.trim();
        }

        return Math.abs(parsed1.l - parsed2.l) < tolerance &&
            Math.abs(parsed1.c - parsed2.c) < tolerance &&
            Math.abs(parsed1.h - parsed2.h) < tolerance;
    }

    /**
     * 通知監聽器
     */
    private notifyListeners(instanceId: string): void {
        const state = this.instances.get(instanceId);
        const listeners = this.listeners.get(instanceId);

        if (state && listeners) {
            listeners.forEach(listener => listener({ ...state }));
        }
    }

    /**
     * 設置主題模式
     */
    setMode(instanceId: string, mode: ThemeMode | 'auto'): void {
        const state = this.instances.get(instanceId);
        if (!state) return;

        state.userPreference = mode;
        this.updateCurrentMode(instanceId);
    }

    /**
     * 設置主題顏色
     */
    setColor(instanceId: string, color: TailwindColor | string): void {
        const state = this.instances.get(instanceId);
        if (!state) return;

        const resolvedColor = findClosestTailwindColor(color as string);
        state.color = resolvedColor;
        this.applyColorToDOM(instanceId);
        this.notifyListeners(instanceId);
    }

    /**
     * 獲取實例狀態
     */
    getState(instanceId: string): ThemeState | null {
        const state = this.instances.get(instanceId);
        return state ? { ...state } : null;
    }

    /**
     * 獲取主題類別（用於組件）
     */
    getThemeClasses(instanceId: string): Record<string, boolean> {
        const state = this.instances.get(instanceId);
        if (!state) return {};

        return {
            // 穩定的通用類名
            'vdt-datatable': true,
            'vdt-themed': true,

            // 主題色相關類名
            [`vdt-theme-${state.color}`]: true,

            // 模式相關類名
            [`vdt-mode-${state.currentMode}`]: true,
            'vdt-mode-auto': state.userPreference === 'auto',

            // 實例相關（用於調試，但不應用於 CSS）
            [`vdt-instance-${instanceId}`]: true,
        };
    }

    /**
     * 獲取容器屬性
     */
    getContainerAttributes(instanceId: string): Record<string, string> {
        const state = this.instances.get(instanceId);
        if (!state) return {};

        const attributes: Record<string, string> = {
            'data-vdt-instance': instanceId,
            'data-vdt-theme': state.color,
            'data-vdt-mode-preference': state.userPreference,
        };

        // 只有在非 auto 模式時才設置 data-vdt-mode
        if (state.userPreference !== 'auto') {
            attributes['data-vdt-mode'] = state.currentMode;
        }

        return attributes;
    }

    /**
     * 強制重新應用主題（用於調試或強制刷新）
     */
    reapplyTheme(instanceId: string): void {
        this.applyColorToDOM(instanceId);
        this.applyModeToDOM(instanceId);
    }

    /**
     * 添加監聽器
     */
    addListener(instanceId: string, listener: (state: ThemeState) => void): () => void {
        const listeners = this.listeners.get(instanceId);
        if (!listeners) return () => { };

        listeners.push(listener);

        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }

    /**
     * 銷毀管理器
     */
    destroy(): void {
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
        }
        this.instances.clear();
        this.listeners.clear();
    }
}

// 創建全局實例
export const themeManager = new ThemeManager();
export default themeManager;
