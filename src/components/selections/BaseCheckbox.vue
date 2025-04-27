<template>
    <div class="relative inline-flex items-center justify-center h-5 w-5" :class="[
        !disabled && 'cursor-pointer group',
        disabled && 'cursor-not-allowed opacity-50'
    ]" @click.stop.prevent="!disabled && $emit('change')">
        <input type="checkbox" class="sr-only peer" :checked="isChecked" :disabled="disabled"
            :aria-checked="isChecked" />
        <div class="h-4 w-4 rounded-sm transition-all duration-200 border" :class="[
            // Base states
            isChecked && !isPartial && [
                'bg-vdt-primary-500 border-vdt-primary-500',
                !disabled && 'group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600'
            ],
            isPartial && [
                'bg-vdt-primary-500 border-vdt-primary-500',
                !disabled && 'group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600'
            ],
            !isChecked && !isPartial && [
                'border-gray-300 bg-white',
                !disabled && 'group-hover:border-vdt-primary-300'
            ],

            // Focus states
            !disabled && 'peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-vdt-primary-500/50'
        ]">
            <!-- Checkmark for checked state -->
            <svg v-show="isChecked && !isPartial" class="h-4 w-4 text-white stroke-3" fill="none" viewBox="1 1 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            <!-- Minus sign for partial state -->
            <svg v-show="isPartial" class="h-4 w-4 text-white" fill="none" viewBox="1 1 24 24" stroke="currentColor">
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
