import type {
    FilterOption,
    NumberFilterOption,
    StringFilterOption,
    ArrayFilterOption,
    CustomFilterOption
} from '../types/main'

// 類型守衛
export function isNumberFilterOption(option: FilterOption): option is NumberFilterOption {
    return ['>', '>=', '<', '<=', 'between'].includes(option.comparison as string)
}

export function isArrayFilterOption(option: FilterOption): option is ArrayFilterOption {
    return option.comparison === 'in'
}

export function isCustomFilterOption(option: FilterOption): option is CustomFilterOption {
    return typeof option.comparison === 'function'
}

export function isNumeric(value: any): value is number {
    return typeof value === 'number' && !isNaN(value)
}

// 創建過濾器的工具函數
export const createFilter = {
    number(field: string, comparison: NumberFilterOption['comparison'], criteria: number | [number, number]): NumberFilterOption {
        return { field, comparison, criteria }
    },

    string(field: string, comparison: StringFilterOption['comparison'], criteria: string): StringFilterOption {
        return { field, comparison, criteria }
    },

    array(field: string, criteria: (string | number)[]): ArrayFilterOption {
        return { field, comparison: 'in', criteria }
    },

    custom<T = any>(
        field: string,
        comparison: (value: any, criteria: T) => boolean,
        criteria: T
    ): CustomFilterOption {
        return { field, comparison, criteria }
    }
}
