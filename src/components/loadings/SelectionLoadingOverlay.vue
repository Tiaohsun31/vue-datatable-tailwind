<template>
    <div class="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl space-y-4">
            <div class="text-center text-lg font-medium">
                Processing data selection...
            </div>
            <div class="w-64">
                <div class="h-2 bg-gray-200 rounded-sm">
                    <div class="h-2 rounded-sm transition-all duration-300 ease-out"
                        :style="{ width: `${progress}%`, backgroundColor: themeClasses.hex }">
                    </div>
                </div>
            </div>
            <div class="text-center text-sm text-gray-600">
                {{ Math.round(progress) }}%
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, type ComputedRef } from 'vue';
import type { ThemeStateClasses } from '@/types/internal';

defineProps<{
    progress: number
}>();

const themeClasses = inject<ComputedRef<ThemeStateClasses>>('themeClasses')!;
</script>
