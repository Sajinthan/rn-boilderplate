import { AlertTriangle, Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';
import { SessionOutcome } from '@/stores/session-store';
import { useTimerStore } from '@/stores/timer-store';

/**
 * Reflection Screen
 * Displayed after a focus session ends.
 * Allows user to reflect on session outcome.
 */

interface OutcomeOption {
  value: SessionOutcome;
  label: string;
  Icon: React.ComponentType<{ size: number; color: string }>;
}

const outcomeOptions: OutcomeOption[] = [
  { value: 'completed', label: 'Completed', Icon: Check },
  { value: 'partial', label: 'Partially completed', Icon: AlertTriangle },
  { value: 'not_completed', label: 'Not completed', Icon: X },
];

export default function ReflectionScreen() {
  const colors = useColors();
  const currentTask = useTimerStore(state => state.currentTask);

  const [selectedOutcome, setSelectedOutcome] = useState<SessionOutcome | null>(null);

  const handleOutcomeSelect = (outcome: SessionOutcome) => {
    setSelectedOutcome(outcome);
  };

  const getOutcomeButtonStyles = (outcome: SessionOutcome) => {
    const isSelected = selectedOutcome === outcome;

    if (!isSelected) {
      return {
        container: 'border-border',
        iconBg: 'bg-muted',
        iconColor: colors.mutedForeground,
      };
    }

    // Selected styles differ based on outcome type
    if (outcome === 'completed') {
      return {
        container: 'border-primary bg-primary/5',
        iconBg: 'bg-primary',
        iconColor: colors.primaryForeground,
      };
    }

    // Partial and not_completed use foreground color when selected
    return {
      container: 'border-foreground bg-foreground/5',
      iconBg: 'bg-foreground',
      iconColor: colors.background,
    };
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Header section */}
      <View className="pt-8 px-6 mb-12">
        <Text className="text-helper text-muted-foreground mb-2">Session complete</Text>
        <Text className="text-title text-foreground" numberOfLines={2}>
          {currentTask?.name || 'Your task'}
        </Text>
      </View>

      {/* Question and outcome selection */}
      <View className="px-6">
        <Text className="text-heading text-foreground mb-8">Did you achieve what you set out to do?</Text>

        {/* Outcome buttons */}
        <View className="space-y-3">
          {outcomeOptions.map(option => {
            const styles = getOutcomeButtonStyles(option.value);
            const { Icon } = option;

            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleOutcomeSelect(option.value)}
                activeOpacity={0.7}
                className={cn('flex-row items-center p-4 rounded-xl border-2', styles.container)}
              >
                {/* Icon container */}
                <View className={cn('w-10 h-10 rounded-full items-center justify-center', styles.iconBg)}>
                  <Icon size={20} color={styles.iconColor} />
                </View>

                {/* Label */}
                <Text className="text-body font-medium text-foreground ml-4">{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
