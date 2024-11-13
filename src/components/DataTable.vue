<template>
    <div ref="dataTable" class="relative w-full" :class="[tableClassName]">
        <!-- Main Table Container -->
        <div ref="tableBody" class="relative overflow-auto" :class="{
            'border border-gray-200': true,
            'min-h-[180px]': true,
            'shadow-sm': true,
        }" :style="tableHeight ? `height: ${tableHeight}px` : ''">
            <table :id="tableNodeId" class="w-full border-collapse bg-white">
                <colgroup>
                    <col v-for="(header, index) in headersForRender" :key="index" :style="getColStyle(header)" />
                </colgroup>

                <!-- Custom Headers Slot -->
                <slot v-if="slots['customize-headers']" name="customize-headers" />

                <!-- Default Headers -->
                <thead v-else-if="headersForRender.length && !hideHeader" :class="[
                    'text-sm text-slate-700 uppercase bg-gray-100',
                    headerClassName,
                    { 'sticky top-0 z-10': fixedHeader }
                ]">
                    <tr>
                        <th v-for="(header, index) in headersForRender" :key="index"
                            :style="getFixedDistance(header.value)"
                            class="px-4 py-3 font-semibold tracking-wider text-left group" :class="[
                                {
                                    'cursor-pointer hover:bg-gray-200': header.sortable,
                                    'bg-gray-100': header.sortable && header.sortType === 'none',
                                    'bg-gray-200': header.sortable && header.sortType === 'desc' || header.sortType === 'asc',
                                    'shadow-[1px_0_0_0_rgba(0,0,0,0.1)]': header.value === lastFixedColumn
                                },
                                typeof headerItemClassName === 'string'
                                    ? headerItemClassName
                                    : headerItemClassName(header as Header, index + 1)
                            ]"
                            @click="(header.sortable && header.sortType) ? updateSortField(header.value, header.sortType) : null">
                            <!-- Checkbox Header -->
                            <MultipleSelectCheckBox v-if="header.text === 'checkbox' && itemsSelected !== null"
                                :key="multipleSelectStatus" :status="multipleSelectStatus" @change="toggleSelectAll" />

                            <!-- Regular Header Content -->
                            <div v-else class="flex items-center gap-2" :class="`text-${headerTextDirection}`">
                                <!-- Header Slots -->
                                <slot v-if="slots[`header-${header.value}`]" :name="`header-${header.value}`"
                                    v-bind="header" />
                                <slot v-else-if="slots[`header-${header.value.toLowerCase()}`]"
                                    :name="`header-${header.value.toLowerCase()}`" v-bind="header" />
                                <slot v-else-if="slots['header']" name="header" v-bind="header" />

                                <!-- Default Header Text -->
                                <span v-else class="header-text">{{ header.text }}</span>

                                <!-- Sort Icon -->
                                <span v-if="header.sortable" :key="header.sortType ? header.sortType : 'none'"
                                    class="inline-flex transition-opacity duration-200"
                                    :class="[header.sortType === 'none' ? 'opacity-0' : 'opacity-100', 'group-hover:opacity-100']">
                                    <svg class="w-3 h-3 transition-transform"
                                        :class="{ 'transform rotate-180': header.sortType === 'desc' }" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 15l7-7 7 7" />
                                    </svg>
                                </span>

                                <!-- Multi Sort Number -->
                                <span v-if="multiSort && isMultiSorting(header.value)"
                                    class="ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full">
                                    {{ getMultiSortNumber(header.value) }}
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>

                <!-- Table Body -->
                <slot v-if="ifHasBodySlot" name="body" v-bind="pageItems" />

                <tbody v-else-if="headerColumns.length" class="text-sm divide-y divide-gray-200"
                    :class="{ 'bg-gray-50': alternating }">
                    <!-- Body Prepend Slot -->
                    <slot name="body-prepend" v-bind="{
                        items: pageItems,
                        pagination: {
                            isFirstPage,
                            isLastPage,
                            currentPaginationNumber,
                            maxPaginationNumber,
                            nextPage,
                            prevPage
                        },
                        headers: headersForRender
                    }" />

                    <!-- Table Rows -->
                    <template v-for="(item, index) in pageItems" :key="item.key || index">
                        <tr class="transition-colors" :class="[
                            { 'bg-gray-50': (index + 1) % 2 === 0 },
                            !noHover && 'hover:bg-gray-100',
                            typeof bodyRowClassName === 'string'
                                ? bodyRowClassName
                                : bodyRowClassName(item, index + 1)
                        ]" @click="($event) => {
                            clickRow(item, 'single', $event);
                            clickRowToExpand && updateExpandingItemIndexList(index + prevPageEndIndex, item, $event);
                        }" @dblclick="($event) => clickRow(item, 'double', $event)"
                            @contextmenu="($event) => contextMenuRow(item, $event)">
                            <td v-for="(column, i) in headerColumns" :key="i" :style="getFixedDistance(column, 'td')"
                                class="px-4 py-2" :class="[
                                    {
                                        'shadow-[1px_0_0_0_rgba(0,0,0,0.1)]': column === lastFixedColumn,
                                        'cursor-pointer': column === 'expand'
                                    },
                                    typeof bodyItemClassName === 'string'
                                        ? bodyItemClassName
                                        : bodyItemClassName(column, index + 1),
                                    `text-${bodyTextDirection}`
                                ]" @click="column === 'expand'
                                    ? updateExpandingItemIndexList(index + prevPageEndIndex, item, $event)
                                    : null">
                                <!-- Column Content -->
                                <slot v-if="slots[`item-${column}`]" :name="`item-${column}`" v-bind="item" />
                                <slot v-else-if="slots[`item-${column.toLowerCase()}`]"
                                    :name="`item-${column.toLowerCase()}`" v-bind="item" />
                                <template v-else-if="column === 'expand'">
                                    <svg class="w-4 h-4 transition-transform"
                                        :class="{ 'transform rotate-90': expandingItemIndexList.includes(prevPageEndIndex + index) }"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </template>
                                <template v-else-if="column === 'checkbox'">
                                    <SingleSelectCheckBox :checked="item[column]" @change="toggleSelectItem(item)" />
                                    <!-- <SingleSelectCheckBox v-show="itemsSelected !== null" :checked="item[column]"
                                        @change="toggleSelectItem(item)" /> -->

                                </template>
                                <slot v-else-if="slots['item']" name="item" v-bind="{ column, item }" />
                                <template v-else>
                                    {{ generateColumnContent(column, item) }}
                                </template>
                            </td>
                        </tr>

                        <!-- Expandable Row -->
                        <tr v-if="ifHasExpandSlot && expandingItemIndexList.includes(index + prevPageEndIndex)" :class="[
                            { 'bg-gray-50': (index + 1) % 2 === 0 },
                            typeof bodyExpandRowClassName === 'string'
                                ? bodyExpandRowClassName
                                : bodyExpandRowClassName(item, index + 1)
                        ]">
                            <td :colspan="headersForRender.length" class="px-4 py-2">
                                <LoadingLine v-if="item.expandLoading" class="mb-4" />
                                <slot name="expand" v-bind="item" />
                            </td>
                        </tr>
                    </template>

                    <!-- Body Append Slot -->
                    <slot name="body-append" v-bind="{
                        items: pageItems,
                        pagination: {
                            isFirstPage,
                            isLastPage,
                            currentPaginationNumber,
                            maxPaginationNumber,
                            nextPage,
                            prevPage,
                            updatePage
                        },
                        headers: headersForRender
                    }" />
                </tbody>
            </table>

            <!-- Loading Overlay -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50">
                <div class="relative z-10">
                    <slot v-if="ifHasLoadingSlot" name="loading" />
                    <Loading v-else />
                </div>
            </div>

            <!-- Empty Message -->
            <div v-if="!pageItems.length && !loading"
                class="absolute inset-0 flex items-center justify-center text-gray-500">
                <slot name="empty-message">
                    {{ emptyMessage }}
                </slot>
            </div>
        </div>

        <!-- Footer -->
        <div v-if="!hideFooter"
            class="flex items-center justify-between px-4 py-3 bg-white border-gray-200 border border-t-0 shadow-sm">
            <!-- Rows Per Page Selector -->
            <div v-if="!hideRowsPerPage" class="flex items-center gap-2 text-sm text-gray-700">
                {{ rowsPerPageMessage }}
                <RowsSelector v-model="rowsPerPageRef" :rows-items="rowsItemsComputed" />
            </div>

            <!-- Pagination Info -->
            <div class="text-sm text-gray-700">
                <!-- {{ `${currentPageFirstIndex}–${currentPageLastIndex}` }} -->
                <!-- {{ rowsOfPageSeparatorMessage }} {{ totalItemsLength }} -->
                第 {{ currentPageFirstIndex }} 到第 {{ currentPageLastIndex }} 筆資料，共 {{ totalItemsLength }} 筆資料
            </div>

            <!-- Pagination Controls -->
            <slot v-if="ifHasPaginationSlot" name="pagination" v-bind="{
                isFirstPage,
                isLastPage,
                currentPaginationNumber,
                maxPaginationNumber,
                nextPage,
                prevPage,
            }"></slot>
            <PaginationArrows v-else :is-first-page="isFirstPage" :is-last-page="isLastPage" @click-next-page="nextPage"
                @click-prev-page="prevPage">
                <template v-if="buttonsPagination" #buttonsPagination>
                    <ButtonsPagination :current-pagination-number="currentPaginationNumber"
                        :max-pagination-number="maxPaginationNumber" @update-page="updatePage" />
                </template>
            </PaginationArrows>
        </div>
        <SelectionLoadingOverlay v-show="isProcessing" :progress="50" />
    </div>
</template>

<script setup lang="ts">
import {
    useSlots, computed, toRefs, ref, watch, provide, onMounted,
} from 'vue';

import MultipleSelectCheckBox from './MultipleSelectCheckBox.vue';
import SingleSelectCheckBox from './SingleSelectCheckBox.vue';
import RowsSelector from './RowsSelector.vue';
import Loading from './Loading.vue';
import LoadingLine from './LoadingLine.vue';
import ButtonsPagination from './ButtonsPagination.vue';
import PaginationArrows from './PaginationArrows.vue';
import SelectionLoadingOverlay from './SelectionLoadingOverlay.vue';

import useClickRow from '../composables/useClickRow';
import useExpandableRow from '../composables/useExpandableRow';
import useFixedColumn from '../composables/useFixedColumn';
import useHeaders from '../composables/useHeaders';
import usePageItems from '../composables/usePageItems';
import usePagination from '../composables/usePagination';
import useRows from '../composables/useRows';
import useServerOptions from '../composables/useServerOptions';
import useTotalItems from '../composables/useTotalItems';

import type { Header, Item } from '../types/main';
import type { HeaderForRender } from '../types/internal';

// eslint-disable-next-line import/extensions
import { generateColumnContent } from '../utils/utils';
import type { DataTableProps } from '../types/propsWithDefault';
import { defaultDataTableProps } from '../types/propsWithDefault'

const props = withDefaults(defineProps<DataTableProps>(), defaultDataTableProps);

const {
    alternating,
    buttonsPagination,
    checkboxColumnWidth,
    currentPage,
    emptyMessage,
    expandColumnWidth,
    filterOptions,
    fixedExpand,
    fixedHeader,
    fixedCheckbox,
    fixedIndex,
    headerTextDirection,
    bodyTextDirection,
    hideFooter,
    hideRowsPerPage,
    hideHeader,
    headers,
    indexColumnWidth,
    itemsSelected,
    loading,
    items,
    rowsPerPage,
    rowsItems,
    rowsPerPageMessage,
    searchField,
    searchValue,
    serverItemsLength,
    showIndex,
    sortBy,
    sortType,
    serverOptions,
    multiSort,
    tableMinHeight,
    tableHeight,
    themeColor,
    tableClassName,
    headerClassName,
    headerItemClassName,
    bodyRowClassName,
    bodyExpandRowClassName,
    bodyItemClassName,
    noHover,
    borderCell,
    mustSort,
    rowsOfPageSeparatorMessage,
    clickEventType,
    clickRowToExpand,
    tableNodeId,
    showIndexSymbol,
    preventContextMenuRow,
} = toRefs(props);

// style related computed variables
const tableHeightPx = computed(() => (tableHeight.value ? `${tableHeight.value}px` : null));
const tableMinHeightPx = computed(() => `${tableMinHeight.value}px`);

// global style related variable
provide('themeColor', themeColor);

// slot
const slots = useSlots();
const ifHasPaginationSlot = computed(() => !!slots.pagination);
const ifHasLoadingSlot = computed(() => !!slots.loading);
const ifHasExpandSlot = computed(() => !!slots.expand);
const ifHasBodySlot = computed(() => !!slots.body);

// global dataTable $ref
const dataTable = ref();
const tableBody = ref();
provide('dataTable', dataTable);

// fixed-columns shadow
const showShadow = ref(false);
onMounted(() => {
    tableBody.value.addEventListener('scroll', () => {
        showShadow.value = tableBody.value.scrollLeft > 0;
    });
});

const emits = defineEmits([
    'clickRow',
    'contextmenuRow',
    'selectRow',
    'deselectRow',
    'expandRow',
    'updateSort',
    'updateFilter',
    'update:itemsSelected',
    'update:serverOptions',
    'updatePageItems',
    'updateTotalItems',
    'selectAll',
    'updateSelectionStatus'
]);

const isMultipleSelectable = computed((): boolean => props.itemsSelected !== null);
const isServerSideMode = computed((): boolean => props.serverOptions !== null);

const {
    serverOptionsComputed,
    updateServerOptionsPage,
    updateServerOptionsSort,
    updateServerOptionsRowsPerPage,
} = useServerOptions(
    serverOptions,
    multiSort,
    emits,
);

const {
    clientSortOptions,
    headerColumns,
    headersForRender,
    updateSortField,
    isMultiSorting,
    getMultiSortNumber,
} = useHeaders(
    showIndexSymbol,
    checkboxColumnWidth,
    expandColumnWidth,
    fixedCheckbox,
    fixedExpand,
    fixedIndex,
    headers,
    ifHasExpandSlot,
    indexColumnWidth,
    isMultipleSelectable,
    isServerSideMode,
    mustSort,
    serverOptionsComputed,
    showIndex,
    sortBy,
    sortType,
    multiSort,
    updateServerOptionsSort,
    emits,
);

const {
    rowsItemsComputed,
    rowsPerPageRef,
    updateRowsPerPage,
} = useRows(
    isServerSideMode,
    rowsItems,
    serverOptions,
    rowsPerPage,
);

const {
    totalItems,
    selectItemsComputed,
    totalItemsLength,
    toggleSelectAll,
    toggleSelectItem,
    isProcessing,
    // processProgress
} = useTotalItems(
    clientSortOptions,
    filterOptions,
    isServerSideMode,
    items,
    itemsSelected,
    searchField,
    searchValue,
    serverItemsLength,
    multiSort,
    emits,
);

const {
    currentPaginationNumber,
    maxPaginationNumber,
    isLastPage,
    isFirstPage,
    nextPage,
    prevPage,
    updatePage,
    updateCurrentPaginationNumber,
} = usePagination(
    currentPage,
    isServerSideMode,
    loading,
    totalItemsLength,
    rowsPerPageRef,
    serverOptions,
    updateServerOptionsPage,
);

const {
    currentPageFirstIndex,
    currentPageLastIndex,
    multipleSelectStatus,
    pageItems,
} = usePageItems(
    currentPaginationNumber,
    isMultipleSelectable,
    isServerSideMode,
    items,
    rowsPerPageRef,
    selectItemsComputed,
    showIndex,
    totalItems,
    totalItemsLength,
);

const prevPageEndIndex = computed(() => {
    if (currentPaginationNumber.value === 0) return 0;
    return (currentPaginationNumber.value - 1) * rowsPerPageRef.value;
});

const {
    expandingItemIndexList,
    updateExpandingItemIndexList,
    clearExpandingItemIndexList,
} = useExpandableRow(
    pageItems,
    prevPageEndIndex,
    emits,
);

const {
    fixedHeaders,
    lastFixedColumn,
    fixedColumnsInfos,
} = useFixedColumn(
    headersForRender,
);

const {
    clickRow,
} = useClickRow(
    clickEventType,
    isMultipleSelectable,
    showIndex,
    emits,
);

const contextMenuRow = (item: Item, $event: MouseEvent) => {
    if (preventContextMenuRow.value) $event.preventDefault();
    emits('contextmenuRow', item, $event);
}

// template style generation function
const getColStyle = (header: HeaderForRender): string | undefined => {
    const width = header.width ?? (fixedHeaders.value.length ? 100 : null);
    if (width) return `width: ${width}px; min-width: ${width}px;`;
    return undefined;
};

const getFixedDistance = (column: string, type: 'td' | 'th' = 'th') => {
    if (!fixedHeaders.value.length) return undefined;
    const columInfo = fixedColumnsInfos.value.find((info) => info.value === column);
    if (columInfo) {
        return `left: ${columInfo.distance}px;z-index: ${type === 'th' ? 3 : 1};position: sticky;`;
    }
    return undefined;
};

watch(loading, (newVal, oldVal) => {
    if (serverOptionsComputed.value) {
        // in server-side mode, turn to next page when api request finished.
        if (newVal === false && oldVal === true) {
            updateCurrentPaginationNumber(serverOptionsComputed.value.page);
            clearExpandingItemIndexList();
        }
    }
});

watch(rowsPerPageRef, (value) => {
    if (!isServerSideMode.value) {
        updatePage(1);
    } else {
        updateServerOptionsRowsPerPage(value);
    }
});

watch([searchValue, filterOptions], () => {
    if (!isServerSideMode.value) {
        updatePage(1);
    }
});

watch([currentPaginationNumber, clientSortOptions, searchField, searchValue, filterOptions], () => {
    clearExpandingItemIndexList();
}, { deep: true });

watch(pageItems, (value) => {
    emits('updatePageItems', value);
}, { deep: true });

watch(totalItems, (value) => {
    emits('updateTotalItems', value);
}, { deep: true });


defineExpose({
    currentPageFirstIndex,
    currentPageLastIndex,
    clientItemsLength: totalItemsLength,
    maxPaginationNumber,
    currentPaginationNumber,
    isLastPage,
    isFirstPage,
    nextPage,
    prevPage,
    updatePage,
    rowsPerPageOptions: rowsItemsComputed,
    rowsPerPageActiveOption: rowsPerPageRef,
    updateRowsPerPageActiveOption: updateRowsPerPage,
});

</script>
