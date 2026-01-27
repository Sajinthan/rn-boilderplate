import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * History Tab - Session History Screen
 * Placeholder for Task 12 implementation
 */
export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-title font-medium text-foreground">History</Text>
        <Text className="mt-2 text-center text-body text-muted-foreground">Your focus sessions will appear here</Text>
      </View>
    </SafeAreaView>
  );
}
