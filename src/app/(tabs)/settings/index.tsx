import Constants from 'expo-constants';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingsItem from '@/components/SettingsItem';
import { useSettingsStore } from '@/stores/settings-store';

/**
 * Settings Tab - App Settings Screen
 * Allows users to customize their focus experience
 */
export default function SettingsScreen() {
  const { defaultStrictMode, soundAndVibrationEnabled, darkModeEnabled, updateSetting } = useSettingsStore();

  // Get app version from expo-constants
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="min-h-full px-6 py-12">
        {/* Header */}
        <View className="mb-8 pt-4">
          <Text className="text-title font-medium text-foreground">Settings</Text>
        </View>

        {/* Settings List */}
        <View className="space-y-1">
          <SettingsItem
            label="Default to strict mode"
            description="Prevent early session exit"
            value={defaultStrictMode}
            onValueChange={value => updateSetting('defaultStrictMode', value)}
          />

          <SettingsItem
            label="Sound & vibration"
            description="Session start and end alerts"
            value={soundAndVibrationEnabled}
            onValueChange={value => updateSetting('soundAndVibrationEnabled', value)}
          />

          <SettingsItem
            label="Dark mode"
            description="Easier on the eyes"
            value={darkModeEnabled}
            onValueChange={value => updateSetting('darkModeEnabled', value)}
          />
        </View>

        {/* About Section - pushed to bottom */}
        <View className="mt-auto pb-8 pt-12">
          {/* About Card */}
          <View className="rounded-xl bg-muted p-5">
            <Text className="text-helper leading-relaxed text-muted-foreground">
              No account required. All data stays on your device.
            </Text>
          </View>

          {/* Version */}
          <Text className="mt-6 text-center text-helper text-muted-foreground">Version {appVersion}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
