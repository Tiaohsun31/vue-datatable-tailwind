// src/composables/useFixedColumn.ts
/**
    管理固定列的狀態
    計算固定列的位置
    處理固定列的寬度

 */
import { type Ref, computed, onMounted, onUnmounted, ref } from 'vue';
import type { HeaderForRender } from '../types/internal';

type FixedColumnsInfo = {
    value: string,
    fixed: boolean,
    distance: number,
    width: number,
};

export default function useFixedColumn(
    headersForRender: Ref<HeaderForRender[]>,
    tableBodyRef: Ref<HTMLElement | null>,
) {
    // 篩選出設置了 fixed: true 的列
    const fixedHeaders = computed((): HeaderForRender[] => headersForRender.value.filter((header) => header.fixed));

    // 返回最後一個固定列的值，用於添加陰影效果
    const lastFixedColumn = computed((): string => {
        if (!fixedHeaders.value.length) return '';
        return fixedHeaders.value[fixedHeaders.value.length - 1].value;
    });

    const fixedColumnsInfos = computed((): FixedColumnsInfo[] => {
        if (!fixedHeaders.value.length) return [];
        // 獲取所有固定列的寬度數組
        const fixedHeadersWidthArr = fixedHeaders.value.map((header) => header.width ?? 100);
        // 計算每個固定列的位置信息
        return fixedHeaders.value.map((header: HeaderForRender, index: number): FixedColumnsInfo => ({
            value: header.value,    // 列標籤
            fixed: header.fixed ?? true,   // 是否固定
            width: header.width ?? 100,  // 列寬度
            // 計算距離左側的距離
            distance: index === 0 ? 0 : fixedHeadersWidthArr.reduce((previous: number, current: number, i: number): number => {
                return i < index ? previous + current : previous;
            }, 0),
        }));
    });

    const showShadow = ref(false);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
        const element = tableBodyRef.value;
        if (element) {
            const handleScroll = () => {
                showShadow.value = element.scrollLeft > 0;
            };

            // 初始檢查
            handleScroll();

            // 添加事件監聽
            element.addEventListener('scroll', handleScroll);

            // 保存清理函數
            cleanup = () => {
                element.removeEventListener('scroll', handleScroll);
            };
        }
    });

    // 組件卸載時清理
    onUnmounted(() => {
        if (cleanup) {
            cleanup();
            cleanup = null;
        }
    });

    return {
        fixedHeaders,
        lastFixedColumn,
        fixedColumnsInfos,
        showShadow,
    };
}
