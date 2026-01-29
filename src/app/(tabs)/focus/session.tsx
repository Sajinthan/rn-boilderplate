import { useFocusEffect } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProgressRing from '@/components/ProgressRing';
import { TimerDefaults } from '@/constants/theme';
import { useAppStateTimer } from '@/hooks/useAppStateTimer';
import { useTimerStore } from '@/stores/timer-store';

/**
 * Focus Session Screen
 * Displays active timer with progress ring and task name.
 * Bottom navigation is hidden during focus session.
 */
export default function SessionScreen() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigation = useNavigation();

  // Recalculate timer when app returns from background
  useAppStateTimer();

  const status = useTimerStore(state => state.status);
  const currentTask = useTimerStore(state => state.currentTask);
  const isStrictMode = useTimerStore(state => state.isStrictMode);
  const timeRemaining = useTimerStore(state => state.timeRemaining);
  const sessionType = useTimerStore(state => state.sessionType);
  const tick = useTimerStore(state => state.tick);
  const endSession = useTimerStore(state => state.endSession);
  const startSession = useTimerStore(state => state.startSession);

  // Compute progress and formatted time locally (Zustand getters don't work properly)
  const totalDuration = useMemo(() => {
    switch (sessionType) {
      case 'focus':
        return TimerDefaults.focusDuration * 60;
      case 'shortBreak':
        return TimerDefaults.shortBreakDuration * 60;
      case 'longBreak':
        return TimerDefaults.longBreakDuration * 60;
    }
  }, [sessionType]);

  const progress = 1 - timeRemaining / totalDuration;

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  // Hide tab bar when this screen is focused
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: { display: 'none' },
      });

      return () => {
        parent?.setOptions({
          tabBarStyle: undefined,
        });
      };
    }, [navigation]),
  );

  // Ensure session is started when screen mounts
  useEffect(() => {
    if (status === 'committed') {
      startSession();
    }
  }, [status, startSession]);

  // Start timer interval when session is running
  useEffect(() => {
    if (status === 'running') {
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

  // Navigate to reflection when session completes
  useEffect(() => {
    if (status === 'reflection') {
      // Using href object for type-safe navigation
      // Note: reflection screen will be created in Task 12
      router.replace({ pathname: '/(tabs)/focus/reflection' } as any);
    }
  }, [status]);

  // Handle end session (only available in flexible mode)
  const handleEndSession = () => {
    if (!isStrictMode) {
      endSession();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Top section with label and task name */}
      <View className="px-6 pt-16 pb-8 items-center">
        <Text className="text-helper text-muted-foreground uppercase tracking-widest">Focusing on</Text>
        <Text className="text-heading text-foreground mt-2 text-center" numberOfLines={2}>
          {currentTask?.name || 'Your task'}
        </Text>
      </View>

      {/* Timer section with progress ring */}
      <View className="flex-1 px-6 items-center justify-center">
        <ProgressRing progress={progress}>
          <Text className="timer-display text-foreground">{formattedTime}</Text>
        </ProgressRing>
      </View>

      {/* Bottom section with end session link */}
      <View className="px-6 pb-32 items-center">
        {!isStrictMode && (
          <TouchableOpacity onPress={handleEndSession} className="py-4">
            <Text className="text-helper text-muted-foreground">End session</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
