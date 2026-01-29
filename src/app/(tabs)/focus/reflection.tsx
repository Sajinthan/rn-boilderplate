import { router } from 'expo-router';
import { AlertTriangle, Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { TimerDefaults } from '@/constants/theme';
import { useColors } from '@/hooks/useColors';
import { cn } from '@/lib/utils';
import { type IncompleteReason, type SessionOutcome, reasonLabels, useSessionStore } from '@/stores/session-store';
import { useTimerStore } from '@/stores/timer-store';

/**
 * Reflection/Accountability Screen
 * Displayed after a focus session ends.
 * User selects an outcome, optionally picks a reason for incomplete sessions,
 * and chooses to continue with the same task, start a new task, or end.
 * Session data is saved to history before navigating.
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

const reasonOptions: { value: IncompleteReason; label: string }[] = [
  { value: 'distracted', label: reasonLabels.distracted },
  { value: 'task_too_big', label: reasonLabels.task_too_big },
  { value: 'low_energy', label: reasonLabels.low_energy },
  { value: 'interrupted', label: reasonLabels.interrupted },
];

export default function ReflectionScreen() {
  const colors = useColors();

  // Timer store state and actions
  const currentTask = useTimerStore(state => state.currentTask);
  const isStrictMode = useTimerStore(state => state.isStrictMode);
  const sessionStartTime = useTimerStore(state => state.sessionStartTime);
  const continueWithSameTask = useTimerStore(state => state.continueWithSameTask);
  const startNewTask = useTimerStore(state => state.startNewTask);
  const reset = useTimerStore(state => state.reset);

  // Session store action
  const addSession = useSessionStore(state => state.addSession);

  const [selectedOutcome, setSelectedOutcome] = useState<SessionOutcome | null>(null);
  const [selectedReason, setSelectedReason] = useState<IncompleteReason | null>(null);

  const showReasons = selectedOutcome === 'partial' || selectedOutcome === 'not_completed';

  const handleOutcomeSelect = (outcome: SessionOutcome) => {
    setSelectedOutcome(outcome);
    // Clear reason when switching to completed
    if (outcome === 'completed') {
      setSelectedReason(null);
    }
  };

  const toggleReason = (reason: IncompleteReason) => {
    setSelectedReason(prev => (prev === reason ? null : reason));
  };

  /** Build and persist session to history */
  const saveSession = () => {
    if (!selectedOutcome || !currentTask) return;

    const now = new Date();
    addSession({
      taskName: currentTask.name,
      successCriteria: currentTask.successCriteria,
      startTime: sessionStartTime?.toISOString() ?? now.toISOString(),
      endTime: now.toISOString(),
      durationMinutes: TimerDefaults.focusDuration,
      outcome: selectedOutcome,
      reason: showReasons ? (selectedReason ?? undefined) : undefined,
      isStrictMode,
    });
  };

  const handleContinue = () => {
    saveSession();
    continueWithSameTask();
    router.replace('/(tabs)/focus/session');
  };

  const handleNewTask = () => {
    saveSession();
    startNewTask();
    router.replace('/(tabs)/focus');
  };

  const handleEnd = () => {
    saveSession();
    reset();
    router.replace('/(tabs)/focus');
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
      <ScrollView className="flex-1 px-6 py-12" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header section */}
        <View className="pt-8 mb-12">
          <Text className="text-title text-foreground mb-2">Session complete</Text>
          <Text className="text-heading text-muted-foreground" numberOfLines={2}>
            {currentTask?.name || 'Your task'}
          </Text>
        </View>

        {/* Question */}
        <Text className="text-body text-foreground mb-8">Did you achieve what you set out to do?</Text>

        {/* Outcome buttons */}
        <View className="gap-3 mb-8">
          {outcomeOptions.map(option => {
            const styles = getOutcomeButtonStyles(option.value);
            const { Icon } = option;

            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleOutcomeSelect(option.value)}
                activeOpacity={0.7}
                className={cn('flex-row items-center gap-4 p-4 rounded-xl border-2', styles.container)}
              >
                {/* Icon container */}
                <View className={cn('w-10 h-10 rounded-full items-center justify-center', styles.iconBg)}>
                  <Icon size={20} color={styles.iconColor} />
                </View>

                {/* Label */}
                <Text className="text-body font-medium text-foreground">{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Reason chips (shown for partial/not completed) */}
        {showReasons && (
          <View className="mb-8">
            <Text className="text-body text-muted-foreground mb-4">What got in the way? (optional)</Text>
            <View className="flex-row flex-wrap gap-2">
              {reasonOptions.map(({ value, label }) => {
                const isChipSelected = selectedReason === value;
                return (
                  <TouchableOpacity
                    key={value}
                    activeOpacity={0.7}
                    onPress={() => toggleReason(value)}
                    className={cn('px-4 py-2 rounded-lg', isChipSelected ? 'bg-primary' : 'bg-muted')}
                  >
                    <Text
                      className={cn(
                        'text-sm font-medium',
                        isChipSelected ? 'text-primary-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Actions */}
        <View className="pt-8">
          <Button title="Continue" onPress={handleContinue} disabled={!selectedOutcome} className="h-14" />

          <View className="flex-row gap-3 mt-3">
            <Button
              title="Start new task"
              onPress={handleNewTask}
              disabled={!selectedOutcome}
              variant="outline"
              className="h-14 flex-1"
            />
            <Button
              title="End session"
              onPress={handleEnd}
              disabled={!selectedOutcome}
              variant="outline"
              className="h-14 flex-1"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
