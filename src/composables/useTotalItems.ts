import {
    type Ref, computed, type ComputedRef, watch,
} from 'vue';
import type { Item, FilterOption, NumberFilterOption } from '../types/main';
import { isNumeric, isArrayFilterOption, isNumberFilterOption, isCustomFilterOption } from '../types/main';
import type { ClientSortOptions, EmitsEventName } from '../types/internal';
import { getItemValue } from '../utils/utils';
import { useBatchSelection } from './useBatchSelection';

export default function useTotalItems(
    clientSortOptions: Ref<ClientSortOptions | null>,
    filterOptions: Ref<FilterOption[] | null>,
    isServerSideMode: ComputedRef<boolean>,
    items: Ref<Item[]>,
    itemsSelected: Ref<Item[] | null>,
    searchField: Ref<string | string[]>,
    searchValue: Ref<string>,
    serverItemsLength: Ref<number>,
    multiSort: Ref<boolean>,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {
    // 搜索邏輯
        // 使用 memoization 來優化搜索目標生成
        // const searchTargetCache = new WeakMap<Item, string>();
    
        // const generateSearchingTarget = (item: Item): string => {
        //     let target = searchTargetCache.get(item);
        //     if (!target) {
        //         if (typeof searchField.value === 'string' && searchField.value !== '') {
        //             target = String(getItemValue(searchField.value, item));
        //         } else if (Array.isArray(searchField.value)) {
        //             target = searchField.value
        //                 .map(field => String(getItemValue(field, item)))
        //                 .join(' ');
        //         } else {
        //             target = Object.values(item).map(String).join(' ');
        //         }
        //         searchTargetCache.set(item, target);
        //     }
        //     return target;
        // };
    // const generateSearchingTarget = (item: Item): string => {
    //     if (typeof searchField.value === 'string' && searchField.value !== '') {
    //         const value = getItemValue(searchField.value, item)
    //         return String(value)
    //     }
    //     if (Array.isArray(searchField.value)) {
    //         return searchField.value
    //             .map(field => String(getItemValue(field, item)))
    //             .join(' ')
    //     }
    //     return Object.values(item).map(String).join(' ')
    // }
    const searchTargetCache = new WeakMap<Item, string>();

    const getSearchTarget = (item: Item): string => {
        let target = searchTargetCache.get(item);
        if (!target) {
            if (typeof searchField.value === 'string' && searchField.value !== '') {
                target = String(getItemValue(searchField.value, item));
            } else if (Array.isArray(searchField.value)) {
                target = searchField.value
                    .map(field => String(getItemValue(field, item)))
                    .join(' ');
            } else {
                target = Object.values(item).map(String).join(' ');
            }
            searchTargetCache.set(item, target);
        }
        return target;
    };

    const itemsSearching = computed((): Item[] => {
        if (!isServerSideMode.value && searchValue.value !== '') {
            const regex = new RegExp(searchValue.value, 'i')
            return items.value.filter((item) => regex.test(getSearchTarget(item)))
        }
        return items.value
    })

    // 過濾邏輯
    const handleNumberComparison = (
        itemValue: string | number,
        option: NumberFilterOption
    ): boolean => {
        const numericValue = isNumeric(itemValue) ? itemValue : parseFloat(String(itemValue))

        if (isNaN(numericValue)) return false

        if (option.comparison === 'between' && Array.isArray(option.criteria)) {
            const [min, max] = option.criteria
            return numericValue >= min && numericValue <= max
        }

        const criteriaValue = option.criteria as number
        switch (option.comparison) {
            case '>': return numericValue > criteriaValue
            case '>=': return numericValue >= criteriaValue
            case '<': return numericValue < criteriaValue
            case '<=': return numericValue <= criteriaValue
            default: return false
        }
    }

    // 過濾項目
    const itemsFiltering = computed((): Item[] => {
        if (!filterOptions.value?.length) return itemsSearching.value

        return itemsSearching.value.filter((item) =>
            filterOptions.value!.every((option) => {
                const itemValue = getItemValue(option.field, item)

                if (isCustomFilterOption(option)) {
                    return option.comparison(itemValue, option.criteria)
                }

                if (isNumberFilterOption(option)) {
                    return handleNumberComparison(itemValue, option)
                }

                if (isArrayFilterOption(option)) {
                    return option.criteria.includes(itemValue)
                }

                // String comparison
                return option.comparison === '='
                    ? itemValue === option.criteria
                    : itemValue !== option.criteria
            })
        )
    })

    // 排序邏輯
    const compareValues = (a: any, b: any, isDesc: boolean): number => {
        if (a === b) return 0;
        if (a === null || a === undefined) return 1;
        if (b === null || b === undefined) return -1;
        return a < b ? (isDesc ? 1 : -1) : (isDesc ? -1 : 1);
    };

    const recursionMuiltSort = (
        items: Item[],
        sortByArr: string[],
        sortDescArr: boolean[],
        depth: number
    ): Item[] => {
        if (depth < 0) return items;

        return recursionMuiltSort(items, sortByArr, sortDescArr, depth - 1)
            .sort((a, b) => {
                const isPreviousEqual = sortByArr
                    .slice(0, depth)
                    .every(field => getItemValue(field, a) === getItemValue(field, b));

                if (!isPreviousEqual) return 0;

                const currentField = sortByArr[depth];
                const valueA = getItemValue(currentField, a);
                const valueB = getItemValue(currentField, b);
                return compareValues(valueA, valueB, sortDescArr[depth]);
            });
    };

    // function recursionMuiltSort(sortByArr: string[], sortDescArr: boolean[], itemsToSort: Item[], index: number): Item[] {
    //     const sortBy = sortByArr[index];
    //     const sortDesc = sortDescArr[index];
    //     const sorted = (index === 0 ? itemsToSort
    //         : recursionMuiltSort(sortByArr, sortDescArr, itemsToSort, index - 1)).sort((a: Item, b: Item) => {
    //             let isAllSame = true;
    //             for (let i = 0; i < index; i += 1) {
    //                 if (getItemValue(sortByArr[i], a) !== getItemValue(sortByArr[i], b)) {
    //                     isAllSame = false;
    //                     break;
    //                 }
    //             }
    //             if (isAllSame) {
    //                 if (getItemValue(sortBy as string, a) < getItemValue(sortBy as string, b)) return sortDesc ? 1 : -1;
    //                 if (getItemValue(sortBy as string, a) > getItemValue(sortBy as string, b)) return sortDesc ? -1 : 1;
    //                 return 0;
    //             }
    //             return 0;
    //         });
    //     return sorted;
    // }

    // flow: searching => filtering => sorting
    const totalItems = computed((): Item[] => {
        if (isServerSideMode.value) return items.value;
        if (!clientSortOptions.value) return itemsFiltering.value;

        const { sortBy, sortDesc } = clientSortOptions.value;
        const itemsToSort = [...itemsFiltering.value];

        if (multiSort.value && Array.isArray(sortBy) && Array.isArray(sortDesc)) {
            return sortBy.length
                ? recursionMuiltSort(itemsToSort, sortBy, sortDesc, sortBy.length - 1)
                : itemsToSort;
        }

        return itemsToSort.sort((a, b) => {
            const valueA = getItemValue(sortBy as string, a);
            const valueB = getItemValue(sortBy as string, b);
            return compareValues(valueA, valueB, sortDesc as boolean);
        });
    });
    // const totalItems = computed((): Item[] => {
    //     if (isServerSideMode.value) return items.value;
    //     if (clientSortOptions.value === null) return itemsFiltering.value;
    //     const { sortBy, sortDesc } = clientSortOptions.value;
    //     const itemsFilteringSorted = [...itemsFiltering.value];

    //     if (multiSort.value && Array.isArray(sortBy) && Array.isArray(sortDesc)) {
    //         if (sortBy.length === 0) return itemsFilteringSorted;
    //         return recursionMuiltSort(sortBy, sortDesc, itemsFilteringSorted, sortBy.length - 1);
    //     }

    //     return itemsFilteringSorted.sort((a, b) => {
    //         if (getItemValue(sortBy as string, a) < getItemValue(sortBy as string, b)) return sortDesc ? 1 : -1;
    //         if (getItemValue(sortBy as string, a) > getItemValue(sortBy as string, b)) return sortDesc ? -1 : 1;
    //         return 0;
    //     });
    // });

    // 監聽過濾器變化
    // watch(itemsFiltering, (newVal) => {
    //     if (filterOptions.value?.length) {
    //         emits('updateFilter', newVal);
    //     }
    // }, { immediate: true, deep: true });

    const totalItemsLength = computed((): number => (
        isServerSideMode.value ? serverItemsLength.value : totalItems.value.length
    ));

    const {
        selectedItems,
        toggleSelectAll: batchToggleSelectAll,
        toggleSelectItem: batchToggleSelectItem,
        isProcessing,
        // selectionProgress
    } = useBatchSelection(totalItems, emits);

    // 包裝 toggleSelectAll 以確保視覺反饋立即顯示
    // const toggleSelectAll = async (isChecked: boolean) => {
    //     emits('updateSelectionStatus', true);
    //     try {
    //         await batchToggleSelectAll(isChecked);
    //         // 確保在取消全選時也發出正確的事件
    //         // emits('update:itemsSelected', isChecked ? Array.from(selectedItems.value) : []);
    //     } finally {
    //         emits('updateSelectionStatus', false);
    //     }
    // };

    // // 包裝 toggleSelectItem 以確保更新同步
    // const toggleSelectItem = (item: Item) => {
    //     batchToggleSelectItem(item);
    //     // 同步更新到父組件
    //     // emits('update:itemsSelected', Array.from(selectedItems.value));
    // };

    const toggleSelectAll = (isChecked: boolean) => {
        emits('updateSelectionStatus', true);
        try {
            batchToggleSelectAll(isChecked);
            console.time('update:itemsSelected');
            emits('update:itemsSelected', isChecked ? Array.from(selectedItems.value) : []);
            if (isChecked) emits('selectAll');
        } finally {
            console.timeEnd('update:itemsSelected');
            emits('updateSelectionStatus', false);
        }
    };
    // const toggleSelectAll = async (isSelected: boolean) => {
    //     console.group('updateSelection Performance Analysis');
    //     console.time('total-execution');
    
    //     try {
    //         console.time('pre-toggle');
    //         emits('updateSelectionStatus', true);
    //         console.timeEnd('pre-toggle');
    
    //         console.time('batchToggleSelectAll');
    //         batchToggleSelectAll(isSelected);
    //         console.timeEnd('batchToggleSelectAll');
    
    //         console.time('prepare-emit-data');
    //         const selectedItemsArray = isSelected ? Array.from(selectedItems.value) : [];
    //         console.timeEnd('prepare-emit-data');
    
    //         console.time('emit-update');
    //         emits('update:itemsSelected', selectedItemsArray);
    //         console.timeEnd('emit-update');
    
    //         if (isSelected) {
    //             console.time('emit-selectAll');
    //             emits('selectAll');
    //             console.timeEnd('emit-selectAll');
    //         }
    
    //     } finally {
    //         console.time('cleanup');
    //         emits('updateSelectionStatus', false);
    //         console.timeEnd('cleanup');
            
    //         console.timeEnd('total-execution');
    //         console.groupEnd();
    //     }
    // };

    const selectItemsComputed = computed({
        get: () => selectedItems.value ?? [],
        set: (value) => {
            // 只在值確實改變時才觸發更新
            if (value?.length !== selectedItems.value?.length) {
                emits('update:itemsSelected', value);
            }
        },
    });

    // 同步更新計算屬性
    // const selectItemsComputed = computed({
    //     get: () => selectedItems.value,
    //     set: (value) => {
    //         emits('update:itemsSelected', value);
    //     },
    // });

    // watch(selectedItems, (value) => {
    //     emits('update:itemsSelected', value);
    // });

    // const selectItemsComputed = computed({
    //     get: () => itemsSelected.value ?? [],
    //     set: (value) => {
    //         // emits('update:itemsSelected', value);
    //         if (JSON.stringify(value) !== JSON.stringify(itemsSelected.value)) {
    //             emits('update:itemsSelected', value);
    //         }
    //     },
    // });

    // const toggleSelectAll = (isChecked: boolean): void => {
    //     selectItemsComputed.value = isChecked ? totalItems.value : [];
    //     if (isChecked) emits('selectAll');
    // };

    // const toggleSelectItem = (item: Item): void => {
    //     const isAlreadyChecked = item.checkbox;
    //     delete item.checkbox;
    //     delete item.index;
    //     if (!isAlreadyChecked) {
    //         const selectItemsArr: Item[] = selectItemsComputed.value;
    //         selectItemsArr.unshift(item);
    //         selectItemsComputed.value = selectItemsArr;
    //         emits('selectRow', item);
    //     } else {
    //         selectItemsComputed.value = selectItemsComputed.value.filter(
    //             (selectedItem) => JSON.stringify(selectedItem) !== JSON.stringify(item)
    //         );
    //         emits('deselectRow', item);
    //     }
    // };

    return {
        totalItems,
        selectItemsComputed,
        totalItemsLength,
        toggleSelectAll,
        toggleSelectItem:batchToggleSelectItem,
        isProcessing,
        // processProgress: selectionProgress,
    };
}

