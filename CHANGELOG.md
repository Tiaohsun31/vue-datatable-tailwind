# Changelog

## [2.0.0] - 2025-04-27

### Style

- Tailwind3更新至Tailwind4，版本2後將全面採用Tailwind4。

## [1.1.0] - 2025-04-26

### Features

- Header 增加 fixedPosition 屬性，設置固定行置左或是置右(未設置則為left)

## [1.0.5] - 2025-04-21

### Bug Fixes

- 修復 bodyItemClassName 未正確執行。

## [1.0.4] - 2025-04-18

### Styles

- 更新theme.ts檔，import的時候不在使用已棄用的Tailwind顏色命名

## [1.0.3] - 2024-01-08

### Refactor

- refactor(icons): 重構展開按鈕圖示
  - 移除 `IconExpandColumn.vue`（左箭頭）
  - 新增 `IconExpand.vue`（右箭頭）
  - 原因：統一 DataTable 展開/收合按鈕視覺方向

### Features

- feat(table): 優化展開列功能與過渡效果
  - 新增 `expandTransition` prop，控制展開過渡效果
  - 新增 `shouldEnableTransition` 內部邏輯
    - 自動偵測是否存在擴展列
    - 預設：有擴展列時自動啟用過渡效果

### Styles

- style(table): 重構表格邊框樣式
  - tbody: 移除 `divide-y divide-gray-200`
  - tr: 新增 `border-t` 樣式
  - 效果：優化擴展列在無內容時的邊框顯示
- style(expand): 強化展開列過渡效果
  - 在 `TableExpandRow.vue` 中實作 `grid-template-rows` 過渡動畫
  - 提供更流暢的展開/收合視覺體驗

## [1.0.2] - 2024-01-07

### Styles

- style(table): 調整表頭視覺層級
  - 更新預設背景色：`bg-gray-100` → `bg-gray-200`
  - 提升互動狀態辨識度：
    - hover: `bg-gray-300`
    - sort active: `bg-gray-400`
  - 目的：增強表頭層級區別，提升使用者體驗
- style(table): 優化表格行列樣式
  - 調換單雙數行底色
  - 調整對比度，提升資料可讀性

## [1.0.1] - 2024-12-22

### BREAKING CHANGES

- `DataTable` 組件結構重構，需更新使用方式
  - 將 slots 重新命名與定義
  - 移除過時的 props 選項
  - 子組件引用路徑改變

### Features

- 表格單複數間隔改用計算方式，移除 tailwind 依賴

### Refactor

- 拆分 DataTable 子組件
  - table/TableHeader.vue：表頭渲染與固定邏輯
  - table/TableHeaderCell.vue：表頭各欄位渲染及邏輯
  - table/TableBodyRow.vue：表格行渲染及邏輯
  - table/TableBodyCell.vue：單元格渲染及邏輯
  - table/TableExpandRow.vue：表格內展開列渲染及邏輯
  - table/TableFooter：表格的結尾頁腳區塊
  - table/RowsPerPageSelector.vue：每頁顯示筆數
  - table/PaginationInfo.vue：頁碼、筆數相關數據資訊
  - 重構後降低組件耦合度

### Bug Fixes

- 修復 Header 固定定位穿透問題，預設基底顏色

### Documentation

- docs: 更新 Slot 使用文檔
- docs: 新增 npm 發布相關文檔

## [1.0.0]

### BREAKING CHANGES

- refactor: 重構專案架構與樣式系統
  - SCSS 改為 TailwindCSS
  - 重新命名 className props:
    - `tableClassName` 改為 `wrapperClassName`
    - `tableClassName` 現在用於 `<table>` 元素
  - 移除 `headerTextDirection`，請改用 `headerClassName`
  - 移除 `bodyTextDirection`，改用 `bodyClassName`

### Features

- feat(selection): 強化資料選擇功能
  - 新增 `useBatchSelection` hook，處理大數據選擇（預設 10,000 筆以上啟用）
  - 新增 `clickRowToSelect` 功能
  - 新增 `disabledRows` 控制行點擊事件
  - 新增 `selection-checkbox` slot，支援客製化選擇框
- feat(expand): 新增 `expandColumn` prop，支援自訂展開欄位
- feat(filter): 新增 `createFilter` 輔助方法，優化篩選邏輯

### Refactor

- perf(hooks): 優化 `usePageItems`
  - 使用緩存的 key 比較
  - 提升大數據處理效能
  - 解決選擇時卡頓問題

### Styles

- style(css): 新增預設 CSS 類別（無預設樣式）：
  - `.vdt-table-wrapper`
  - `.vdt-table-container`
  - `.vdt-table`
  - `.vdt-thead`, `.vdt-thead-tr`, `.vdt-thead-th`
  - `.vdt-tbody`, `.vdt-tbody-tr`, `.vdt-tbody-td`
  - `.vdt-expand-row`
  - `.vdt-footer`
  - `.vdt-pagination`
- style(mobile): 優化行動版面配置，預設僅保留上下頁切換
