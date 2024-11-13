import type {
    SortType, Item, ServerOptions, FilterOption,
    HeaderItemClassNameFunction, BodyItemClassNameFunction, BodyRowClassNameFunction,
    TextDirection, Header
} from './main';
import type { ClickEventType } from './internal';
export interface DataTableProps {
    alternating?: boolean
    buttonsPagination?: boolean
    checkboxColumnWidth?: number | null
    currentPage?: number
    emptyMessage?: string
    expandColumnWidth?: number
    filterOptions?: FilterOption[] | null
    fixedExpand?: boolean
    fixedHeader?: boolean
    fixedCheckbox?: boolean
    fixedIndex?: boolean
    headerTextDirection?: TextDirection
    bodyTextDirection?: TextDirection
    hideFooter?: boolean
    hideRowsPerPage?: boolean
    hideHeader?: boolean
    indexColumnWidth?: number
    itemsSelected?: Item[] | null
    loading?: boolean
    rowsPerPage?: number
    rowsItems?: number[]
    rowsPerPageMessage?: string
    searchField?: string | string[]
    searchValue?: string
    serverOptions?: ServerOptions | null
    serverItemsLength?: number
    showIndex?: boolean
    sortBy?: string | string[]
    sortType?: SortType | SortType[]
    multiSort?: boolean
    tableMinHeight?: number
    tableHeight?: number | null
    themeColor?: string
    tableClassName?: string
    headerClassName?: string
    headerItemClassName?: HeaderItemClassNameFunction | string
    bodyRowClassName?: BodyRowClassNameFunction | string
    bodyExpandRowClassName?: BodyRowClassNameFunction | string
    bodyItemClassName?: BodyItemClassNameFunction | string
    noHover?: boolean
    borderCell?: boolean
    mustSort?: boolean
    rowsOfPageSeparatorMessage?: string
    clickEventType?: ClickEventType
    clickRowToExpand?: boolean
    tableNodeId?: string
    showIndexSymbol?: string
    preventContextMenuRow?: boolean
    items: Item[]
    headers: Header[]
}

export const defaultDataTableProps = {
    alternating: false,
    buttonsPagination: false,
    checkboxColumnWidth: null,
    currentPage: 1,
    emptyMessage: 'No Available Data',
    expandColumnWidth: 36,
    filterOptions: null,
    fixedExpand: false,
    fixedHeader: true,
    fixedCheckbox: false,
    fixedIndex: false,
    headerTextDirection: 'left' as TextDirection,
    bodyTextDirection: 'left' as TextDirection,
    hideFooter: false,
    hideRowsPerPage: false,
    hideHeader: false,
    indexColumnWidth: 60,
    itemsSelected: null,
    loading: false,
    rowsPerPage: 25,
    rowsItems: () => [25, 50, 100],
    rowsPerPageMessage: '每頁筆數:',
    searchField: '',
    searchValue: '',
    serverOptions: null,
    serverItemsLength: 0,
    showIndex: false,
    sortBy: '',
    sortType: 'asc' as SortType,
    multiSort: false,
    tableMinHeight: 180,
    tableHeight: null,
    themeColor: '#42b883',
    tableClassName: '',
    headerClassName: '',
    headerItemClassName: '',
    bodyRowClassName: '',
    bodyExpandRowClassName: '',
    bodyItemClassName: '',
    noHover: false,
    borderCell: false,
    mustSort: true,
    rowsOfPageSeparatorMessage: 'of',
    clickEventType: 'single' as ClickEventType,
    clickRowToExpand: false,
    tableNodeId: '',
    showIndexSymbol: '#',
    preventContextMenuRow: true
} as const
// export default {
//   alternating: {
//     type: Boolean,
//     default: false,
//   },
//   buttonsPagination: {
//     type: Boolean,
//     default: false,
//   },
//   checkboxColumnWidth: {
//     type: Number,
//     default: null,
//   },
//   currentPage: {
//     type: Number,
//     default: 1,
//   },
//   emptyMessage: {
//     type: String,
//     default: 'No Available Data',
//   },
//   expandColumnWidth: {
//     type: Number,
//     default: 36,
//   },
//   filterOptions: {
//     type: Array as PropType<FilterOption[]>,
//     default: null,
//   },
//   fixedExpand: {
//     type: Boolean,
//     default: false,
//   },
//   fixedHeader: {
//     type: Boolean,
//     default: true,
//   },
//   fixedCheckbox: {
//     type: Boolean,
//     default: false,
//   },
//   fixedIndex: {
//     type: Boolean,
//     default: false,
//   },
//   headerTextDirection: {
//     type: String as PropType<TextDirection>,
//     default: 'left',
//   },
//   bodyTextDirection: {
//     type: String as PropType<TextDirection>,
//     default: 'left',
//   },
//   hideFooter: {
//     type: Boolean,
//     default: false,
//   },
//   hideRowsPerPage: {
//     type: Boolean,
//     default: false,
//   },
//   hideHeader: {
//     type: Boolean,
//     default: false,
//   },
//   indexColumnWidth: {
//     type: Number,
//     default: 60,
//   },
//   itemsSelected: {
//     type: Array as PropType<Item[]> | null,
//     default: null,
//   },
//   loading: {
//     type: Boolean,
//     default: false,
//   },
//   rowsPerPage: {
//     type: Number,
//     default: 25,
//   },
//   rowsItems: {
//     type: Array as PropType<number[]>,
//     default: () => [25, 50, 100],
//   },
//   rowsPerPageMessage: {
//     type: String,
//     default: 'rows per page:',
//   },
//   searchField: {
//     type: [String, Array as PropType<String[]>],
//     default: '',
//   },
//   searchValue: {
//     type: String,
//     default: '',
//   },
//   serverOptions: {
//     type: Object as PropType<ServerOptions> | null,
//     default: null,
//   },
//   serverItemsLength: {
//     type: Number,
//     default: 0,
//   },
//   showIndex: {
//     type: Boolean,
//     default: false,
//   },
//   sortBy: {
//     type: [String, Array as PropType<String[]>],
//     default: '',
//   },
//   sortType: {
//     type: [String as PropType<SortType>, Array as PropType<SortType[]>],
//     default: 'asc',
//   },
//   multiSort: {
//     type: Boolean,
//     default: false,
//   },
//   tableMinHeight: {
//     type: Number,
//     default: 180,
//   },
//   tableHeight: {
//     type: Number,
//     default: null,
//   },
//   themeColor: {
//     type: String,
//     default: '#42b883',
//   },
//   tableClassName: {
//     type: String,
//     default: '',
//   },
//   headerClassName: {
//     type: String,
//     default: '',
//   },
//   headerItemClassName: {
//     type: [Function, String] as PropType<HeaderItemClassNameFunction | string>,
//     default: '',
//   },
//   bodyRowClassName: {
//     type: [Function, String] as PropType<BodyRowClassNameFunction | string>,
//     default: '',
//   },
//   bodyExpandRowClassName: {
//     type: [Function, String] as PropType<BodyRowClassNameFunction | string>,
//     default: '',
//   },
//   bodyItemClassName: {
//     type: [Function, String] as PropType<BodyItemClassNameFunction | string>,
//     default: '',
//   },
//   noHover: {
//     type: Boolean,
//     default: false,
//   },
//   borderCell: {
//     type: Boolean,
//     default: false,
//   },
//   mustSort: {
//     type: Boolean,
//     default: false,
//   },
//   rowsOfPageSeparatorMessage: {
//     type: String,
//     default: 'of',
//   },
//   clickEventType: {
//     type: String as PropType<ClickEventType>,
//     default: 'single',
//   },
//   clickRowToExpand: {
//     type: Boolean,
//     default: false,
//   },
//   tableNodeId: {
//     type: String,
//     default: '',
//   },
//   showIndexSymbol: {
//     type: String,
//     default: '#',
//   },
//   preventContextMenuRow: {
//     type: Boolean,
//     default: true
//   }
// };
