<template>
    <div class="vdt-pagination vdt-pagination-arrows" role="navigation" aria-label="Pagination navigation">
        <!-- Previous Page Button -->
        <button type="button" class="vdt-pagination-arrow" :disabled="isFirstPage"
            @click="emits('clickPrevPage')" aria-label="Previous page">
            <IconPrevPage></IconPrevPage>
        </button>

        <!-- Pagination Buttons (if slot provided) -->
        <slot name="buttonsPagination"></slot>

        <!-- Next Page Button -->
        <button type="button" class="vdt-pagination-arrow" :disabled="isLastPage"
            @click="emits('clickNextPage')" aria-label="Next page">
            <IconNextPage></IconNextPage>
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
