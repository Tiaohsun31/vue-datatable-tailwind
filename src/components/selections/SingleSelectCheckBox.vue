<template>
    <BaseCheckbox :checked="checked" :partial="false" @change="emits('change')" />
</template>

<script setup lang="ts">
import BaseCheckbox from './BaseCheckbox.vue';

defineProps({
    checked: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(['change']);
</script>
