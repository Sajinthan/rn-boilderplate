import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useTimerStore } from '@/stores/timer-store';

/**
 * Hook that listens to AppState changes and recalculates the timer
 * when the app returns to the foreground from background.
 *
 * This ensures the timer remains accurate after the app is backgrounded,
 * by comparing the current time against the stored absolute end time.
 *
 * Use this hook in screens that display an active timer (session, break).
 */
export const useAppStateTimer = () => {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const recalculateFromBackground = useTimerStore(state => state.recalculateFromBackground);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      // App came back to foreground from background or inactive
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        recalculateFromBackground();
      }

      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [recalculateFromBackground]);
};
