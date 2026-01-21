import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { cn } from '@/lib/utils';

export interface Route {
  key: string;
  title: string;
  icon?: React.ComponentType<any>;
}

interface Props {
  activeTabIndex: number;
  routes: Route[];
  onTabPress: (index: number) => void;
  variant?: 'default' | 'rounded';
  disabled?: boolean | boolean[];
  className?: string;
}

const Tab: React.FC<Props> = ({ activeTabIndex, routes, onTabPress, variant = 'default', disabled, className }) => {
  const tabWidth = 100 / routes.length;
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(activeTabIndex * tabWidth, { duration: 300 });
  }, [activeTabIndex, tabWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  const isTabDisabled = (index: number) => {
    if (typeof disabled === 'boolean') return disabled;
    if (Array.isArray(disabled)) return disabled[index];
    return false;
  };

  if (variant === 'rounded') {
    return (
      <View className={cn('flex flex-row gap-2 rounded-2xl bg-secondary p-1', className)}>
        {routes.map((route, index) => {
          const isActive = activeTabIndex === index;
          const isDisabled = isTabDisabled(index);

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => !isDisabled && onTabPress(index)}
              disabled={isDisabled}
              className={cn(
                'flex-1 items-center justify-center rounded-xl px-4 py-3',
                isActive && 'bg-primary shadow-lg shadow-primary/25',
                isDisabled && 'opacity-50',
              )}
            >
              {route.icon && <route.icon size={20} color={isActive ? 'white' : '#666'} style={{ marginBottom: 4 }} />}
              <Text
                className={cn(
                  'text-sm font-semibold',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground',
                )}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View className={cn('relative flex flex-row rounded-2xl bg-secondary p-1', className)}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            top: 4,
            bottom: 4,
            width: `${tabWidth}%`,
            backgroundColor: 'hsl(var(--primary))',
            borderRadius: 12,
          },
        ]}
      />
      {routes.map((route, index) => {
        const isActive = activeTabIndex === index;
        const isDisabled = isTabDisabled(index);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => !isDisabled && onTabPress(index)}
            disabled={isDisabled}
            className={cn('z-10 flex-1 items-center justify-center px-4 py-3', isDisabled && 'opacity-50')}
          >
            {route.icon && <route.icon size={20} color={isActive ? 'white' : '#666'} style={{ marginBottom: 4 }} />}
            <Text
              className={cn(
                'text-sm font-semibold',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground',
              )}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tab;
