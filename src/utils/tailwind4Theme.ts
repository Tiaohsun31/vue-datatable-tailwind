import type { TailwindColor } from '../types/main';
import { tailwindColors, getAllShades } from './tailwind4-color';

// 用於簡單返回的主題信息
export interface ThemeInfo {
    color: TailwindColor;
    mainColor: string; // 主顏色值
}

/**
 * 解析OKLCH顏色格式
 * @param color OKLCH顏色字符串
 * @returns 包含亮度、彩度和色相的對象，若無效則返回null
 */
function parseOklch(color: string): { lightness: number, chroma: number, hue: number } | null {
    const match = color.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
    if (!match) return null;

    const [_, lightness, chroma, hue] = match.map(Number);
    return { lightness, chroma, hue };
}

/**
 * 將十六進制顏色轉換為RGB值
 */
function hexToRgb(hex: string): { r: number, g: number, b: number } {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    return { r, g, b };
}

/**
 * 將RGB轉換為近似的Lab顏色空間
 */
function rgbToLab(rgb: { r: number, g: number, b: number }): { l: number, a: number, b: number } {
    const { r, g, b: bValue } = rgb;

    // 轉換為線性RGB（伽瑪校正）
    const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const linearB = bValue <= 0.04045 ? bValue / 12.92 : Math.pow((bValue + 0.055) / 1.055, 2.4);

    // 轉換為XYZ
    const x = 0.4124 * linearR + 0.3576 * linearG + 0.1805 * linearB;
    const y = 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
    const z = 0.0193 * linearR + 0.1192 * linearG + 0.9505 * linearB;

    // 參考白點
    const xn = 0.95047;
    const yn = 1.0;
    const zn = 1.08883;

    // XYZ轉Lab
    const fx = x > 0.008856 ? Math.pow(x / xn, 1 / 3) : (7.787 * x / xn) + 16 / 116;
    const fy = y > 0.008856 ? Math.pow(y / yn, 1 / 3) : (7.787 * y / yn) + 16 / 116;
    const fz = z > 0.008856 ? Math.pow(z / zn, 1 / 3) : (7.787 * z / zn) + 16 / 116;

    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);

    return { l, a, b };
}

/**
 * 將Lab轉換為LCH（Lab的極坐標形式）
 */
function labToLch(lab: { l: number, a: number, b: number }): { l: number, c: number, h: number } {
    const { l, a, b } = lab;

    const c = Math.sqrt(a * a + b * b);
    let h = Math.atan2(b, a) * 180 / Math.PI;
    if (h < 0) h += 360;

    return { l, c, h };
}

/**
 * 將十六進制顏色轉換為近似的Oklch值
 */
function hexToOklch(hex: string): { lightness: number, chroma: number, hue: number } {
    const rgb = hexToRgb(hex);
    const lab = rgbToLab(rgb);
    const lch = labToLch(lab);

    return {
        lightness: lch.l,
        chroma: Math.min(lch.c / 150, 0.4), // 限制在合理範圍內
        hue: lch.h
    };
}

/**
 * 判斷是否為有效的OKLCH顏色格式
 */
function isOklch(color: string): boolean {
    return /^oklch\(/.test(color);
}

/**
 * 判斷是否為十六進制顏色
 */
function isHex(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * 計算Oklch空間中兩種顏色的感知距離
 */
function calculateColorDistance(color1: { lightness: number, chroma: number, hue: number },
    color2: { lightness: number, chroma: number, hue: number }): number {
    // 計算色相差異（考慮色相的循環性質）
    const hueDiff = Math.min(
        Math.abs(color1.hue - color2.hue),
        360 - Math.abs(color1.hue - color2.hue)
    );

    // 對於差異很大的色相，我們希望強調這種差異
    const hueFactor = hueDiff > 60 ? 30 : 5;

    // 計算加權距離，強調色相
    return Math.sqrt(
        Math.pow((color1.lightness - color2.lightness) * 1.5, 2) +
        Math.pow((color1.chroma - color2.chroma) * 2, 2) +
        Math.pow((hueDiff / 360) * hueFactor, 2) * 100
    );
}

/**
 * 查找Tailwind顏色表中最接近的顏色
 */
function findClosestColor(targetColor: { lightness: number, chroma: number, hue: number },
    colorMap: Record<string, Record<string, string>>): { color: string, shade: string, distance: number } {
    let closestColor = 'indigo';
    let closestShade = '500';
    let minDistance = Infinity;

    // 遍歷所有Tailwind顏色
    for (const [colorName, shades] of Object.entries(colorMap)) {
        for (const [shade, colorValue] of Object.entries(shades)) {
            // 只考慮300-700這幾個主要色階
            if (!['300', '400', '500', '600', '700'].includes(shade)) continue;

            const parsedColor = parseOklch(colorValue);
            if (!parsedColor) continue;

            const distance = calculateColorDistance(targetColor, parsedColor);

            if (distance < minDistance) {
                minDistance = distance;
                closestColor = colorName;
                closestShade = shade;
            }
        }
    }

    return { color: closestColor, shade: closestShade, distance: minDistance };
}

/**
 * 查找最接近輸入顏色的Tailwind顏色
 */
export function findClosestTailwindColor(color: string): TailwindColor {
    // 預設顏色
    const defaultColor: TailwindColor = 'indigo';

    // 處理OKLCH輸入
    if (isOklch(color)) {
        const parsedOklch = parseOklch(color);
        if (!parsedOklch) return defaultColor;

        const result = findClosestColor(parsedOklch, tailwindColors);
        return result.color as TailwindColor;
    }

    // 處理十六進制輸入
    if (isHex(color)) {
        const oklchValues = hexToOklch(color);
        const result = findClosestColor(oklchValues, tailwindColors);
        return result.color as TailwindColor;
    }

    // 如果不是OKLCH或十六進制，假設已經是Tailwind顏色名稱
    return color as TailwindColor;
}

/**
 * 生成所有色階的CSS變數
 */
export function generateThemeVariables(color: TailwindColor): Record<string, string> {
    const colorShades = getAllShades(color);
    const variables: Record<string, string> = {};

    // 設置所有主題色階變數
    Object.entries(colorShades).forEach(([shade, value]) => {
        variables[`--vdt-theme-${shade}`] = value;
    });

    return variables;
}

/**
 * 將主題變數應用到CSS
 */
export function applyThemeToCSS(color: TailwindColor | string): void {
    // 如果是字符串且不是Tailwind顏色名，查找最接近的Tailwind顏色
    const tailwindColor = typeof color === 'string' && (isHex(color) || isOklch(color))
        ? findClosestTailwindColor(color)
        : color as TailwindColor;

    const variables = generateThemeVariables(tailwindColor);
    const root = document.documentElement;

    // 應用每個變數到:root
    Object.entries(variables).forEach(([name, value]) => {
        root.style.setProperty(name, value);
    });
}

/**
 * 設置主題顏色並返回主題信息
 */
export function setTheme(color: TailwindColor | string): ThemeInfo {
    // 確保我們有一個有效的Tailwind顏色
    const tailwindColor = typeof color === 'string' && (isHex(color) || isOklch(color))
        ? findClosestTailwindColor(color)
        : color as TailwindColor;

    // 應用到CSS變數
    applyThemeToCSS(tailwindColor);

    // 返回基本主題信息
    return {
        color: tailwindColor,
        mainColor: getAllShades(tailwindColor)['500'] || getAllShades(tailwindColor)['400']
    };
}

/**
 * 獲取特定色階的顏色值
 */
export function getColorValue(color: TailwindColor, shade: string = '500'): string {
    const shades = getAllShades(color);
    return shades[shade] || shades['500'] || shades['400'];
}

/**
 * 獲取顏色的所有色階
 */
export function getColorShades(color: TailwindColor | string): Record<string, string> {
    // 如果不是Tailwind顏色，找到最接近的
    const tailwindColor = typeof color === 'string' && (isHex(color) || isOklch(color))
        ? findClosestTailwindColor(color)
        : color as TailwindColor;

    return getAllShades(tailwindColor);
}
