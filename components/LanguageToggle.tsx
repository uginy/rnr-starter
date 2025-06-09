import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useAppStore } from '~/lib/stores/app-store';

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useAppStore();

  function toggleLanguage() {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
  }

  return (
    <Pressable
      onPress={toggleLanguage}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70"
      accessibilityLabel={t('language.toggle')}
    >
      <View className="flex-1 aspect-square pt-0.5 justify-center items-center web:px-5">
        <Text className="text-foreground font-semibold text-sm">{t('language.current')}</Text>
      </View>
    </Pressable>
  );
}
