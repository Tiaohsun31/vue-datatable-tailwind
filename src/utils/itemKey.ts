import type { Item } from '../types/public';

// UI 注入的暫時欄位，不應參與識別或回傳給使用者
const UI_FIELDS = ['checkbox', 'index'] as const;

/** 回傳移除 UI 注入欄位（checkbox / index）後的乾淨複本，不改動輸入物件 */
export function omitUiFields(item: Item): Item {
    const clean: Item = { ...item };
    for (const field of UI_FIELDS) delete clean[field];
    return clean;
}

// 內容型 key 的快取（以物件參考為鍵）；內容 key 不受 itemKey 影響，可安全快取
const contentKeyCache = new WeakMap<Item, string>();

function contentKey(item: Item): string {
    let key = contentKeyCache.get(item);
    if (key === undefined) {
        const clean = omitUiFields(item);
        key = Object.keys(clean)
            .sort()
            .map((k) => `${k}:${String(clean[k])}`)
            .join('|');
        contentKeyCache.set(item, key);
    }
    return key;
}

/**
 * 取得項目的穩定識別 key，用於選取 / 展開 / 比對。
 * 優先序：指定的 itemKey 欄位 → item.key → 內容比對（退而求其次）。
 */
export function getItemKey(item: Item, itemKey?: string): string {
    if (itemKey && item[itemKey] != null) return String(item[itemKey]);
    if (item.key != null) return String(item.key);
    return contentKey(item);
}
