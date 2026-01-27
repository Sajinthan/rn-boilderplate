import { Stack } from 'expo-router';

/**
 * Focus tab stack layout
 * Contains: index (commitment), session, break, reflection screens
 */
export default function FocusLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="session" />
      <Stack.Screen name="break" />
      <Stack.Screen name="reflection" />
    </Stack>
  );
}
