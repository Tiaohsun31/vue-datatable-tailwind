<template>
    <BaseCheckbox :checked="isChecked" :partial="isPartial" :disabled="disabled"
        @change="emits('change', !isChecked)" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCheckbox from './SingleSelectCheckBox.vue';

const props = defineProps({
    status: {
        type: String as () => 'allSelected' | 'noneSelected' | 'partSelected',
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const isChecked = computed(() => props.status === 'allSelected');
const isPartial = computed(() => props.status === 'partSelected');

const emits = defineEmits(['change']);
</script>
