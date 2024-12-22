<template>
    <span :key="sortType" class="inline-flex transition-opacity duration-200" :class="[
        sortType === 'none' ? 'opacity-0' : 'opacity-100',
        'group-hover:opacity-100'
    ]">
        <IconSort :class="{ 'transform rotate-180': sortType === 'desc' }" />
    </span>
</template>

<script setup lang="ts">
import IconSort from './IconSort.vue';

defineProps<{
    sortType: 'asc' | 'desc' | 'none';
}>();

</script>
