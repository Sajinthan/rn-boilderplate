import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Settings Tab - App Settings Screen
 * Placeholder for Task 13 implementation
 */
export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-title font-medium text-foreground">Settings</Text>
        <Text className="mt-2 text-center text-body text-muted-foreground">Customize your focus experience</Text>
      </View>
    </SafeAreaView>
  );
}
