<!-- components/table/ExpandRow.vue -->
<template>
    <tr class="vdt-expand-row" :class="[
        { 'bg-gray-50': (index + 1) % 2 === 0 },
        expandRowClassName
    ]">
        <td :colspan="columnsCount" class="px-4 py-2">
            <LoadingLine v-if="loading" class="mb-4" />
            <div class="transition-all duration-300" :class="{ 'opacity-0': !isExpanded }">
                <slot></slot>
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
