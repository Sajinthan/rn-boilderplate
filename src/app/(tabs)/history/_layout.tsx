import { Stack } from 'expo-router';

/**
 * History tab stack layout
 * Contains: index (history list) screen
 */
export default function HistoryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
