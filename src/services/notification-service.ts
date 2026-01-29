import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// ============================================
// CONFIGURATION
// ============================================

/**
 * Configure how notifications are handled when the app is in the foreground.
 * We suppress foreground display since the app already handles timer completion.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ============================================
// PERMISSION
// ============================================

/**
 * Request notification permissions from the user.
 * Returns true if permission was granted.
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === 'granted') {
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// ============================================
// ANDROID CHANNEL
// ============================================

/**
 * Set up the Android notification channel.
 * Must be called before scheduling notifications on Android.
 */
export const configureNotificationChannel = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('timer-complete', {
      name: 'Timer Completion',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
    });
  }
};

// ============================================
// SCHEDULING
// ============================================

/**
 * Schedule a notification to fire at the given absolute time (epoch ms).
 * Used when a focus session or break starts.
 *
 * @param endTime - Absolute time in epoch milliseconds when the timer completes
 * @param taskName - Optional task name to include in the notification body
 * @param isBreak - Whether this notification is for a break (vs. focus session)
 */
export const scheduleTimerNotification = async (
  endTime: number,
  taskName?: string,
  isBreak: boolean = false,
): Promise<void> => {
  // Cancel any existing scheduled notifications first
  await cancelAllNotifications();

  const triggerDate = new Date(endTime);
  const now = Date.now();

  // Don't schedule if the time is already in the past
  if (endTime <= now) return;

  const title = isBreak ? 'Break is over' : 'Session complete';
  const body = isBreak
    ? 'Time to get back to work.'
    : taskName
      ? `"${taskName}" session has ended. Time to reflect.`
      : 'Your focus session has ended. Time to reflect.';

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      ...(Platform.OS === 'android' && { channelId: 'timer-complete' }),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
};

// ============================================
// CANCELLATION
// ============================================

/**
 * Cancel all scheduled notifications.
 * Called when the user pauses, ends, skips, or otherwise interrupts the timer.
 */
export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
