<!-- components/table/BodyRow.vue -->
<template>
    <tr class="vdt-tbody-tr transition-colors border-t" :class="[
        { 'bg-white': alternating && index % 2 === 0 },
        { 'bg-gray-50': !alternating || index % 2 === 1 },
        { 'hover:bg-gray-100': !noHover },
        { 'divide-x divide-gray-200': borderCell },
        rowClassName
    ]" @click="handleRowClick" @dblclick="handleRowDoubleClick" @contextmenu="handleContextMenu">
        <slot name="prepend"></slot>
        <template v-for="(column, columnIndex) in columns" :key="columnIndex">
            <TableBodyCell :column="column" :item="item" :index="index" :style="getFixedDistance?.(column, 'td')"
                :is-disabled="isDisabled" @toggle-select="() => $emit('toggle-select', item)"
                :expand-column="expandColumn" :is-expanded="isExpanded"
                @toggle-expand="(event) => $emit('toggle-expand', event, index, item)">

                <template v-for="(_, name) in $slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData"></slot>
                </template>

            </TableBodyCell>
        </template>
        <slot name="append"></slot>
    </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '../../types/main'
import TableBodyCell from './TableBodyCell.vue'

const props = defineProps<{
    item: Item
    index: number
    columns: string[]
    alternating?: boolean
    noHover?: boolean
    borderCell?: boolean
    bodyRowClassName?: string | ((item: Item, index: number) => string)
    isExpanded?: boolean
    isDisabled?: boolean
    expandColumn?: string
    getFixedDistance?: (column: string, type: 'td' | 'th') => string | undefined
}>()

const emit = defineEmits<{
    (e: 'click', event: MouseEvent, item: Item, index: number): void
    (e: 'dblclick', event: MouseEvent, item: Item, index: number): void
    (e: 'contextmenu', event: MouseEvent, item: Item): void
    (e: 'toggle-expand', event: MouseEvent, index: number, item: Item): void
    (e: 'toggle-select', item: Item): void
}>()

const rowClassName = computed(() => {
    if (typeof props.bodyRowClassName === 'function') {
        return props.bodyRowClassName(props.item, props.index)
    }
    return props.bodyRowClassName
})

const handleRowClick = (event: MouseEvent) => {
    emit('click', event, props.item, props.index)
}

const handleRowDoubleClick = (event: MouseEvent) => {
    emit('dblclick', event, props.item, props.index)
}

const handleContextMenu = (event: MouseEvent) => {
    emit('contextmenu', event, props.item)
}
</script>
