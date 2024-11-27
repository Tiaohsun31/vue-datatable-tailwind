<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-sm w-full">
            <div>
                <!-- <ThemeSwitcher v-model="currentTheme"></ThemeSwitcher> -->
            </div>

            <DataTable v-if="items.length" :headers="columns" :items="items" theme="#e11d48"
                v-model:items-selected="itemsSelected" expandColumn="logisticsCompanies" rowsPerPageMessage="每頁筆數:">
                <template #expand="item">
                    <span class="text-red-600">{{ item.logisticsCompanies }}</span>
                </template>
                <template #item-phoneNumber="item">
                    <span class="text-red-600 ">{{ item.phoneNumber }}</span>
                </template>
                <template #pagination-info="{ currentPageFirstIndex, currentPageLastIndex, totalItemsLength }">
                    <span>第 {{ currentPageFirstIndex }} 到第 {{ currentPageLastIndex }} 筆資料，
                        共 {{ Intl.NumberFormat().format(totalItemsLength) }} 筆資料</span>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from '../src/DataTable.vue'
import type { Header, Item } from '../src/types/main';
import { onMounted, ref, useTemplateRef } from 'vue';
// import ThemeSwitcher from '../src/components/ThemeSwitcher.vue';
import type { ThemeConfig, HeaderItemClassNameFunction, BodyRowClassNameFunction, BodyItemClassNameFunction } from '../src/types/main';

const currentTheme = ref<ThemeConfig>({
    color: 'rose',
    variant: 'DEFAULT'
});

const itemsSelected = ref([]);

const items = ref([]);
const columns = [
    { text: "回執單編號", value: "trackingCode", sortable: true, fixed: true },
    { text: "訂單編號", value: "orderNumber", sortable: true },
    { text: "團隊名稱", value: "groupName" },
    { text: "領隊", value: "recipient" },
    { text: "電話", value: "phoneNumber" },
    { text: "成員數", value: "memberCount", sortable: true },
    { text: "物流公司", value: "logisticsCompanies", sortable: true },
    { text: "物流編號", value: "logisticsNumber" },
    { text: "物流狀態", value: "logisticsStatus" },
    { text: "打包時間", value: "sentTime" },
    { text: "操作", value: "actions" }
];
// const headerItemClassNameFunction: HeaderItemClassNameFunction = (header: Header, columnNumber: number): string => {
//     if (header.value === 'phoneNumber') return 'hidden md:table-cell';
//     return '';
// };

const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
    if (item.phoneNumber === '123456789') return 'text-blue-500';
    return 'pass-row';
};

// const bodyExpandRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
//     return 'expand-row';
// };

const bodyItemClassNameFunction: BodyItemClassNameFunction = (column: string, rowNumber: number): string => {
    if (column === 'phoneNumber') return 'hidden md:table-cell';
    return '';
};

onMounted(() => {
    fetch('/api/order/360').then(res => res.json()).then(data => {
        items.value = data;
    })
});
</script>
