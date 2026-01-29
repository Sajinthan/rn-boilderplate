import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStateTimer } from '@/hooks/useAppStateTimer';
import { useTimerStore } from '@/stores/timer-store';

/**
 * Break Screen
 * Displays break timer with calming message.
 * Uses muted background. Bottom navigation is hidden.
 */
export default function BreakScreen() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Recalculate timer when app returns from background
  useAppStateTimer();

  const status = useTimerStore(state => state.status);
  const formattedTime = useTimerStore(state => state.formattedTime);
  const tick = useTimerStore(state => state.tick);
  const skipBreak = useTimerStore(state => state.skipBreak);

  // Start timer interval when break is running
  useEffect(() => {
    if (status === 'break') {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, tick]);

  // Navigate back to focus screen when break ends
  useEffect(() => {
    if (status === 'idle') {
      router.replace('/(tabs)/focus');
    }
  }, [status]);

  // Handle skip break
  const handleSkipBreak = () => {
    skipBreak();
    router.replace('/(tabs)/focus');
  };

  return (
    <SafeAreaView className="flex-1 bg-muted" edges={['top', 'bottom']}>
      {/* Top section with header */}
      <View className="px-6 pt-20 items-center">
        <Text className="text-helper text-muted-foreground uppercase tracking-widest">Break</Text>
      </View>

      {/* Timer section */}
      <View className="flex-1 px-6 items-center justify-center">
        <Text className="timer-display text-foreground mb-8">{formattedTime}</Text>
        <Text className="text-body text-muted-foreground text-center">Step away. Rest your mind.</Text>
      </View>

      {/* Bottom section with skip option */}
      <View className="h-32 px-6 items-center justify-start">
        <TouchableOpacity onPress={handleSkipBreak} className="py-4">
          <Text className="text-helper text-muted-foreground">Skip break</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
