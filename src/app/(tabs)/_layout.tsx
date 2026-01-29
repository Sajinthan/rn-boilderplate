import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Clock, History, Settings } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Layout } from '@/constants/theme';
import { useColors } from '@/hooks/useColors';

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  // Tab bar height: 80px + safe area bottom
  const tabBarHeight = Layout.navHeight + (Platform.OS === 'ios' ? 0 : insets.bottom);

  const defaultTabBarStyle = {
    height: tabBarHeight,
    paddingTop: 8,
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.foreground,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: defaultTabBarStyle,
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="focus"
        options={({ route }) => {
          const focusedRoute = getFocusedRouteNameFromRoute(route);
          const hideTabBar = focusedRoute === 'session' || focusedRoute === 'break';
          return {
            title: 'Focus',
            tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
            tabBarStyle: hideTabBar ? { display: 'none' as const } : defaultTabBarStyle,
          };
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
