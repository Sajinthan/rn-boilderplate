import { cn } from '@/lib/utils';
import { Check, ChevronDown, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface PickerOption {
  label: string;
  value: string;
  description?: string;
}

interface PickerProps {
  label?: string;
  placeholder?: string;
  value: string;
  options: PickerOption[];
  onValueChange: (value: string) => void;
  error?: { message?: string };
  className?: string;
}

const Picker: React.FC<PickerProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  onValueChange,
  error,
  className = '',
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleOptionSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setShowPicker(false);
  };

  return (
    <View className={cn('w-full', className)}>
      {label && <Text className="mb-2 text-base font-medium text-foreground">{label}</Text>}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={cn(
          'flex-row items-center justify-between rounded-2xl border-2 bg-background px-4 py-3',
          error ? 'border-destructive' : 'border-border',
        )}
      >
        <Text className={cn('text-base', selectedOption ? 'text-foreground' : 'text-muted-foreground')}>
          {displayText}
        </Text>
        <ChevronDown color="hsl(var(--muted-foreground))" size={20} />
      </TouchableOpacity>

      {error && <Text className="mt-2 text-sm text-destructive">{error.message}</Text>}

      <Modal
        isVisible={showPicker}
        onBackdropPress={() => setShowPicker(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        backdropOpacity={0.5}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <SafeAreaView className="rounded-t-2xl bg-background p-6 pb-12">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-foreground">
              {label ? `Select ${label}` : 'Select Option'}
            </Text>
            <TouchableOpacity onPress={() => setShowPicker(false)} className="p-1">
              <X color="hsl(var(--muted-foreground))" size={20} />
            </TouchableOpacity>
          </View>

          {options.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleOptionSelect(option.value)}
                className={cn(
                  'rounded-2xl border-2 border-border bg-background p-4',
                  { 'mb-3': index < options.length - 1 },
                  'flex-row items-center justify-between',
                  isSelected && 'border-primary bg-primary/10',
                )}
              >
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">{option.label}</Text>
                  {option.description && (
                    <Text className="text-sm text-muted-foreground">{option.description}</Text>
                  )}
                </View>
                {isSelected && <Check color="hsl(var(--primary))" size={20} />}
              </TouchableOpacity>
            );
          })}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Picker;
