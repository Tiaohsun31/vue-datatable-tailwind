<template>
    <div class="vdt-rows-per-page">
        {{ message }}
        <div class="vdt-rows-select-wrap">
            <!-- Custom Select Button -->
            <button type="button" class="vdt-rows-select" :class="{ 'vdt-rows-select--open': showList }"
                @click="toggleDropdown" aria-haspopup="listbox" :aria-expanded="showList">
                <!-- Selected Value -->
                <span class="vdt-rows-select__value">{{ rowsComputed }}</span>

                <!-- Dropdown Icon -->
                <span class="vdt-rows-select__caret">
                    <svg :class="{ 'vdt-rows-caret-up': showList }" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <!-- Dropdown Menu -->
            <Transition name="vdt-fade">
                <ul v-if="showList" class="vdt-rows-menu" :class="{ 'vdt-rows-menu--top': showInsideOfTable }"
                    tabindex="-1" role="listbox" @focusout="handleFocusOut">
                    <li v-for="item in rowsItems" :key="item" class="vdt-rows-option"
                        :class="{ 'vdt-rows-option--selected': item === rowsComputed }" role="option"
                        :aria-selected="item === rowsComputed" @click="changeSelectedRows(item)">
                        <!-- Option Text -->
                        <span>{{ item }}</span>

                        <!-- Selected Indicator -->
                        <span v-if="item === rowsComputed" class="vdt-rows-option__check">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
import { ref, computed, onMounted, onBeforeUnmount, inject, watch } from 'vue';
import { dataTableKey } from '../../keys';
const props = defineProps({
    modelValue: {
        type: Number,
        requilime: true
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
const dataTable = inject(dataTableKey);


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
    if (!target.closest('.vdt-rows-select-wrap')) {
        showList.value = false;
    }
};

// Handle focus out
const handleFocusOut = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest('.vdt-rows-select-wrap')) {
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
