# 🚀 Локальное использование React Native UI Boilerplate

Этот guide объясняет, как использовать этот boilerplate локально для создания новых проектов без публикации в NPM.

## 📋 Содержание

- [Быстрый старт](#быстрый-старт)
- [Методы использования](#методы-использования)
- [Локальные команды](#локальные-команды)
- [Альтернативные способы](#альтернативные-способы)
- [После создания проекта](#после-создания-проекта)
- [Примеры](#примеры)
- [Troubleshooting](#troubleshooting)

## 🚀 Быстрый старт

### Предварительные требования

- Node.js >= 18.0.0
- Bun (рекомендуется) или npm
- Git

### Создание нового проекта

```bash
# Метод 1: Использование локального скрипта
node create-local-project.js MyAwesomeApp

# Метод 2: Использование npm команд
bun run create-project MyAwesomeApp

# Метод 3: С очисткой template файлов
bun run create-project:clean MyAwesomeApp
```

## 📦 Методы использования

### 1. Локальный скрипт (Рекомендуется)

```bash
# Базовое создание проекта
node create-local-project.js MyProject

# С очисткой template файлов
node create-local-project.js MyProject --clean

# Без установки зависимостей
node create-local-project.js MyProject --skip-install

# Помощь
node create-local-project.js --help
```

### 2. NPM команды

```bash
# Создать проект (базовая версия)
bun run create-project MyProject

# Создать проект с очисткой
bun run create-project:clean MyProject
```

### 3. Прямое копирование

```bash
# Копировать template
cp -r /path/to/rn-starter MyNewProject
cd MyNewProject

# Очистить git и переустановить зависимости
rm -rf .git
rm -rf node_modules
bun install

# Инициализировать новый git repo
git init
git add .
git commit -m "Initial commit"
```

## 🛠️ Локальные команды

В [`package.json`](package.json:77) добавлены следующие команды:

```json
{
  "scripts": {
    "create-project": "node create-local-project.js",
    "create-project:clean": "node create-local-project.js --clean"
  }
}
```

### Опции скрипта

| Опция | Описание |
|-------|----------|
| `--clean` | Удаляет template-специфичные файлы после создания |
| `--skip-install` | Пропускает установку зависимостей |
| `--help` | Показывает справку |

## 🌐 Альтернативные способы

### 1. Использование с GitHub URL

```bash
# Через npx с GitHub (если репозиторий публичный)
npx create-expo-app MyApp --template https://github.com/your-username/rn-starter

# Через degit
npx degit your-username/rn-starter MyApp
cd MyApp
bun install
```

### 2. Клонирование и переименование

```bash
# Клонировать template
git clone https://github.com/your-username/rn-starter.git MyNewProject
cd MyNewProject

# Очистить git history
rm -rf .git

# Обновить конфигурацию проекта вручную
# Отредактировать package.json, app.json

# Установить зависимости
bun install

# Инициализировать новый git
git init
git add .
git commit -m "Initial commit from template"
```

### 3. Использование template локально

```bash
# Создать симлинк template (для разработки)
ln -s /path/to/rn-starter ~/.local-templates/rn-starter

# Использовать симлинк
cp -r ~/.local-templates/rn-starter MyNewProject
```

## ⚙️ После создания проекта

### 1. Обязательные шаги

```bash
cd YourNewProject

# Проверить, что зависимости установлены
bun install

# Запустить проект
bun dev
```

### 2. Настройка проекта

1. **Обновить конфигурацию приложения:**
   - Проверить [`app.json`](app.json:1) - название, slug, bundle identifier
   - Обновить [`package.json`](package.json:1) - название, описание, repository

2. **Настроить окружение:**
   - Скопировать [`.env.example`](.env.example:1) в `.env`
   - Заполнить необходимые переменные окружения

3. **Настроить Expo:**
   - Обновить `extra.eas.projectId` в [`app.json`](app.json:56)
   - Обновить `owner` в [`app.json`](app.json:59)

4. **Настроить Git:**
   - Добавить remote origin: `git remote add origin <your-repo-url>`
   - Сделать первый push: `git push -u origin main`

### 3. Кастомизация

1. **Брендинг:**
   - Заменить иконки в `assets/images/`
   - Обновить цвета в [`tailwind.config.js`](tailwind.config.js:1)

2. **Удаление ненужных компонентов:**
   - Удалить неиспользуемые UI компоненты из `components/ui/`
   - Обновить экспорты в [`components/ui/index.ts`](components/ui/index.ts:1)

## 📝 Примеры

### Пример 1: Создание простого проекта

```bash
# Создать проект
node create-local-project.js TodoApp

# Перейти в папку
cd TodoApp

# Запустить
bun dev
```

### Пример 2: Создание проекта без template файлов

```bash
# Создать проект с очисткой
node create-local-project.js ECommerceApp --clean

cd ECommerceApp

# Проверить, что template файлы удалены
ls docs/ # должно быть пусто или только нужные файлы

bun dev
```

### Пример 3: Создание проекта без автоустановки

```bash
# Создать проект без установки зависимостей
node create-local-project.js MyApp --skip-install

cd MyApp

# Установить зависимости вручную
bun install

# Запустить
bun dev
```

## 🐛 Troubleshooting

### Проблема: "Directory already exists"

```bash
# Удалить существующую папку
rm -rf MyProject

# Создать заново
node create-local-project.js MyProject
```

### Проблема: Ошибка установки зависимостей

```bash
# Если bun не работает, попробовать npm
cd YourProject
rm -rf node_modules
npm install

# Или использовать --skip-install и установить вручную
node create-local-project.js MyProject --skip-install
cd MyProject
bun install
```

### Проблема: Git не инициализируется

```bash
cd YourProject

# Инициализировать git вручную
git init
git add .
git commit -m "Initial commit"
```

### Проблема: Неправильные разрешения файлов

```bash
# Сделать скрипт исполняемым
chmod +x create-local-project.js

# Или запускать через node
node create-local-project.js MyProject
```

## 🔧 Системные требования

### macOS
```bash
# Установить Bun
curl -fsSL https://bun.sh/install | bash

# Проверить Node.js
node --version # должно быть >= 18.0.0
```

### Windows
```bash
# Установить Bun через PowerShell
powershell -c "irm bun.sh/install.ps1 | iex"

# Или использовать npm
npm install -g bun
```

### Linux
```bash
# Установить Bun
curl -fsSL https://bun.sh/install | bash

# Убедиться, что Node.js >= 18
node --version
```

## 💡 Советы и лучшие практики

1. **Используйте `--clean` для production проектов** - это удалит template-специфичные файлы
2. **Проверяйте конфигурацию** - обязательно обновите [`app.json`](app.json:1) и [`package.json`](package.json:1)
3. **Настройте environment** - скопируйте [`.env.example`](.env.example:1) в `.env`
4. **Обновите зависимости** - после создания проекта проверьте актуальность пакетов
5. **Очистите код** - удалите неиспользуемые компоненты и файлы

## 📚 Дополнительные ресурсы

- [Документация Expo](https://docs.expo.dev/)
- [React Native документация](https://reactnative.dev/)
- [NativeWind документация](https://www.nativewind.dev/)
- [Бонус: Список всех UI компонентов](components/ui/README.md)

---

**Создано с ❤️ с помощью React Native UI Boilerplate**