import React, { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { FieldError } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  error?: FieldError;
  className?: string;
  inputClassName?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, leftIcon, rightIcon, error, className, inputClassName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View className={cn('w-full gap-2', className)}>
        {label && <Text className="text-base font-medium text-foreground">{label}</Text>}
        <View
          className={cn(
            'flex flex-row items-center rounded-2xl border-2 bg-background px-4 py-3',
            isFocused ? 'border-primary' : 'border-border',
            error && 'border-destructive',
          )}
        >
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <TextInput
            ref={ref}
            className={cn('flex-1 text-base text-foreground', inputClassName)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor="#999"
            {...props}
          />
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
        {error && <Text className="text-sm text-destructive">{error.message}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';

export default Input;
