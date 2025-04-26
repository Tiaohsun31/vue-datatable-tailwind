<template>
    <div v-if="!hideFooter" class="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0"
    :class="[{'shadow-xs': showShadow}, footerClassName]">
        <!-- Mobile View -->
        <PaginationArrows :is-first-page="isFirstPage" :is-last-page="isLastPage"
            @click-next-page="() => emit('nextPage')" @click-prev-page="() => emit('prevPage')"
            class="sm:hidden flex flex-1">
            <template #buttonsPagination>
                <div class="grow"></div>
            </template>
        </PaginationArrows>

        <!-- Desktop View -->
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <!-- Rows Per Page -->
            <RowsPerPageSelector v-if="!hideRowsPerPage" :model-value="rowsPerPage" :rows-items="rowsItems"
                :message="rowsPerPageMessage" @update:model-value="emit('update:rowsPerPage', $event)" />

            <!-- Pagination Info -->
            <PaginationInfo v-if="!hidePaginationInfo" :current-page-first-index="currentPageFirstIndex"
                :current-page-last-index="currentPageLastIndex" :total-items-length="totalItemsLength"
                :rows-of-page-separator-message="rowsOfPageSeparatorMessage">
                <template v-if="$slots['pagination-info']" #default="slotProps">
                    <slot name="pagination-info" v-bind="slotProps"></slot>
                </template>
            </PaginationInfo>

            <!-- Pagination -->
            <slot v-if="$slots.pagination" name="pagination" v-bind="paginationProps" />
            <template v-else>
                <PaginationArrows :is-first-page="isFirstPage" :is-last-page="isLastPage"
                    @click-next-page="() => emit('nextPage')" @click-prev-page="() => emit('prevPage')">
                    <template v-if="buttonsPagination" #buttonsPagination>
                        <ButtonsPagination :current-pagination-number="currentPaginationNumber"
                            :max-pagination-number="maxPaginationNumber"
                            @update-page="(page) => emit('updatePage', page)" />
                    </template>
                </PaginationArrows>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RowsPerPageSelector from './RowsPerPageSelector.vue'
import PaginationInfo from './PaginationInfo.vue'
import PaginationArrows from '../buttons/PaginationArrows.vue'
import ButtonsPagination from '../buttons/ButtonsPagination.vue'

const props = defineProps<{
    hideFooter?: boolean
    hideRowsPerPage?: boolean
    hidePaginationInfo?: boolean
    buttonsPagination?: boolean
    showShadow?: boolean
    footerClassName?: string

    rowsPerPage: number
    rowsItems: number[]
    rowsPerPageMessage: string
    rowsOfPageSeparatorMessage: string

    currentPageFirstIndex: number
    currentPageLastIndex: number
    totalItemsLength: number

    currentPaginationNumber: number
    maxPaginationNumber: number
    isFirstPage: boolean
    isLastPage: boolean
}>()

const emit = defineEmits<{
    (e: 'update:rowsPerPage', value: number): void
    (e: 'nextPage'): void
    (e: 'prevPage'): void
    (e: 'updatePage', page: number): void
}>()

const paginationProps = computed(() => ({
    isFirstPage: props.isFirstPage,
    isLastPage: props.isLastPage,
    currentPaginationNumber: props.currentPaginationNumber,
    maxPaginationNumber: props.maxPaginationNumber,
    nextPage: () => emit('nextPage'),
    prevPage: () => emit('prevPage'),
    updatePage: (page: number) => emit('updatePage', page)
}))
</script>
