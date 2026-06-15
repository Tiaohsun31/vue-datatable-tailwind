import { describe, it, expect } from 'vitest';
import {
    isNumberFilterOption,
    isArrayFilterOption,
    isCustomFilterOption,
    isNumeric,
    createFilter,
} from '../filter';

describe('filter type guards', () => {
    it('isNumeric', () => {
        expect(isNumeric(5)).toBe(true);
        expect(isNumeric(Number.NaN)).toBe(false);
        expect(isNumeric('5')).toBe(false);
    });

    it('isNumberFilterOption', () => {
        expect(isNumberFilterOption({ field: 'a', comparison: '>', criteria: 1 })).toBe(true);
        expect(isNumberFilterOption({ field: 'a', comparison: '=', criteria: 1 })).toBe(false);
    });

    it('isArrayFilterOption', () => {
        expect(isArrayFilterOption({ field: 'a', comparison: 'in', criteria: [1] })).toBe(true);
        expect(isArrayFilterOption({ field: 'a', comparison: '=', criteria: 1 })).toBe(false);
    });

    it('isCustomFilterOption', () => {
        expect(isCustomFilterOption({ field: 'a', comparison: () => true, criteria: 1 })).toBe(true);
        expect(isCustomFilterOption({ field: 'a', comparison: '=', criteria: 1 })).toBe(false);
    });
});

describe('createFilter', () => {
    it('number', () => {
        expect(createFilter.number('age', '>=', 18)).toEqual({ field: 'age', comparison: '>=', criteria: 18 });
    });

    it('string', () => {
        expect(createFilter.string('name', '=', 'x')).toEqual({ field: 'name', comparison: '=', criteria: 'x' });
    });

    it('array', () => {
        expect(createFilter.array('city', ['A', 'B'])).toEqual({ field: 'city', comparison: 'in', criteria: ['A', 'B'] });
    });

    it('custom', () => {
        const fn = (v: number) => v > 0;
        expect(createFilter.custom('n', fn, 0)).toEqual({ field: 'n', comparison: fn, criteria: 0 });
    });
});
