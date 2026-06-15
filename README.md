## Introduction

This project is a customized version of [vue3-easy-data-table](https://github.com/HC200ok/vue3-easy-data-table), with significant modifications and extensions based on the original design.

The new features and modifications were developed by tiaohsun, and all rights are reserved.

The project is only a customized version. Please read the document below for relevant modifications. The original functions were not fully tested during reconstruction. If there are bugs, please leave a message to me through Discussions.

Version notes:

- **v3+**: ships a self-contained stylesheet — **Tailwind CSS is no longer required** to use this component.
- **v2**: built on Tailwind 4.
- **v1**: for Tailwind 3.

See the [CHANGELOG](CHANGELOG.md) for the full v3 migration notes.

### README

- en [English](README.md)
- zh_TW [繁體中文](README.zh-TW.md)

## Refactoring and Customization

- Removed the original SCSS and replaced it with TailwindCSS.
- Refactored the code structure.
- Modified `usePageItems` to compare cached keys, improving performance and addressing lag issues with large data selections.
- Added `expandColumn` to allow custom expandable columns.
- Added the `filterOption` utility method `createFilter`.
- Modified some default values.
- Default mobile view only supports next/previous page navigation.
- Added `clickRowToSelect`, which allows you to select a table row by clicking on it.
- A new selection-checkbox slot is added, which can customize the selection box. Through the customized control box, attributes such as disabled can be controlled externally.
- Added `disabledRows` to disable `clickRowToSelect` click event.
- Rename `tableClassName` > `wrapperClassName`，`tableClassName` is now in `<table :class=[tableClassName]>`
- Added `containerClassName`, `footerClassName`
- Added stable `.vdt-*` class hooks (`.vdt-table-wrapper`, `.vdt-table-container`, `.vdt-table`, `.vdt-thead`, `.vdt-thead-tr`, `.vdt-thead-th`, `.vdt-tbody`, `.vdt-tbody-tr`, `.vdt-tbody-td`, `.vdt-expand-row`, `.vdt-footer`, `.vdt-pagination`, …). **As of v3 these carry the component's default styles and can be overridden directly.**
- Remove `headerTextDirection`, please use `headerClassName` unified control instead, the default is `text-left`
- Removed `bodyTextDirection`, added `bodyClassName`, `footerClassName`。
- Added `expandTransition` to enable expanded column transition effects.
- Added `mode` to set dark or light, the default is `light`.

### v3 highlights

- **Self-contained stylesheet** — Tailwind CSS is no longer required; just `import '.../style.css'`.
- **`theme`** now uses your color directly (no snapping to the nearest Tailwind shade); state colors are derived via `color-mix()` from a single `--color-vdt-primary` (the old 50–950 scale variables are gone).
- Added **`itemKey`** for stable row identity (selection / expand / matching).
- Added **i18n**: `locale` (`en` / `zh-TW` / `zh-CN`) and `localeOverrides`.
- Added **`searchType`** (`'contains'` default, or `'regex'`); search is now case-insensitive substring by default.
- Added Tailwind color names `taupe`, `mauve`, `mist`, `olive`.
- **Removed** batch selection (`batchSelectionThreshold` prop, `updateSelectionStatus` event).

## Usage Suggestions

1. It is recommended to use Vue 3 and TailwindCSS 4 or later.
2. For older versions, please note the following:
   - Check spacing and alignment for potential issues.
   - Some new features may not be available.
   - Manual adjustments to certain styles may be required.
3. If you encounter styling issues, you can:
   - Update to the recommended version.
   - Use custom styles for overrides.
   - Refer to compatibility guidelines for adjustments.

## Install

Make sure you have Node.js installed. **As of v3, Tailwind CSS is no longer required** — the package ships a self-contained stylesheet.

```bash
// npm install
npm install @tiaohsun/vue-datatable-tailwind
// pnpm add
pnpm add @tiaohsun/vue-datatable-tailwind
```

```Typescript
// Global use registered in main.ts or used in components
import DataTable from '@tiaohsun/vue-datatable-tailwind'
import '@tiaohsun/vue-datatable-tailwind/style.css'

app.component('DataTable', DataTable)
```

> **v3 migration:** earlier versions required adding `@source '.../@tiaohsun/vue-datatable-tailwind/dist/**'` to your Tailwind config (or the equivalent `content` entry for Tailwind 3). This is **no longer needed** — importing `style.css` is enough. See the [CHANGELOG](CHANGELOG.md) for the full list of v3 changes.

## Theme

### v3 (current)

Provide a single primary color — state colors (hover / subtle / ring) are derived automatically via `color-mix()`.

- Via the `theme` prop:
  - `theme="indigo"` (built-in Tailwind color name)
  - `theme="#6366f1"`
  - `theme="oklch(64.5% 0.246 16.439)"`
- Or override the CSS variable globally:
  ```css
  :root {
    --color-vdt-primary: oklch(0.65 0.25 130); /* derived states update automatically */
  }
  ```
- Color-name shorthands cover the 22 built-in names; for anything else pass a hex / rgb / oklch value.
- Dark / light: use the `mode` prop (`'light'` | `'dark'`) or set `[data-vdt-mode]`. If unset, it follows the OS `prefers-color-scheme`.
- Sizing tokens (`--vdt-text-sm`, `--vdt-space-*`, `--vdt-radius`, …) can be overridden to adjust spacing / typography.

> **Migration from v2:** the old 50–950 scale (`--color-vdt-500` … with `!important`) has been replaced by the single `--color-vdt-primary` + `color-mix()` model.

### version 1.x.x

- `theme:'indigo'`
- `theme:'#6366f1'`
- `:theme:{ color:'indigo', variant: 'DEFAULT' }`

## Custom Styling

As of v3 the `.vdt-*` classes carry the default styles and act as stable override hooks — target them directly in your own CSS (no `!important` needed), or retheme via the `--color-vdt-*` / `--vdt-*` CSS variables.

The class-name props (`bodyRowClassName`, `headerClassName`, …) still accept any class string. If you use Tailwind in your app you can pass Tailwind utilities; the `!` modifier forces them to win over the defaults:

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

| **Name**         | **Required** | **Type**                                                              | **Default** | **Description**                                                                                          |
| ---------------- | ------------ | --------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| expand-column    | false        | string                                                                | ''          | Specifies which column can be expanded.                                                                 |
| theme            | false        | string \| TailwindColor (ex: 'indigo', 'rose')                        | 'indigo'    | Primary color. Accepts a built-in color name, HEX (`#42b883`), rgb or oklch. State colors are derived via `color-mix()`. |
| mode             | false        | 'light' \| 'dark'                                                     | —           | Force light or dark. If unset, follows the OS `prefers-color-scheme`.                                    |
| itemKey          | false        | string                                                                | —           | Unique field used for selection / expand / identity matching; falls back to `item.key`, then content.   |
| searchType       | false        | 'contains' \| 'regex'                                                 | 'contains'  | Case-insensitive substring match (default) or regular expression.                                       |
| locale           | false        | 'en' \| 'zh-TW' \| 'zh-CN'                                            | 'en'        | Built-in locale for footer / empty-data messages.                                                       |
| localeOverrides  | false        | Partial\<DataTableLocale\>                                            | —           | Override individual locale strings, or pass a full custom locale object.                                 |
| clickRowToSelect | false        | boolean                                                               | false       | Click a row to select the item.                                                                         |
| disabledRows     | false        | BodyRowDisabledFunction = (item: Item, rowNumber?: number) => boolean | —           | Disable specific rows from being selected.                                                               |
| expandTransition | false        | boolean                                                               | true        | If an expand column is set, the expand-row transition is enabled by default.                            |

## Slots

[Slot](./docs/api/slot.md)
