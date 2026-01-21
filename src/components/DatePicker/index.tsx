import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MODAL_ANIMATION_DURATION } from '@/constants/common';

interface Props {
  initialDate?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  onDateSelected: (date: Date) => void;
  onClose: () => void;
}

const DatePicker: React.FC<Props> = ({ initialDate, minimumDate, maximumDate, onDateSelected, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), MODAL_ANIMATION_DURATION);
  };

  const handleIOSDateChange = () => {
    onDateSelected(selectedDate);
    handleClose();
  };

  const handleAndroidDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set') {
      onDateSelected(date!);
    }
    onClose();
  };

  if (Platform.OS === 'android') {
    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={handleAndroidDateChange}
      />
    );
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
          <Text className="text-lg font-semibold text-foreground">Select Date</Text>
          <TouchableOpacity onPress={handleIOSDateChange} className="px-4 py-2">
            <Text className="text-base font-semibold text-primary">Done</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={(_, selectedDate) => {
              if (!selectedDate) {
                return;
              }
              setSelectedDate(selectedDate);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DatePicker;
