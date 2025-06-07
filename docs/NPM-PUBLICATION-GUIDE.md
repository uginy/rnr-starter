# 📦 NPM Template Publication Guide

## Шаги для публикации шаблона в npm

### 1. Подготовка репозитория на GitHub

1. Создайте новый репозиторий на GitHub:
   ```
   Repository name: rnr-starter
   Description: React Native UI Boilerplate - Expo Template with 50+ components
   Public: ✅
   ```

2. Добавьте удаленный репозиторий:
   ```bash
   git remote add origin https://github.com/uginy/rnr-starter.git
   git branch -M main
   git push -u origin main
   ```

### 2. Финальная проверка package.json

Убедитесь что:
- ✅ `"name": "rnr-starter"`
- ✅ `"version": "1.0.0"`
- ✅ Нет `"private": true`
- ✅ Правильные URL репозитория
- ✅ Добавлено ключевое слово `"expo-template"`

### 3. Тестирование перед публикацией

```bash
# Проверьте что будет включено в пакет
npm pack --dry-run

# Создайте тестовый архив
npm pack
```

### 4. Публикация в npm

```bash
# Первая публикация
npm publish

# Или с тегом latest (по умолчанию)
npm publish --tag latest
```

### 5. Проверка публикации

```bash
# Проверьте что пакет опубликован
npm view rnr-starter

# Протестируйте создание проекта
npx create-expo-app@latest TestApp --template rnr-starter
```

### 6. Обновления версий

Для будущих обновлений:

```bash
# Патч-версия (1.0.0 -> 1.0.1)
npm version patch

# Минорная версия (1.0.0 -> 1.1.0)
npm version minor

# Мажорная версия (1.0.0 -> 2.0.0)
npm version major

# Публикация обновления
npm publish
```

## 🎯 Naming Convention для Expo Templates

Рекомендуемые имена:
- `create-expo-app-[template-name]` - для основных шаблонов
- `expo-template-[name]` - альтернативный формат
- `@yourorg/expo-template-[name]` - для организаций

## 📋 Checklist перед публикацией

- [ ] README.md обновлен
- [ ] package.json корректно настроен
- [ ] .npmignore настроен
- [ ] Тесты пройдены
- [ ] Git репозиторий создан и синхронизирован
- [ ] npm аккаунт подтвержден
- [ ] Имя пакета проверено на доступность

## 🚀 После публикации

1. Добавьте badges в README.md:
   ```markdown
   [![npm version](https://badge.fury.io/js/rnr-starter.svg)](https://badge.fury.io/js/rnr-starter)
   [![npm downloads](https://img.shields.io/npm/dm/rnr-starter.svg)](https://www.npmjs.com/package/rnr-starter)
   ```

2. Обновите документацию с инструкциями:
   ```bash
   npx create-expo-app@latest MyApp --template rnr-starter
   ```

3. Поделитесь в сообществе:
   - Reddit (r/reactnative, r/expo)
   - Twitter
   - Discord серверы
   - Dev.to / Medium статья
