# vue-datatable-tailwind

## Introduction

本專案來自 [vue3-easy-data-table](https://github.com/HC200ok/vue3-easy-data-table) 客製化版本，並基於原始設計進行了大幅修改與擴展。

新增功能與修改部分由 tiaohsun 開發，並保留所有權利。

專案僅為客製化版本，重構時並未充分測試原有功能，若出現BUG，請透過 Discussions 留言給我。

### README

- en [English](README.md)
- zh_TW [繁體中文](README.zh-TW.md)

## Refactoring and customization

- 移除了原始 SCSS，改用 TailwindCSS。
- 重構程式碼結構。
- 修改 usePageItems，使用緩存的 key 比較，提高效能以解決大數據選擇時卡頓問題。
- 新增 expandColumn，提供自訂義展開欄位。
- 新增 filterOption 輔助方法 createFilter。
- 新增 useBatchSelection 處理大數據選擇問題，預設為10,000筆資料以上啟用。
- 修改部分預設值。
- 預設 Mobile 僅剩上下頁切換。

## Usage suggestions

1. 建議使用 Vue 3、Tailwind CSS 3.4.0 或以上版本
2. 如果使用較舊版本，請注意以下幾點：
   - 檢查間距和對齊是否正確
   - 某些新特性可能不可用
   - 可能需要手動調整某些樣式
3. 如果發現樣式問題，可以：
   - 更新到建議的版本
   - 使用自定義樣式覆蓋
   - 參考相容性指南進行調整

## Theme

- `theme:'indigo'`
- `theme:'#6366f1'`
- `:theme:{ color:'indigo', variant: 'DEFAULT' }`

## Props

除了原本的[Props](https://hc200ok.github.io/vue3-easy-data-table-doc/props/common-props.html)外，新增下面Props

| **Name**                | **Required** | **Type**                                                       | **Default**                             | **Description**                                                |
| ----------------------- | ------------ | -------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| expand-column           | false        | string                                                         | ‘’                                      | 指定某Column欄位可以擴展 　                                    |
| theme                   | false        | string or ThemeConfig({ color: 'indigo', variant: 'DEFAULT' }) | { color: 'indigo', variant: 'DEFAULT' } | 取代theme-color，可填入 HEX ‘#42b883’，或者Tailwind Color Name |
| batchSelectionThreshold | false        | number                                                         | 10,000                                  | 超過預設值，啟用批次選擇，具有Loading樣式                      |

## Slot

- pagination-info: 客製化分頁訊息
- expand-button: 可客製化擴展列(expand-column)樣式

## Require

1. 請確定您已安裝 Node.js 和 Tailwind CSS。
2. 在 tailwind.config.js 添加 DataTable 套件，以套用 Tailwind 樣式：

```TypeScript
// tailwind.config.ts
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        // 添加 node_modules 中 DataTable 的內容
        "./node_modules/vue-datatable-tailwind/dist/**/*.{js,vue}"
    ]
}
```
