import { CircleAlert } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import ToastMessage, { ToastConfig } from 'react-native-toast-message';

const TOAST_VISIBILITY_TIME = 5000;
const TOAST_TOP_OFFSET = 60;

const toastConfig: ToastConfig = {
  error: ({ text1, text2 }) => (
    <View className="mx-4 flex-row items-center rounded-2xl border-l-4 border-destructive bg-white px-4 py-3 shadow-lg shadow-black/10">
      <View className="mr-3 rounded-full bg-destructive/10 p-2">
        <CircleAlert size={20} color="#D9534F" />
      </View>
      <View className="flex-1">
        {text1 && <Text className="text-base font-semibold text-foreground">{text1}</Text>}
        {text2 && <Text className="text-sm text-muted-foreground">{text2}</Text>}
      </View>
    </View>
  ),
};

const Toast: React.FC = () => {
  return <ToastMessage config={toastConfig} visibilityTime={TOAST_VISIBILITY_TIME} topOffset={TOAST_TOP_OFFSET} />;
};

export const showErrorToast = (title: string, message?: string) => {
  ToastMessage.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};

export default Toast;
