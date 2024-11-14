// src/components/DataTables/types/main.d.ts
import type { Ref, ComputedRef } from 'vue'

export type SortType = 'asc' | 'desc'

// 基本比較操作符
export type FilterComparison = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'in';
// export type FilterCriteria = number | string | [number, number] | (number | string)[]
// export type FilterComparisonFn = (value: any, criteria: string) => boolean

// 數字過濾選項
export interface NumberFilterOption {
    field: string
    comparison: '>' | '>=' | '<' | '<=' | 'between'
    criteria: number | [number, number]
}

// 字符串過濾選項
export interface StringFilterOption {
    field: string
    comparison: '=' | '!='
    criteria: string
}

// 數組過濾選項
export interface ArrayFilterOption {
    field: string
    comparison: 'in'
    criteria: (string | number)[]
}

// 自定義過濾選項
export interface CustomFilterOption {
    field: string
    comparison: (value: any, criteria: any) => boolean
    criteria: any
}

// 簡化的過濾選項 - 為了向後兼容和易用性
export interface SimpleFilterOption {
    field: string;
    comparison: string;
    criteria: any;
}

// 聯合類型 - 允許所有可能的過濾選項類型
export type FilterOption =
    | NumberFilterOption
    | StringFilterOption
    | ArrayFilterOption
    | CustomFilterOption
    | SimpleFilterOption;

// 輔助型別檢查函數
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

// 輔助函數 - 幫助創建過濾器
export const createFilter = {
    number(field: string, comparison: NumberFilterOption['comparison'], criteria: number | [number, number]): NumberFilterOption {
        return { field, comparison, criteria };
    },

    string(field: string, comparison: StringFilterOption['comparison'], criteria: string): StringFilterOption {
        return { field, comparison, criteria };
    },

    array(field: string, criteria: (string | number)[]): ArrayFilterOption {
        return { field, comparison: 'in', criteria };
    },

    custom<T = any>(
        field: string,
        comparison: (value: any, criteria: T) => boolean,
        criteria: T
    ): CustomFilterOption {
        return { field, comparison, criteria };
    }
};

/*
    1. 簡單方式（向後兼容）
    const filterOptions = computed(() => {
        const filterOptionsArray = [];
        if (filter.value.status !== 'all') {
            filterOptionsArray.push({
                field: 'logisticsStatus',
                comparison: '=',
                criteria: filter.value.status,
            });
        }
        return filterOptionsArray;
    });

    2. 使用 createFilter
    import { createFilter } from './types/main';
    const filterOptions = computed(() => {
        const filterOptionsArray = [];

        if (filter.value.status !== 'all') {
            filterOptionsArray.push(
                createFilter.string('logisticsStatus', '=', filter.value.status)
            );
        }

        if (filter.value.price) {
            filterOptionsArray.push(
                createFilter.number('price', '>=', filter.value.price)
            );
        }

        if (filter.value.categories?.length) {
            filterOptionsArray.push(
                createFilter.array('category', filter.value.categories)
            );
        }

        return filterOptionsArray;
    });

    3. 自定義複雜過濾
    const filterOptions = computed(() => {
        const filterOptionsArray = [];

        filterOptionsArray.push(
            createFilter.custom('complexField',
                (value, criteria) => {
                    // 自定義過濾邏輯
                    return value.someProperty === criteria.expectedValue;
                },
                { expectedValue: 'something' }
            )
        );

        return filterOptionsArray;
    });
*/

export type Item = Record<string, any>

export type Header = {
    text: string
    value: string
    sortable?: boolean
    fixed?: boolean
    width?: number
}

export type ServerOptions = {
    page: number
    rowsPerPage: number
    sortBy?: string | string[]
    sortType?: SortType | SortType[]
}

export type ClickRowArgument = Item & {
    isSelected?: boolean
    indexInCurrentPage?: number
}

export type UpdateSortArgument = {
    sortType: SortType | null
    sortBy: string
}

export type HeaderItemClassNameFunction = (header: Header, columnNumber: number) => string
export type BodyRowClassNameFunction = (item: Item, rowNumber: number) => string
export type BodyItemClassNameFunction = (column: string, rowNumber: number) => string

export type TextDirection = 'center' | 'left' | 'right'

export interface UseHeadersOptions {
    headers: Ref<Header[]>
    sortBy: Ref<string | string[]>
    sortType: Ref<SortType | SortType[]>
    multiSort: ComputedRef<boolean>
    mustSort: ComputedRef<boolean>
}

export interface UseRowsOptions {
    rowsPerPage: Ref<number>
    rowsItems: ComputedRef<number[]>
    serverOptions: Ref<ServerOptions | null>
}

export interface UsePaginationOptions {
    currentPage: Ref<number>
    rowsPerPage: Ref<number>
    totalItems: ComputedRef<number>
    serverOptions: Ref<ServerOptions | null>
}

export interface UseTotalItemsOptions {
    items: Ref<Item[]>
    currentPaginationNumber: Ref<number>
    rowsPerPage: Ref<number>
    sortBy: Ref<string | string[]>
    sortType: Ref<SortType | SortType[]>
    filterOptions: Ref<FilterOption[]>
    searchField: Ref<string | string[]>
    searchValue: Ref<string>
    serverItemsLength: ComputedRef<number>
    isServerMode: ComputedRef<boolean>
}

export interface UseSortOptions {
    sortBy: Ref<string | string[]>
    sortType: Ref<SortType | SortType[]>
    multiSort: ComputedRef<boolean>
    emit: (event: string, ...args: any[]) => void
}
