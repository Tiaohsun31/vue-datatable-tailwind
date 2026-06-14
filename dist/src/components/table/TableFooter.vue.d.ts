import { DefineComponent, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
type __VLS_Props = {
    hideRowsPerPage?: boolean;
    hidePaginationInfo?: boolean;
    buttonsPagination?: boolean;
    showShadow?: boolean;
    footerClassName?: string;
    mobileFooterClasses?: string;
    desktopFooterClasses?: string;
    rowsPerPage: number;
    rowsItems: number[];
    rowsPerPageMessage: string;
    rowsOfPageSeparatorMessage: string;
    currentPageFirstIndex: number;
    currentPageLastIndex: number;
    totalItemsLength: number;
    currentPaginationNumber: number;
    maxPaginationNumber: number;
    isFirstPage: boolean;
    isLastPage: boolean;
};
declare var __VLS_1: {
    paginationInfo: {
        currentPageFirstIndex: number;
        currentPageLastIndex: number;
        totalItemsLength: number;
        rowsOfPageSeparatorMessage: string;
    };
    pagination: {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        buttonsPagination: boolean;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
    };
    rowsPerPage: {
        current: number;
        options: number[];
        message: string;
        update: (value: number) => void;
    };
    updateRowsPerPage: (value: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
    hideRowsPerPage: boolean;
    hidePaginationInfo: boolean;
    buttonsPagination: boolean;
    showShadow: boolean;
    rowsItems: number[];
    rowsPerPageMessage: string;
    rowsOfPageSeparatorMessage: string;
    currentPageFirstIndex: number;
    currentPageLastIndex: number;
    totalItemsLength: number;
    currentPaginationNumber: number;
    maxPaginationNumber: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    footerClassName: string;
    mobileFooterClasses: string;
    desktopFooterClasses: string;
}, __VLS_13: {
    paginationInfo: {
        currentPageFirstIndex: number;
        currentPageLastIndex: number;
        totalItemsLength: number;
        rowsOfPageSeparatorMessage: string;
    };
    pagination: {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        buttonsPagination: boolean;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
    };
    rowsPerPage: {
        current: number;
        options: number[];
        message: string;
        update: (value: number) => void;
    };
    updateRowsPerPage: (value: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
    hideRowsPerPage: boolean;
    hidePaginationInfo: boolean;
    buttonsPagination: boolean;
    showShadow: boolean;
    rowsItems: number[];
    rowsPerPageMessage: string;
    rowsOfPageSeparatorMessage: string;
    currentPageFirstIndex: number;
    currentPageLastIndex: number;
    totalItemsLength: number;
    currentPaginationNumber: number;
    maxPaginationNumber: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    footerClassName: string;
    mobileFooterClasses: string;
    desktopFooterClasses: string;
}, __VLS_15: {
    rawProps: {
        paginationInfo: {
            currentPageFirstIndex: number;
            currentPageLastIndex: number;
            totalItemsLength: number;
            rowsOfPageSeparatorMessage: string;
        };
        pagination: {
            isFirstPage: boolean;
            isLastPage: boolean;
            currentPaginationNumber: number;
            maxPaginationNumber: number;
            buttonsPagination: boolean;
            nextPage: () => void;
            prevPage: () => void;
            updatePage: (page: number) => void;
        };
        rowsPerPage: {
            current: number;
            options: number[];
            message: string;
            update: (value: number) => void;
        };
        updateRowsPerPage: (value: number) => void;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
        hideRowsPerPage: boolean;
        hidePaginationInfo: boolean;
        buttonsPagination: boolean;
        showShadow: boolean;
        rowsItems: number[];
        rowsPerPageMessage: string;
        rowsOfPageSeparatorMessage: string;
        currentPageFirstIndex: number;
        currentPageLastIndex: number;
        totalItemsLength: number;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        footerClassName: string;
        mobileFooterClasses: string;
        desktopFooterClasses: string;
    };
    current: number;
    options: number[];
    message: string;
    update: (value: number) => void;
}, __VLS_24: {
    rawProps: {
        paginationInfo: {
            currentPageFirstIndex: number;
            currentPageLastIndex: number;
            totalItemsLength: number;
            rowsOfPageSeparatorMessage: string;
        };
        pagination: {
            isFirstPage: boolean;
            isLastPage: boolean;
            currentPaginationNumber: number;
            maxPaginationNumber: number;
            buttonsPagination: boolean;
            nextPage: () => void;
            prevPage: () => void;
            updatePage: (page: number) => void;
        };
        rowsPerPage: {
            current: number;
            options: number[];
            message: string;
            update: (value: number) => void;
        };
        updateRowsPerPage: (value: number) => void;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
        hideRowsPerPage: boolean;
        hidePaginationInfo: boolean;
        buttonsPagination: boolean;
        showShadow: boolean;
        rowsItems: number[];
        rowsPerPageMessage: string;
        rowsOfPageSeparatorMessage: string;
        currentPageFirstIndex: number;
        currentPageLastIndex: number;
        totalItemsLength: number;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        footerClassName: string;
        mobileFooterClasses: string;
        desktopFooterClasses: string;
    };
    currentPageFirstIndex: number;
    currentPageLastIndex: number;
    totalItemsLength: number;
    rowsOfPageSeparatorMessage: string;
}, __VLS_31: {
    rawProps: {
        paginationInfo: {
            currentPageFirstIndex: number;
            currentPageLastIndex: number;
            totalItemsLength: number;
            rowsOfPageSeparatorMessage: string;
        };
        pagination: {
            isFirstPage: boolean;
            isLastPage: boolean;
            currentPaginationNumber: number;
            maxPaginationNumber: number;
            buttonsPagination: boolean;
            nextPage: () => void;
            prevPage: () => void;
            updatePage: (page: number) => void;
        };
        rowsPerPage: {
            current: number;
            options: number[];
            message: string;
            update: (value: number) => void;
        };
        updateRowsPerPage: (value: number) => void;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
        hideRowsPerPage: boolean;
        hidePaginationInfo: boolean;
        buttonsPagination: boolean;
        showShadow: boolean;
        rowsItems: number[];
        rowsPerPageMessage: string;
        rowsOfPageSeparatorMessage: string;
        currentPageFirstIndex: number;
        currentPageLastIndex: number;
        totalItemsLength: number;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        footerClassName: string;
        mobileFooterClasses: string;
        desktopFooterClasses: string;
    };
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPaginationNumber: number;
    maxPaginationNumber: number;
    buttonsPagination: boolean;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
};
type __VLS_Slots = {} & {
    'footer-mobile'?: (props: typeof __VLS_1) => any;
} & {
    'footer-desktop'?: (props: typeof __VLS_13) => any;
} & {
    'rows-per-page'?: (props: typeof __VLS_15) => any;
} & {
    'pagination-info'?: (props: typeof __VLS_24) => any;
} & {
    pagination?: (props: typeof __VLS_31) => any;
};
declare const __VLS_base: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
    updatePage: (page: number) => any;
    "update:rowsPerPage": (value: number) => any;
    nextPage: () => any;
    prevPage: () => any;
}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{
    onUpdatePage?: ((page: number) => any) | undefined;
    "onUpdate:rowsPerPage"?: ((value: number) => any) | undefined;
    onNextPage?: (() => any) | undefined;
    onPrevPage?: (() => any) | undefined;
}>, {
    footerClassName: string;
    mobileFooterClasses: string;
    desktopFooterClasses: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=TableFooter.vue.d.ts.map