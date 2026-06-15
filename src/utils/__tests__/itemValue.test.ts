import { describe, it, expect } from 'vitest';
import { getItemValue, generateColumnContent } from '../itemValue';

describe('getItemValue', () => {
    it('reads a top-level field', () => {
        expect(getItemValue('name', { name: 'Alice' })).toBe('Alice');
    });

    it('reads a nested dot path', () => {
        expect(getItemValue('a.b.c', { a: { b: { c: 42 } } })).toBe(42);
    });

    it('returns empty string for a missing nested leaf', () => {
        expect(getItemValue('a.b.x', { a: { b: {} } })).toBe('');
    });

    it('returns empty string when an intermediate node is not an object', () => {
        expect(getItemValue('a.b', { a: 5 })).toBe('');
    });

    it('returns empty string for a missing top-level field', () => {
        expect(getItemValue('missing', { name: 'x' })).toBe('');
    });
});

describe('generateColumnContent', () => {
    it('joins array values with a comma', () => {
        expect(generateColumnContent('tags', { tags: ['a', 'b'] })).toBe('a,b');
    });

    it('returns a scalar value as-is', () => {
        expect(generateColumnContent('age', { age: 20 })).toBe(20);
    });
});
