# 🛠️ Скрипты для создания проектов

Эта папка содержит платформо-специфичные скрипты для создания новых проектов из React Native UI Boilerplate.

## 📋 Доступные скрипты

| Файл | Платформа | Описание |
|------|-----------|----------|
| [`create-project.sh`](create-project.sh) | Unix/Linux/macOS | Bash скрипт с расширенными возможностями |
| [`create-project.bat`](create-project.bat) | Windows | Batch файл для командной строки Windows |
| [`create-project.ps1`](create-project.ps1) | Windows | PowerShell скрипт с дополнительными функциями |

## 🚀 Использование

### macOS/Linux (Bash)

```bash
# Сделать исполняемым
chmod +x scripts/create-project.sh

# Создать проект
./scripts/create-project.sh MyAwesomeApp

# С дополнительными опциями
./scripts/create-project.sh MyApp --clean --skip-install

# Показать справку
./scripts/create-project.sh --help
```

### Windows (Command Prompt)

```cmd
REM Создать проект
scripts\create-project.bat MyAwesomeApp

REM С дополнительными опциями
scripts\create-project.bat MyApp --clean --skip-install
```

### Windows (PowerShell)

```powershell
# Создать проект
.\scripts\create-project.ps1 MyAwesomeApp

# С дополнительными опциями
.\scripts\create-project.ps1 MyApp -Clean -SkipInstall

# Показать справку
.\scripts\create-project.ps1 -Help
```

## ⚙️ Опции

Все скрипты поддерживают следующие опции:

| Опция | Bash | Batch | PowerShell | Описание |
|-------|------|-------|------------|----------|
| Clean | `--clean` | `--clean` | `-Clean` | Удалить template файлы |
| Skip Install | `--skip-install` | `--skip-install` | `-SkipInstall` | Пропустить установку зависимостей |
| Help | `--help`, `-h` | N/A | `-Help` | Показать справку |

## 🔧 Функции по платформам

### Bash скрипт (macOS/Linux)
- ✅ Проверка версии Node.js
- ✅ Валидация имени проекта
- ✅ Подробные сообщения об ошибках
- ✅ Предложение открыть в VS Code
- ✅ Справка и примеры использования

### Batch скрипт (Windows CMD)
- ✅ Парсинг аргументов командной строки
- ✅ Базовая обработка ошибок
- ✅ Поддержка всех основных опций
- ❌ Ограниченная валидация

### PowerShell скрипт (Windows)
- ✅ Типизированные параметры
- ✅ Проверка версии Node.js
- ✅ Расширенная обработка ошибок
- ✅ Предложение открыть в VS Code
- ✅ Цветной вывод
- ✅ Подробная справка

## 📝 Примеры использования

### Создание простого проекта

**macOS/Linux:**
```bash
./scripts/create-project.sh TodoApp
cd TodoApp
bun dev
```

**Windows (CMD):**
```cmd
scripts\create-project.bat TodoApp
cd TodoApp
bun dev
```

**Windows (PowerShell):**
```powershell
.\scripts\create-project.ps1 TodoApp
cd TodoApp
bun dev
```

### Создание clean проекта

**macOS/Linux:**
```bash
./scripts/create-project.sh ECommerceApp --clean
```

**Windows (CMD):**
```cmd
scripts\create-project.bat ECommerceApp --clean
```

**Windows (PowerShell):**
```powershell
.\scripts\create-project.ps1 ECommerceApp -Clean
```

### Создание без установки зависимостей

**macOS/Linux:**
```bash
./scripts/create-project.sh MyApp --skip-install
cd MyApp
bun install
bun dev
```

**Windows (PowerShell):**
```powershell
.\scripts\create-project.ps1 MyApp -SkipInstall
cd MyApp
bun install
bun dev
```

## 🔍 Автоматические проверки

Скрипты выполняют следующие проверки:

1. **Проверка Node.js**: Убеждаются, что Node.js установлен
2. **Валидация имени**: Проверяют корректность имени проекта
3. **Проверка существования**: Убеждаются, что папка не существует
4. **Права доступа**: Проверяют возможность создания файлов

## 🐛 Troubleshooting

### Проблема: Permission denied (macOS/Linux)

```bash
# Сделать скрипт исполняемым
chmod +x scripts/create-project.sh

# Проверить права
ls -la scripts/create-project.sh
```

### Проблема: PowerShell execution policy (Windows)

```powershell
# Разрешить выполнение локальных скриптов
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Или для одного сеанса
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

### Проблема: Node.js не найден

```bash
# Проверить установку Node.js
node --version

# Если не установлен, скачать с https://nodejs.org/
# Для macOS через Homebrew:
brew install node

# Для Linux через package manager:
sudo apt-get install nodejs npm
```

### Проблема: Путь не найден (Windows)

```cmd
REM Убедиться, что находитесь в корне template
dir create-local-project.js

REM Запустить из корня template
scripts\create-project.bat MyApp
```

## 🚀 Интеграция с CI/CD

### GitHub Actions

```yaml
name: Create Example Projects
on: [push]

jobs:
  test-scripts:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Test script (Unix)
      if: runner.os != 'Windows'
      run: |
        chmod +x scripts/create-project.sh
        ./scripts/create-project.sh TestApp --skip-install
    
    - name: Test script (Windows)
      if: runner.os == 'Windows'
      run: |
        scripts\create-project.bat TestApp --skip-install
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /template
COPY . .

RUN chmod +x scripts/create-project.sh

# Создать проект в контейнере
RUN ./scripts/create-project.sh ExampleApp --skip-install

WORKDIR /template/ExampleApp
RUN npm install

EXPOSE 8081
CMD ["npm", "run", "dev"]
```

## 📊 Сравнение производительности

| Скрипт | Время выполнения | Размер | Функциональность |
|--------|------------------|--------|------------------|
| Bash | ~5-10 сек | 3KB | ⭐⭐⭐⭐⭐ |
| Batch | ~3-8 сек | 1.5KB | ⭐⭐⭐ |
| PowerShell | ~5-12 сек | 2.5KB | ⭐⭐⭐⭐⭐ |

**Рекомендации:**
- **macOS/Linux**: Используйте Bash скрипт
- **Windows CLI**: Используйте Batch для простоты
- **Windows PowerShell**: Используйте PowerShell для расширенной функциональности

---

**💡 Совет**: Для лучшего опыта используйте скрипт, соответствующий вашей операционной системе!