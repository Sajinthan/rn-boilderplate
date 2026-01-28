import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ============================================
// TYPES
// ============================================

export interface SettingsState {
  // Preferences
  defaultStrictMode: boolean;
  soundAndVibrationEnabled: boolean; // Combined toggle per UX design
  darkModeEnabled: boolean; // Simple toggle per UX design
}

export interface SettingsActions {
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  resetToDefaults: () => void;
}

export type SettingsStore = SettingsState & SettingsActions;

// ============================================
// DEFAULT VALUES
// ============================================

const defaultSettings: SettingsState = {
  defaultStrictMode: false,
  soundAndVibrationEnabled: true,
  darkModeEnabled: false,
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

      resetToDefaults: () =>
        set(() => ({
          ...defaultSettings,
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
