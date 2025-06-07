# 📱 Примеры использования React Native UI Boilerplate

Эта папка содержит примеры и скрипты для демонстрации различных способов использования boilerplate локально.

## 🚀 Быстрый запуск примеров

### Автоматическое создание всех примеров

```bash
# Сделать скрипт исполняемым
chmod +x example-projects/create-examples.sh

# Создать все примеры
./example-projects/create-examples.sh
```

### Ручное создание примеров

```bash
# Пример 1: TodoApp (базовый)
node create-local-project.js TodoApp
cd TodoApp && bun install && bun dev

# Пример 2: ECommerceApp (чистый)
node create-local-project.js ECommerceApp --clean
cd ECommerceApp && bun install && bun dev

# Пример 3: SocialApp (стандартный)
node create-local-project.js SocialApp
cd SocialApp && bun install && bun dev
```

## 📋 Описание примеров

### 🔹 TodoApp
- **Назначение**: Базовый пример использования template
- **Особенности**: Содержит все template файлы для изучения
- **Рекомендуется для**: Новичков, изучения структуры boilerplate

```bash
cd examples/TodoApp
bun install
bun dev
```

### 🔹 ECommerceApp (Clean)
- **Назначение**: Пример "чистого" проекта для production
- **Особенности**: Удалены все template-специфичные файлы
- **Рекомендуется для**: Production проектов, готовых к развертыванию

```bash
cd examples/ECommerceApp
bun install
bun dev
```

### 🔹 SocialApp
- **Назначение**: Стандартный пример с полной функциональностью
- **Особенности**: Содержит все компоненты и возможности
- **Рекомендуется для**: Комплексных приложений, полного использования UI kit

```bash
cd examples/SocialApp
bun install
bun dev
```

## 🛠️ Кастомизация примеров

### TodoApp - Конфигурация для задач

1. **Обновить [`app.json`](../app.json:1):**
```json
{
  "expo": {
    "name": "Todo Master",
    "slug": "todo-master",
    "scheme": "com.yourcompany.todomaster"
  }
}
```

2. **Добавить специфичные компоненты:**
```bash
# Создать компоненты для задач
mkdir components/todo
touch components/todo/TaskItem.tsx
touch components/todo/TaskList.tsx
touch components/todo/AddTaskForm.tsx
```

### ECommerceApp - Конфигурация для e-commerce

1. **Обновить [`app.json`](../app.json:1):**
```json
{
  "expo": {
    "name": "Shop Pro",
    "slug": "shop-pro",
    "scheme": "com.yourcompany.shoppro"
  }
}
```

2. **Добавить e-commerce компоненты:**
```bash
# Создать компоненты для магазина
mkdir components/shop
touch components/shop/ProductCard.tsx
touch components/shop/Cart.tsx
touch components/shop/Checkout.tsx
```

### SocialApp - Конфигурация для социальной сети

1. **Обновить [`app.json`](../app.json:1):**
```json
{
  "expo": {
    "name": "Social Connect",
    "slug": "social-connect",
    "scheme": "com.yourcompany.socialconnect"
  }
}
```

2. **Добавить социальные компоненты:**
```bash
# Создать компоненты для соцсети
mkdir components/social
touch components/social/PostCard.tsx
touch components/social/UserProfile.tsx
touch components/social/Feed.tsx
```

## 🔧 Полезные команды для примеров

### Массовые операции

```bash
# Установить зависимости во всех примерах
for dir in examples/*/; do
  echo "Installing dependencies in $dir"
  (cd "$dir" && bun install)
done

# Запустить линтер во всех примерах
for dir in examples/*/; do
  echo "Linting $dir"
  (cd "$dir" && bun run lint)
done

# Очистить node_modules во всех примерах
for dir in examples/*/; do
  echo "Cleaning $dir"
  rm -rf "$dir/node_modules"
done
```

### Сравнение проектов

```bash
# Сравнить различия между clean и standard версиями
diff -r examples/TodoApp examples/ECommerceApp

# Посмотреть размеры проектов
du -sh examples/*
```

## 📊 Сравнительная таблица примеров

| Пример | Размер | Template файлы | Готовность к production | Время создания |
|---------|--------|----------------|------------------------|----------------|
| TodoApp | ~50MB | ✅ Есть | ❌ Требует очистки | ~30 сек |
| ECommerceApp | ~45MB | ❌ Удалены | ✅ Готов | ~25 сек |
| SocialApp | ~50MB | ✅ Есть | ❌ Требует очистки | ~30 сек |

## 🎯 Следующие шаги после создания

### 1. Настройка окружения
```bash
cd examples/YourApp
cp .env.example .env
# Отредактировать .env файл с вашими настройками
```

### 2. Обновление зависимостей
```bash
bun update
```

### 3. Настройка Git
```bash
git remote add origin https://github.com/yourusername/yourapp.git
git branch -M main
git push -u origin main
```

### 4. Настройка Expo
```bash
# Войти в Expo CLI
npx expo login

# Создать новый проект в Expo
npx expo init --name "Your App Name"
```

## 🐛 Troubleshooting

### Проблема: Примеры не создаются
```bash
# Проверить права доступа
ls -la create-local-project.js
chmod +x create-local-project.js

# Проверить Node.js
node --version # должно быть >= 18
```

### Проблема: Ошибки при установке зависимостей
```bash
# Очистить кэш
bun cache clean

# Попробовать npm
cd examples/YourApp
rm bun.lockb
npm install
```

### Проблема: Git конфликты
```bash
cd examples/YourApp
rm -rf .git
git init
git add .
git commit -m "Initial commit"
```

## 📚 Дополнительные ресурсы

- [Главная документация](../README_LOCAL_USAGE.md)
- [Список UI компонентов](../components/ui/README.md)
- [Настройка темы](../lib/useColorScheme.tsx)
- [Интернационализация](../lib/i18n.ts)

---

**💡 Совет**: Используйте эти примеры как отправную точку для ваших собственных проектов!