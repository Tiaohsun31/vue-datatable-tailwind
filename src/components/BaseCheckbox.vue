<template>
    <div class="relative inline-flex items-center justify-center h-5 w-5 cursor-pointer group"
        @click.stop.prevent="$emit('change')">
        <input type="checkbox" class="sr-only peer" :checked="isChecked" :aria-checked="isChecked" />
        <div class="h-4 w-4 rounded transition-all duration-200 border" :class="[
            // Base states
            isChecked && !isPartial && [
                'bg-blue-500 border-blue-500',
                'group-hover:bg-blue-600 group-hover:border-blue-600'
            ],
            isPartial && [
                'bg-blue-500 border-blue-500',
                'group-hover:bg-blue-600 group-hover:border-blue-600'
            ],
            !isChecked && !isPartial && [
                'border-gray-300 bg-white',
                'group-hover:border-blue-400'
            ],
            // Focus states
            'peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-blue-500/50'
        ]">
            <!-- Checkmark for checked state -->
            <svg v-show="isChecked && !isPartial" class="h-4 w-4 text-white stroke-[3]" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            <!-- Minus sign for partial state -->
            <svg v-show="isPartial" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    },
    partial: {
        type: Boolean,
        default: false
    }
});

const isChecked = computed(() => props.checked);
const isPartial = computed(() => props.partial);

defineEmits(['change']);
</script>