import { Header, Item, PaginationInfo } from './main';
export interface DataTableSlots {
    'customize-headers': void;
    'loading': void;
    'empty-message': void;
    'header': {
        header: Header;
        index: number;
        sortable: boolean;
    };
    [key: `header-${string}`]: {
        header: Header;
        index: number;
        sortable: boolean;
    };
    'body': Item[];
    'body-prepend': {
        items: Item[];
        pagination: PaginationInfo;
        headers: Header[];
    };
    'body-append': {
        items: Item[];
        pagination: PaginationInfo;
        headers: Header[];
    };
    'item': {
        column: string;
        item: Item;
    };
    [key: `item-${string}`]: Item;
    'selection-checkbox': {
        item: Item;
        index: number;
        isDisabled: boolean;
        toggleSelectItem: () => void;
    };
    'expand': Item;
    'expand-button': {
        item: Item;
        expanded: boolean;
        toggle: () => void;
    };
    'pagination': {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
    };
    'pagination-info': {
        firstIndex: number;
        lastIndex: number;
        total: number;
        separator: string;
    };
}
//# sourceMappingURL=slot.d.ts.map