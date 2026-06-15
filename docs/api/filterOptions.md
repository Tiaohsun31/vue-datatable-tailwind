# Filter Options（`filterOptions`）

透過 `filterOptions` prop 傳入篩選條件陣列。可直接寫物件（簡單方式），或用 `createFilter` 取得具型別的 `FilterOption`。

```typescript
import { createFilter } from '@tiaohsun/vue-datatable'
```

`createFilter` 方法：`string(field, comparison, criteria)`、`number(field, comparison, criteria)`、`array(field, criteria)`、`custom(field, predicate, criteria)`。

## 簡單方式（向後兼容） 範例

```javascript
const filterOptions = computed(() => {
  const filterOptionsArray = []
  if (filter.value.status !== 'all') {
    filterOptionsArray.push({
      field: 'logisticsStatus',
      comparison: '=',
      criteria: filter.value.status,
    })
  }
  return filterOptionsArray
})
```

## 使用 createFilter 範例

```javascript
import { createFilter } from '@tiaohsun/vue-datatable'

const filterOptions = computed(() => {
  const filterOptionsArray = []

  if (filter.value.status !== 'all') {
    filterOptionsArray.push(createFilter.string('logisticsStatus', '=', filter.value.status))
  }

  if (filter.value.price) {
    filterOptionsArray.push(createFilter.number('price', '>=', filter.value.price))
  }

  if (filter.value.categories?.length) {
    filterOptionsArray.push(createFilter.array('category', filter.value.categories))
  }

  return filterOptionsArray
})
```

## 自定義複雜過濾 範例

```javascript
const filterOptions = computed(() => {
  const filterOptionsArray = []

  filterOptionsArray.push(
    createFilter.custom(
      'complexField',
      (value, criteria) => {
        // 自定義過濾邏輯
        return value.someProperty === criteria.expectedValue
      },
      { expectedValue: 'something' },
    ),
  )

  return filterOptionsArray
})
```
