import { describe, it, expect } from 'vitest';
import { resolvePrimaryColor } from '../useTheme';

describe('resolvePrimaryColor', () => {
    it('maps a tailwind color name to its oklch base value', () => {
        expect(resolvePrimaryColor('indigo')).toBe('oklch(58.5% 0.233 277.117)');
    });

    it('passes a hex value through unchanged', () => {
        expect(resolvePrimaryColor('#42b883')).toBe('#42b883');
    });

    it('passes an oklch value through unchanged', () => {
        expect(resolvePrimaryColor('oklch(60% 0.1 200)')).toBe('oklch(60% 0.1 200)');
    });

    it('defaults to indigo when no value is given', () => {
        expect(resolvePrimaryColor()).toBe('oklch(58.5% 0.233 277.117)');
    });
});
