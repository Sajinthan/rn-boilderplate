import { Tabs } from 'expo-router';
import { Clock, History, Settings } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors, Layout } from '@/src/constants/theme';

/**
 * Tab bar icon component
 */
interface TabIconProps {
  Icon: React.ComponentType<{ color: string; size: number }>;
  color: string;
  size: number;
}

function TabIcon({ Icon, color, size }: TabIconProps) {
  return <Icon color={color} size={size} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const colors = isDark ? Colors.dark : Colors.light;

  // Tab bar height: 80px + safe area bottom
  const tabBarHeight = Layout.navHeight + (Platform.OS === 'ios' ? 0 : insets.bottom);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: {
          height: tabBarHeight,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color, size }) => <TabIcon Icon={Clock} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <TabIcon Icon={History} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <TabIcon Icon={Settings} color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
