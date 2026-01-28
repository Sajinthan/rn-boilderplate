import { LoaderCircle } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { cn } from '@/lib/utils';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'text';
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  textClassName?: string;
  iconLeftColor?: string;
  iconRightColor?: string;
}

const getBgVariantStyle = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return 'bg-secondary';
    case 'danger':
      return 'bg-destructive';
    case 'success':
      return 'bg-primary';
    case 'outline':
      return 'bg-card border-2 border-primary/15';
    case 'text':
      return 'bg-transparent';
    default:
      return 'bg-primary';
  }
};

const getTextVariantStyle = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return 'text-secondary-foreground';
    case 'danger':
      return 'text-destructive-foreground';
    case 'success':
      return 'text-primary-foreground';
    case 'outline':
      return 'text-foreground';
    case 'text':
      return 'text-primary';
    default:
      return 'text-primary-foreground';
  }
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  isLoading,
  variant = 'primary',
  IconLeft,
  IconRight,
  className,
  textClassName,
  iconLeftColor,
  iconRightColor,
  disabled,
  ...props
}) => {
  const getLoaderColor = () => {
    switch (variant) {
      case 'outline':
      case 'text':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary-foreground';
      default:
        return 'text-primary-foreground';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        'flex w-full flex-row items-center justify-center rounded-xl p-4',
        getBgVariantStyle(variant),
        variant === 'text' && 'w-auto p-0',
        disabled && 'opacity-50',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle size={20} className={cn('animate-spin', getLoaderColor())} />
      ) : (
        IconLeft && (
          <View className="mr-2">
            <IconLeft size={20} color={iconLeftColor || 'white'} />
          </View>
        )
      )}
      {title && (
        <Text className={cn('text-button', getTextVariantStyle(variant), isLoading && 'ml-2', textClassName)}>
          {title}
        </Text>
      )}
      {IconRight && (
        <View className="ml-2">
          <IconRight size={20} color={iconRightColor || 'white'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
