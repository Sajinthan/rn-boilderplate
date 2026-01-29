import { useColorScheme } from './useColorScheme';

/**
 * Color values matching src/global.css CSS variables
 * This is the programmatic interface to the design system colors
 *
 * HSL values from global.css are converted to hsl() strings here
 * Keep in sync with global.css when updating colors
 */
const lightColors = {
  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(0, 0%, 4%)',
  muted: 'hsl(0, 0%, 96%)',
  mutedForeground: 'hsl(0, 0%, 45%)',
  primary: 'hsl(142, 71%, 45%)',
  primaryForeground: 'hsl(0, 0%, 100%)',
  secondary: 'hsl(0, 0%, 96%)',
  secondaryForeground: 'hsl(0, 0%, 20%)',
  border: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 90%)',
  ring: 'hsl(142, 71%, 45%)',
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 0%, 45%)',
  destructiveForeground: 'hsl(0, 0%, 100%)',
} as const;

const darkColors = {
  background: 'hsl(0, 0%, 4%)',
  foreground: 'hsl(0, 0%, 96%)',
  muted: 'hsl(0, 0%, 12%)',
  mutedForeground: 'hsl(0, 0%, 55%)',
  primary: 'hsl(142, 71%, 45%)',
  primaryForeground: 'hsl(0, 0%, 100%)',
  secondary: 'hsl(0, 0%, 12%)',
  secondaryForeground: 'hsl(0, 0%, 96%)',
  border: 'hsl(0, 0%, 16%)',
  input: 'hsl(0, 0%, 16%)',
  ring: 'hsl(142, 71%, 45%)',
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 0%, 55%)',
  destructiveForeground: 'hsl(0, 0%, 100%)',
} as const;

export type ThemeColors = typeof lightColors;

/**
 * Hook to access theme colors programmatically
 * Use this when you need actual color values (e.g., for icons, SVGs, native components)
 * For styling, prefer NativeWind classes (bg-primary, text-foreground, etc.)
 *
 * @example
 * const colors = useColors();
 * <Icon color={colors.primary} />
 */
export function useColors(): ThemeColors {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
}

/**
 * Get colors for a specific theme without using the hook
 * Useful for non-component contexts
 */
export function getColors(theme: 'light' | 'dark'): ThemeColors {
  return theme === 'dark' ? darkColors : lightColors;
}
