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
                'bg-theme border-theme',
                !disabled && 'group-hover:bg-theme-hover group-hover:border-theme-hover'
            ],
            isPartial && [
                'bg-theme border-theme',
                !disabled && 'group-hover:bg-theme-hover group-hover:border-theme-hover'
            ],
            !isChecked && !isPartial && [
                'border-gray-300 bg-white',
                !disabled && 'group-hover:border-theme-light'
            ],

            // Focus states
            !disabled && 'peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus'
        ]" :style="themeClasses.style">
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
import { computed, inject, type ComputedRef } from 'vue';
import type { ThemeStateClasses } from '@/types/internal';

// const props = defineProps({
//     checked: {
//         type: Boolean,
//         default: false
//     },
//     partial: {
//         type: Boolean,
//         default: false
//     },
//     disabled: {
//         type: Boolean,
//         default: false
//     }
// });
const props = withDefaults(defineProps<{ checked: boolean, partial: boolean, disabled?: boolean }>(), {
    checked: false,
    partial: false,
    disabled: false
});

const isChecked = computed(() => props.checked);
const isPartial = computed(() => props.partial);

const themeClasses = inject<ComputedRef<ThemeStateClasses>>('themeClasses')!;
defineEmits(['change']);
</script>
