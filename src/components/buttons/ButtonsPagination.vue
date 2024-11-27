<template>
    <div class="inline-flex rounded-md shadow-sm" role="navigation" aria-label="Pagination">
        <div v-for="(item, i) in paginationItemsForRender" :key="i"
            class="relative inline-flex items-center justify-center" :style="themeClasses.style" :class="[
                // Common styles for all items
                'min-w-[32px] h-8 text-sm',
                // First item styles
                i === 0 && 'rounded-l-md',
                // Last item styles
                i === paginationItemsForRender.length - 1 && 'rounded-r-md',
                // Button specific styles
                item.type === 'button' && [
                    'border border-gray-300',
                    // Active state
                    item.active ? [
                        'z-10',
                        themeClasses.base,
                        'relative'
                    ] : [
                        'bg-white',
                        'text-gray-700',
                        'hover:bg-gray-50',
                        'focus:z-10 focus:outline-none focus:ring-1',
                        `focus:ring-${themeClasses.tailwindName}-500`,
                        `focus:border-${themeClasses.tailwindName}-500`
                    ],
                    // Disable hover effect for active button
                    !item.active && 'cursor-pointer',
                    // Connect borders for middle buttons
                    i !== 0 && '-ml-px'
                ],
                // Omission (ellipsis) styles
                item.type === 'omission' && [
                    'bg-white border border-gray-300 text-gray-700',
                    i !== 0 && '-ml-px'
                ]
            ]" @click="changePage(item)">
            <!-- Button Content -->
            <template v-if="item.type === 'button'">
                <span class="px-3 py-1.5" :class="{ 'font-medium': item.active }">
                    {{ item.page }}
                </span>
            </template>

            <!-- Ellipsis -->
            <template v-else>
                <IconEllipsis></IconEllipsis>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ThemeStateClasses } from '@/types/internal';
import { computed, inject, type ComputedRef } from 'vue';
import { IconEllipsis } from '../icons';

const props = defineProps({
    maxPaginationNumber: {
        type: Number,
        required: true
    },
    currentPaginationNumber: {
        type: Number,
        required: true
    },
});

const emits = defineEmits(['updatePage']);
const themeClasses = inject<ComputedRef<ThemeStateClasses>>('themeClasses')!;

// Total number of visible pagination items (including ellipsis)
const totalVisible = 7;

type PaginationItem = {
    type: 'button'
    page: number
    active: boolean
    activePrev: boolean
} | {
    type: 'omission'
};

function getButtonClasses(item: PaginationItem, index: number) {
    const baseClasses = [
        'min-w-[32px] h-8 text-sm',
        // First item styles
        index === 0 && 'rounded-l-md',
        // Last item styles
        index === paginationItemsForRender.value.length - 1 && 'rounded-r-md'
    ];

    if (item.type === 'button') {
        baseClasses.push('border border-gray-300');

        if (item.active) {
            baseClasses.push(
                'z-10',
                'relative',
                themeClasses.value.base,
            );
        } else {
            baseClasses.push(
                'bg-white',
                'text-gray-700',
                'hover:bg-gray-50',
                'focus:z-10',
                'focus:outline-none',
                `focus:ring-${themeClasses.value.tailwindName}-500`,
                `focus:border-${themeClasses.value.tailwindName}-500`,
                'cursor-pointer'
            );
        }

        if (index !== 0) {
            baseClasses.push('-ml-px');
        }
    } else {
        baseClasses.push(
            'bg-white',
            'border',
            'border-gray-300',
            'text-gray-700'
        );
        if (index !== 0) {
            baseClasses.push('-ml-px');
        }
    }

    return baseClasses;
}


const changePage = (item: PaginationItem) => {
    if (item.type === 'button' && !item.active) {
        emits('updatePage', item.page);
    }
};

/**
 * Compute the pagination items to render based on current page and max pages
 */
const paginationItemsForRender = computed((): PaginationItem[] => {
    const items: PaginationItem[] = [];
    const { maxPaginationNumber, currentPaginationNumber } = props;

    // Case 1: 總頁數 <= 7：顯示所有頁碼
    if (maxPaginationNumber <= totalVisible) {
        for (let i = 1; i <= maxPaginationNumber; i += 1) {
            items.push({
                type: 'button',
                page: i,
                active: i === currentPaginationNumber,
                activePrev: (i + 1) === currentPaginationNumber
            });
        }
        return items;
    }

    // Case 2: 當前頁在開始或結尾（1,2,n-1,n）：顯示 1 2 3 ... n-2 n-1 n
    if ([1, 2, maxPaginationNumber, maxPaginationNumber - 1].includes(currentPaginationNumber)) {
        for (let i = 1; i <= totalVisible; i += 1) {
            if (i <= 3) {
                items.push({
                    type: 'button',
                    page: i,
                    active: i === currentPaginationNumber,
                    activePrev: (i + 1) === currentPaginationNumber
                });
            } else if (i === 4) {
                items.push({ type: 'omission' });
            } else {
                const page = maxPaginationNumber - (totalVisible - i);
                items.push({
                    type: 'button',
                    page,
                    active: page === currentPaginationNumber,
                    activePrev: (page + 1) === currentPaginationNumber
                });
            }
        }
    }
    // Case 3: 當前頁在開始附近（3,4）：顯示 1 2 3 4 5 ... n
    else if ([3, 4].includes(currentPaginationNumber)) {
        for (let i = 1; i <= totalVisible; i += 1) {
            if (i <= 5) {
                items.push({
                    type: 'button',
                    page: i,
                    active: i === currentPaginationNumber,
                    activePrev: (i + 1) === currentPaginationNumber
                });
            } else if (i === 6) {
                items.push({ type: 'omission' });
            } else {
                items.push({
                    type: 'button',
                    page: maxPaginationNumber,
                    active: maxPaginationNumber === currentPaginationNumber,
                    activePrev: false
                });
            }
        }
    }
    // Case 4: 當前頁在結尾附近（n-2,n-3）：顯示 1 ... n-4 n-3 n-2 n-1 n
    else if ([maxPaginationNumber - 2, maxPaginationNumber - 3].includes(currentPaginationNumber)) {
        for (let i = 1; i <= totalVisible; i += 1) {
            if (i === 1) {
                items.push({
                    type: 'button',
                    page: 1,
                    active: currentPaginationNumber === 1,
                    activePrev: false
                });
            } else if (i === 2) {
                items.push({ type: 'omission' });
            } else {
                const page = maxPaginationNumber - (totalVisible - i);
                items.push({
                    type: 'button',
                    page,
                    active: page === currentPaginationNumber,
                    activePrev: (page + 1) === currentPaginationNumber
                });
            }
        }
    }
    // Case 5: 當前頁在中間：顯示 1 ... x-1 x x+1 ... n
    else {
        for (let i = 1; i <= totalVisible; i += 1) {
            if (i === 1) {
                items.push({
                    type: 'button',
                    page: 1,
                    active: currentPaginationNumber === 1,
                    activePrev: false
                });
            } else if (i === 2 || i === 6) {
                items.push({ type: 'omission' });
            } else if (i === 7) {
                items.push({
                    type: 'button',
                    page: maxPaginationNumber,
                    active: maxPaginationNumber === currentPaginationNumber,
                    activePrev: false
                });
            } else {
                const diff = 4 - i;
                const page = currentPaginationNumber - diff;
                items.push({
                    type: 'button',
                    page,
                    active: page === currentPaginationNumber,
                    activePrev: (page + 1) === currentPaginationNumber
                });
            }
        }
    }

    return items;
});
</script>
