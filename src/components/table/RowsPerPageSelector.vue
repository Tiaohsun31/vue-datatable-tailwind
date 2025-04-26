<template>
    <div class="flex items-center gap-2 text-sm text-gray-700">
        {{ message }}

        <div class="relative inline-block min-w-[70px]">
            <!-- Custom Select Button -->
            <button type="button"
                class="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-gray-300"
                :class="[
                    'focus:border-primary-500 focus:outline-hidden focus:ring-1 focus:ring-primary-500',
                    showList ? 'ring-1 ring-primary-500 border-primary-500' : 'hover:border-gray-400'
                ]" @click="toggleDropdown" aria-haspopup="listbox" :aria-expanded="showList">
                <!-- Selected Value -->
                <span class="block truncate">{{ rowsComputed }}</span>

                <!-- Dropdown Icon -->
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg class="h-4 w-4 text-gray-400 transition-transform duration-200"
                        :class="{ 'rotate-180': showList }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <!-- Dropdown Menu -->
            <Transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <ul v-if="showList"
                    class="absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden"
                    :class="{ 'bottom-full mb-1': showInsideOfTable }" tabindex="-1" role="listbox"
                    @focusout="handleFocusOut">
                    <li v-for="item in rowsItems" :key="item"
                        class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm" :class="[
                            item === rowsComputed
                                ? 'bg-primary-100 text-primary-900'
                                : 'text-gray-900 hover:bg-gray-100'
                        ]" role="option" :aria-selected="item === rowsComputed" @click="changeSelectedRows(item)">
                        <!-- Option Text -->
                        <span class="block " :class="{ 'font-medium': item === rowsComputed }">
                            {{ item }}
                        </span>

                        <!-- Selected Indicator -->
                        <span v-if="item === rowsComputed"
                            class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </li>
                </ul>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, inject, watch, type Ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    rowsItems: {
        type: Array as () => number[],
        required: true
    },
    message: {
        type: String,
        default: 'Rows per page:'
    }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// State
const showList = ref(false);
const showInsideOfTable = ref(false);

// Compute selected value
const rowsComputed = computed({
    get: () => props.modelValue,
    set: (value: number) => emit('update:modelValue', value)
});

// Inject data table ref from parent
const dataTable = inject('dataTable') as Ref<HTMLDivElement>;

// Watch dropdown state to determine position
watch(showList, (val) => {
    if (val && dataTable?.value) {
        const windowHeight = window.innerHeight;
        const dataTableRect = dataTable.value.getBoundingClientRect();
        const spaceBelow = windowHeight - (dataTableRect.height + dataTableRect.top);
        showInsideOfTable.value = spaceBelow <= 100;
    }
});

// Handle row selection
const changeSelectedRows = (value: number) => {
    rowsComputed.value = value;
    showList.value = false;
};

// Toggle dropdown
const toggleDropdown = () => {
    showList.value = !showList.value;
};

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
        showList.value = false;
    }
};

// Handle focus out
const handleFocusOut = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest('.relative')) {
        showList.value = false;
    }
};

// Setup event listeners
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
