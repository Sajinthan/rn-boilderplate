import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MODAL_ANIMATION_DURATION } from '@/constants/common';
import { cn } from '@/lib/utils';

import Button from '../Button';

export interface ScheduleTimePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (hour: number, minute: number) => void;
}

type Period = 'AM' | 'PM';

/**
 * Gets a sensible default time: the next upcoming hour (rounded up)
 */
const getDefaultTime = (): { hour: number; minute: number; period: Period } => {
  const now = new Date();
  let nextHour = now.getHours() + 1;
  if (nextHour >= 24) nextHour = 0;

  const period: Period = nextHour >= 12 ? 'PM' : 'AM';
  const displayHour = nextHour % 12 === 0 ? 12 : nextHour % 12;

  return { hour: displayHour, minute: 0, period };
};

/**
 * Converts 12-hour format to 24-hour format
 */
const to24Hour = (hour: number, period: Period): number => {
  if (period === 'AM') {
    return hour === 12 ? 0 : hour;
  }
  return hour === 12 ? 12 : hour + 12;
};

/**
 * Formats the selected time for display in the summary text
 */
const formatTimeDisplay = (hour: number, minute: number, period: Period): string => {
  const paddedMinute = minute.toString().padStart(2, '0');
  return `${hour}:${paddedMinute} ${period}`;
};

const ScheduleTimePicker: React.FC<ScheduleTimePickerProps> = ({ isVisible, onClose, onConfirm }) => {
  const defaults = getDefaultTime();
  const [selectedHour, setSelectedHour] = useState(defaults.hour);
  const [selectedMinute, setSelectedMinute] = useState(defaults.minute);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaults.period);
  const [modalVisible, setModalVisible] = useState(isVisible);

  // Sync modal visibility with prop
  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      // Reset to default time when modal opens
      const newDefaults = getDefaultTime();
      setSelectedHour(newDefaults.hour);
      setSelectedMinute(newDefaults.minute);
      setSelectedPeriod(newDefaults.period);
    }
  }, [isVisible]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => onClose(), MODAL_ANIMATION_DURATION);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    setTimeout(() => {
      const hour24 = to24Hour(selectedHour, selectedPeriod);
      onConfirm(hour24, selectedMinute);
    }, MODAL_ANIMATION_DURATION);
  };

  const cycleHour = (direction: 'up' | 'down') => {
    setSelectedHour(prev => {
      if (direction === 'up') return prev === 12 ? 1 : prev + 1;
      return prev === 1 ? 12 : prev - 1;
    });
  };

  const cycleMinute = (direction: 'up' | 'down') => {
    setSelectedMinute(prev => {
      if (direction === 'up') return prev === 59 ? 0 : prev + 1;
      return prev === 0 ? 59 : prev - 1;
    });
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <SafeAreaView className="rounded-t-2xl bg-background px-6 pb-6" edges={['bottom']}>
        {/* Header */}
        <View className="pb-4 pt-6">
          <Text className="text-heading font-semibold text-foreground">Schedule start</Text>
        </View>

        {/* Time Picker */}
        <View className="py-6">
          <View className="mb-8 flex-row items-center justify-center gap-4">
            {/* Hour selector */}
            <TouchableOpacity
              onPress={() => cycleHour('up')}
              onLongPress={() => cycleHour('down')}
              activeOpacity={0.7}
              className="h-16 w-20 items-center justify-center rounded-xl bg-muted"
            >
              <Text className="text-3xl font-medium text-foreground">{selectedHour}</Text>
            </TouchableOpacity>

            {/* Colon separator */}
            <Text className="text-3xl font-medium text-muted-foreground">:</Text>

            {/* Minute selector */}
            <TouchableOpacity
              onPress={() => cycleMinute('up')}
              onLongPress={() => cycleMinute('down')}
              activeOpacity={0.7}
              className="h-16 w-20 items-center justify-center rounded-xl bg-muted"
            >
              <Text className="text-3xl font-medium text-foreground">{selectedMinute.toString().padStart(2, '0')}</Text>
            </TouchableOpacity>

            {/* AM/PM toggle */}
            <View className="flex-col gap-1">
              <TouchableOpacity
                onPress={() => setSelectedPeriod('AM')}
                activeOpacity={0.7}
                className={cn(
                  'items-center justify-center rounded-lg px-4 py-2',
                  selectedPeriod === 'AM' ? 'bg-foreground' : 'bg-muted',
                )}
              >
                <Text
                  className={cn(
                    'text-sm font-medium',
                    selectedPeriod === 'AM' ? 'text-background' : 'text-muted-foreground',
                  )}
                >
                  AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPeriod('PM')}
                activeOpacity={0.7}
                className={cn(
                  'items-center justify-center rounded-lg px-4 py-2',
                  selectedPeriod === 'PM' ? 'bg-foreground' : 'bg-muted',
                )}
              >
                <Text
                  className={cn(
                    'text-sm font-medium',
                    selectedPeriod === 'PM' ? 'text-background' : 'text-muted-foreground',
                  )}
                >
                  PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary text */}
          <Text className="mb-8 text-center text-body text-muted-foreground">
            Session will start at{' '}
            <Text className="font-medium text-foreground">
              {formatTimeDisplay(selectedHour, selectedMinute, selectedPeriod)}
            </Text>
          </Text>

          {/* Actions */}
          <View className="space-y-3">
            <Button title="Confirm schedule" onPress={handleConfirm} className="h-14" />
            <View className="h-3" />
            <TouchableOpacity onPress={handleClose} className="items-center py-3">
              <Text className="text-helper text-muted-foreground">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ScheduleTimePicker;
