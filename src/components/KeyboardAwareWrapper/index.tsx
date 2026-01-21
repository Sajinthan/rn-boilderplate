import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

interface KeyboardAwareWrapperProps {
  children: React.ReactNode;
}

const KeyboardAwareWrapper: React.FC<KeyboardAwareWrapperProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? -35 : -80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareWrapper;
