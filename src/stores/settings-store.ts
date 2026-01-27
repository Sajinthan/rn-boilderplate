import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { TimerDefaults } from '@/src/constants/theme';

// ============================================
// TYPES
// ============================================

export type DarkModeOption = 'system' | 'light' | 'dark';

export type FocusDuration = 15 | 20 | 25 | 30 | 45 | 60;
export type ShortBreakDuration = 5 | 10 | 15;
export type LongBreakDuration = 15 | 20 | 30;

export interface DurationSettings {
  focusDuration: FocusDuration;
  shortBreakDuration: ShortBreakDuration;
  longBreakDuration: LongBreakDuration;
  sessionsBeforeLongBreak: number;
}

export interface SettingsState {
  // Preferences
  defaultStrictMode: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: DarkModeOption;

  // Timer durations
  durations: DurationSettings;
}

export interface SettingsActions {
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  updateDuration: <K extends keyof DurationSettings>(key: K, value: DurationSettings[K]) => void;
  resetToDefaults: () => void;
  clearAllData: () => void;
}

export type SettingsStore = SettingsState & SettingsActions;

// ============================================
// DEFAULT VALUES
// ============================================

const defaultSettings: SettingsState = {
  defaultStrictMode: false,
  soundEnabled: true,
  vibrationEnabled: true,
  darkMode: 'system',
  durations: {
    focusDuration: TimerDefaults.focusDuration as FocusDuration,
    shortBreakDuration: TimerDefaults.shortBreakDuration as ShortBreakDuration,
    longBreakDuration: TimerDefaults.longBreakDuration as LongBreakDuration,
    sessionsBeforeLongBreak: TimerDefaults.sessionsBeforeLongBreak,
  },
};

// ============================================
// STORE
// ============================================

export const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      ...defaultSettings,

      updateSetting: (key, value) =>
        set(state => ({
          ...state,
          [key]: value,
        })),

      updateDuration: (key, value) =>
        set(state => ({
          ...state,
          durations: {
            ...state.durations,
            [key]: value,
          },
        })),

      resetToDefaults: () =>
        set(() => ({
          ...defaultSettings,
        })),

      clearAllData: () => {
        AsyncStorage.removeItem('settings-storage');
        set(() => ({
          ...defaultSettings,
        }));
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
