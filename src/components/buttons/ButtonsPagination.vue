<template>
    <div class="vdt-pagination vdt-pagination-buttons" role="navigation" aria-label="Pagination">
        <div v-for="(item, i) in paginationItemsForRender" :key="i" class="vdt-pagination-item" :class="{
            'vdt-pagination-item--button': item.type === 'button' && !item.active,
            'vdt-pagination-item--active': item.type === 'button' && item.active,
            'vdt-pagination-item--omission': item.type === 'omission',
        }" @click="changePage(item)">
            <!-- Button Content -->
            <template v-if="item.type === 'button'">
                <span class="vdt-pagination-item__label">
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
import { computed } from 'vue';
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
