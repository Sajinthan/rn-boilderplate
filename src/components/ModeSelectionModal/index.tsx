import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MODAL_ANIMATION_DURATION } from '@/constants/common';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settings-store';

import Button from '../Button';

export interface ModeSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (isStrictMode: boolean) => void;
}

interface ModeCardProps {
  title: string;
  description: string;
  isSelected: boolean;
  isRecommended?: boolean;
  onPress: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ title, description, isSelected, isRecommended, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        'flex-row items-start justify-between gap-3 rounded-xl border-2 p-5',
        isSelected ? 'border-primary' : 'border-border',
      )}
    >
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-body font-medium text-foreground">{title}</Text>
          {isRecommended && (
            <View className="rounded-full bg-primary/10 px-2 py-0.5">
              <Text className="text-helper font-medium text-primary">Recommended</Text>
            </View>
          )}
        </View>
        <Text className="mt-1 text-helper text-muted-foreground">{description}</Text>
      </View>

      {/* Selection indicator */}
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded-full border-2',
          isSelected ? 'border-primary bg-primary' : 'border-border bg-transparent',
        )}
      >
        {isSelected && <View className="h-2 w-2 rounded-full bg-primary-foreground" />}
      </View>
    </TouchableOpacity>
  );
};

const ModeSelectionModal: React.FC<ModeSelectionModalProps> = ({ isVisible, onClose, onConfirm }) => {
  const defaultStrictMode = useSettingsStore(state => state.defaultStrictMode);
  const [isStrictMode, setIsStrictMode] = useState(defaultStrictMode);
  const [modalVisible, setModalVisible] = useState(isVisible);

  // Sync modal visibility with prop
  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      // Reset selection to default when modal opens
      setIsStrictMode(defaultStrictMode);
    }
  }, [isVisible, defaultStrictMode]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => onClose(), MODAL_ANIMATION_DURATION);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    setTimeout(() => {
      onConfirm(isStrictMode);
    }, MODAL_ANIMATION_DURATION);
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.5}
      style={{ justifyContent: 'center', margin: 16 }}
    >
      <SafeAreaView className="rounded-2xl bg-background p-6">
        {/* Header */}
        <View className="pb-2">
          <Text className="text-heading font-semibold text-foreground">Choose your mode</Text>
        </View>

        {/* Mode cards */}
        <View className="space-y-3 py-4">
          <ModeCard
            title="Flexible mode"
            description="You can end the session early if needed."
            isSelected={!isStrictMode}
            onPress={() => setIsStrictMode(false)}
          />
          <View className="h-3" />
          <ModeCard
            title="Strict mode"
            description="Session runs until completion. Helps build discipline."
            isSelected={isStrictMode}
            isRecommended={true}
            onPress={() => setIsStrictMode(true)}
          />
        </View>

        {/* Footer */}
        <View className="pt-2">
          <Button title="Begin session" onPress={handleConfirm} className="h-14" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModeSelectionModal;
