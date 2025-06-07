# ⚡ Быстрый старт - Локальное использование

> **🎯 Цель**: Создать новый React Native проект из этого boilerplate за 30 секунд

## 🚀 Самый быстрый способ

```bash
# 1. Создать проект
node create-local-project.js MyAwesomeApp

# 2. Перейти в папку и запустить
cd MyAwesomeApp && bun dev
```

**Готово!** 🎉

## 📋 Все способы создания проекта

### Метод 1: Основной скрипт (Рекомендуется)
```bash
node create-local-project.js MyProject
```

### Метод 2: NPM команды
```bash
bun run create-project MyProject
```

### Метод 3: Платформо-специфичные скрипты
```bash
# macOS/Linux
./scripts/create-project.sh MyProject

# Windows (CMD)
scripts\create-project.bat MyProject

# Windows (PowerShell)
.\scripts\create-project.ps1 MyProject
```

### Метод 4: GitHub (если опубликован)
```bash
npx degit your-username/rn-starter MyProject
# или
node scripts/degit-alternative.js your-username/rn-starter MyProject
```

## ⚙️ Полезные опции

| Команда | Что делает |
|---------|------------|
| `--clean` | Удаляет template файлы (для production) |
| `--skip-install` | Не устанавливает зависимости автоматически |

**Примеры:**
```bash
# Создать clean проект (без template файлов)
node create-local-project.js MyApp --clean

# Создать без установки зависимостей
node create-local-project.js MyApp --skip-install
```

## 🎯 После создания проекта

### Обязательные шаги:
1. **Обновить [`app.json`](app.json:3)**: Изменить `name`, `slug`, bundle identifier
2. **Настроить `.env`**: Скопировать из [`.env.example`](.env.example:1)
3. **Запустить проект**: `bun dev`

### Дополнительные настройки:
- Обновить иконки в `assets/images/`
- Настроить цвета в [`tailwind.config.js`](tailwind.config.js:1)
- Добавить remote origin: `git remote add origin <your-repo>`

## 📚 Документация

- 📖 [Полная документация](README_LOCAL_USAGE.md)
- 🛠️ [Скрипты для разных ОС](scripts/README.md)
- 📱 [Примеры проектов](example-projects/README.md)

## 🆘 Проблемы?

**Node.js не найден:**
```bash
# Установить Node.js >= 18.0.0
# https://nodejs.org/
node --version
```

**Папка уже существует:**
```bash
# Удалить и создать заново
rm -rf MyProject
node create-local-project.js MyProject
```

**Ошибки зависимостей:**
```bash
# Установить вручную
cd MyProject
bun install
# или npm install
```

---

**⭐ Готов к созданию amazing приложений!**