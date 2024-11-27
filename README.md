## Introduction

This project is a customized version of [vue3-easy-data-table](https://github.com/HC200ok/vue3-easy-data-table), with significant modifications and extensions based on the original design.

The new features and modifications were developed by tiaohsun, and all rights are reserved.

The project is only a customized version, and the original functions have not been fully tested when refactoring. If there are bugs, please leave a message to me through Discussions.

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

## Props

In addition to the original [Props](https://hc200ok.github.io/vue3-easy-data-table-doc/props/common-props.html), the following new props have been added:

| **Name**                | **Required** | **Type**                                                       | **Default**                             | **Description**                                                                      |
| ----------------------- | ------------ | -------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------ |
| expand-column           | false        | string                                                         | ‘’                                      | Specifies which column can be expanded.                                              |
| theme                   | false        | string or ThemeConfig({ color: 'indigo', variant: 'DEFAULT' }) | { color: 'indigo', variant: 'DEFAULT' } | Replaces `theme-color`. Accepts HEX values like `#42b883` or Tailwind color names.   |
| batchSelectionThreshold | false        | number                                                         | 10,000                                  | Enables batch selection for datasets exceeding this threshold, with a loading style. |

## Slots

- pagination-info: Customize pagination information.
- expand-button: Customize the style of the expandable rows (`expand-column`).

## Require

1. Make sure that you have Node.js and Tailwind CSS installed.
2. Additionally to your own content data you should add Vue-DataTable-Tailwind to apply the classes from the interactive elements in the tailwind.config.js file:

```TypeScript
// tailwind.config.ts
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",

        "./node_modules/vue-datatable-tailwind/dist/**/*.{js,vue}"
    ]
}
```
