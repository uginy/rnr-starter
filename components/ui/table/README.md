# Table Component

Оптимизированный переиспользуемый компонент таблицы на основе @tanstack/react-table для React Native приложений.

## Живые примеры

Посмотрите компонент Table в действии:
**Main Page** → **Examples** → **Data Tab** → **Table Examples**

Доступны два типа демонстраций:
- **Simple Table** - базовая реализация таблицы
- **Advanced Table** - продвинутая таблица с фильтрацией и сортировкой

## Особенности

- ✅ Сортировка по колонкам
- ✅ Пагинация
- ✅ Фильтрация данных
- ✅ Оптимизированная производительность с мемоизацией
- ✅ Адаптивный дизайн с горизонтальной прокруткой
- ✅ Поддержка темной темы
- ✅ TypeScript типизация
- ✅ Кастомизация стилей через className

## Базовое использование

```tsx
import { Table } from '~/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

export function UserTable() {
  return (
    <Table
      data={data}
      columns={columns}
      enableSorting={true}
      enablePagination={true}
      pageSize={10}
    />
  );
}
```

## Продвинутое использование с хуком

```tsx
import { useTable } from '~/lib/hooks/useTable';

export function AdvancedUserTable() {
  const { tableData, tableActions } = useTable({
    data,
    columns,
    enableSorting: true,
    enablePagination: true,
    pageSize: 5,
  });

  return (
    <View>
      <Table
        data={data}
        columns={columns}
        enableSorting={true}
        enablePagination={true}
        pageSize={5}
      />
    </View>
  );
}
```

## Props

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | - | Данные для отображения в таблице |
| `columns` | `ColumnDef<TData>[]` | - | Определение колонок |
| `loading` | `boolean` | `false` | Показать индикатор загрузки |
| `enableSorting` | `boolean` | `true` | Включить сортировку |
| `enableFiltering` | `boolean` | `false` | Включить фильтрацию |
| `enablePagination` | `boolean` | `false` | Включить пагинацию |
| `pageSize` | `number` | `10` | Количество строк на странице |
| `className` | `string` | - | CSS класс для контейнера |
| `headerClassName` | `string` | - | CSS класс для заголовков |
| `rowClassName` | `string` | - | CSS класс для строк |
| `cellClassName` | `string` | - | CSS класс для ячеек |

## Оптимизация производительности

Компонент использует несколько техник для оптимизации:

1. **React.useMemo** для мемоизации строк таблицы
2. **Виртуализация** через ScrollView для больших наборов данных
3. **Ленивое вычисление** сортировки и фильтрации
4. **Оптимизированные ре-рендеры** через правильную структуру зависимостей

## Кастомизация стилей

Компонент использует NativeWind/Tailwind CSS для стилизации:

```tsx
<Table
  className="border-2 border-blue-500"
  headerClassName="bg-blue-100 dark:bg-blue-900"
  rowClassName="hover:bg-gray-50 dark:hover:bg-gray-800"
  cellClassName="font-medium"
/>
```

## Примеры использования

### Живые демонстрации
- **Navigation**: Main Page → Examples → Data Tab
- [`TableExample.tsx`](../../../examples/components/TableExample.tsx) - Простая таблица с базовой функциональностью
- [`AdvancedTableExample.tsx`](../../../examples/components/AdvancedTableExample.tsx) - Продвинутая таблица с:
  - Фильтрацией по статусу
  - Поиском по имени и email
  - Сортировкой колонок
  - Пагинацией
  - Управлением статусами

### Файлы компонентов
- **Основной компонент**: [`components/ui/table.tsx`](../table.tsx)
- **Хук для таблиц**: [`lib/hooks/useTable.ts`](../../../lib/hooks/useTable.ts)
- **Типы данных**: [`types.ts`](./types.ts)

### Дополнительные возможности
В примерах показано:
- Интеграция с Zustand store для управления состоянием
- Обработка различных типов данных (строки, числа, даты, статусы)
- Кастомизация внешнего вида с помощью NativeWind/Tailwind
- Responsive дизайн для мобильных устройств
- Оптимизация производительности для больших наборов данных