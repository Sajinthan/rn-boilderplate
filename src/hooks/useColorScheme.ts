import { useColorScheme as useSystemColorScheme } from 'react-native';

/**
 * Color scheme hook that follows system theme.
 * Returns the device's current color scheme preference.
 */
export function useColorScheme(): 'light' | 'dark' {
  const systemColorScheme = useSystemColorScheme();
  return systemColorScheme ?? 'light';
}
