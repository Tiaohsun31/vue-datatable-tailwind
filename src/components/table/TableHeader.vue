<!-- components/table/TableHeader.vue -->
<template>
    <thead v-if="headers.length && !hideHeader" class="vdt-thead" :class="[
        'text-sm text-slate-700 uppercase text-nowrap text-left',
        { 'sticky top-0 z-10': fixedHeader },
        headerClassName,
    ]">
        <tr class="vdt-thead-tr" :class="[{ 'divide-x divide-gray-200': borderCell }]">
            <TableHeaderCell v-for="(header, index) in headers" :key="index" :header="header" :index="index"
                :fixed-distance="getFixedDistance(header.value)" :last-left-fixed-column="lastLeftFixedColumn"
                :first-right-fixed-column="firstRightFixedColumn" :header-item-class-name="headerItemClassName"
                :are-all-visible-rows-disabled="areAllVisibleRowsDisabled"
                :multiple-select-status="multipleSelectStatus" :multi-sort="multiSort"
                :is-multi-sorting="isMultiSorting" :get-multi-sort-number="getMultiSortNumber"
                @header-click="handleHeaderClick" @toggle-select-all="toggleSelectAll">
                <template v-for="(_, name) in $slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData"></slot>
                </template>
            </TableHeaderCell>
        </tr>
    </thead>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import type { Header } from '@/types/main'
import type { HeaderForRender, MultipleSelectStatus } from '@/types/internal'
import TableHeaderCell from './TableHeaderCell.vue'

defineProps({
    headers: {
        type: Array as PropType<HeaderForRender[]>,
        required: true
    },
    hideHeader: Boolean,
    fixedHeader: Boolean,
    headerClassName: String,
    borderCell: Boolean,
    lastLeftFixedColumn: String,
    firstRightFixedColumn: String,

    headerItemClassName: {
        type: [String, Function] as PropType<string | ((header: Header, columnNumber: number) => string)>,
        default: ''
    },
    areAllVisibleRowsDisabled: Boolean,
    multipleSelectStatus: String as PropType<MultipleSelectStatus>,
    multiSort: Boolean,
    isMultiSorting: {
        type: Function as PropType<(headerText: string) => boolean>,
        required: true
    },
    getMultiSortNumber: {
        type: Function as PropType<(headerText: string) => number | false>,
        required: true
    },
    getFixedDistance: {
        type: Function as PropType<(column: string, type?: 'td' | 'th') => string | undefined>,
        required: true
    }
})

const emit = defineEmits<{
    (e: 'headerClick', header: Header): void
    (e: 'toggleSelectAll', checked: boolean): void
}>()

const handleHeaderClick = (header: Header) => {
    emit('headerClick', header)
}

const toggleSelectAll = (checked: boolean) => {
    emit('toggleSelectAll', checked)
}
</script>
