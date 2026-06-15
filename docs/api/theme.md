# Theme（主題與顏色）

v3 起，元件出貨**自包含樣式表**（免裝 Tailwind），主題以 CSS 變數驅動。你只需提供**單一主色**，其餘狀態色由 `color-mix()` 自動衍生。

## 設定主色

### 1. 透過 `theme` prop

```vue
<DataTable :headers="headers" :items="items" theme="indigo" />
<DataTable ... theme="#6366f1" />
<DataTable ... theme="oklch(64.5% 0.246 16.439)" />
```

- 解析規則：**內建色名**（如 `'indigo'`）→ 查表取基準色；**hex / rgb / oklch / 任意合法 CSS 顏色** → 原樣採用。
- v3 起**不再吸附最近的 Tailwind 色階** —— 你給什麼色就用什麼色。
- 內建 22 個色名：`slate`、`gray`、`zinc`、`neutral`、`stone`、`red`、`orange`、`amber`、`yellow`、`lime`、`green`、`emerald`、`teal`、`cyan`、`sky`、`blue`、`indigo`、`violet`、`purple`、`fuchsia`、`pink`、`rose`、`taupe`、`mauve`、`olive`、`mist`。其他請傳 hex / rgb / oklch。
- 開發模式（`import.meta.env.DEV`）下，若傳入「既非內建色名、`CSS.supports('color', …)` 亦為 false」的值，會 `console.warn` 提醒，避免靜默失效。

### 2. 透過 CSS 變數（全域）

```css
:root {
  --color-vdt-primary: oklch(0.65 0.25 130); /* 衍生狀態色會自動更新 */
}
```

主色衍生出的狀態色（皆可單獨覆寫）：

| 變數 | 用途 |
| --- | --- |
| `--color-vdt-primary` | 主色（唯一輸入） |
| `--color-vdt-primary-hover` | hover（主色混黑 12%） |
| `--color-vdt-primary-strong` | 強調（混黑 26%） |
| `--color-vdt-primary-subtle` | 淡底（混 surface 88%） |
| `--color-vdt-primary-border` | 淡邊框 |
| `--color-vdt-primary-ring` | focus ring（主色 50% 透明） |
| `--color-vdt-on-primary` | 主色上的文字 / icon（預設 white） |

## 深色 / 淺色模式

```vue
<DataTable ... mode="dark" />   <!-- 'light' | 'dark' -->
```

- 設定 `mode` → 元件根容器加上 `data-vdt-mode="dark|light"`。
- **未設定 `mode`** → 跟隨系統 `prefers-color-scheme`。
- 也可手動在外層加 `class="dark"` 或 `[data-vdt-mode]` 控制。

中性語義色（surface / content / outline / interactive）有淺色與深色兩套，會隨模式自動切換，亦可覆寫，例如：

```css
:root {
  --color-vdt-surface: #ffffff;
  --color-vdt-content: #1f2937;
  --color-vdt-outline: #e5e7eb;
}
[data-vdt-mode="dark"] {
  --color-vdt-surface: #1f2937;
}
```

## 尺寸 / 字級 token

間距、字級、圓角等以 `--vdt-*` 設計 token 提供，可覆寫以統一調整：

```css
:root {
  --vdt-text-sm: 0.875rem;   /* 表頭 / 表身字級 */
  --vdt-space-3: 0.75rem;    /* 內距刻度 */
  --vdt-radius: 0.375rem;    /* 圓角 */
}
```

可用 token：`--vdt-text-xs/-sm`、`--vdt-leading-sm`、`--vdt-space-1/-1_5/-2/-3/-4`、`--vdt-radius-sm/-radius/-radius-full`、`--vdt-font-medium/-semibold`。

## 從 v2 遷移

舊版的 50–950 色階（`--color-vdt-500` … 搭配 `!important`）已**移除**，改為單一 `--color-vdt-primary` + `color-mix()` 模型。
