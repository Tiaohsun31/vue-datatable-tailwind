import type { InjectionKey, Ref } from 'vue';

/** 元件根容器參考，供子元件（如下拉定位）注入使用 */
export const dataTableKey: InjectionKey<Ref<HTMLElement | null>> = Symbol('vdt-data-table');
