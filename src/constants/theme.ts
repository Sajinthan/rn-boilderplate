/**
 * Focus Flow Design System
 * Theme colors, shadows, and constants following the design spec
 */

import { Platform } from 'react-native';

// ============================================
// COLOR PALETTE
// ============================================

/**
 * Primary green accent color in HSL
 * hsl(142, 71%, 45%) = #22C55E
 */
export const PRIMARY_GREEN = '#22C55E';

/**
 * Color tokens for light and dark modes
 * Usage: Use CSS variables via NativeWind classes (bg-background, text-foreground, etc.)
 * These constants are for reference and programmatic access
 */
export const Colors = {
  light: {
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#F5F5F5',
    mutedForeground: '#737373',
    primary: PRIMARY_GREEN,
    primaryForeground: '#FFFFFF',
    secondary: '#F5F5F5',
    secondaryForeground: '#0A0A0A',
    border: '#E5E5E5',
    input: '#E5E5E5',
    ring: PRIMARY_GREEN,
    // Semantic
    success: PRIMARY_GREEN,
    warning: '#F59E0B',
    destructive: '#737373', // Muted, not red - calm design
    // Tab bar
    tabIconDefault: '#737373',
    tabIconSelected: PRIMARY_GREEN,
  },
  dark: {
    background: '#0A0A0A',
    foreground: '#F5F5F5',
    muted: '#1F1F1F',
    mutedForeground: '#8C8C8C',
    primary: PRIMARY_GREEN,
    primaryForeground: '#FFFFFF',
    secondary: '#1F1F1F',
    secondaryForeground: '#F5F5F5',
    border: '#282828',
    input: '#282828',
    ring: PRIMARY_GREEN,
    // Semantic
    success: PRIMARY_GREEN,
    warning: '#F59E0B',
    destructive: '#8C8C8C', // Muted, not red - calm design
    // Tab bar
    tabIconDefault: '#8C8C8C',
    tabIconSelected: PRIMARY_GREEN,
  },
} as const;

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

export const Layout = {
  /** Bottom navigation height */
  navHeight: 80,
  /** Content container max width */
  maxWidth: 480,
  /** Horizontal screen padding */
  screenPadding: 16,
  /** Border radius default */
  radius: 12,
  radiusMd: 10,
  radiusSm: 8,
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
