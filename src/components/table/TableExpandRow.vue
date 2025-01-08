<!-- components/table/ExpandRow.vue -->
<template>
    <tr class="vdt-expand-row border-0"
        :class="[expandRowClassName, { 'bg-gray-50': (index + 1) % 2 === 0, 'border-t': isExpanded }]">
        <td :colspan="columnsCount" class="relative p-0">
            <LoadingLine v-if="loading" class="mb-4" />
            <div class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out"
                :class="[{ 'grid-rows-[1fr]': isExpanded }]">
                <div class="overflow-hidden">
                    <slot></slot>
                </div>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '../../types/main'
import LoadingLine from '../loadings/LoadingLine.vue'

const props = defineProps<{
    item: Item
    index: number
    columnsCount: number
    loading?: boolean
    isExpanded: boolean
    bodyExpandRowClassName?: string | ((item: Item, index: number) => string)
}>()

const expandRowClassName = computed(() => {
    if (typeof props.bodyExpandRowClassName === 'function') {
        return props.bodyExpandRowClassName(props.item, props.index)
    }
    return props.bodyExpandRowClassName
})
</script>
