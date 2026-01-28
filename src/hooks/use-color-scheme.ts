import { useSettingsStore } from '@/stores/settings-store';

/**
 * Custom color scheme hook that uses the manual dark mode toggle from settings.
 * Per REQUIREMENTS.md: "System theme detection (manual dark mode toggle only)"
 */
export function useColorScheme(): 'light' | 'dark' {
  const darkModeEnabled = useSettingsStore(state => state.darkModeEnabled);
  return darkModeEnabled ? 'dark' : 'light';
}
