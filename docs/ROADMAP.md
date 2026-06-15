# Roadmap / 後續增強

> 本檔為 v3.0.0 之後的**漸進式增強清單**（living document）。每項標註是否破壞性與大致工作量（S / M / L）。
> 非破壞性項目可在 minor 版本逐步加入；破壞性項目集中到下一個 major。

## 型別 / DX

### 泛型 `DataTable<T>`　—　非破壞性，建議優先
- **現況**：列資料型別固定為 `Item`（= `{ [key: string]: any; key? }`），所以 slot / event 裡的 `item.xxx` 都是 `any`。
- **目標**：讓元件接受使用者的列型別 `T`，`items: T[]`，並把 `T` 串到 slot props 與事件 payload。`<template #item="{ item }">` 的 `item` 直接是 `T`，`item.name` 會是 `string` 而非 `any`。
- **為何非破壞**：Vue 3.3+ 支援泛型元件 `<script setup lang="ts" generic="T extends Record<string, any> = Item">`；`T` 預設為 `Item`，**既有未指定型別的使用者完全不受影響**。
- **工作量**：M–L —— 需把 `T` 串過相關 composable 與 `DataTableSlots` / `DataTableEmits` 型別；Vue 泛型元件在部分 IDE / vue-tsc 版本有邊角案例，需實測。
- 對應決策：原 REFACTOR_PLAN「決策 4：泛型延後」，此為解除延後的後續增量。

### 收緊 `SimpleFilterOption`　—　破壞性（下個 major）
- `SimpleFilterOption`（`comparison: string`）過鬆，會弱化整個 `FilterOption` union 的型別檢查。v3 為相容刻意保留。
- 後續可移除或收緊，讓 `createFilter` / `filterOptions` 的型別更嚴謹。**破壞性**（影響以此型別標註自訂 filter 的使用者），留待下個 major + migration 說明。工作量 S。

## 功能

### 虛擬捲動（virtual scrolling）　—　非破壞性
- v3 已移除「批次選取」進度遮罩；大量資料（數千列以上）的**渲染**效能仍是缺口。
- 可加選用的 row 虛擬化（僅渲染可視範圍）。需與 fixed columns / 展開列 / sticky header 相容。工作量 L。

### 欄位互動：拖曳排序 / 寬度調整　—　非破壞性
- 目前 `Header` 有 `width` / `fixed`，但無欄位拖曳重排與互動式調寬。常見資料表需求。工作量 M–L。

### 搜尋增強　—　非破壞性
- `searchValue` 加 debounce 選項；per-field `searchType`；命中文字 highlight。工作量 S–M。

### i18n 擴充　—　非破壞性
- 內建語系包易於擴充（目前 en / zh-TW / zh-CN）。可再加常見語系，或提供社群投稿機制。工作量 S。

## 無障礙（a11y）

- v3 已有：可排序表頭 `aria-sort` + 鍵盤、展開鈕 `aria-expanded`、全選 `indeterminate`。
- 後續：完整鍵盤**網格導覽**（roving tabindex / 方向鍵在儲存格間移動）、`role="grid"` 語義、選取與展開的 focus 管理。工作量 M。

## 設計系統 / 主題

### 中性語義色納入 `--tia-*` 共用層　—　非破壞性
- v3 已把**主色**與**尺寸 token** 接上家族共用層 `--tia-*`。
- 可進一步把中性語義色（`--color-vdt-surface` / `-content` / `-outline` / `-interactive`）也改為引用 `--tia-*`（帶字面 fallback），讓姊妹套件（vue-datepicker 等）整組外觀一次調整。工作量 S–M。

### 抽出共用 token 套件　—　非破壞性（新增）
- 若家族成員增多，可把 `--tia-*` 基元抽成獨立小套件（如 `@tiaohsun/design-tokens`），各元件相依之，單一事實來源。工作量 M。

### 開放 color-mix 比例為可調 token　—　非破壞性
- 目前 hover（mix black 12%）、subtle（mix surface 88%）等比例寫死在 CSS。可改為 `--vdt-mix-hover` 之類 token，讓使用者微調深淺。工作量 S。

## 測試 / 品質

- 目前 27 測試。可擴充覆蓋：server-side 模式、分頁邊界、展開 / disabledRows 互動、fixed columns、深淺模式 render 斷言、a11y 自動化（如 jest-axe）。工作量 M。

## 工具 / 文件

### 文件站 + live examples　—　非破壞性
- 以 VitePress 建文件站，內嵌可互動範例（補強目前的 playground）。工作量 M。

### SSR / Nuxt 相容性驗證　—　非破壞性
- `useTheme` 的 `import.meta.env.DEV` + `CSS.supports` 已加環境守衛，但尚未在 SSR / Nuxt 實測。補一個 SSR smoke test。工作量 S。

## 內部重構（可維護性）

### 選取渲染狀態徹底解耦　—　非破壞性（內部）
- 目前 render 複本仍注入 `checkbox` / `index` 暫時欄位（由 `omitUiFields` 清理）。
- 可改為以 `getItemKey` 為鍵的獨立 render-state map，完全不碰使用者物件，邏輯更集中。順帶讓 `selection-checkbox` slot 的 `isSelected` 不再依賴 `item.checkbox`。工作量 M。
