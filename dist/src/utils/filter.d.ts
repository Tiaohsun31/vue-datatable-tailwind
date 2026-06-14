import { FilterOption, NumberFilterOption, StringFilterOption, ArrayFilterOption, CustomFilterOption } from '../types/main';
export declare function isNumberFilterOption(option: FilterOption): option is NumberFilterOption;
export declare function isArrayFilterOption(option: FilterOption): option is ArrayFilterOption;
export declare function isCustomFilterOption(option: FilterOption): option is CustomFilterOption;
export declare function isNumeric(value: any): value is number;
export declare const createFilter: {
    number(field: string, comparison: NumberFilterOption["comparison"], criteria: number | [number, number]): NumberFilterOption;
    string(field: string, comparison: StringFilterOption["comparison"], criteria: string): StringFilterOption;
    array(field: string, criteria: (string | number)[]): ArrayFilterOption;
    custom<T = any>(field: string, comparison: (value: any, criteria: T) => boolean, criteria: T): CustomFilterOption;
};
//# sourceMappingURL=filter.d.ts.map