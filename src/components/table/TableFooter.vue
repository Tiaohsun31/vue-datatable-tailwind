<!-- TableFooter.vue - 優化的響應式設計 -->
<template>
    <div class="vdt-footer" :class="[
        'bg-white border border-gray-200 border-t-0',
        { 'shadow-sm': showShadow },
        baseFooterClasses,
        footerClassName
    ]">
        <!-- Mobile View -->
        <div class="vdt-footer-mobile sm:hidden flex flex-1 w-full" :class="mobileFooterClasses">
            <slot name="footer-mobile" v-bind="footerSlotProps" v-bind:paginationInfo="paginationInfoSlotProps"
                v-bind:pagination="paginationSlotProps">
                <PaginationArrows :is-first-page="isFirstPage" :is-last-page="isLastPage"
                    @click-next-page="() => emit('nextPage')" @click-prev-page="() => emit('prevPage')">
                    <template #buttonsPagination>
                        <div class="grow"></div>
                    </template>
                </PaginationArrows>
            </slot>
        </div>

        <!-- Desktop View -->
        <div class="vdt-footer-desktop hidden sm:flex sm:items-center sm:justify-between px-4 py-3"
            :class="desktopFooterClasses">
            <slot name="footer-desktop" v-bind="footerSlotProps" v-bind:paginationInfo="paginationInfoSlotProps"
                v-bind:pagination="paginationSlotProps">
                <!-- Left Section -->
                <div class="flex items-center space-x-4">
                    <slot name="footer-desktop-left" v-bind="footerSlotProps"
                        v-bind:paginationInfo="paginationInfoSlotProps" v-bind:pagination="paginationSlotProps">
                        <!-- Rows Per Page -->
                        <slot v-if="!hideRowsPerPage" name="rows-per-page" v-bind="rowsPerPageSlotProps">
                            <RowsPerPageSelector :model-value="rowsPerPage" :rows-items="rowsItems"
                                :message="rowsPerPageMessage"
                                @update:model-value="emit('update:rowsPerPage', $event)" />
                        </slot>
                    </slot>
                </div>
                <!-- Center Section -->
                <div class="flex items-center">
                    <slot name="footer-desktop-center" v-bind="footerSlotProps"
                        v-bind:paginationInfo="paginationInfoSlotProps" v-bind:pagination="paginationSlotProps">
                        <!-- Pagination Info -->
                        <slot v-if="!hidePaginationInfo" name="pagination-info" v-bind="paginationInfoSlotProps">
                            <PaginationInfo :current-page-first-index="currentPageFirstIndex"
                                :current-page-last-index="currentPageLastIndex" :total-items-length="totalItemsLength"
                                :rows-of-page-separator-message="rowsOfPageSeparatorMessage" />
                        </slot>
                    </slot>
                </div>
                <!-- Right Section -->
                <div class="flex items-center space-x-4">
                    <slot name="footer-desktop-right" v-bind="footerSlotProps"
                        v-bind:paginationInfo="paginationInfoSlotProps" v-bind:pagination="paginationSlotProps">
                        <!-- Pagination -->
                        <slot name="pagination" v-bind="paginationSlotProps">
                            <PaginationArrows :is-first-page="isFirstPage" :is-last-page="isLastPage"
                                @click-next-page="() => emit('nextPage')" @click-prev-page="() => emit('prevPage')">
                                <template v-if="buttonsPagination" #buttonsPagination>
                                    <ButtonsPagination :current-pagination-number="currentPaginationNumber"
                                        :max-pagination-number="maxPaginationNumber"
                                        @update-page="(page) => emit('updatePage', page)" />
                                </template>
                            </PaginationArrows>
                        </slot>
                    </slot>
                </div>
            </slot>
        </div>
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

    // 新增的 className 配置
    footerClassName?: string
    baseFooterClasses?: string
    mobileFooterClasses?: string
    desktopFooterClasses?: string

    // 手機版控制選項
    showRowsPerPageOnMobile?: boolean
    showButtonsPaginationOnMobile?: boolean

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
    baseFooterClasses: '',
    mobileFooterClasses: '',
    desktopFooterClasses: '',
    showRowsPerPageOnMobile: false,
    showButtonsPaginationOnMobile: false
})

const emit = defineEmits<{
    (e: 'update:rowsPerPage', value: number): void
    (e: 'nextPage'): void
    (e: 'prevPage'): void
    (e: 'updatePage', page: number): void
}>()

// 各個插槽的 props
const footerSlotProps = computed(() => props)

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
</script>
