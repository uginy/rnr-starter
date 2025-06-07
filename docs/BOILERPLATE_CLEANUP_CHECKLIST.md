# 🧹 Boilerplate Cleanup Checklist
## Подготовка React Native + Expo проекта к публикации

> **Статус:** Готов к очистке  
> **Цель:** Создание чистого boilerplate без примеров и тестовых данных  
> **Время выполнения:** ~30 минут

---

## 📋 Краткое содержание очистки

### ✅ Что будет удалено
- Вся папка `examples/` с демонстрационными компонентами
- Страница примеров `app/examples.tsx`
- Maestro E2E тесты из `maestro/`
- Документация по примерам из `docs/`
- Тестовые данные и отладочные выводы

### 🔧 Что будет изменено
- Главная страница `app/index.tsx` (удаление ссылки на примеры)
- Файл `.env` (очистка от персональных данных)
- package.json (удаление ненужных скриптов)

---

## 🗂️ Детальный план очистки

### 1. 🗑️ УДАЛЕНИЕ ФАЙЛОВ И ПАПОК

#### ❌ Полное удаление директорий

```bash
# Удалить все примеры
rm -rf examples/

# Удалить E2E тесты (если не планируете использовать)
rm -rf maestro/

# Удалить документацию по примерам
rm -rf docs/
```

#### ❌ Удаление конкретных файлов

```bash
# Удалить страницу примеров
rm app/examples.tsx

# Удалить документы по примерам (опционально)
rm docs/REMOVE_EXAMPLES.md
rm docs/AUTH_COMPLETE.md
rm docs/AUTH_FINAL_SUMMARY.md
rm docs/AUTH_TESTING_GUIDE.md
rm docs/auth-system-plan.md
rm docs/auth-testing-plan.md
rm docs/biome-setup.md
rm docs/bottom-sheet-guide.md
rm docs/button-async-docs.md
rm docs/maestro-setup.md
rm docs/mmkv-integration.md
rm docs/supabase-setup.md
rm docs/toast-architecture.md
```

### 2. 🔐 ОЧИСТКА КОНФИДЕНЦИАЛЬНЫХ ДАННЫХ

#### ⚠️ Файл `.env` - КРИТИЧНО!

**Местоположение:** `.env`

**Текущие данные для удаления:**
```env
# УДАЛИТЬ эти строки - содержат реальные ключи
EXPO_PUBLIC_SUPABASE_URL=https://xqcwnwerxpzfbmlvnrxq.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxY3dud2VyeHB6ZmJtbHZucnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTc3NTEsImV4cCI6MjA2NDM3Mzc1MX0.yJZmY4okZxoDw3N2ec4rtu8Db-WYcENcVm8g-l0r5_o
```

**Заменить на:**
```env
# Authentication Configuration
# Set to 'true' to enable authentication features, 'false' or omit to disable
EXPO_PUBLIC_AUTH_ENABLED=true

# Supabase Configuration
# Replace with your own Supabase project credentials
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Development Configuration
EXPO_PUBLIC_NODE_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:3000
```

#### 📱 Файл `app.json` - персональные данные

**Местоположение:** `app.json`

**Изменить следующие поля:**
```json
{
  "expo": {
    "name": "your-app-name",
    "slug": "your-app-slug",
    "scheme": "com.yourcompany.yourapp",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id-here"
      }
    },
    "owner": "your-expo-username"
  }
}
```

#### 📦 Файл `package.json`

**Изменить:**
```json
{
  "name": "your-boilerplate-name",
  "version": "1.0.0"
}
```

### 3. 🧹 ОЧИСТКА ОТЛАДОЧНЫХ ВЫВОДОВ

#### 📍 Найденные console.log для удаления

**В файлах примеров (будут удалены автоматически):**
- `examples/components/*.tsx` - все console.log удалятся с папкой

**В основных файлах проекта:**

1. **`lib/api.ts:24`**
   ```typescript
   // УДАЛИТЬ эту строку:
   console.error('API Error:', error.response?.data || error.message);
   ```

2. **`lib/storage.ts:77`**
   ```typescript
   // УДАЛИТЬ эту строку:
   console.warn(`Failed to parse JSON for key "${key}":`, error);
   ```

3. **`lib/i18n.ts:59,69`**
   ```typescript
   // УДАЛИТЬ эти строки:
   console.log('Error detecting language:', error);
   console.log('Error saving language:', error);
   ```

4. **`auth/store/authStore.ts`** - множественные console.log:
   ```typescript
   // УДАЛИТЬ все строки с console.log/console.error в этом файле
   // Строки: 58, 61, 66, 69, 101, 105, 108, 112, 125, 128, 137, 140, 144, 149, 150, 152, 221, 223, 231, 233, 263, 268, 271, 279, 283, 286, 293, 296
   ```

5. **`app/_layout.tsx:57,60,66,69`**
   ```typescript
   // УДАЛИТЬ эти строки отладки:
   console.log('🚀 App _layout useEffect triggered, isAuth:', isAuth);
   console.log('🚀 Initializing auth system (check session)...');
   console.error('🚀 Failed to initialize auth session:', error);
   console.error('🚀 Failed to initialize auth system:', error);
   ```

### 4. ✏️ МОДИФИКАЦИЯ ФАЙЛОВ

#### 🏠 Главная страница `app/index.tsx`

**Удалить кнопку Examples (строки 67-71):**
```typescript
// УДАЛИТЬ этот блок:
<Link href="/examples" asChild>
  <Button variant="default" className="shadow shadow-foreground/5 w-full">
    <Text>📋 Examples</Text>
  </Button>
</Link>
```

**И информационный блок (строки 74-78):**
```typescript
// УДАЛИТЬ этот блок:
<View className="mt-4 p-3 bg-muted/50 rounded-lg">
  <Text className="text-xs text-center text-muted-foreground">
    💡 Explore all examples
  </Text>
</View>
```

#### 📦 Файл `package.json` - скрипты

**Удалить E2E тестовые скрипты:**
```json
// УДАЛИТЬ эти скрипты:
"test:e2e": "maestro test maestro/flows/",
"test:e2e:smoke": "maestro test maestro/flows/smoke/",
"test:e2e:buttons": "maestro test maestro/flows/buttons/",
"test:e2e:buttons:comprehensive": "maestro test maestro/flows/buttons/button-comprehensive-flow.yml",
"test:e2e:navigation": "maestro test maestro/flows/navigation/",
"test:e2e:single": "maestro test",
"test:e2e:report": "maestro test maestro/flows/ --format junit --output maestro/reports/"
```

### 5. 📝 ОБНОВЛЕНИЕ README.md

#### ✅ Что оставить:
- Описание основных возможностей
- Инструкции по установке
- Конфигурация проекта
- Описание компонентов UI

#### ❌ Что удалить из README.md:
```markdown
## Examples Directory
<!-- Весь раздел про examples -->

### Removing Examples
<!-- Инструкции по удалению -->

## Navigation Structure
<!-- Ссылки на examples -->
```

#### ✏️ Что изменить:
- Обновить структуру проекта (убрать упоминания `examples/`)
- Удалить ссылки на примеры из навигации
- Обновить Quick Start секцию

### 6. 🔧 ДОПОЛНИТЕЛЬНАЯ ОЧИСТКА

#### 📁 Проверить и удалить (если существуют):
```bash
# Временные файлы
rm -rf .expo/
rm -rf node_modules/.cache/
rm -rf dist/
rm -rf build/

# Логи
rm -f *.log
rm -f npm-debug.log*
rm -f yarn-debug.log*
rm -f yarn-error.log*
```

#### 🧬 Git очистка:
```bash
# Добавить в .gitignore если нет:
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
echo ".expo/" >> .gitignore
```

---

## 🚀 Финальная проверка

### ✅ Чек-лист после очистки:

- [ ] Папка `examples/` удалена
- [ ] Файл `app/examples.tsx` удален
- [ ] Папка `maestro/` удалена (опционально)
- [ ] Документация в `docs/` очищена
- [ ] Файл `.env` не содержит реальных ключей
- [ ] `app.json` содержит placeholder данные
- [ ] `package.json` очищен от example-скриптов
- [ ] Все console.log удалены из production файлов
- [ ] `app/index.tsx` не содержит ссылок на examples
- [ ] README.md обновлен

### 🧪 Тестирование после очистки:

```bash
# Проверить что приложение запускается
bun install
bun run dev

# Проверить что нет ошибок сборки
bun run lint
bun run format

# Проверить основные страницы
# - Главная страница
# - Страницы аутентификации (если включена)
```

---

## 📚 Дополнительные рекомендации

### 🛡️ Безопасность:
1. **Никогда не коммитьте реальные ключи API**
2. **Используйте `.env.example` как шаблон**
3. **Проверяйте .gitignore на актуальность**

### 📖 Документация:
1. **Создайте свой README.md**
2. **Документируйте API ключи в .env.example**
3. **Добавьте инструкции по настройке**

### 🔄 Workflow:
1. **Настройте CI/CD без примеров**
2. **Обновите скрипты сборки**
3. **Протестируйте на чистом окружении**

---

## 🎯 Результат

После выполнения всех шагов вы получите:

✅ **Чистый boilerplate** без примеров и тестовых данных  
✅ **Безопасный код** без конфиденциальной информации  
✅ **Готовую основу** для нового проекта  
✅ **Работающую аутентификацию** (опционально)  
✅ **Настроенные UI компоненты**  
✅ **Современный стек** (React Native + Expo + TypeScript)

**Размер проекта уменьшится** примерно на 50% за счет удаления папки `examples/` и `maestro/`.

---

*Создано: {{ дата создания }}*  
*Для проекта: React Native Expo Starter*  
*Версия чек-листа: 1.0*