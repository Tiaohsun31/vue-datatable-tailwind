<template>
    <div class="vdt-checkbox" :class="!disabled ? 'vdt-checkbox--clickable' : 'vdt-checkbox--disabled'"
        @click.stop.prevent="!disabled && $emit('change')">
        <input type="checkbox" class="vdt-checkbox__native" :checked="isChecked" :disabled="disabled"
            :indeterminate.prop="isPartial" :aria-checked="isPartial ? 'mixed' : isChecked" />
        <div class="vdt-checkbox__box" :class="{ 'vdt-checkbox__box--checked': isChecked || isPartial }">
            <!-- Checkmark for checked state -->
            <svg v-show="isChecked && !isPartial" class="vdt-checkbox__icon" fill="none" viewBox="1 1 24 24"
                stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            <!-- Minus sign for partial state -->
            <svg v-show="isPartial" class="vdt-checkbox__icon" fill="none" viewBox="1 1 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    checked: boolean,
    partial: boolean,
    disabled?: boolean
}>(), {
    checked: false,
    partial: false,
    disabled: false
});

const isChecked = computed(() => props.checked);
const isPartial = computed(() => props.partial);

defineEmits(['change']);
</script>
