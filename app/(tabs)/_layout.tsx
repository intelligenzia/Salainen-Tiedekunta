import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/native-tabs';
import { Platform } from 'react-native';
import { useLanguage } from '@/lib/stores/language';
import { useColors } from '@/lib/stores/theme';

const isWeb = Platform.OS === 'web';

// Material icon bitmaps for Android; the tab bar tints them
const tabIcons = {
  home: require('@/assets/tabs/home.png'),
  school: require('@/assets/tabs/school.png'),
  book: require('@/assets/tabs/book.png'),
  group: require('@/assets/tabs/group.png'),
};
const androidIcon = (name: keyof typeof tabIcons) =>
  Platform.OS === 'android' ? { src: tabIcons[name] } : {};

export default function TabLayout() {
  const { t } = useLanguage();
  const colors = useColors();

  // On web, we use WebHeader instead of tabs - hide the tab bar
  if (isWeb) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="(home)" options={{ title: t('home') }} />
        <Tabs.Screen name="majors-tab" options={{ title: t('majors') }} />
        <Tabs.Screen name="courses-tab" options={{ title: t('courses') }} />
        <Tabs.Screen name="teachers-tab" options={{ title: t('teachers') }} />
        <Tabs.Screen name="settings-tab" options={{ href: null }} />
      </Tabs>
    );
  }

  // Native tabs for iOS and Android
  return (
    <NativeTabs
      tintColor={colors.accent}
      backgroundColor={colors.surface}
      iconColor={{ default: colors.muted, selected: colors.accent }}
      labelStyle={{ default: { color: colors.muted }, selected: { color: colors.accent } }}
      indicatorColor={colors.sunken}
      labelVisibilityMode="labeled"
    >
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          {...androidIcon('home')}
        />
        <NativeTabs.Trigger.Label>{t('home')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="majors-tab">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'graduationcap', selected: 'graduationcap.fill' }}
          {...androidIcon('school')}
        />
        <NativeTabs.Trigger.Label>{t('majors')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="courses-tab">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'book', selected: 'book.fill' }}
          {...androidIcon('book')}
        />
        <NativeTabs.Trigger.Label>{t('courses')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="teachers-tab">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.2', selected: 'person.2.fill' }}
          {...androidIcon('group')}
        />
        <NativeTabs.Trigger.Label>{t('teachers')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
