import { describe, it, expect } from 'vitest';
import { getItemKey, omitUiFields } from '../itemKey';

describe('omitUiFields', () => {
    it('removes checkbox/index without mutating the input', () => {
        const item = { id: 1, checkbox: true, index: 3, name: 'x' };
        const clean = omitUiFields(item);
        expect(clean).toEqual({ id: 1, name: 'x' });
        // 原物件不被改動
        expect(item.checkbox).toBe(true);
        expect(item.index).toBe(3);
    });
});

describe('getItemKey', () => {
    it('uses the itemKey field when provided', () => {
        expect(getItemKey({ id: 7, name: 'a' }, 'id')).toBe('7');
    });

    it('falls back to item.key', () => {
        expect(getItemKey({ key: 'k1', name: 'a' })).toBe('k1');
    });

    it('content fallback ignores checkbox/index', () => {
        const a = { name: 'Alice', age: 20 };
        const b = { name: 'Alice', age: 20, checkbox: true, index: 1 };
        expect(getItemKey(a)).toBe(getItemKey(b));
    });

    it('different content yields different keys', () => {
        expect(getItemKey({ name: 'A' })).not.toBe(getItemKey({ name: 'B' }));
    });

    it('itemKey takes precedence over differing content', () => {
        expect(getItemKey({ id: 1, name: 'A' }, 'id')).toBe(getItemKey({ id: 1, name: 'B' }, 'id'));
    });
});
