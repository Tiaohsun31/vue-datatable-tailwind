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
import { createFilter } from './types/main'

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
