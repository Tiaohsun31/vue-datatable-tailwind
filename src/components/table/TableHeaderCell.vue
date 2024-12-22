<!-- components/table/TableHeaderCell.vue -->
<template>
    <th :style="fixedDistance" class="vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-100 group" :class="[
        'px-4 py-3 font-semibold tracking-wider group',
        {
            'cursor-pointer hover:bg-gray-200': header.sortable,
            'shadow-[1px_0_0_0_rgba(0,0,0,0.1)]': header.value === lastFixedColumn,
        },
        header.sortable && {
            'bg-gray-100': header.sortType === 'none',
            'bg-gray-200': header.sortType && ['desc', 'asc'].includes(header.sortType)
        },
        typeof headerItemClassName === 'string'
            ? headerItemClassName
            : headerItemClassName(header as Header, index + 1),
    ]" @click.stop="handleHeaderClick(header)">
        <!-- Checkbox Header -->
        <MultipleSelectCheckBox v-if="header.text === 'checkbox'" :disabled="areAllVisibleRowsDisabled"
            :status="multipleSelectStatus" @change="$emit('toggleSelectAll', $event)" />

        <!-- Regular Header Content -->
        <div v-else class="items-center gap-2">
            <!-- Header Slots -->
            <slot :name="getHeaderSlotName(header)" v-bind="{ header, index, sortable: header.sortable }">
                <span>{{ header.text }}</span>
            </slot>

            <!-- Sort Icon -->
            <HeaderSortIcon v-if="header.sortable" :sort-type="header.sortType || 'none'" />

            <!-- Multi Sort Number -->
            <span v-if="multiSort && isMultiSorting(header.value)"
                class="ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full">
                {{ getMultiSortNumber(header.value) }}
            </span>
        </div>
    </th>
</template>

<script setup lang="ts">
import { type PropType, useSlots } from 'vue'
import type { Header } from '@/types/main'
import type { HeaderForRender, MultipleSelectStatus } from '@/types/internal'
import { HeaderSortIcon } from '../icons'
import MultipleSelectCheckBox from '../selections/MultipleSelectCheckBox.vue'

const props = defineProps({
    header: {
        type: Object as PropType<HeaderForRender>,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    fixedDistance: String,
    lastFixedColumn: String,
    headerItemClassName: {
        type: [String, Function] as PropType<string | ((header: Header, columnNumber: number) => string)>,
        default: ''
    },
    areAllVisibleRowsDisabled: Boolean,
    multipleSelectStatus: {
        type: String as PropType<MultipleSelectStatus>,
        default: 'noneSelected'
    },
    multiSort: Boolean,
    isMultiSorting: {
        type: Function as PropType<(headerText: string) => boolean>,
        required: true
    },
    getMultiSortNumber: {
        type: Function as PropType<(headerText: string) => number | false>,
        required: true
    }
})

const emit = defineEmits<{
    (e: 'headerClick', header: Header): void
    (e: 'toggleSelectAll', checked: boolean): void
}>()

const slots = useSlots()

const getHeaderSlotName = (header: Header) => {
    const slotNames = [
        `header-${header.value}`,
        `header-${header.value.toLowerCase()}`,
        'header'
    ]

    return slotNames.find(name => slots[name]) || 'header'
}

const handleHeaderClick = (header: Header) => {
    if (header.sortable && header.sortType) {
        emit('headerClick', header)
    }
}
</script>
