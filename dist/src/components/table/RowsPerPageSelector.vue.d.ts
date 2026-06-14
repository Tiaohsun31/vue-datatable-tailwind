import { DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare const __VLS_export: DefineComponent<ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        requilime: boolean;
    };
    rowsItems: {
        type: () => number[];
        required: true;
    };
    message: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
    "update:modelValue": (value: number) => any;
}, string, PublicProps, Readonly< ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        requilime: boolean;
    };
    rowsItems: {
        type: () => number[];
        required: true;
    };
    message: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    message: string;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=RowsPerPageSelector.vue.d.ts.map