<template>
    <BaseCheckbox :checked="checked" :disabled="disabled" :partial="false" @change="emits('change')" />
</template>

<script setup lang="ts">
import BaseCheckbox from './BaseCheckbox.vue';

const { checked = true, disabled = false } = defineProps<{ checked: boolean, disabled: boolean }>();

const emits = defineEmits(['change']);
</script>
