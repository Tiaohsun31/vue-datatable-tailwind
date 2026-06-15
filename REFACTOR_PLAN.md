# vue-datatable-tailwind 重構計畫書

> 本檔為跨 session 工作文件。任何接手的 session 請**先完整讀過本檔**，再依「進度追蹤」接續。
> 套件名：`@tiaohsun/vue-datatable-tailwind`　當前版本：2.3.2　目標版本：**3.0.0（允許合理破壞性變更）**
> 來源：fork 自 [vue3-easy-data-table](https://github.com/HC200ok/vue3-easy-data-table)（MIT），改用 Tailwind 4。

---

## 0. 背景與總目標

專案分層方向正確（`DataTable.vue` 協調 + composables 邏輯 + 元件 UI），但有三類問題要一次清掉：
1. **主題系統過度工程化**（themeManager 單例 + setTimeout + DOM 偵測 + 280 行手刻顏色轉換）。
2. **CSS 混血亂局**（template 撒 utility + 另外手刻 300 行假 utility CSS），導致 README 的 `!important` workaround。
3. **資料識別脆弱**（全靠 `JSON.stringify` 比對，且會改動使用者的 item 物件）。

總目標：結構清晰、樣式可維護、行為可預期、對外可用穩定 class hook 覆蓋、**使用者免裝 Tailwind**。

破壞性變更接受度：**可接受合理破壞**，集中在 v3，文件需附 migration 說明。

---

## 1. 已定案決策（含理由）

### 決策 1：主題顏色 — 單一主色 + `color-mix()` 衍生
- 元件實際只用到 primary 的 `100 / 300 / 500 / 600 / 800` + `500/50`，其餘 6 階是 dead weight。
- 改為**唯一輸入** `--color-vdt-primary`，其餘狀態用 `color-mix()` 在 CSS 衍生。
- 使用者傳什麼色就用什麼色（**取消「吸附最近 Tailwind 色」**）。
- 因 `color-mix()` 吃任意 CSS 顏色（hex/rgb/oklch），**不需要任何顏色轉換** → 刪掉 `colorUtils.ts` 絕大部分。
- 色名（如 `indigo`）非 CSS 原生色名，需小對照表 → `tailwind4-color.ts` 從 291 行縮成「色名 → 單一 base 值」約 22 行。
- hover 用**混黑加深**（`color-mix(... black 12%)`）而非透明度（彩色疊透明在不同底色會糊）。
- 前提：`color-mix()` = Baseline 2023，與 Tailwind 4 既有需求一致，無新增瀏覽器限制。

### 決策 2：CSS 出貨 — 純預編譯、移除 tailwindcss peerDependency
- runtime 換色 = 改一個 CSS 變數，不需重新生成 class，故可純出貨自包含 CSS。
- 使用者**不需安裝 Tailwind**，`import '.../style.css'` 即可。
- 鐵則：出貨 CSS 不可引用 consumer Tailwind theme 的變數；自訂 `--vdt-*` 命名空間 token 或 inline 字面值。

### 決策 3：項目識別 — 新增 `itemKey` prop
- 新增 `itemKey?: string`（指定唯一欄位，如 `'id'`）；未傳則 fallback（優先 `item.key`，否則穩定 index）。
- 選取狀態改用 `Set<key>` 管理，render 時查表；**不再 `delete item.checkbox / item.index` 改動使用者資料**。
- 移除所有 `JSON.stringify` 身分比對（展開、選取、分頁快取、批次選取）。

### 決策 4：泛型 `DataTable<T>` — 本輪延後
- DX 加分但與其他項獨立，硬塞會拉長戰線。留待 v3 之後增量。

### 決策 5：composable 接線 — 改 options 物件 + 聚合
- 長位置參數串（`useHeaders` 21 個位置參數）→ 改傳單一 options 物件（介面 `HeadersConfig`/`ReactiveHeadersConfig` 已存在卻沒用）。
- 內部接線收斂到 `useDataTable(props, emit)`，`DataTable.vue` 瘦成薄協調層。

### 決策 CSS 架構：採 (II) 語義 component class
- 樣式收進 `.vdt-*` class，用 Tailwind 4 token 撰寫（`padding: --spacing(3) --spacing(4); font-size: var(--text-sm);`）。
- README 早已宣傳的 13 個 `.vdt-*` hook（目前全空）→ 變成真的可覆蓋表面，移除 `!important` workaround。
- 代價：逐元件把 template utility 搬進 CSS，是本輪最大工程塊；但元件庫樣式表面有限，一次寫好長期受益。

### 決策 6：搜尋預設改「子字串包含」（行為變更，影響極小）
- 純文字搜尋 contains 與 regex 結果相同；差異只在使用者打正則特殊字元，屬罕見進階用法。
- 改 contains 同時修掉特殊字元 crash。保留 `searchType: 'contains' | 'regex'` 逃生門，預設 `'contains'`。
- 與 Phase 0 的 regex bug 修復合併（同一行）。

### 決策 7：捨棄批次選取（移除功能 + prop）
- `useBatchSelection`(178行) + 進度遮罩 + `useTotalItems` 雙路徑，維護成本高而 99% 使用者不觸發。
- 刪 `src/composables/useBatchSelection.ts`、`src/components/loadings/SelectionLoadingOverlay.vue`。
- 移除 `batchSelectionThreshold` prop 與其 default、`isProcessing`/`processProgress`、`updateSelectionStatus` 事件。
- 併入 Phase 2（選取重寫時一起，避免先重寫批次路徑又刪掉）。

### 決策 8：新增簡易 i18n（內建 en / zh-TW / zh-CN，可擴充）
- 內建三語系 locale 包；使用者可：(a) `locale` 選內建、(b) `localeOverrides` 覆蓋個別字串、(c) 傳完整自訂 locale 物件支援未內建語言。
- **既有 message props 仍可用且優先序最高**（向後相容，現有使用者不破）。
- 解析序：個別 message prop > `localeOverrides` > 內建 `locale` 包。透過 inject 提供，順帶消除 `rowsPerPageMessage`/`rowsOfPageSeparatorMessage` 的 prop-drilling。
- 併入 Phase 1（template 已全開，避免二次改動）；見 Phase 1.5。

---

## 2. 分階段任務（低風險優先）

> 每個 phase 結束都應 `pnpm type-check` + `pnpm build` 通過；Phase 5 前可手動在 playground 驗證。
> playground 被 .gitignore（`index.html` 指向 `/playground/main.ts`）——接手 session 若要跑 `pnpm dev` 需自建最小 playground。

### Phase 0 — 清理與明確 Bug 修復（風險最低，先做）

> ✅ **已完成（type-check + build 通過）**。註：`updateFilter` 事件從未觸發，已從 emits/EmitsEventName 移除（屬無害的公開 API 清理）。
> onMounted 的 `removeEventListener` bug 連同整個空轉的水平捲動偵測（含 MutationObserver）一併刪除，故該 bug 自然消失。

**Bug 修復：**
- [ ] `src/DataTable.vue:690` — `onUnmounted` 內 `window.addEventListener('resize', ...)` 應為 `removeEventListener`（監聽器洩漏）。
- [ ] `src/components/table/TableBodyCell.vue:113` — `handleCellClick` 用裸 `event`，改從參數接收 `MouseEvent`。
- [ ] `src/utils/colorUtils.ts:236,239` — 移除 `console.log`（此檔 Phase 1 多半會刪，但先清）。
- [ ] `src/DataTable.vue:215` — 移除 `withDefaults` 裡不存在於 `DataTableProps` 的 `instanceTheme: false`。
- [ ] `src/composables/useTotalItems.ts:49` — **搜尋預設改子字串包含**（取代未跳脫的 `new RegExp`，同時修掉特殊字元 throw 的 crash）。新增 `searchType?: 'contains' | 'regex'` prop，預設 `'contains'`；`'regex'` 時才用 RegExp（仍須 try/catch 包住避免 throw）。比對維持 case-insensitive。
- [ ] `src/composables/useServerOptions.ts:48-60` — 直接 `serverOptionsComputed.value.sortBy.push/splice` 就地改 props/computed 回傳物件；改為產生新物件再 set。
- [ ] `src/components/table/TableBodyCell.vue:9-10` — 移除重複巢狀的 `<template v-if="column === 'checkbox'">`。

**死碼 / 殘留清理：**
- [ ] `src/composables/useTotalItems.ts:10` — 未使用的 `BATCH_SELECTION_THRESHOLD` 常數。
- [ ] `src/composables/useTotalItems.ts:192` — `shouldUseBatchSelection` 內 `isServerSideMode ? …` 前已 `return false` 的死分支。
- [ ] `src/components/table/TableFooter.vue:111-134` — 未使用的 `rowsPerPageSlotProps`/`paginationInfoSlotProps`/`paginationSlotProps` computed。
- [ ] `src/DataTable.vue:558-563,665-694` — `hasHorizontalScroll` 唯一讀取點在註解碼（:578），整個含 `MutationObserver` 的偵測是空轉，刪除（陰影改由 `useFixedColumn` 負責）。
- [ ] 清掉大段註解碼：`src/types/main.ts:299-397`、`useTotalItems.ts:137-157,268-299`、`themeManager.ts:209-212` 等。
- [ ] 刪除失效檔 `src/types/vue-datatable-tailwind.d.ts`（宣告模組名 `vue-datatable-tailwind` 與發佈名不符，相對路徑無法從消費端解析，無人引用）。
- [ ] `src/index.ts:1` — import 路徑 `'../src/styles/theme.css'` 改 `'./styles/theme.css'`。
- [ ] `package.json` — `files` 移除不存在的 `"types"`；新增 `"sideEffects": ["**/*.css"]`（避免 CSS 被 tree-shake）。
- [ ] `emits` 與 `EmitsEventName` 對齊：`updateFilter` 在型別/陣列有但實際被註解掉沒 emit，決定要嘛接回要嘛移除宣告。

### Phase 1 — 主題系統重寫 + CSS 語義 class + packaging（最大塊）

> **執行分兩階段：**
> - ✅ **1a 主題引擎（已完成，type-check + build 通過，dist CSS 確認自包含）**：token 模型、useTheme 響應式重寫、刪 themeManager/colorUtils、縮 tailwind4-color、repoint+slim tailwind.utilities.css、移除 tailwind peer。JS 81.9→64.6 kB。
> - 🟡 **1b 進行中**：
>   - ✅ **深色模式全面校正完成**：所有硬寫 `gray`/`dark:` 已換語義 token（TableHeaderCell/TableHeader/TableExpandRow/RowsPerPageSelector/BaseCheckbox/LoadingLine/ButtonsPagination 死碼/DataTable loading 遮罩）。新增橋接 class：`.bg-vdt-interactive-active`/`.bg-vdt-overlay`/`.ring-vdt-outline`/`.hover:border-vdt-outline-strong`，修正 `.divide-vdt-outline` 子選擇器。build 通過。
>   - 🟡 **`.vdt-*` hook class 結構化（進行中）**：
>     - ✅ 已建 `src/styles/components.css`（自包含字面 CSS + token），theme.css 已 import。
>     - ✅ **核心表格結構 hook 已遷移並驗證**（computed-style light+dark 皆正確、build 自包含）：`.vdt-table-wrapper/-container/-table/-thead(+--sticky)/-thead-th(+--sortable/--sorted)/-tbody/-tbody-tr/-tbody-td/-expand-row/-loading-overlay/-empty`。對應模板靜態 utility 已移除。
>     - ✅ **主要子元件已遷移並驗證**（computed-style + 截圖）：TableFooter(響應式 mobile/desktop)、PaginationArrows、PaginationInfo、ButtonsPagination、RowsPerPageSelector(含下拉，順修 click-outside 依賴 `.relative` 的 bug→改 `.vdt-rows-select-wrap`)、BaseCheckbox(`.vdt-checkbox*`)、Loading/LoadingLine(scoped style)、TableHeaderCell 排序徽章、TableBodyCell expand 按鈕、TableExpandRow grid 過渡。全部 `.vdt-*` 自包含字面 CSS，build 通過。
>     - ✅ **長尾版面 utility 已全部收斂**：TableBodyRow 邊框→`.vdt-tbody-tr--border-cell/--border-row`、TableBodyCell `cursor-pointer`→`--clickable`、容器 shadow→`--shadow`、loading inner→`__inner`、fixed-column shadow→`--fixed-left/right`、Transition→`name="vdt-fade"`、**全部 icon**（sort/expand/ellipsis/prev/next）→`.vdt-icon*`、expand-row `border-t`→`--bordered`、`.vdt-expand-btn` 加 button reset（無 preflight 時的原生按鈕框）。
>     - ✅ **trim**：`tailwind.utilities.css` 移除約 150 行已無人使用的橋接 class，只留 `bg-vdt-surface`/`bg-vdt-surface-secondary`/`hover:bg-vdt-interactive-hover`（TableBodyRow 條件綁定）+ fixed-column + scrollbar。
>     - ✅ **最終驗證（決定性）**：playground 暫時停用 `@import "tailwindcss"` 後截圖 → DataTable（含表頭/列/checkbox/footer/分頁/**展開列+旋轉箭頭+邊框**）完全正常渲染，僅 playground 自身 chrome 失去樣式。**證明 dist CSS 真正自包含、1a 的 tailwindcss peer 移除正式成立**。
>     - ⬜ 唯一殘留 `SelectionLoadingOverlay.vue` 仍有硬寫 utility/灰階 → 由 **Phase 2** 刪除該檔時一併解決。
>   - ⬜ **on-primary 白色**（checkbox 勾、主色按鈕文字）維持 `text-white`，可選擇改 `--color-vdt-on-primary`。
>   - ⬜ **checkbox focus ring**（`peer-focus:ring-vdt-primary-500/50`）variant 未定義，hook 化時一併處理。

**主題 token 模型（寫進 `src/styles/theme.css`）：** ✅ 1a 完成
- [ ] 定義唯一輸入 `--color-vdt-primary`（預設 indigo 的 oklch）。
- [ ] 衍生狀態：
  ```css
  --color-vdt-primary-hover:  color-mix(in oklch, var(--color-vdt-primary), black 12%);   /* 取代 600 */
  --color-vdt-primary-subtle: color-mix(in oklch, var(--color-vdt-primary), var(--color-vdt-surface) 88%); /* 取代 100 */
  --color-vdt-primary-ring:   color-mix(in oklch, var(--color-vdt-primary), transparent 50%); /* 取代 500/50 */
  --color-vdt-on-primary:     white;
  ```
  （原 300 淡邊框、800 文字色亦由 primary 衍生或併入既有語義 token。）
- [ ] 保留既有中性語義 token（surface / content / outline / interactive，含 `[data-vdt-mode]` 深淺切換）——這套設計是好的。
- [ ] 定義自包含 `--vdt-*` 設計 token（spacing/text/radius/font）或確認 build 後 CSS 無外部變數相依。

**移除舊主題機制：**
- [ ] 刪除 `src/utils/themeManager.ts`（383 行單例）。
- [ ] 刪除 `src/utils/colorUtils.ts` 大部分；若色名仍需，留最小 helper。
- [ ] `src/utils/tailwind4-color.ts` 縮為「色名 → 單一 base oklch」對照（約 22 行）。
- [ ] 重寫 `src/composables/useTheme.ts`：移除 setTimeout/querySelector/getComputedStyle/訂閱；改為解析輸入色 → 回傳 `computed` 給 `DataTable.vue` 用 `:style="{ '--color-vdt-primary': resolved }"` 綁定。
  - 解析規則：色名 → 查表；hex/rgb/oklch → 原樣 pass-through。
  - 深淺模式：`mode` prop → 綁 `data-vdt-mode`；未給走 auto（`prefers-color-scheme`，可用 `matchMedia` 或純 CSS `@media`）。
- [ ] `DataTable.vue` 移除 `watch(theme)` / `watch(mode)` 的命令式呼叫，改宣告式綁定。

**CSS 語義 class（採 (II)）：** ⬜ 1b 待辦

> **Phase 1b 已知待修點（1a 過程中發現的潛在問題，移到 .vdt-* class 時一併處理）：**
> - 多處硬寫 `dark:` variant（依賴全域 `.dark`）：`DataTable.vue` loading 遮罩 `bg-white/50 dark:bg-black/50`、`RowsPerPageSelector.vue` 的 `ring-gray-200 dark:ring-gray-700`、`TableHeader.vue` 的 `divide-gray-300 dark:divide-gray-600`、`TableHeaderCell.vue` 的 `bg-gray-200 dark:bg-gray-700` 等 → 全改語義 token。
> - 既有 hand-written utility 有缺漏（部分 class 其實沒生效）：`peer-focus:ring-vdt-primary-500/50`（BaseCheckbox 的 focus ring 色）原本未定義 variant；`hover:text-vdt-content`、`hover:bg-vdt-surface` 1a 已補上。移到 .vdt-* 後這些 edge case 自然消失。
> - 移到 .vdt-* 後可移除出貨 CSS 中的泛用 Tailwind utility（`.flex`/`.px-4` 等），避免與使用者全域樣式衝突，達到真正乾淨的自包含。
- [ ] 刪除 `src/styles/tailwind.utilities.css`（300+ 行手刻假 utility）。
- [ ] 為每個 `.vdt-*` hook 撰寫實際樣式（`.vdt-table-wrapper / -container / -table / -thead / -thead-tr / -thead-th / -tbody / -tbody-tr / -tbody-td / -expand-row / -footer / -pagination`），用 Tailwind 4 token 函式。
- [ ] 逐元件把 template 的 utility 搬進對應 `.vdt-*` class（template 僅保留結構性/狀態性 class）。
- [ ] **修深色模式 bug**：`TableHeaderCell.vue:4`、`TableHeader.vue:8` 的硬寫 `bg-gray-200 dark:bg-gray-700` / `divide-gray-*` 改用 `--color-vdt-*` 語義 token（現況：`mode="dark"` 但無全域 `.dark` 時表頭不變深色）。
- [ ] 統一固定列陰影邏輯到 `useFixedColumn`（Phase 0 已刪 DataTable 的重複偵測）。

**Packaging：**
- ⚠️ **重要發現**：目前 dist CSS **不含** Tailwind 版面 utility（`px-4`/`flex` 等），元件實際依賴**使用者的 Tailwind**（README `@source`）來生成版面。因此：
  - 1a 已移除 `tailwindcss` peer，但**在 `.vdt-*` hook 結構化（含 `@apply` 自包含）完成前，此移除尚未真正成立**——沒裝 Tailwind 的使用者目前會缺版面。
  - 自包含目標的正解：模板只用 `.vdt-*`（+狀態 class），`.vdt-*` CSS 以 `@apply` 撰寫，build 時 Tailwind 把屬性 inline 進出貨 CSS → 無泛用 utility 污染、真正自包含。完成後 peer 移除才生效。
- [x] `package.json` 移除 `tailwindcss` 的 `peerDependencies`（保留 `vue`）— 已移除，待自包含完成後生效。
- [ ] build 後檢查 `dist/vue-datatable-tailwind.css` 為自包含（grep 不應殘留 consumer-only 變數）。
- [ ] 更新 README：移除 `@source` / tailwind.config 掃描指引與 `!important` workaround；改為「import style.css 即可，免裝 Tailwind」。

### Phase 1.5 — i18n ✅ 完成（build + playground 三語系驗證）

> 驗證：zh-TW → 「每頁筆數：」/「1–5 / 12」/ 空資料「無可用資料」皆正確。`DataTableLocale`/`LocaleName`/`locales` 已從 index.ts 匯出。移除了 `emptyMessage`/`rowsPerPageMessage`/`rowsOfPageSeparatorMessage` 的 withDefaults 預設（改由 locale 提供；en 預設值與舊版相同→現有英文使用者無感）。

- [x] 新增 `src/i18n/`：`DataTableLocale` 型別 + 內建 `en` / `zh-TW` / `zh-CN` 三包。
  ```ts
  interface DataTableLocale {
    emptyMessage: string          // 'No Available Data'
    rowsPerPageMessage: string    // 'rows per page:'
    rowsOfPageSeparatorMessage: string // 'of'
    loading?: string
  }
  ```
- [ ] `DataTableProps` 新增 `locale?: 'en' | 'zh-TW' | 'zh-CN'`（預設 `'en'`）與 `localeOverrides?: Partial<DataTableLocale> | DataTableLocale`（後者支援未內建語言）。
- [ ] `DataTable.vue` 算出 `messages` computed：`{ ...內建[locale], ...localeOverrides, ...(若有設個別 message prop 則覆蓋) }`，用 `provide(localeKey, messages)`。
- [ ] `PaginationInfo.vue` / `RowsPerPageSelector.vue` / `DataTable.vue` 空資料區改 `inject` 讀 `messages`，取代硬編碼字串與 prop-drilling。
- [ ] 保留 `emptyMessage` / `rowsPerPageMessage` / `rowsOfPageSeparatorMessage` props 為最高優先（向後相容）。

### Phase 2 — 項目識別與選取解耦 ✅ 完成（playground 全功能驗證）

> 驗證：itemKey 快速路徑（`item-key="email"`）+ 內容 fallback、單選/全選/跨頁持久/取消選取→indeterminate 表頭、展開，皆正確。build clean、JS 51 kB。批次移除也清掉 1b 唯一殘留（SelectionLoadingOverlay 硬寫灰階）→ 1b 100% 無殘留。

- [x] **先移除批次選取**（決策 7）：刪 `useBatchSelection.ts`、`SelectionLoadingOverlay.vue`；`useTotalItems` 移除雙路徑/`isProcessing`/`processProgress`；`DataTable` 移除引用、`batchSelectionThreshold` prop、`updateSelectionStatus` 事件；`internal.d.ts` 移除該事件型別。
- [x] `DataTableProps` 新增 `itemKey?: string`。
- [ ] 新增 `src/utils/itemKey.ts`：`getItemKey(item, itemKey?, index?)` — 優先 `item[itemKey]` → `item.key` → 穩定 index。
- [ ] `useTotalItems.ts` 選取邏輯：改 `Set<key>` + 查表；移除 `delete item.checkbox/index`、移除 `JSON.stringify` 過濾。
- [ ] `usePageItems.ts`：移除 `PageCacheManager` 的 `JSON.stringify` key，改用 `getItemKey`；選取狀態用查表而非把 `checkbox` 灌進 item 複本（或至少集中於一處）。
- [ ] `useExpandableRow.ts:24`：用 `getItemKey` 取代 `JSON.stringify` 比對。
- [ ] `useBatchSelection.ts:17-25`：`getItemKey` 統一。
- [ ] `useClickRow.ts`：`prepareRowEventData` 改為不依賴 item 上被灌入的 `checkbox/index`。
- [ ] 行為驗證：選取（單/全/批次）、跨頁選取、展開、disabledRows 互動。

### Phase 3 — composable 接線重構 ✅ 完成（型別檢查 + sort 執行驗證）

> 決策：**不做 useDataTable 聚合器、不移動 DataTable.vue 位置**（聚合器高 churn、會藏起資料流，對此規模屬過度設計；options 物件化已取得主要可維護性效益）。

- [x] **全部 9 個 composable 改 options 物件傳參**（useHeaders/useTotalItems/usePageItems/usePagination/useRows/useServerOptions/useClickRow/useExpandableRow/useFixedColumn），各 export `UseXxxOptions` 介面；DataTable 呼叫端改具名物件。型別檢查保證鍵名正確。
- [x] **修正多鍵排序**：`recursionMuiltSort`（重複 sort）→ `multiSortComparator` 依序比較欄位、單次 `.sort()`、O(n log n)。
- [x] **`provide('dataTable')` → 具型別 `InjectionKey`**（新增 `src/keys.ts` 的 `dataTableKey`）。順手把 `useServerOptions` 的 `Ref<Boolean>` 修為 `Ref<boolean>`。
- [~] ~~useDataTable 聚合器 / 移動檔案位置~~：依決策略過。

### Phase 4 — 型別與 DX（不含泛型）✅ 完成（build + v-model 驗證）

> 泛型 `DataTable<T>` 仍依決策延後。

- [x] **typed `defineEmits<DataTableEmits>()`**：在 internal.d.ts 新增 `DataTableEmits`（payload 映射）+ `DataTableEmitFn`；`EmitsEventName = keyof DataTableEmits`（避免漂移）；5 個 composable 的 emit 參數改 `DataTableEmitFn`（emit 呼叫現受 payload 型別檢查）。v-model:items-selected 驗證正常（type-only defineEmits 編譯期生成 runtime emits）。
- [x] **`defineSlots<DataTableSlots>()`** 接上 `src/types/slot.ts`。
- [x] **型別收斂**：`HeaderForRender = Header`（結構一致，移除重複定義）；`ServerOptionsComputed = Omit<ServerOptions,'sortBy'|'sortType'> & {...}`（由 ServerOptions 衍生）。
- [x] **`Item.key` 文件**：註明與 `itemKey` prop 的關係（getItemKey 優先序）。

### Phase 5 — 測試、文件、發佈 🟡 主要完成

- [x] **單元測試（0 → 27 測試 / 5 檔，全綠）**：`getItemValue`（巢狀路徑）、`getItemKey`/`omitUiFields`、filter type-guards + `createFilter`、`resolvePrimaryColor`、`DataTable` 排序（單/多鍵 component test）。位置 `src/**/__tests__/`。以 `npx vitest run` 執行。
- [x] **無障礙**：可排序表頭 `aria-sort` + `tabindex`/Enter/Space 鍵盤；展開鈕 `aria-expanded`/`aria-label`；全選 `indeterminate` + `aria-checked="mixed"`。playground eval 驗證。
- [x] **CHANGELOG 3.0.0**（breaking / features / fixes）、**bump `package.json` 3.0.0**、README 安裝段修正（移除已失效的 `@source`/Tailwind 需求、指向 CHANGELOG migration）。
- [x] `npm pack` 驗證：版本 3.0.0、CSS 17.3kB 一併打包。
- ⬜ **待辦（低優先）**：
  - playground 納入版控或 `examples/`（目前 gitignored）。
  - README.zh-TW.md 同步、README 的 `!important` workaround 段落可放寬（hook 已生效）。
  - **dts 打包優化**：`dist/index.d.ts` 目前是 stub（`export * from './src/index.js'`），真正型別在 `dist/src/**`，故 `files` 必須保持 `["dist"]`（不能只列 index.d.ts，否則型別斷掉）。理想是讓 vite-plugin-dts 真正 rollup 成單一 index.d.ts（需調整 type-check 不輸出宣告 / dts plugin 設定，屬獨立 build-config 工作）。

---

## 3. 對外 Props 建議（v3 可一併處理，需寫 migration）

- `theme`：行為改為「不吸附最近色、直接採用」；色名仍支援。
- `checkboxColumnWidth` 預設 `null → 36`（移除到處 `?? 36`）。
- `mustSort` 預設 `true → false`（讓可排序欄位能回到無排序，符合慣例）。
- Footer 樣式 props 命名統一：`footerClassName` / `mobileFooterClasses` / `desktopFooterClasses`（單複數不一致）。
- `itemsSelected` 用 `null` 當「不可選」開關較隱晦 → 評估獨立 `selectable` boolean（保留 `itemsSelected` 做 v-model）。
- 新增 `itemKey`（Phase 2）。
- **新增 `searchType: 'contains' | 'regex'`**（預設 contains）— 決策 6。
- **新增 `locale` + `localeOverrides`**（Phase 1.5）— 決策 8。
- **移除 `batchSelectionThreshold`**（決策 7，破壞性）；migration 註明「大量資料選取的進度遮罩已移除」。

---

## 4. 風險與注意事項

- **playground 在 .gitignore**：接手 session 跑不起 dev server 屬正常，需自建。
- **CSS 自包含鐵則**：Phase 1 build 後務必確認出貨 CSS 無 consumer-only 變數。
- **選取解耦（Phase 2）**易踩坑：跨頁選取、批次選取、disabledRows 三者交互要逐一驗。
- **破壞性變更**集中 v3；每項對外變更都要在 migration 文件記一筆。
- 每 phase 完成跑 `pnpm type-check && pnpm build`。

---

## 5. 進度追蹤

| Phase | 狀態 | 備註 |
|-------|------|------|
| 0 清理與 Bug | ✅ 完成 | 含搜尋改 contains（決策6）；type-check + build 通過 |
| 1a 主題引擎 | ✅ 完成 | token 模型 + useTheme + 移除 themeManager/colorUtils + 移除 peer；build 通過、CSS 自包含 |
| 1b 語義 class + 深色校正 | ✅ 完成 | 深色校正 + 全元件 .vdt-* 結構化；無-Tailwind 截圖驗證自包含；CSS 17.3kB/JS 54kB。僅 SelectionLoadingOverlay 留待 Phase 2 刪除 |
| 1.5 i18n | ✅ 完成 | en/zh-TW/zh-CN；locale + localeOverrides + 既有 message props(最高優先)；三語系驗證 |
| 2 項目識別與選取解耦 | ✅ 完成 | itemKey + Set<key>；批次移除；無 JSON.stringify/無污染；playground 驗證 |
| 3 composable 接線 | ✅ 完成 | 9 composable options 物件化 + 多鍵排序修正 + InjectionKey；聚合器依決策略過 |
| 4 型別與 DX | ✅ 完成 | typed emits + defineSlots + 型別收斂；泛型延後 |
| 5 測試與發佈 | 🟡 主要完成 | 27 測試/a11y/CHANGELOG/3.0.0/README install；剩 playground 入庫、dts rollup 優化 |

> 接手 session：完成項目請勾選對應 checkbox，並更新本表狀態（⬜未開始 / 🟡進行中 / ✅完成）。
