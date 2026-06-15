import type { DataTableLocale, LocaleName } from '../types/public';

/** 內建語系包 */
export const locales: Record<LocaleName, DataTableLocale> = {
    en: {
        emptyMessage: 'No Available Data',
        rowsPerPageMessage: 'rows per page:',
        rowsOfPageSeparatorMessage: 'of',
    },
    'zh-TW': {
        emptyMessage: '無可用資料',
        rowsPerPageMessage: '每頁筆數：',
        rowsOfPageSeparatorMessage: '/',
    },
    'zh-CN': {
        emptyMessage: '无可用数据',
        rowsPerPageMessage: '每页条数：',
        rowsOfPageSeparatorMessage: '/',
    },
};

export const defaultLocale: LocaleName = 'en';
