<template>
    <div class="text-sm text-gray-700">
        <slot :first-index="currentPageFirstIndex" :last-index="currentPageLastIndex" :total="totalItemsLength"
            :separator="rowsOfPageSeparatorMessage">
            {{ `${currentPageFirstIndex}–${currentPageLastIndex}` }}
            {{ rowsOfPageSeparatorMessage }} {{ totalItemsLength }}
        </slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    currentPageFirstIndex: number
    currentPageLastIndex: number
    totalItemsLength: number
    rowsOfPageSeparatorMessage: string
}>()
</script>
