import { DefineComponent, ExtractPropTypes, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare const __VLS_export: DefineComponent<ExtractPropTypes<{
    status: {
        type: () => "allSelected" | "noneSelected" | "partSelected";
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    change: (...args: any[]) => void;
}, string, PublicProps, Readonly< ExtractPropTypes<{
    status: {
        type: () => "allSelected" | "noneSelected" | "partSelected";
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=MultipleSelectCheckBox.vue.d.ts.map