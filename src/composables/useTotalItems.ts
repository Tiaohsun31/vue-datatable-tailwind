import {
    type Ref, computed, type ComputedRef,
} from 'vue';
import type { Item, FilterOption, NumberFilterOption } from '../types/main';
import { isNumeric, isArrayFilterOption, isNumberFilterOption, isCustomFilterOption } from '../utils/filter';
import type { ClientSortOptions, EmitsEventName } from '../types/internal';
import { getItemValue } from '../utils/utils';
import { useBatchSelection } from './useBatchSelection';

const BATCH_SELECTION_THRESHOLD = 10000; // 設定閾值

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
    batchSelectionThreshold: Ref<number>,
    disabledRows: (item: Item) => boolean,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {
    // 搜索邏輯
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

    // 監聽過濾器變化
    // watch(itemsFiltering, (newVal) => {
    //     if (filterOptions.value?.length) {
    //         emits('updateFilter', newVal);
    //     }
    // }, { immediate: true, deep: true });

    const totalItemsLength = computed((): number => (
        isServerSideMode.value ? serverItemsLength.value : totalItems.value.length
    ));

    // 判斷是否需要使用批次處理
    const shouldUseBatchSelection = computed(() => {
        if (isServerSideMode.value) return false;
        const dataLength = isServerSideMode.value ? serverItemsLength.value : items.value.length;
        return dataLength >= batchSelectionThreshold.value;
    });

    // 初始化批次處理邏輯
    const {
        selectedItems: batchSelectedItems,
        toggleSelectAll: batchToggleSelectAll,
        toggleSelectItem: batchToggleSelectItem,
        isProcessing,
        selectionProgress
    } = useBatchSelection(totalItems, itemsSelected, disabledRows, emits);

    const selectItemsComputed = computed({
        get: () => itemsSelected.value ?? [],
        set: (value) => {
            emits('update:itemsSelected', value);
        },
    });
    // 過濾出未被禁用的項目
    const getSelectableItems = (items: Item[]) => {
        return items.filter(item => !disabledRows(item));
    };
    const regularToggleSelectAll = (isChecked: boolean): void => {
        selectItemsComputed.value = isChecked ? getSelectableItems(totalItems.value) : selectItemsComputed.value = [];
        if (isChecked) emits('selectAll');
    };

    const regularToggleSelectItem = (item: Item): void => {
        const isAlreadyChecked = item.checkbox;
        delete item.checkbox;
        delete item.index;
        if (!isAlreadyChecked) {
            const selectItemsArr: Item[] = selectItemsComputed.value;
            selectItemsArr.unshift(item);
            selectItemsComputed.value = selectItemsArr;
            emits('selectRow', item);
        } else {
            selectItemsComputed.value = selectItemsComputed.value.filter(
                (selectedItem) => JSON.stringify(selectedItem) !== JSON.stringify(item)
            );
            emits('deselectRow', item);
        }
    };

    const toggleSelectAll = (isChecked: boolean): void => {
        // 檢查是否所有項目都被禁用
        const allItemsDisabled = totalItems.value.every(item => disabledRows(item));
        if (allItemsDisabled) return;

        if (shouldUseBatchSelection.value) {
            emits('updateSelectionStatus', true);
            try {
                batchToggleSelectAll(isChecked);
                emits('update:itemsSelected', isChecked ? Array.from(batchSelectedItems.value) : []);
                if (isChecked) emits('selectAll');
            } finally {
                emits('updateSelectionStatus', false);
            }
        } else {
            regularToggleSelectAll(isChecked);
        }
    };

    const toggleSelectItem = (item: Item): void => {
        if (disabledRows(item)) return;

        if (shouldUseBatchSelection.value) {
            batchToggleSelectItem(item);
        } else {
            regularToggleSelectItem(item);
        }
    };

    //multiple selecting(原始程式碼)
    // const selectItemsComputed = computed({
    //     get: () => itemsSelected.value ?? [],
    //     set: (value) => {
    //         emits('update:itemsSelected', value);
    //     },
    // });

    // const toggleSelectAll = (isChecked: boolean): void => {
    //     console.time('toggleSelectAll');
    //     selectItemsComputed.value = isChecked ? totalItems.value : [];
    //     if (isChecked) emits('selectAll');
    //     console.timeEnd('toggleSelectAll');
    // };

    // const toggleSelectItem = (item: Item): void => {
    //     const isAlreadyChecked = item.checkbox;
    //     // eslint-disable-next-line no-param-reassign
    //     delete item.checkbox;
    //     // eslint-disable-next-line no-param-reassign
    //     delete item.index;
    //     if (!isAlreadyChecked) {
    //         const selectItemsArr: Item[] = selectItemsComputed.value;
    //         selectItemsArr.unshift(item);
    //         selectItemsComputed.value = selectItemsArr;
    //         emits('selectRow', item);
    //     } else {
    //         selectItemsComputed.value = selectItemsComputed.value.filter((selectedItem) => JSON.stringify(selectedItem)
    //             !== JSON.stringify(item));
    //         emits('deselectRow', item);
    //     }
    // };

    return {
        totalItems,
        selectItemsComputed,
        totalItemsLength,
        toggleSelectAll,
        toggleSelectItem,
        isProcessing: computed(() => shouldUseBatchSelection.value && isProcessing.value),
        processProgress: selectionProgress,
    };
}

