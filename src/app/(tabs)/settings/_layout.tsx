import { Stack } from 'expo-router';

/**
 * Settings tab stack layout
 * Contains: index (settings) screen
 */
export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
