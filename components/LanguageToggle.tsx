import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Text } from '~/components/ui/text';

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  function toggleLanguage() {
    const newLanguage = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLanguage);
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
