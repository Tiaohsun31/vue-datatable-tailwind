## Introduction

This project is a customized version of [vue3-easy-data-table](https://github.com/HC200ok/vue3-easy-data-table), with significant modifications and extensions based on the original design.

The new features and modifications were developed by tiaohsun, and all rights are reserved.

The project is only a customized version. Please read the document below for relevant modifications. The original functions were not fully tested during reconstruction. If there are bugs, please leave a message to me through Discussions.

Version 2 (v2) and later will use Tailwind4. If you use Tailwind3, please use v1.

### README

- en [English](README.md)
- zh_TW [繁體中文](README.zh-TW.md)

## Refactoring and Customization

- Removed the original SCSS and replaced it with TailwindCSS.
- Refactored the code structure.
- Modified `usePageItems` to compare cached keys, improving performance and addressing lag issues with large data selections.
- Added `expandColumn` to allow custom expandable columns.
- Added the `filterOption` utility method `createFilter`.
- Added `useBatchSelection` to handle large data selections, enabled by default for datasets exceeding 10,000 entries.
- Modified some default values.
- Default mobile view only supports next/previous page navigation.
- Added `clickRowToSelect`, which allows you to select a table row by clicking on it.
- A new selection-checkbox slot is added, which can customize the selection box. Through the customized control box, attributes such as disabled can be controlled externally.
- Added `disabledRows` to disable `clickRowToSelect` click event.
- Rename `tableClassName` > `wrapperClassName`，`tableClassName` is now in `<table :class=[tableClassName]>`
- Added `containerClassName`, `footerClassName`
- Added `.vdt-table-wrapper`, `.vdt-table-container`, `.vdt-table`, `.vdt-thead`, `.vdt-thead-tr`, `.vdt-thead-th`, `.vdt-tbody`, `.vdt-tbody-tr`, `.vdt-tbody-td`, `.vdt-expand-row`, `.vdt-footer`, `.vdt-pagination` , CSS, defaults to no value.
- Remove `headerTextDirection`, please use `headerClassName` unified control instead, the default is `text-left`
- Removed `bodyTextDirection`, added `bodyClassName`, `footerClassName`。
- Added `expandTransition` to enable expanded column transition effects.

## Usage Suggestions

1. It is recommended to use Vue 3 and TailwindCSS 3.4.0 or later.
2. For older versions, please note the following:
   - Check spacing and alignment for potential issues.
   - Some new features may not be available.
   - Manual adjustments to certain styles may be required.
3. If you encounter styling issues, you can:
   - Update to the recommended version.
   - Use custom styles for overrides.
   - Refer to compatibility guidelines for adjustments.

## Theme

- `theme:'indigo'`
- `theme:'#6366f1'`
- `:theme:{ color:'indigo', variant: 'DEFAULT' }`

## Class

Because TailwindCSS is modified for style management, the rendering of some styles will lag behind the default styles. Please use the following methods.

1. Use Tailwind's `!` modifier to force styles to be applied

```typescript
const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  rowNumber: number,
): string => {
  if (item.gender === 'male') return '!bg-blue-100'
  return '!bg-red-100'
}
```

2. Modify the style of odd and even rows

```typescript
const bodyRowClassNameFunction: BodyRowClassNameFunction = (
  item: Item,
  rowNumber: number,
): string => {
  const isEven = rowNumber % 2 === 0
  if (item.gender === 'male') {
    return isEven ? 'even:!bg-blue-100 odd:bg-blue-100' : 'odd:!bg-blue-100 even:bg-blue-100'
  }
  return isEven ? 'even:!bg-red-100 odd:bg-red-100' : 'odd:!bg-red-100 even:bg-red-100'
}
```

## Props

In addition to the original [Props](https://hc200ok.github.io/vue3-easy-data-table-doc/props/common-props.html), the following new props have been added:

| **Name**                | **Required** | **Type**                                                              | **Default**                             | **Description**                                                                            |
| ----------------------- | ------------ | --------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| expand-column           | false        | string                                                                | ‘’                                      | Specifies which column can be expanded.                                                    |
| theme                   | false        | string or ThemeConfig({ color: 'indigo', variant: 'DEFAULT' })        | { color: 'indigo', variant: 'DEFAULT' } | Replaces `theme-color`. Accepts HEX values like `#42b883` or Tailwind color names.         |
| batchSelectionThreshold | false        | number                                                                | 10,000                                  | Enables batch selection for datasets exceeding this threshold, with a loading style.       |
| clickRowToSelect        | false        | boolean                                                               | false                                   | Click on the column to select the item or not                                              |
| disabledRows            | false        | BodyRowDisabledFunction = (item: Item, rowNumber?: number) => boolean | false                                   | Disable specific rows from being selected                                                  |
| expandTransition        | false        | boolean                                                               | true                                    | If an extended column is set, the extended column transition effect is enabled by default. |

## Slots

[Slot](./docs/api/slot.md)

## Require

1. Make sure that you have Node.js and Tailwind CSS installed.
2. Additionally to your own content data you should add Vue-DataTable-Tailwind to apply the classes from the interactive elements in the tailwind.config.js file:

```TypeScript
// tailwind 4
@import "tailwindcss";
/* DataTable */
@import "./node_modules/@tiaohsun/vue-datatable-tailwind/style.css";
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

// Global or Component
import DataTable from '@tiaohsun/vue-datatable-tailwind'
import '@tiaohsun/vue-datatable-tailwind/style.css'
```
