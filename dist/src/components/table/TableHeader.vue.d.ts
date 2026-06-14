import { PropType, DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
import { Header } from '../../types/main';
import { HeaderForRender, MultipleSelectStatus } from '../../types/internal';
declare var __VLS_12: string, __VLS_13: {
    header: HeaderForRender;
    index: number;
    sortable: boolean | undefined;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_12>]?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: DefineComponent<ExtractPropTypes<{
    headers: {
        type: PropType<HeaderForRender[]>;
        required: true;
    };
    hideHeader: BooleanConstructor;
    fixedHeader: BooleanConstructor;
    headerClassName: StringConstructor;
    borderCell: BooleanConstructor;
    lastLeftFixedColumn: StringConstructor;
    firstRightFixedColumn: StringConstructor;
    headerItemClassName: {
        type: PropType<string | ((header: Header, columnNumber: number) => string)>;
        default: string;
    };
    areAllVisibleRowsDisabled: BooleanConstructor;
    multipleSelectStatus: PropType<MultipleSelectStatus>;
    multiSort: BooleanConstructor;
    isMultiSorting: {
        type: PropType<(headerText: string) => boolean>;
        required: true;
    };
    getMultiSortNumber: {
        type: PropType<(headerText: string) => number | false>;
        required: true;
    };
    getFixedDistance: {
        type: PropType<(column: string, type?: "td" | "th") => string | undefined>;
        required: true;
    };
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
    toggleSelectAll: (checked: boolean) => any;
    headerClick: (header: Header) => any;
}, string, PublicProps, Readonly< ExtractPropTypes<{
    headers: {
        type: PropType<HeaderForRender[]>;
        required: true;
    };
    hideHeader: BooleanConstructor;
    fixedHeader: BooleanConstructor;
    headerClassName: StringConstructor;
    borderCell: BooleanConstructor;
    lastLeftFixedColumn: StringConstructor;
    firstRightFixedColumn: StringConstructor;
    headerItemClassName: {
        type: PropType<string | ((header: Header, columnNumber: number) => string)>;
        default: string;
    };
    areAllVisibleRowsDisabled: BooleanConstructor;
    multipleSelectStatus: PropType<MultipleSelectStatus>;
    multiSort: BooleanConstructor;
    isMultiSorting: {
        type: PropType<(headerText: string) => boolean>;
        required: true;
    };
    getMultiSortNumber: {
        type: PropType<(headerText: string) => number | false>;
        required: true;
    };
    getFixedDistance: {
        type: PropType<(column: string, type?: "td" | "th") => string | undefined>;
        required: true;
    };
}>> & Readonly<{
    onToggleSelectAll?: ((checked: boolean) => any) | undefined;
    onHeaderClick?: ((header: Header) => any) | undefined;
}>, {
    headerItemClassName: string | ((header: Header, columnNumber: number) => string);
    areAllVisibleRowsDisabled: boolean;
    multiSort: boolean;
    hideHeader: boolean;
    fixedHeader: boolean;
    borderCell: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=TableHeader.vue.d.ts.map