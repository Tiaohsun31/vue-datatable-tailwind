import { Item } from '../../types/main';
import { DefineComponent, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
type __VLS_Props = {
    column: string;
    item: Item;
    index: number;
    style?: string;
    isDisabled?: boolean;
    expandColumn?: string;
    isExpanded?: boolean;
    bodyItemClassName?: string | ((column: string, index: number) => string);
    getFixedDistance?: (column: string, type: 'td' | 'th') => string | undefined;
    getFixedColumnClasses?: (column: string) => string[] | undefined;
};
declare var __VLS_1: {
    item: Item;
    index: number;
    isDisabled: boolean;
    toggleSelectItem: () => void;
}, __VLS_10: {
    item: Item;
    expanded: boolean;
    toggle: (event: MouseEvent) => void;
}, __VLS_18: `item-${string}`, __VLS_19: {
    [key: string]: any;
    key?: string | number;
}, __VLS_22: `item-${string}`, __VLS_23: {
    [key: string]: any;
    key?: string | number;
}, __VLS_25: {
    column: string;
    item: Item;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_18>]?: (props: typeof __VLS_19) => any;
} & {
    [K in NonNullable<typeof __VLS_22>]?: (props: typeof __VLS_23) => any;
} & {
    'selection-checkbox'?: (props: typeof __VLS_1) => any;
} & {
    'expand-button'?: (props: typeof __VLS_10) => any;
} & {
    item?: (props: typeof __VLS_25) => any;
};
declare const __VLS_base: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
    "toggle-select": () => any;
    "toggle-expand": (event: MouseEvent) => any;
}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onToggle-select"?: (() => any) | undefined;
    "onToggle-expand"?: ((event: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=TableBodyCell.vue.d.ts.map