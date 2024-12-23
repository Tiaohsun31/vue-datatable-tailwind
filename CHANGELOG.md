# Changelog

## [1.0.1] - 2024-12-22

### refactor:

- 大幅度變更 DataTable 結構，拆分個別小項目 table/TableHeader.vue、TableBodyCell.vue 等

### feat:

- 因重新拆分 DataTable，重新定義 Slot
- 表格內建格改用計算方式，不採用 tailwind，以方便修改

### fix:

- Header 表格欄 fixed 會穿透問題

### docs:

- 更新 Slot 文檔
- 專案加上Scope，發佈npm
