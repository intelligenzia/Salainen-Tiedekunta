import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import { useLanguage } from '@/lib/stores/language';

const isWeb = Platform.OS === 'web';

export default function TabLayout() {
  const { t } = useLanguage();

  // On web, we use WebHeader instead of tabs - hide the tab bar
  if (isWeb) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="home" options={{ title: t('home') }} />
        <Tabs.Screen name="majors-tab" options={{ title: t('majors') }} />
        <Tabs.Screen name="courses-tab" options={{ title: t('courses') }} />
        <Tabs.Screen name="teachers-tab" options={{ title: t('teachers') }} />
        <Tabs.Screen name="settings-tab" options={{ href: null }} />
      </Tabs>
    );
  }

  // Native tabs for iOS and Android
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          drawable="ic_home"
        />
        <Label>{t('home')}</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="majors-tab">
        <Icon
          sf={{ default: 'graduationcap', selected: 'graduationcap.fill' }}
          drawable="ic_school"
        />
        <Label>{t('majors')}</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="courses-tab">
        <Icon
          sf={{ default: 'book', selected: 'book.fill' }}
          drawable="ic_menu_book"
        />
        <Label>{t('courses')}</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="teachers-tab">
        <Icon
          sf={{ default: 'person.2', selected: 'person.2.fill' }}
          drawable="ic_group"
        />
        <Label>{t('teachers')}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
