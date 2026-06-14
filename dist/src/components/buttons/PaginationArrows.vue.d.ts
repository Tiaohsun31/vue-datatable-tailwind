import { DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    buttonsPagination?: (props: typeof __VLS_6) => any;
};
declare const __VLS_base: DefineComponent<ExtractPropTypes<{
    isFirstPage: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
    isLastPage: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    clickPrevPage: (...args: any[]) => void;
    clickNextPage: (...args: any[]) => void;
}, string, PublicProps, Readonly< ExtractPropTypes<{
    isFirstPage: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
    isLastPage: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
}>> & Readonly<{
    onClickPrevPage?: ((...args: any[]) => any) | undefined;
    onClickNextPage?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=PaginationArrows.vue.d.ts.map