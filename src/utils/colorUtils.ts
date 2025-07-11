/**
 * colorUtils.ts - 重構版
 * 職責：純顏色轉換工具函數，不涉及 DOM 操作
 */
import type { TailwindColor } from '../types/main';
import { tailwindColors } from './tailwind4-color';

// 顏色解析和轉換相關的介面
export interface OklchColor {
    lightness: number;
    chroma: number;
    hue: number;
}

export interface RgbColor {
    r: number;
    g: number;
    b: number;
}

export interface LabColor {
    l: number;
    a: number;
    b: number;
}

export interface LchColor {
    l: number;
    c: number;
    h: number;
}

/**
 * 解析 OKLCH 顏色格式
 */
export function parseOklch(color: string): OklchColor | null {
    const match = color.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
    if (!match) return null;

    const [_, lightness, chroma, hue] = match.map(Number);
    return { lightness, chroma, hue };
}

/**
 * 將十六進制顏色轉換為 RGB
 */
export function hexToRgb(hex: string): RgbColor {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const rVal = parseInt(hex.slice(0, 2), 16);
    const gVal = parseInt(hex.slice(2, 4), 16);
    const bVal = parseInt(hex.slice(4, 6), 16);

    return {
        r: rVal / 255,
        g: gVal / 255,
        b: bVal / 255
    };
}

/**
 * 解析 RGB 顏色格式
 */
export function parseRgb(color: string): RgbColor | null {
    // 處理 rgb(255, 0, 0) 格式
    const rgbMatch = color.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
    if (rgbMatch) {
        const [_, rVal, gVal, bVal] = rgbMatch.map(Number);
        return {
            r: Math.max(0, Math.min(255, rVal)) / 255,
            g: Math.max(0, Math.min(255, gVal)) / 255,
            b: Math.max(0, Math.min(255, bVal)) / 255
        };
    }

    // 處理 rgba(255, 0, 0, 0.5) 格式
    const rgbaMatch = color.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9]*\.?[0-9]+)\s*\)$/);
    if (rgbaMatch) {
        const [_, rVal, gVal, bVal] = rgbaMatch.map(Number);
        return {
            r: Math.max(0, Math.min(255, rVal)) / 255,
            g: Math.max(0, Math.min(255, gVal)) / 255,
            b: Math.max(0, Math.min(255, bVal)) / 255
        };
    }

    return null;
}

/**
 * RGB 轉 Lab 顏色空間
 */
export function rgbToLab(rgb: RgbColor): LabColor {
    const { r, g, b: rgbB } = rgb;

    // 伽瑪校正
    const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const linearB = rgbB <= 0.04045 ? rgbB / 12.92 : Math.pow((rgbB + 0.055) / 1.055, 2.4);

    // 轉換為 XYZ
    const x = 0.4124 * linearR + 0.3576 * linearG + 0.1805 * linearB;
    const y = 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
    const z = 0.0193 * linearR + 0.1192 * linearG + 0.9505 * linearB;

    // 參考白點
    const xn = 0.95047;
    const yn = 1.0;
    const zn = 1.08883;

    // XYZ 轉 Lab
    const fx = x > 0.008856 ? Math.pow(x / xn, 1 / 3) : (7.787 * x / xn) + 16 / 116;
    const fy = y > 0.008856 ? Math.pow(y / yn, 1 / 3) : (7.787 * y / yn) + 16 / 116;
    const fz = z > 0.008856 ? Math.pow(z / zn, 1 / 3) : (7.787 * z / zn) + 16 / 116;

    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);

    return { l, a, b };
}

/**
 * Lab 轉 LCH（極坐標形式）
 */
export function labToLch(lab: LabColor): LchColor {
    const { l, a, b } = lab;
    const c = Math.sqrt(a * a + b * b);
    let h = Math.atan2(b, a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return { l, c, h };
}

/**
 * 十六進制轉 OKLCH（近似）
 */
export function hexToOklch(hex: string): OklchColor {
    const rgb = hexToRgb(hex);
    const lab = rgbToLab(rgb);
    const lch = labToLch(lab);

    // 調整色相映射以更接近 OKLCH
    let adjustedHue = lch.h;
    if (adjustedHue > 0 && adjustedHue < 60) {
        adjustedHue = adjustedHue * 0.7; // 壓縮紅-橙區間
    }

    return {
        lightness: lch.l,
        chroma: Math.min(lch.c / 150, 0.4),
        hue: adjustedHue
    };
}

/**
 * RGB 轉 OKLCH（通過 Lab）
 */
export function rgbToOklch(rgb: RgbColor): OklchColor {
    const lab = rgbToLab(rgb);
    const lch = labToLch(lab);

    // 調整色相映射以更接近 OKLCH
    let adjustedHue = lch.h;
    if (adjustedHue > 0 && adjustedHue < 60) {
        adjustedHue = adjustedHue * 0.7; // 壓縮紅-橙區間
    }

    return {
        lightness: lch.l,
        chroma: Math.min(lch.c / 150, 0.4),
        hue: adjustedHue
    };
}

/**
 * 計算顏色距離
 */
export function calculateColorDistance(color1: OklchColor, color2: OklchColor): number {
    const hueDiff = Math.min(
        Math.abs(color1.hue - color2.hue),
        360 - Math.abs(color1.hue - color2.hue)
    );

    const hueFactor = hueDiff > 60 ? 30 : 5;

    return Math.sqrt(
        Math.pow((color1.lightness - color2.lightness) * 1.5, 2) +
        Math.pow((color1.chroma - color2.chroma) * 2, 2) +
        Math.pow((hueDiff / 360) * hueFactor, 2) * 100
    );
}

/**
 * 顏色格式檢測
 */
export function isOklch(color: string): boolean {
    return color.startsWith('oklch(');
}

export function isHex(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isTailwindColor(color: string): boolean {
    return color in tailwindColors;
}

export function isRGB(color: string): boolean {
    return color.startsWith('rgb(') || color.startsWith('rgba(');
}

/**
 * 查找最接近的 Tailwind 顏色
 */
export function findClosestTailwindColor(inputColor: string): TailwindColor {
    const defaultColor: TailwindColor = 'violet';

    // 如果已經是 Tailwind 顏色名稱
    if (isTailwindColor(inputColor)) {
        return inputColor as TailwindColor;
    }

    let targetOklch: OklchColor | null = null;

    // 解析輸入顏色
    if (isOklch(inputColor)) {
        targetOklch = parseOklch(inputColor);
    } else if (isHex(inputColor)) {
        targetOklch = hexToOklch(inputColor);
    } else if (isRGB(inputColor)) {
        const rgb = parseRgb(inputColor);
        console.log('Parsed RGB:', rgb);
        if (rgb) {
            targetOklch = rgbToOklch(rgb);
            console.log('Converted to OKLCH:', targetOklch);
        }
    }

    if (!targetOklch) return defaultColor;

    // 查找最接近的顏色
    let closestColor: TailwindColor = defaultColor;
    let minDistance = Infinity;

    for (const [colorName, shades] of Object.entries(tailwindColors)) {
        // 只檢查主要色階
        for (const shade of ['300', '400', '500', '600', '700']) {
            const colorValue = shades[shade];
            if (!colorValue) continue;

            const parsedColor = parseOklch(colorValue);
            if (!parsedColor) continue;

            const distance = calculateColorDistance(targetOklch, parsedColor);
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = colorName as TailwindColor;
            }
        }
    }

    return closestColor;
}

/**
 * 獲取顏色的所有色階
 */
export function getColorShades(color: TailwindColor): Record<string, string> {
    return tailwindColors[color] || {};
}

/**
 * 獲取特定色階的顏色值
 */
export function getColorValue(color: TailwindColor, shade: string = '500'): string {
    const shades = getColorShades(color);
    return shades[shade] || shades['500'] || shades['400'] || '';
}
