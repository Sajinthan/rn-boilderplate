import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useColors } from '@/hooks/useColors';
import { Layout } from '@/constants/theme';

export interface ProgressRingProps {
  /** Progress value from 0 to 1 */
  progress: number;
  /** Ring size in pixels (default: 280) */
  size?: number;
  /** Stroke width in pixels (default: 4) */
  strokeWidth?: number;
  /** Content to display centered inside the ring (e.g., timer text) */
  children?: React.ReactNode;
}

/**
 * Circular SVG progress indicator for the timer display.
 * Progress starts from the top (12 o'clock position) and fills clockwise.
 *
 * @example
 * <ProgressRing progress={0.75}>
 *   <Text className="timer-display">18:45</Text>
 * </ProgressRing>
 */
const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = Layout.progressRingSize,
  strokeWidth = Layout.progressRingStroke,
  children,
}) => {
  const colors = useColors();

  // Calculate circle geometry
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Clamp progress between 0 and 1
  const clampedProgress = Math.min(1, Math.max(0, progress));

  // Calculate stroke-dashoffset for progress
  // Full offset = no progress, zero offset = full progress
  const strokeDashoffset = circumference * (1 - clampedProgress);

  // Center point for the circles
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background circle (track) */}
        <Circle cx={center} cy={center} r={radius} stroke={colors.muted} strokeWidth={strokeWidth} fill="none" />
        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      {/* Centered content (timer text) */}
      {children && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default ProgressRing;
