<template>
    <div ref="tableWrapper" class="vdt-table-wrapper relative w-full " :class="[wrapperClassName]">
        <!-- Main Table Container -->
        <div ref="tableContainer"
            class="vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px] "
            :class="[{ 'shadow-xs': showShadow }, containerClassName]">
            <table :id="tableNodeId" class="vdt-table w-full border-collapse bg-white" :class="[tableClassName]">
                <colgroup>
                    <col v-for="(header, index) in headersForRender" :key="index" :style="getColStyle(header)" />
                </colgroup>
                <!-- Custom Headers Slot -->
                <slot v-if="slots['customize-headers']" name="customize-headers"></slot>

                <!-- Default Headers -->
                <TableHeader v-bind="{
                    headers: headersForRender,
                    hideHeader,
                    fixedHeader,
                    headerClassName,
                    borderCell,
                    lastLeftFixedColumn,
                    firstRightFixedColumn,
                    headerItemClassName,
                    areAllVisibleRowsDisabled,
                    multipleSelectStatus,
                    multiSort,
                }" :is-multi-sorting="isMultiSorting" :get-multi-sort-number="getMultiSortNumber"
                    :get-fixed-distance="getFixedDistance" @header-click="handleHeaderClick"
                    @toggle-select-all="toggleSelectAll">

                    <template v-for="(_, name) in $slots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData"></slot>
                    </template>

                </TableHeader>

                <!-- Table Body -->
                <slot v-if="ifHasBodySlot" name="body" v-bind="pageItems"></slot>

                <tbody v-else-if="headerColumns.length" class="vdt-tbody text-sm" :class="[bodyClassName]">
                    <!-- Body Prepend Slot -->
                    <slot name="body-prepend" v-bind="{
                        items: pageItems,
                        pagination: { isFirstPage, isLastPage, currentPaginationNumber, maxPaginationNumber, nextPage, prevPage },
                        headers: headersForRender
                    }"></slot>

                    <!-- Table Rows -->
                    <template v-for="(item, index) in pageItems" :key="item.key || index">

                        <TableBodyRow :item="item" :index="index" :columns="headerColumns" :alternating="alternating"
                            :no-hover="noHover" :border-cell="borderCell" :body-row-className="bodyRowClassName"
                            :body-item-class-name="bodyItemClassName"
                            :is-expanded="expandingItemIndexList.includes(index + prevPageEndIndex)"
                            :is-disabled="isItemDisabled(item)" :expand-column="expandColumn"
                            :get-fixed-distance="getFixedDistance" @click="handleRowClick($event, item, index)"
                            @dblclick="handleRowDoubleClick($event, item, index)"
                            @contextmenu="handleRowContextMenu($event, item)"
                            @toggle-expand="handleExpandToggle(index, item, $event)"
                            @toggle-select="handleToggleSelect(item)">
                            <template v-for="(_, name) in $slots" #[name]="slotData">
                                <slot :name="name" v-bind="slotData"></slot>
                            </template>
                        </TableBodyRow>

                        <!-- Expandable Row -->
                        <TableExpandRow
                            v-if="shouldEnableTransition || expandingItemIndexList.includes(index + prevPageEndIndex)"
                            :item="item" :index="index" :columns-count="headersForRender.length"
                            :loading="item.expandLoading"
                            :is-expanded="expandingItemIndexList.includes(index + prevPageEndIndex)"
                            :body-expand-row-className="bodyExpandRowClassName">
                            <slot name="expand" v-bind="item" />
                        </TableExpandRow>

                    </template>
                    <!-- Body Append Slot -->
                    <slot name="body-append" v-bind="{
                        items: pageItems,
                        pagination: { isFirstPage, isLastPage, currentPaginationNumber, maxPaginationNumber, nextPage, prevPage, updatePage },
                        headers: headersForRender
                    }">
                    </slot>
                </tbody>
            </table>

            <!-- Loading Overlay -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50">
                <div class="relative z-10">
                    <slot name="loading">
                        <Loading />
                    </slot>
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

        <!-- Table Footer -->
        <TableFooter v-bind="{
            hideFooter,
            hideRowsPerPage,
            hidePaginationInfo,
            buttonsPagination,
            showShadow,
            footerClassName,

            rowsPerPage: rowsPerPageRef,
            rowsItems: rowsItemsComputed,
            rowsPerPageMessage,
            rowsOfPageSeparatorMessage,

            currentPageFirstIndex,
            currentPageLastIndex,
            totalItemsLength,

            currentPaginationNumber,
            maxPaginationNumber,
            isFirstPage,
            isLastPage
        }" @update:rows-per-page="updateRowsPerPage" @next-page="nextPage" @prev-page="prevPage"
            @update-page="updatePage">
            <template v-if="$slots['pagination-info']" #pagination-info="slotProps">
                <slot name="pagination-info" v-bind="slotProps" />
            </template>
            <template v-if="$slots.pagination" #pagination="slotProps">
                <slot name="pagination" v-bind="slotProps" />
            </template>
        </TableFooter>

        <SelectionLoadingOverlay v-show="isProcessing" :progress="processProgress" />
    </div>
</template>

<script setup lang="ts">
import {
    useSlots, computed, toRefs, ref, watch, provide
} from 'vue';

import Loading from './components/loadings/Loading.vue';
import SelectionLoadingOverlay from './components/loadings/SelectionLoadingOverlay.vue';

import useClickRow from './composables/useClickRow';
import useExpandableRow from './composables/useExpandableRow';
import useFixedColumn from './composables/useFixedColumn';
import useHeaders from './composables/useHeaders';
import usePageItems from './composables/usePageItems';
import usePagination from './composables/usePagination';
import useRows from './composables/useRows';
import useServerOptions from './composables/useServerOptions';
import useTotalItems from './composables/useTotalItems';

import type { Header, Item, DataTableProps } from './types/main';
import type { HeaderForRender, ClickEventType } from './types/internal';

import { setTheme } from './utils/tailwind4Theme';

import TableHeader from './components/table/TableHeader.vue';
import TableBodyRow from './components/table/TableBodyRow.vue';
import TableExpandRow from './components/table/TableExpandRow.vue';
import TableFooter from './components/table/TableFooter.vue';

const props = withDefaults(defineProps<DataTableProps>(), {
    alternating: true,
    buttonsPagination: true,
    checkboxColumnWidth: null,
    currentPage: 1,
    emptyMessage: 'No Available Data',
    expandColumnWidth: 36,
    filterOptions: null,
    fixedExpand: false,
    fixedHeader: false,
    fixedCheckbox: false,
    fixedIndex: false,

    hideFooter: false,
    hideRowsPerPage: false,
    hideHeader: false,
    indexColumnWidth: 60,
    itemsSelected: null,
    loading: false,
    rowsPerPage: 25,
    rowsItems: () => [25, 50, 100],
    rowsPerPageMessage: 'rows per page:',
    searchField: '',
    searchValue: '',
    serverOptions: null,
    serverItemsLength: 0,
    showIndex: false,
    sortBy: '',
    sortType: 'asc',
    multiSort: false,

    wrapperClassName: '',
    containerClassName: '',
    tableClassName: '',
    headerClassName: '',
    headerItemClassName: '',
    bodyClassName: '',
    bodyRowClassName: '',
    bodyExpandRowClassName: '',
    bodyItemClassName: '',
    footerClassName: '',

    disabledRows: () => false,
    noHover: false,
    borderCell: false,
    mustSort: true,
    rowsOfPageSeparatorMessage: 'of',
    clickEventType: 'single',
    clickRowToExpand: false,
    clickRowToSelect: false,
    tableNodeId: '',
    showIndexSymbol: '#',
    preventContextMenuRow: false,
    expandColumn: '',
    expandTransition: undefined,
    batchSelectionThreshold: 10000,
    theme: () => 'indigo',
    items: () => [],
    headers: () => [],
});

const {
    checkboxColumnWidth,
    expandColumnWidth,
    indexColumnWidth,
    rowsItems,
    showIndexSymbol,

    currentPage,
    filterOptions,
    headers,
    itemsSelected,
    loading,
    items,
    rowsPerPage,
    searchField,
    searchValue,
    serverItemsLength,
    showIndex,
    sortBy,
    sortType,
    serverOptions,
    multiSort,
    mustSort,
    clickEventType,
    clickRowToExpand,
    clickRowToSelect,
    fixedExpand,
    fixedCheckbox,
    fixedIndex,
    batchSelectionThreshold,
    expandColumn,
} = toRefs(props);

// global style related variable
const theme = setTheme(props.theme);

// slot
const slots = useSlots();
const ifHasExpandSlot = computed(() => !!slots.expand);
const ifHasBodySlot = computed(() => !!slots.body);

const shouldEnableTransition = computed(() =>
    typeof props.expandTransition !== 'undefined'
        ? props.expandTransition
        : ifHasExpandSlot.value
)

// global dataTable $ref
const tableWrapper = ref<HTMLDivElement | null>(null);
const tableContainer = ref<HTMLDivElement | null>(null);
provide('dataTable', tableWrapper);

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

const isMultipleSelectable = computed((): boolean => itemsSelected.value !== null);
const isServerSideMode = computed((): boolean => serverOptions.value !== null);

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
    expandColumn,
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
    processProgress
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
    batchSelectionThreshold,
    props.disabledRows,
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
    props.disabledRows
);

const prevPageEndIndex = computed(() => {
    if (currentPaginationNumber.value === 0) return 0;
    return (currentPaginationNumber.value - 1) * rowsPerPageRef.value;
});

const {
    expandingItemIndexList,
    updateExpandingItemIndexList: handleExpandToggle,
    clearExpandingItemIndexList,
} = useExpandableRow(
    pageItems,
    prevPageEndIndex,
    emits,
);

const {
    fixedHeaders,
    leftFixedHeaders,
    rightFixedHeaders,
    lastLeftFixedColumn,
    firstRightFixedColumn,
    fixedColumnsInfos,
    showShadow
} = useFixedColumn(
    headersForRender,
    tableContainer,
);

// template style generation function
const getColStyle = (header: HeaderForRender): string | undefined => {
    const width = header.width ?? (fixedHeaders.value.length ? 100 : null);
    if (width) return `width: ${width}px; min-width: ${width}px;`;
    return undefined;
};

// 固定列的樣式
const getFixedDistance = (column: string, type: 'td' | 'th' = 'th') => {
    if (!fixedHeaders.value.length) return undefined;
    const columnInfo = fixedColumnsInfos.value.find((info) => info.value === column);
    if (columnInfo) {
        const isLeft = columnInfo.position === 'left';
        return `
            ${isLeft ? `left: ${columnInfo.distance}px;` : `right: ${columnInfo.distance}px;`}
            z-index: ${type === 'th' ? 3 : 1};
            position: sticky;
            background-color: ${type === 'th' ? 'none' : 'inherit'};
            ${(isLeft && columnInfo.value === lastLeftFixedColumn.value) ||
                (!isLeft && columnInfo.value === firstRightFixedColumn.value)
                ? `
                    box-shadow: ${isLeft ? '4px 0 6px -2px' : '-4px 0 6px -2px'} rgba(0, 0, 0, 0.1);
                    clip-path: inset(0px ${isLeft ? '-10px 0px 0px' : '0px 0px -10px'});
                ` : ''
            }
            isolation: isolate;
        `;
    }
    return undefined;
};

const handleHeaderClick = (header: Header) => {
    if (header.sortable && header.sortType) {
        updateSortField(header.value, header.sortType);
    }
};

const isItemDisabled = (item: Item): boolean => {
    return typeof props.disabledRows === 'function' ? props.disabledRows(item) : false;
};

const areAllVisibleRowsDisabled = computed(() => {
    return pageItems.value.every((item) => props.disabledRows(item));
});

const handleToggleSelect = (item: Item) => {
    if (isItemDisabled(item)) return;
    toggleSelectItem(item);
};

const {
    handleRowClick,
    handleRowDoubleClick,
    handleRowContextMenu,
} = useClickRow(
    clickEventType,
    isMultipleSelectable,
    showIndex,
    isItemDisabled,
    clickRowToExpand,
    clickRowToSelect,
    handleExpandToggle,
    toggleSelectItem,
    emits
);

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
