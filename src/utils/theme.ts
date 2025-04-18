import { slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose } from 'tailwindcss/colors';
import type { TailwindColor, ThemeVariant, ThemeConfig, TailwindShade } from '../types/main';
import type { ThemeStateClasses } from '@/types/internal';

const safeColors = {
    slate, gray, zinc, neutral, stone, red, orange, amber, yellow,
    lime, green, emerald, teal, cyan, sky, blue, indigo, violet,
    purple, fuchsia, pink, rose
};

// 映射 variant 到對應的色階
const variantToShade: Record<ThemeVariant, TailwindShade> = {
    light: '400',
    DEFAULT: '500',
    dark: '600'
} as const;

// 尋找最接近的 Tailwind 顏色
export const findClosestTailwindColor = (hex: string): ThemeConfig => {
    const targetRgb = hexToRgb(hex);
    if (!targetRgb) return { color: 'indigo', variant: 'DEFAULT' };

    let closestColor: ThemeConfig = { color: 'indigo', variant: 'DEFAULT' };
    let minDistance = Infinity;

    // 構建要比對的顏色映射
    const colorMap = Object.entries(safeColors).reduce((acc, [colorName, colorValue]) => {
        if (typeof colorValue === 'object') {
            const color = colorName as TailwindColor;
            Object.entries(variantToShade).forEach(([variant, shade]) => {
                if (colorValue[shade]) {
                    acc[colorValue[shade]] = { color, variant: variant as ThemeVariant };
                }
            });
        }
        return acc;
    }, {} as Record<string, { color: TailwindColor; variant: ThemeVariant }>);

    Object.entries(colorMap).forEach(([mapHex, config]) => {
        const currentRgb = hexToRgb(mapHex);
        if (!currentRgb) return;

        const distance = getColorDistance(targetRgb, currentRgb);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = config;
        }
    });

    return closestColor;
};

const generateThemeStyles = (color: TailwindColor, variant: ThemeVariant) => {
    const shade = variantToShade[variant];
    const hoverShade = variant === 'dark' ? '700' : variant === 'DEFAULT' ? '600' : '500';
    const lightShade = '400';
    return {
        '--theme-color': safeColors[color][shade],
        '--theme-border': safeColors[color][shade],
        '--theme-hover': safeColors[color][hoverShade],
        '--theme-active': safeColors[color][variant === 'light' ? '500' : variant === 'DEFAULT' ? '600' : '700'],
        '--theme-disabled': safeColors.gray[300],
        '--theme-light': safeColors[color][lightShade],
        '--theme-focus': safeColors[color][shade] + '80' // 添加 50% 透明度
    };
};

export const getThemeStateClasses = (theme: ThemeConfig | string): ThemeStateClasses => {
    // 首先獲取基礎顏色信息
    const { color: tailwindColor, variant = 'DEFAULT' } = typeof theme === 'string' && theme.startsWith('#')
        ? findClosestTailwindColor(theme)
        : typeof theme === 'object'
            ? theme
            : { color: theme as TailwindColor, variant: 'DEFAULT' };
    return {
        base: 'bg-theme border-theme text-white',
        hover: 'hover:bg-theme-hover',
        active: 'active:bg-theme-active',
        disabled: 'bg-gray-300 cursor-not-allowed',
        hex: typeof theme === 'string' && theme.startsWith('#')
            ? theme
            : safeColors[tailwindColor][variantToShade[variant]],
        tailwindName: tailwindColor,
        style: generateThemeStyles(tailwindColor, variant)
    };
};

export function getThemeColor(theme: ThemeConfig | string): TailwindColor {
    if (typeof theme === 'string') {
        if (theme.startsWith('#')) {
            return findClosestTailwindColor(theme).color;
        }
        return theme as TailwindColor;
    }
    return theme.color;
}

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getColorDistance(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }): number {
    return Math.sqrt(
        Math.pow(color2.r - color1.r, 2) +
        Math.pow(color2.g - color1.g, 2) +
        Math.pow(color2.b - color1.b, 2)
    );
}

export const getTailwindColorValue = (color: TailwindColor, variant: ThemeVariant = 'DEFAULT'): string => {
    const shade = variantToShade[variant];
    return safeColors[color][shade];
};

export const getThemeVars = (theme: ThemeConfig | string): Record<string, string> => {
    const classes = getThemeStateClasses(theme);

    return classes.style;
};
