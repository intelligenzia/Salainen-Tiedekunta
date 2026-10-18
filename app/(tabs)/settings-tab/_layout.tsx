import { useStackOptions } from '@/lib/navigation';
import { useLanguage } from '@/lib/stores/language';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  const { t } = useLanguage();
  const screenOptions = useStackOptions(true);

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: t('settings') }} />
    </Stack>
  );
}
