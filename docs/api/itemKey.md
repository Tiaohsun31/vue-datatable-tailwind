# itemKey（列識別）

`itemKey` 指定資料列的**唯一識別欄位**，用於選取、展開與跨頁比對。v3 起選取以 `Set<key>` 管理，**不再**修改你的資料物件，也不再用 `JSON.stringify` 比對。

## 用法

```vue
<DataTable :headers="headers" :items="items" item-key="id" v-model:items-selected="selected" />
```

## 解析優先序

`getItemKey(item, itemKey?)` 依序：

```
1. item[itemKey]   （有指定 itemKey 且該欄位非 null/undefined）
2. item.key        （Item 上的選用 key 欄位）
3. 內容比對         （退而求其次：以排序後的「鍵:值」字串組成；以物件參考做 WeakMap 快取）
```

- **建議**：資料有穩定唯一欄位（如 `id`、`email`）時務必設定 `item-key`，效能最佳且最可靠。
- 未設定時若資料含 `item.key` 也可運作；兩者皆無則退回內容比對（多筆內容完全相同的列會被視為同一列）。

## `Item.key`

```ts
interface Item {
  [key: string]: any
  key?: string | number   // 未設定 itemKey prop 時，getItemKey 會優先採用此欄位
}
```

## 為什麼重要

- **跨頁選取持久**：以 key 查表，翻頁不會遺失選取狀態。
- **不污染資料**：render 用的暫時欄位（`checkbox` / `index`）只存在於內部複本，不會寫回你的 `items`。
- **避免脆弱比對**：取代舊版 `JSON.stringify` 身分比對（順序敏感、大物件慢、會被 UI 欄位干擾）。
