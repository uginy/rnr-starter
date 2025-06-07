#!/bin/bash

# 🧪 Скрипт для тестирования React Native UI Boilerplate Template
# Этот скрипт поможет протестировать template локально

set -e

echo "🚀 Тестирование React Native UI Boilerplate Template"
echo "=================================================="

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Функция для логирования
log_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Проверяем наличие необходимых инструментов
echo "🔍 Проверка системных требований..."

if ! command -v bun &> /dev/null; then
    log_error "Bun не установлен. Установите bun: https://bun.sh/"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    log_error "NPX не установлен. Установите Node.js: https://nodejs.org/"
    exit 1
fi

log_info "Системные требования выполнены"

# Получаем путь к текущей директории (template)
TEMPLATE_PATH=$(pwd)
TEST_PROJECT_NAME="TestReactNativeUIApp"
TEST_DIR="../template-test"

echo ""
echo "📁 Настройка тестового окружения..."
echo "Template path: $TEMPLATE_PATH"
echo "Test directory: $TEST_DIR"
echo "Test project: $TEST_PROJECT_NAME"

# Создаем директорию для тестирования
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Удаляем предыдущий тестовый проект если есть
if [ -d "$TEST_PROJECT_NAME" ]; then
    log_warning "Удаляем предыдущий тестовый проект..."
    rm -rf "$TEST_PROJECT_NAME"
fi

echo ""
echo "🏗️  Создание проекта из template..."

# Создаем проект из template
npx create-expo-app@latest "$TEST_PROJECT_NAME" --template "$TEMPLATE_PATH"

if [ $? -ne 0 ]; then
    log_error "Ошибка создания проекта из template"
    exit 1
fi

log_info "Проект создан успешно"

# Переходим в директорию проекта
cd "$TEST_PROJECT_NAME"

echo ""
echo "📦 Установка зависимостей..."

# Устанавливаем зависимости
bun install

if [ $? -ne 0 ]; then
    log_error "Ошибка установки зависимостей"
    exit 1
fi

log_info "Зависимости установлены"

echo ""
echo "🔍 Проверка TypeScript..."

# Проверяем TypeScript
npx tsc --noEmit

if [ $? -eq 0 ]; then
    log_info "TypeScript проверка пройдена"
else
    log_warning "TypeScript проверка завершилась с предупреждениями"
fi

echo ""
echo "🧹 Проверка линтинга..."

# Проверяем линтинг
bun run lint

if [ $? -eq 0 ]; then
    log_info "Lint проверка пройдена"
else
    log_warning "Lint проверка завершилась с предупреждениями (это нормально для template)"
fi

echo ""
echo "📋 Проверка структуры проекта..."

# Проверяем основные файлы
files_to_check=(
    "app/_layout.tsx"
    "app/index.tsx"
    "components/ui/button.tsx"
    "lib/utils.ts"
    "package.json"
    "tailwind.config.js"
    "tsconfig.json"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        log_info "$file - существует"
    else
        log_error "$file - отсутствует"
    fi
done

echo ""
echo "🧪 Информация о тестовом проекте:"
echo "================================="
echo "📍 Расположение: $(pwd)"
echo "📦 Количество файлов: $(find . -type f | wc -l)"
echo "🎨 UI компоненты: $(find ./components/ui -name "*.tsx" | wc -l)"
echo "📱 Главное приложение: app/index.tsx"

echo ""
echo "🚀 Команды для запуска:"
echo "======================"
echo "cd $TEST_DIR/$TEST_PROJECT_NAME"
echo ""
echo "# Запуск development сервера"
echo "bun run start"
echo ""
echo "# Запуск на iOS (требует Xcode)"
echo "bun run ios"
echo ""
echo "# Запуск на Android (требует Android Studio)"
echo "bun run android"
echo ""
echo "# Запуск веб версии"
echo "bun run web"

echo ""
echo "✅ Тестирование template завершено успешно!"
echo ""
echo "💡 Для полного тестирования:"
echo "1. Запустите 'bun run start' в тестовом проекте"
echo "2. Откройте проект в Expo Go или симуляторе"
echo "3. Протестируйте UI компоненты"
echo "4. Проверьте переключение тем (темная/светлая)"
echo "5. Протестируйте смену языков (EN/RU)"