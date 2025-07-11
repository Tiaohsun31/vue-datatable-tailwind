<template>
    <div class="vdt-pagination flex items-center space-x-2" role="navigation" aria-label="Pagination navigation">
        <!-- Previous Page Button -->
        <button type="button"
            class="relative inline-flex items-center p-1.5 rounded-md border transition-colors border-vdt-outline bg-vdt-surface"
            :class="[
                isFirstPage
                    ? [
                        'text-vdt-content-muted cursor-not-allowed',
                        'hover:bg-vdt-surface'
                    ]
                    : [
                        'text-vdt-content-secondary',
                        'hover:bg-vdt-interactive-hover hover:text-vdt-content',
                    ]
            ]" :disabled="isFirstPage" @click="emits('clickPrevPage')" aria-label="Previous page">
            <IconPrevPage :class="{ 'opacity-50': isFirstPage }"></IconPrevPage>
        </button>

        <!-- Pagination Buttons (if slot provided) -->
        <slot name="buttonsPagination"></slot>

        <!-- Next Page Button -->
        <button type="button"
            class="relative inline-flex items-center p-1.5 rounded-md border transition-colors border-vdt-outline bg-vdt-surface "
            :class="[
                isLastPage
                    ? [
                        'text-vdt-content-muted cursor-not-allowed',
                        'hover:bg-vdt-surface'
                    ]
                    : [
                        'text-vdt-content-secondary',
                        'hover:bg-vdt-interactive-hover hover:text-vdt-content',
                    ]
            ]" :disabled="isLastPage" @click="emits('clickNextPage')" aria-label="Next page">
            <IconNextPage :class="{ 'opacity-50': isLastPage }"></IconNextPage>
        </button>
    </div>
</template>

<script setup lang="ts">
import { IconNextPage, IconPrevPage } from '../icons';

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
