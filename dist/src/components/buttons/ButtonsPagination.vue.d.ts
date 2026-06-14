import { DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare const __VLS_export: DefineComponent<ExtractPropTypes<{
    maxPaginationNumber: {
        type: NumberConstructor;
        required: true;
    };
    currentPaginationNumber: {
        type: NumberConstructor;
        required: true;
    };
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    updatePage: (...args: any[]) => void;
}, string, PublicProps, Readonly< ExtractPropTypes<{
    maxPaginationNumber: {
        type: NumberConstructor;
        required: true;
    };
    currentPaginationNumber: {
        type: NumberConstructor;
        required: true;
    };
}>> & Readonly<{
    onUpdatePage?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=ButtonsPagination.vue.d.ts.map