import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends BottomSheetProps {
  children: React.ReactNode | React.ReactNode[];
  maxHeight?: string;
  bottomOffset?: number;
  scrollEnabled?: boolean;
  enableBackdropDismiss?: boolean;
}

const BottomSheetWrapper = forwardRef<BottomSheet, Props>(
  (
    {
      children,
      onClose,
      maxHeight = '100%',
      bottomOffset = 0,
      scrollEnabled = false,
      enableBackdropDismiss = true,
      index = -1,
      snapPoints = [],
      onChange,
      ...props
    },
    ref,
  ) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [snapPointsIndex, setSnapPointsIndex] = useState(index ?? 0);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={enableBackdropDismiss ? 'close' : 'none'}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [enableBackdropDismiss],
    );

    const handleSheetChange = useCallback(
      (snapIndex: number, position: number, type: SNAP_POINT_TYPE) => {
        setSnapPointsIndex(snapIndex);

        if (snapIndex === -1 && onClose) {
          scrollViewRef.current?.scrollTo({ y: 0 });
          onClose();
        }

        if (onChange) {
          onChange(snapIndex, position, type);
        }
      },
      [onChange, onClose],
    );

    const atMaxSnap = useMemo(
      () =>
        Array.isArray(snapPoints) &&
        snapPoints.length > 0 &&
        snapPointsIndex === snapPoints.length - 1 &&
        snapPoints[snapPoints.length - 1] === '100%',
      [snapPoints, snapPointsIndex],
    );

    const renderHandle = useCallback(
      () => (
        <View
          style={{
            opacity: atMaxSnap ? 0 : 1,
          }}
          className="h-8 items-center justify-center"
        >
          <View className="h-[4px] w-8 rounded-full bg-muted-foreground" />
        </View>
      ),
      [atMaxSnap],
    );

    return (
      <BottomSheet
        ref={ref}
        index={index}
        style={{
          zIndex: 1000,
        }}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
        onChange={handleSheetChange}
        {...props}
      >
        {scrollEnabled ? (
          <SafeAreaView edges={!atMaxSnap ? ['bottom', 'left', 'right'] : undefined} className="flex-1">
            {children}
          </SafeAreaView>
        ) : (
          <BottomSheetView className="flex-1 bg-background">
            <SafeAreaView edges={!atMaxSnap ? ['bottom', 'left', 'right'] : undefined} className="flex-1">
              {children}
            </SafeAreaView>
          </BottomSheetView>
        )}
      </BottomSheet>
    );
  },
);

BottomSheetWrapper.displayName = 'BottomSheetWrapper';

export default BottomSheetWrapper;
