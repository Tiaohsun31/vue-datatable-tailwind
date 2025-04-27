# vue-datatable-tailwind

## Introduction

本專案來自 [vue3-easy-data-table](https://github.com/HC200ok/vue3-easy-data-table) 客製化版本，並基於原始設計進行了大幅修改與擴展。

新增功能與修改部分由 tiaohsun 開發，並保留所有權利。

專案僅為客製化版本，相關修改請詳閱下方文件，重構時並未充分測試原有功能，若出現BUG，請透過 Discussions 留言給我。

版本2(v2)以後將使用Tailwind4，若使用Tailwind3請用v1

### README

- en [English](README.md)
- zh_TW [繁體中文](README.zh-TW.md)

## Refactoring and customization

- 重構程式碼結構。
- 移除了原始 SCSS，改用 TailwindCSS。
- 修改 `usePageItems`，使用緩存的 key 比較，提高效能以解決大數據選擇時卡頓問題。
- 新增 `expandColumn`，提供自訂義展開欄位。
- 新增 `filterOption` 輔助方法 `createFilter`。
- 新增 `useBatchSelection` 處理大數據選擇問題，預設為10,000筆資料以上啟用。
- 修改部分預設值。
- 預設 Mobile 僅剩上下頁切換。
- 新增 `clickRowToSelect`，點擊表格行可以進行選擇。
- 新增 selection-checkbox slot，可以客製化選擇框，透過客製化控制框，可以由外部控制disabled等屬性。
- 新增 `disabledRows` 禁用 `clickRowToSelect` 點擊事件。
- 重新命名，`tableClassName` > `wrapperClassName`，`tableClassName`現在位於`<table :class=[tableClassName]>`
- 新增 `containerClassName`、`footerClassName`
- 新增 `.vdt-table-wrapper`、`.vdt-table-container`、`.vdt-table`、`.vdt-thead`、`.vdt-thead-tr`、`.vdt-thead-th`、`.vdt-tbody`、`.vdt-tbody-tr`、`.vdt-tbody-td`、`.vdt-expand-row`、`.vdt-footer`、`.vdt-pagination`，CSS，預設無任何值。
- 移除`headerTextDirection`，請改用`headerClassName`統一控制，預設為`text-left`
- 移除`bodyTextDirection`，新增`bodyClassName`、`footerClassName`。
- 新增`expandTransition`，用來啟用擴展列過渡效果。

## Usage suggestions

1. 建議使用 Vue 3、Tailwind CSS 4 或以上版本
2. 如果使用較舊版本，請注意以下幾點：
   - 檢查間距和對齊是否正確
   - 某些新特性可能不可用
   - 可能需要手動調整某些樣式
3. 如果發現樣式問題，可以：
   - 更新到建議的版本
   - 使用自定義樣式覆蓋
   - 參考相容性指南進行調整

## Install

1. 請確定您已安裝 Node.js 和 Tailwind CSS。
2. 在 tailwind.config.js 添加 DataTable 套件，以套用 Tailwind 樣式：

```bash
// npm install
npm install @tiaohsun/vue-datatable-tailwind
// pnpm add
pnpm add @tiaohsun/vue-datatable-tailwind
```

```Typescript
// 全域使用main.ts中註冊 or 組件中使用
import DataTable from '@tiaohsun/vue-datatable-tailwind'
import '@tiaohsun/vue-datatable-tailwind/style.css'

app.component('DataTable', DataTable)
```

```TypeScript
// tailwind 4
@import "tailwindcss";
/* DataTable */
@source './node_modules/@tiaohsun/vue-datatable-tailwind/dist/**/*.{js,vue}';
```

```TypeScript
// tailwind 3 tailwind.config.ts
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        // 添加 node_modules 中 DataTable 的內容
        "./node_modules/@tiaohsun/vue-datatable-tailwind/dist/**/*.{js,vue}"
    ]
}
```

## Theme

### version 2.x.x

- `theme:'indigo'`
- `theme:'#6366f1'`
- `theme:oklch(64.5% 0.246 16.439)`
- 直接修改基礎變數
  ```css
  :root {
    --vdt-theme-500: oklch(0.65 0.25 130); /* 修改成綠色系 */
    /* 其他顏色...(50-950) */
  }
  ```
- 通過Tailwind配置
  ```css
  @theme {
    /* 直接指定值 */
    --color-vdt-primary-500: oklch(0.65 0.25 130);
    /* 或引用其他變數 */
    --color-vdt-primary-500: var(--my-brand-color);
  }
  ```

### version 1.x.x

- `theme:'indigo'`
- `theme:'#6366f1'`
- `:theme:{ color:'indigo', variant: 'DEFAULT' }`

## Class

因為改TailwindCSS進行樣式管理，部分樣式渲染會落後於預設樣式，請採用下列方式

1. 使用 Tailwind 的 `!` 修飾符來強制應用樣式

```typescript
const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  rowNumber: number,
): string => {
  if (item.gender === '男') return '!bg-blue-100'
  return '!bg-red-100'
}
```

2. 修改奇偶行的樣式

```typescript
const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  rowNumber: number,
): string => {
  const isEven = rowNumber % 2 === 0
  if (item.gender === '男') {
    return isEven ? 'even:!bg-blue-100 odd:bg-blue-100' : 'odd:!bg-blue-100 even:bg-blue-100'
  }
  return isEven ? 'even:!bg-red-100 odd:bg-red-100' : 'odd:!bg-red-100 even:bg-red-100'
}
```

## Props

除了原本的[Props](https://hc200ok.github.io/vue3-easy-data-table-doc/props/common-props.html)外，新增下面Props

| **Name**                | **Required** | **Type**                                                              | **Default** | **Description**                                                              |
| ----------------------- | ------------ | --------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| expand-column           | false        | string                                                                | ‘’          | 指定某Column欄位可以擴展 　                                                  |
| theme                   | false        | string or TailwindColor(ex:'indigo'、'rose')                          | 'indigo'    | 取代theme-color，可填入 HEX ‘#42b883’、oklch(版本2之後)、Tailwind Color Name |
| batchSelectionThreshold | false        | number                                                                | 10,000      | 超過預設值，啟用批次選擇，具有Loading樣式                                    |
| clickRowToSelect        | false        | boolean                                                               | false       | 點擊列，是否選擇項目                                                         |
| disabledRows            | false        | BodyRowDisabledFunction = (item: Item, rowNumber?: number) => boolean | false       | 禁止特定行被選取                                                             |
| expandTransition        | false        | boolean                                                               | true        | 如果有設置擴展列，預設啟用擴展列過渡效果                                     |

## Slot

參考 [Slot](./docs/api/slot.md)
