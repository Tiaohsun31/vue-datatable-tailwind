<!-- src/components/DataTables/components/SelectionLoadingOverlay.vue -->
<template>
    <div class="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl space-y-4">
            <div class="text-center text-lg font-medium">
                正在處理資料選擇...
            </div>
            <div class="w-64">
                <div class="h-2 bg-gray-200 rounded">
                    <div class="h-2 rounded transition-all duration-300 ease-out" :style="{ width: `${progress}%`, backgroundColor: themeColor }"></div>
                </div>
            </div>
            <div class="text-center text-sm text-gray-600">
                {{ Math.round(progress) }}%
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

defineProps<{
    progress: number
}>();

const themeColor = inject<string>('themeColor');
</script>