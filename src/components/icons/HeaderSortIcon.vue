<template>
    <span :key="sortType" class="vdt-sort-icon" :class="{ 'vdt-sort-icon--inactive': sortType === 'none' }">
        <IconSort :class="{ 'vdt-rotate-180': sortType === 'desc' }" />
    </span>
</template>

<script setup lang="ts">
import IconSort from './IconSort.vue';

defineProps<{
    sortType: 'asc' | 'desc' | 'none';
}>();

</script>
