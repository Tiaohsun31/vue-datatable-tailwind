<template>
    <div class="flex items-center space-x-2" role="navigation" aria-label="Pagination navigation">
        <!-- Previous Page Button -->
        <button type="button" class="relative inline-flex items-center p-1.5 rounded-md border" :class="[
            isFirstPage
                ? [
                    'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed',
                    'hover:bg-gray-50'
                ]
                : [
                    'border-gray-300 bg-white text-gray-500',
                    'hover:bg-gray-50 hover:text-gray-700',
                ]
        ]" :disabled="isFirstPage" @click="emits('clickPrevPage')" aria-label="Previous page">
            <svg class="h-5 w-5" :class="{ 'opacity-50': isFirstPage }" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        <!-- Pagination Buttons (if slot provided) -->
        <slot name="buttonsPagination"></slot>

        <!-- Next Page Button -->
        <button type="button" class="relative inline-flex items-center p-1.5 rounded-md border" :class="[
            isLastPage
                ? [
                    'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed',
                    'hover:bg-gray-50'
                ]
                : [
                    'border-gray-300 bg-white text-gray-500',
                    'hover:bg-gray-50 hover:text-gray-700',
                ]
        ]" :disabled="isLastPage" @click="emits('clickNextPage')" aria-label="Next page">
            <svg class="h-5 w-5" :class="{ 'opacity-50': isLastPage }" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

defineProps({
    isFirstPage: {
        type: Boolean,
        required: true,
        default: false
    },
    isLastPage: {
        type: Boolean,
        required: true,
        default: false
    }
});

const emits = defineEmits(['clickPrevPage', 'clickNextPage']);
</script>
