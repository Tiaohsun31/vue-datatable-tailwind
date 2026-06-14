import { PropType, DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
import { Header } from '../../types/main';
import { HeaderForRender, MultipleSelectStatus } from '../../types/internal';
declare var __VLS_9: string, __VLS_10: {
    header: HeaderForRender;
    index: number;
    sortable: boolean | undefined;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_9>]?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: DefineComponent<ExtractPropTypes<{
    header: {
        type: PropType<HeaderForRender>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
    fixedDistance: StringConstructor;
    lastLeftFixedColumn: StringConstructor;
    firstRightFixedColumn: StringConstructor;
    headerItemClassName: {
        type: PropType<string | ((header: Header, columnNumber: number) => string)>;
        default: string;
    };
    areAllVisibleRowsDisabled: BooleanConstructor;
    multipleSelectStatus: {
        type: PropType<MultipleSelectStatus>;
        default: string;
    };
    multiSort: BooleanConstructor;
    isMultiSorting: {
        type: PropType<(headerText: string) => boolean>;
        required: true;
    };
    getMultiSortNumber: {
        type: PropType<(headerText: string) => number | false>;
        required: true;
    };
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
    toggleSelectAll: (checked: boolean) => any;
    headerClick: (header: Header) => any;
}, string, PublicProps, Readonly< ExtractPropTypes<{
    header: {
        type: PropType<HeaderForRender>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
    fixedDistance: StringConstructor;
    lastLeftFixedColumn: StringConstructor;
    firstRightFixedColumn: StringConstructor;
    headerItemClassName: {
        type: PropType<string | ((header: Header, columnNumber: number) => string)>;
        default: string;
    };
    areAllVisibleRowsDisabled: BooleanConstructor;
    multipleSelectStatus: {
        type: PropType<MultipleSelectStatus>;
        default: string;
    };
    multiSort: BooleanConstructor;
    isMultiSorting: {
        type: PropType<(headerText: string) => boolean>;
        required: true;
    };
    getMultiSortNumber: {
        type: PropType<(headerText: string) => number | false>;
        required: true;
    };
}>> & Readonly<{
    onToggleSelectAll?: ((checked: boolean) => any) | undefined;
    onHeaderClick?: ((header: Header) => any) | undefined;
}>, {
    headerItemClassName: string | ((header: Header, columnNumber: number) => string);
    areAllVisibleRowsDisabled: boolean;
    multipleSelectStatus: MultipleSelectStatus;
    multiSort: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=TableHeaderCell.vue.d.ts.map