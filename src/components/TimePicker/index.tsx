import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MODAL_ANIMATION_DURATION } from '@/constants/common';

interface Props {
  initialTime?: Date;
  onTimeSelected: (time: Date) => void;
  onClose: () => void;
}

const TimePicker: React.FC<Props> = ({ initialTime, onTimeSelected, onClose }) => {
  const [selectedTime, setSelectedTime] = useState<Date>(initialTime || new Date());
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), MODAL_ANIMATION_DURATION);
  };

  const handleIOSTimeChange = () => {
    onTimeSelected(selectedTime);
    handleClose();
  };

  const handleAndroidTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (event.type === 'set') {
      onTimeSelected(time!);
    }
    onClose();
  };

  if (Platform.OS === 'android') {
    return <DateTimePicker value={selectedTime} mode="time" is24Hour={true} onChange={handleAndroidTimeChange} />;
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <SafeAreaView className="rounded-t-2xl bg-background p-6">
        <View className="mb-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={handleClose} className="px-4 py-2">
            <Text className="text-base font-semibold text-destructive">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-foreground">Select Time</Text>
          <TouchableOpacity onPress={handleIOSTimeChange} className="px-4 py-2">
            <Text className="text-base font-semibold text-primary">Done</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            is24Hour={true}
            onChange={(_, selectedTime) => {
              if (!selectedTime) {
                return;
              }
              setSelectedTime(selectedTime);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TimePicker;
