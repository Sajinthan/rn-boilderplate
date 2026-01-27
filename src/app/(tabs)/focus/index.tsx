import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Focus Tab - Task Commitment Screen
 * Placeholder for Task 6 implementation
 */
export default function FocusScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-title font-medium text-foreground">Focus</Text>
        <Text className="mt-2 text-center text-body text-muted-foreground">What will you focus on?</Text>
      </View>
    </SafeAreaView>
  );
}
