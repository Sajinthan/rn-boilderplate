import { useRouter } from 'expo-router';
import { Clock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import ModeSelectionModal from '@/components/ModeSelectionModal';
import ScheduleTimePicker from '@/components/ScheduleTimePicker';
import { useColors } from '@/hooks/useColors';
import { useTimerStore } from '@/stores/timer-store';

/**
 * Focus Tab - Task Commitment Screen
 * Initial state where user enters what they'll work on
 */
export default function FocusScreen() {
  const [task, setTask] = useState('');
  const [successCriteria, setSuccessCriteria] = useState('');
  const [showModeModal, setShowModeModal] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const colors = useColors();
  const router = useRouter();
  const { commitToTask, startSession } = useTimerStore();

  const handleStartNow = () => {
    if (task.trim()) {
      setShowModeModal(true);
    }
  };

  const handleModeConfirm = (isStrictMode: boolean) => {
    setShowModeModal(false);
    commitToTask({ name: task.trim(), successCriteria: successCriteria.trim() || undefined }, isStrictMode);
    startSession();
    router.push('/(tabs)/focus/session');
  };

  const handleScheduleStart = () => {
    if (task.trim()) {
      setShowSchedulePicker(true);
    }
  };

  const handleScheduleConfirm = (hour: number, minute: number) => {
    setShowSchedulePicker(false);
    // TODO: Schedule the session to start at the selected time
    console.log(`Scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ModeSelectionModal
        isVisible={showModeModal}
        onClose={() => setShowModeModal(false)}
        onConfirm={handleModeConfirm}
      />
      <ScheduleTimePicker
        isVisible={showSchedulePicker}
        onClose={() => setShowSchedulePicker(false)}
        onConfirm={handleScheduleConfirm}
      />
      <View className="flex-1 justify-center px-6">
        <View className="w-full max-w-sm self-center">
          {/* Main heading */}
          <Text className="text-title text-foreground mb-8">What are you working on?</Text>

          {/* Task input */}
          <View className="flex flex-col gap-4 mb-6">
            <TextInput
              placeholder="Enter your task"
              value={task}
              onChangeText={setTask}
              maxLength={100}
              placeholderTextColor={colors.mutedForeground}
              className="h-14 px-4 text-body bg-muted text-foreground rounded-xl"
            />

            {/* Optional success criteria */}
            <TextInput
              placeholder="What does success look like? (optional)"
              value={successCriteria}
              onChangeText={setSuccessCriteria}
              placeholderTextColor={colors.mutedForeground}
              className="h-14 px-4 text-body bg-muted text-foreground rounded-xl"
            />
          </View>

          {/* Helper text */}
          <Text className="text-helper text-muted-foreground mb-8">One task. One session.</Text>

          {/* Actions */}
          <View className="flex flex-col gap-3">
            <Button title="Start now" onPress={handleStartNow} disabled={!task.trim()} className="h-14" />

            <TouchableOpacity onPress={handleScheduleStart} className="flex-row items-center justify-center gap-2 py-3">
              <Clock size={16} color={colors.mutedForeground} />
              <Text className="text-helper text-muted-foreground">Schedule start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
