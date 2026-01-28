/**
 * Focus Flow Design System
 * Theme constants following the design spec
 *
 * COLORS: Defined in src/global.css as CSS variables (single source of truth)
 * Use the useColors() hook from @/hooks/use-colors for programmatic color access
 */

import { Platform } from 'react-native';

// ============================================
// SHADOWS
// ============================================

/**
 * Shadow definitions for React Native
 * NativeWind doesn't fully support RN shadow syntax, so we need inline styles
 *
 * Usage:
 * import { SHADOWS } from '@/constants/theme';
 * <View style={SHADOWS.calm}>...</View>
 */
export const SHADOWS = {
  calm: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  calmLg: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  calmXl: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 48,
    elevation: 8,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const;

// ============================================
// LAYOUT CONSTANTS
// ============================================

/**
 * Layout values needed for programmatic calculations.
 * For styling, prefer Tailwind/NativeWind classes (e.g., className="h-20 px-6").
 * These are for: SVG calculations, animations, platform-specific logic.
 */
export const Layout = {
  /** Bottom navigation height - for safe area calculations */
  navHeight: 80,
  /** Content container max width - for centering logic */
  maxWidth: 480,
  /** Progress ring size - for SVG calculations */
  progressRingSize: 280,
  /** Progress ring stroke width - for SVG calculations */
  progressRingStroke: 4,
} as const;

// ============================================
// TIMER DEFAULTS
// ============================================

export const TimerDefaults = {
  /** Focus duration in minutes */
  focusDuration: 25,
  /** Short break duration in minutes */
  shortBreakDuration: 5,
  /** Long break duration in minutes */
  longBreakDuration: 15,
  /** Sessions before long break */
  sessionsBeforeLongBreak: 4,
} as const;

// ============================================
// FONTS
// ============================================

export const Fonts = Platform.select({
  ios: {
    sans: 'Inter',
    sansFallback: 'system-ui',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'Inter',
    sansFallback: 'normal',
    mono: 'monospace',
  },
  default: {
    sans: 'Inter',
    sansFallback: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
});
