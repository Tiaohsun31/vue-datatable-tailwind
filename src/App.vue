<template>
    <DataTable :headers="columns" :items="data"></DataTable>
</template>

<script setup lang="ts">
import DataTable from './components/DataTable.vue';
const columns = [
    { value: 'name', text: 'Name', sortable: true },
    { value: 'age', text: 'Age', sortable: true },
    { value: 'email', text: 'Email' }
]

const data = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: 'Jane', age: 25, email: 'jane@example.com' }
]
</script>
