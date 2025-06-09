import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { MoonStar } from '~/lib/icons/MoonStar';
import { Sun } from '~/lib/icons/Sun';
import { useColorScheme } from '~/lib/useColorScheme';

export function ThemeToggle() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="bg-web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70"
      accessibilityLabel={t('theme.toggle')}
    >
      <View className="aspect-square pt-0.5 justify-center items-start web:px-5">
        {isDarkColorScheme ? (
          <MoonStar className="text-foreground" size={23} strokeWidth={1.25} />
        ) : (
          <Sun className="text-foreground" size={24} strokeWidth={1.25} />
        )}
      </View>
    </Pressable>
  );
}
