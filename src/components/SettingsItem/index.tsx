import React from 'react';
import { Switch, Text, View } from 'react-native';

import { useColors } from '@/hooks/use-colors';

/**
 * Props for the SettingsItem component
 */
export interface SettingsItemProps {
  /** The main label for the setting */
  label: string;
  /** A brief description of what the setting does */
  description: string;
  /** Current value of the toggle */
  value: boolean;
  /** Callback when the toggle value changes */
  onValueChange: (value: boolean) => void;
}

/**
 * SettingsItem Component
 * Displays a setting with label, description, and toggle switch
 * Used in the Settings screen for boolean preference toggles
 */
function SettingsItem({ label, description, value, onValueChange }: SettingsItemProps) {
  const colors = useColors();

  return (
    <View className="flex-row items-center justify-between border-b border-border py-5">
      <View className="flex-1 pr-4">
        <Text className="text-body font-medium text-foreground">{label}</Text>
        <Text className="mt-0.5 text-helper text-muted-foreground">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.muted, true: colors.primary }}
        thumbColor={colors.background}
        ios_backgroundColor={colors.muted}
      />
    </View>
  );
}

export default SettingsItem;
