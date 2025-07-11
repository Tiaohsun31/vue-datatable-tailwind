<!-- TableFooter.vue - 優化的響應式設計 -->
<template>
    <div class="vdt-footer" :class="[
        'bg-vdt-surface border border-vdt-outline border-t-0',
        { 'shadow-sm': showShadow },
        footerClassName
    ]">
        <!-- Mobile View -->
        <slot name="footer-mobile" v-bind="slotProps">
            <div class="vdt-footer-mobile sm:hidden px-4 py-3 w-full" :class="mobileFooterClasses">
                <PaginationArrows :is-first-page="isFirstPage" :is-last-page="isLastPage"
                    @click-next-page="() => emit('nextPage')" @click-prev-page="() => emit('prevPage')"
                    class="sm:hidden flex items-center justify-between w-full">
                    <template #buttonsPagination>
                        <div class="flex-1 flex justify-center">
                            <span class="text-sm text-vdt-content px-3">
                                {{ currentPaginationNumber }} / {{ maxPaginationNumber }}
                            </span>
                        </div>
                    </template>
                </PaginationArrows>
            </div>
        </slot>

        <!-- Desktop View -->
        <slot name="footer-desktop" v-bind="slotProps">
            <div class="vdt-footer-desktop hidden sm:flex items-center justify-between px-4 py-3 w-full"
                :class="desktopFooterClasses">
                <!-- Rows Per Page -->
                <div class="flex-1 flex items-center justify-start">
                    <slot name="rows-per-page" v-bind="slotProps.rowsPerPage" v-bind:raw-props="slotProps">
                        <div v-if="!hideRowsPerPage" class="text-sm">
                            <RowsPerPageSelector :model-value="rowsPerPage" :rows-items="rowsItems"
                                :message="rowsPerPageMessage"
                                @update:model-value="emit('update:rowsPerPage', $event)" />
                        </div>
                    </slot>
                </div>
                <!-- Pagination Info -->
                <div class="flex-1 flex items-center justify-center">
                    <slot name="pagination-info" v-bind="slotProps.paginationInfo" v-bind:raw-props="slotProps">
                        <div v-if="!hidePaginationInfo" class="text-sm">
                            <PaginationInfo :current-page-first-index="currentPageFirstIndex"
                                :current-page-last-index="currentPageLastIndex" :total-items-length="totalItemsLength"
                                :rows-of-page-separator-message="rowsOfPageSeparatorMessage" />
                        </div>
                    </slot>
                </div>
                <!-- Pagination -->
                <div class="flex-1 flex items-center justify-end">
                    <slot name="pagination" v-bind="slotProps.pagination" v-bind:raw-props="slotProps">
                        <PaginationArrows :is-first-page="isFirstPage" :is-last-page="isLastPage"
                            @click-next-page="() => emit('nextPage')" @click-prev-page="() => emit('prevPage')">
                            <template v-if="buttonsPagination" #buttonsPagination>
                                <ButtonsPagination :current-pagination-number="currentPaginationNumber"
                                    :max-pagination-number="maxPaginationNumber"
                                    @update-page="(page) => emit('updatePage', page)" />
                            </template>
                        </PaginationArrows>
                    </slot>
                </div>
            </div>
        </slot>

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RowsPerPageSelector from './RowsPerPageSelector.vue'
import PaginationInfo from './PaginationInfo.vue'
import PaginationArrows from '../buttons/PaginationArrows.vue'
import ButtonsPagination from '../buttons/ButtonsPagination.vue'

const props = withDefaults(defineProps<{
    hideRowsPerPage?: boolean
    hidePaginationInfo?: boolean
    buttonsPagination?: boolean
    showShadow?: boolean

    footerClassName?: string
    mobileFooterClasses?: string
    desktopFooterClasses?: string

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
}>(), {
    footerClassName: '',
    mobileFooterClasses: '',
    desktopFooterClasses: '',
})

const emit = defineEmits<{
    (e: 'update:rowsPerPage', value: number): void
    (e: 'nextPage'): void
    (e: 'prevPage'): void
    (e: 'updatePage', page: number): void
}>()

const rowsPerPageSlotProps = computed(() => ({
    rowsPerPage: props.rowsPerPage,
    rowsItems: props.rowsItems,
    rowsPerPageMessage: props.rowsPerPageMessage,
    updateRowsPerPage: (value: number) => emit('update:rowsPerPage', value)
}))

const paginationInfoSlotProps = computed(() => ({
    currentPageFirstIndex: props.currentPageFirstIndex,
    currentPageLastIndex: props.currentPageLastIndex,
    totalItemsLength: props.totalItemsLength,
    rowsOfPageSeparatorMessage: props.rowsOfPageSeparatorMessage
}))

const paginationSlotProps = computed(() => ({
    isFirstPage: props.isFirstPage,
    isLastPage: props.isLastPage,
    currentPaginationNumber: props.currentPaginationNumber,
    maxPaginationNumber: props.maxPaginationNumber,
    buttonsPagination: props.buttonsPagination,
    nextPage: () => emit('nextPage'),
    prevPage: () => emit('prevPage'),
    updatePage: (page: number) => emit('updatePage', page)
}))

const slotProps = computed(() => ({
    // 原始 props (扁平化，方便直接使用)
    ...props,

    // 分頁資訊 (結構化)
    paginationInfo: {
        currentPageFirstIndex: props.currentPageFirstIndex,
        currentPageLastIndex: props.currentPageLastIndex,
        totalItemsLength: props.totalItemsLength,
        rowsOfPageSeparatorMessage: props.rowsOfPageSeparatorMessage
    },

    // 分頁操作 (結構化)
    pagination: {
        isFirstPage: props.isFirstPage,
        isLastPage: props.isLastPage,
        currentPaginationNumber: props.currentPaginationNumber,
        maxPaginationNumber: props.maxPaginationNumber,
        buttonsPagination: props.buttonsPagination,
        nextPage: () => emit('nextPage'),
        prevPage: () => emit('prevPage'),
        updatePage: (page: number) => emit('updatePage', page)
    },

    // 每頁行數 (結構化)
    rowsPerPage: {
        current: props.rowsPerPage,
        options: props.rowsItems,
        message: props.rowsPerPageMessage,
        update: (value: number) => emit('update:rowsPerPage', value)
    },

    // 便利方法 (扁平化，向後相容)
    updateRowsPerPage: (value: number) => emit('update:rowsPerPage', value),
    nextPage: () => emit('nextPage'),
    prevPage: () => emit('prevPage'),
    updatePage: (page: number) => emit('updatePage', page)
}))
</script>
