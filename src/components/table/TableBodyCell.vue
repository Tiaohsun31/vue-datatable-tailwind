<!-- components/table/TableBodyCell.vue -->
<template>
    <td class="vdt-tbody-td px-4 py-2" :class="[
        { 'cursor-pointer': column === 'expand' && expandColumn === '' },
        ...fixedColumnClasses,
        cellClassName
    ]" :style="cellStyle" @click="handleCellClick">
        <!-- Selection Checkbox -->
        <template v-if="column === 'checkbox'">
            <template v-if="column === 'checkbox'">
                <slot name="selection-checkbox"
                    v-bind="{ item, index, isDisabled, toggleSelectItem: handleToggleSelect }">
                    <SingleSelectCheckbox :checked="!!item.checkbox" :disabled="isDisabled"
                        @change="handleToggleSelect" />
                </slot>
            </template>
        </template>

        <!-- Expand Button -->
        <template v-else-if="isExpandColumn">
            <slot name="expand-button" v-bind="{ item, expanded: isExpanded, toggle: handleExpandToggle }">
                <button @click.stop="handleExpandToggle" class="inline-flex items-center">
                    <IconExpand :class="{ 'transform rotate-90': isExpanded }" />
                </button>
            </slot>
        </template>

        <!-- Default Content -->
        <template v-else>
            <slot :name="`item-${column}`" v-bind="item">
                <slot :name="`item-${column.toLowerCase()}`" v-bind="item">
                    <slot name="item" v-bind="{ column, item }">
                        {{ generateColumnContent(column, item) }}
                    </slot>
                </slot>
            </slot>
        </template>
    </td>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '../../types/main'
import SingleSelectCheckbox from '../selections/SingleSelectCheckBox.vue'
import { IconExpand } from '../icons'
import { generateColumnContent } from '../../utils/utils'

const props = defineProps<{
    column: string
    item: Item
    index: number
    style?: string
    isDisabled?: boolean
    expandColumn?: string
    isExpanded?: boolean
    bodyItemClassName?: string | ((column: string, index: number) => string)
    getFixedDistance?: (column: string, type: 'td' | 'th') => string | undefined,
    getFixedColumnClasses?: (column: string) => string[] | undefined
}>()

const emit = defineEmits<{
    (e: 'toggle-select'): void
    (e: 'toggle-expand', event: MouseEvent): void
}>()

const isDisabled = computed(() => props.isDisabled ?? false)

const cellClassName = computed(() => {
    if (typeof props.bodyItemClassName === 'function') {
        return props.bodyItemClassName(props.column, props.index)
    }
    return props.bodyItemClassName
})

const isExpandColumn = computed(() =>
    props.column === 'expand' || props.column === props.expandColumn
)

const fixedStyle = computed(() => {
    if (props.getFixedDistance) {
        return props.getFixedDistance(props.column, 'td');
    }
    return undefined;
})

const fixedColumnClasses = computed(() => {
    if (props.getFixedColumnClasses) {
        return props.getFixedColumnClasses(props.column) || [];
    }
    return [];
})

const cellStyle = computed(() => {
    // 基本樣式
    let baseStyle = props.style || '';

    // 固定位置樣式
    if (fixedStyle.value) {
        baseStyle += fixedStyle.value;
    }

    // 確保背景色與父元素一致
    if (fixedColumnClasses.value.length > 0) {
        // 只有在是固定列時才需要添加此樣式
        baseStyle += ' background-color: inherit;';
    }

    return baseStyle;
})


const handleCellClick = () => {
    if (isExpandColumn.value && props.expandColumn === '') {
        emit('toggle-expand', event as MouseEvent)
    }
}

const handleExpandToggle = (event: MouseEvent) => {
    emit('toggle-expand', event)
}

const handleToggleSelect = () => {
    emit('toggle-select')
}
</script>
