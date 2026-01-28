import React from 'react';
import { Platform, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { cn } from '@/lib/utils';
import { SHADOWS } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import Button from '../Button';

const BackButton: React.FC = () => {
  const router = useRouter();
  const colors = useColors();

  return (
    <View className={cn('absolute left-10 z-10 flex-row justify-start', Platform.OS === 'ios' ? 'top-20' : 'top-10')}>
      <Button
        className="w-auto rounded-full bg-white p-2"
        IconLeft={() => <ArrowLeft color={colors.primary} />}
        style={SHADOWS.calm}
        onPress={() => router.back()}
      />
    </View>
  );
};

export default BackButton;
