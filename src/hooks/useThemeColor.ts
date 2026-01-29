/**
 * Hook for accessing individual theme colors
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeColors, useColors } from './useColors';

export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof ThemeColors) {
  const colors = useColors();
  const colorFromProps = props.light || props.dark;

  if (colorFromProps) {
    return colorFromProps;
  }

  return colors[colorName];
}
