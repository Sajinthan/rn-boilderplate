import * as Haptics from 'expo-haptics';

import { useSettingsStore } from '@/stores/settings-store';

// ============================================
// HELPERS
// ============================================

const isFeedbackEnabled = (): boolean => {
  return useSettingsStore.getState().soundAndVibrationEnabled;
};

// ============================================
// PUBLIC API
// ============================================

/**
 * Play feedback for focus session start.
 * Heavy haptic impact.
 */
export const playSessionStartFeedback = async (): Promise<void> => {
  if (!isFeedbackEnabled()) return;

  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

/**
 * Play feedback for focus session end (timer completed).
 * Success notification haptic.
 */
export const playSessionEndFeedback = async (): Promise<void> => {
  if (!isFeedbackEnabled()) return;

  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

/**
 * Play feedback for break start.
 * Medium haptic impact.
 */
export const playBreakStartFeedback = async (): Promise<void> => {
  if (!isFeedbackEnabled()) return;

  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

/**
 * Play feedback for break end (break timer completed).
 * Light haptic impact.
 */
export const playBreakEndFeedback = async (): Promise<void> => {
  if (!isFeedbackEnabled()) return;

  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
