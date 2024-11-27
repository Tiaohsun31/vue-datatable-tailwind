<template>
    <div class="inline-flex relative w-[60px] h-[60px]">
        <div v-for="i in 4" :key="i"
            class="box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring"
            :class="[`animate-delay-${(i - 1) * 150}`]" :style="{
                borderTopColor: themeClasses.hex,
            }">
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, type ComputedRef } from 'vue';
import type { ThemeStateClasses } from '@/types/internal';

const themeClasses = inject<ComputedRef<ThemeStateClasses>>('themeClasses')!;

</script>

<style scoped>
@keyframes ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-ring {
    animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.animate-delay-0 {
    animation-delay: -0.45s;
}

.animate-delay-150 {
    animation-delay: -0.3s;
}

.animate-delay-300 {
    animation-delay: -0.15s;
}

.animate-delay-450 {
    animation-delay: 0s;
}
</style>
