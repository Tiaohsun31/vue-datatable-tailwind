import { Ref, ComputedRef } from 'vue';
import { HeaderForRender } from '../types/internal';
type FixedColumnsInfo = {
    value: string;
    fixed: boolean;
    position: 'left' | 'right';
    distance: number;
    width: number;
};
export default function useFixedColumn(headersForRender: Ref<HeaderForRender[]>, tableContainerRef: Ref<HTMLElement | null>): {
    fixedHeaders: ComputedRef<HeaderForRender[]>;
    leftFixedHeaders: ComputedRef<HeaderForRender[]>;
    rightFixedHeaders: ComputedRef<HeaderForRender[]>;
    lastLeftFixedColumn: ComputedRef<string>;
    firstRightFixedColumn: ComputedRef<string>;
    fixedColumnsInfos: ComputedRef<FixedColumnsInfo[]>;
    showShadow: Ref<boolean, boolean>;
};
export {};
//# sourceMappingURL=useFixedColumn.d.ts.map