import { create } from 'zustand';

import { TimerDefaults } from '@/constants/theme';
import {
  playBreakEndFeedback,
  playBreakStartFeedback,
  playSessionEndFeedback,
  playSessionStartFeedback,
} from '@/lib/feedback';
import { cancelAllNotifications, scheduleTimerNotification } from '@/services/notification-service';

// ============================================
// TYPES
// ============================================

export type TimerStatus = 'idle' | 'committed' | 'running' | 'paused' | 'break' | 'reflection';

export type SessionType = 'focus' | 'shortBreak' | 'longBreak';

export interface TaskCommitment {
  name: string;
  successCriteria?: string;
}

export interface TimerState {
  status: TimerStatus;
  currentTask: TaskCommitment | null;
  isStrictMode: boolean;
  timeRemaining: number; // in seconds
  sessionType: SessionType;
  completedSessions: number; // tracks sessions for long break
  scheduledStartTime: Date | null;
  sessionStartTime: Date | null; // for background handling
  endTime: number | null; // absolute end time in epoch milliseconds
}

export interface TimerActions {
  // Task commitment
  commitToTask: (task: TaskCommitment, isStrictMode: boolean) => void;
  scheduleStart: (startTime: Date) => void;
  clearSchedule: () => void;

  // Session control
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  tick: () => void;

  // Break handling
  startBreak: () => void;
  skipBreak: () => void;

  // Reflection
  goToReflection: () => void;

  // Background handling
  recalculateFromBackground: () => void;

  // Reset
  reset: () => void;
  continueWithSameTask: () => void;
  startNewTask: () => void;
}

export interface TimerComputed {
  progress: number; // 0-1
  formattedTime: string; // MM:SS
  totalDuration: number; // in seconds
}

export type TimerStore = TimerState & TimerActions & TimerComputed;

// ============================================
// HELPERS
// ============================================

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getDurationForSessionType = (sessionType: SessionType): number => {
  switch (sessionType) {
    case 'focus':
      return TimerDefaults.focusDuration * 60;
    case 'shortBreak':
      return TimerDefaults.shortBreakDuration * 60;
    case 'longBreak':
      return TimerDefaults.longBreakDuration * 60;
  }
};

// ============================================
// DEFAULT STATE
// ============================================

const getDefaultState = (): TimerState => ({
  status: 'idle',
  currentTask: null,
  isStrictMode: false,
  timeRemaining: getDurationForSessionType('focus'),
  sessionType: 'focus',
  completedSessions: 0,
  scheduledStartTime: null,
  sessionStartTime: null,
  endTime: null,
});

// ============================================
// STORE
// ============================================

export const useTimerStore = create<TimerStore>((set, get) => ({
  ...getDefaultState(),

  // Computed properties (recalculated on access)
  get progress() {
    const { timeRemaining, sessionType } = get();
    const totalDuration = getDurationForSessionType(sessionType);
    return 1 - timeRemaining / totalDuration;
  },

  get formattedTime() {
    return formatTime(get().timeRemaining);
  },

  get totalDuration() {
    return getDurationForSessionType(get().sessionType);
  },

  // Actions
  commitToTask: (task, isStrictMode) =>
    set(() => ({
      status: 'committed',
      currentTask: task,
      isStrictMode,
      timeRemaining: getDurationForSessionType('focus'),
      sessionType: 'focus',
    })),

  scheduleStart: startTime =>
    set(() => ({
      scheduledStartTime: startTime,
    })),

  clearSchedule: () =>
    set(() => ({
      scheduledStartTime: null,
    })),

  startSession: () => {
    const { timeRemaining, currentTask } = get();
    const newEndTime = Date.now() + timeRemaining * 1000;

    set(() => ({
      status: 'running',
      sessionStartTime: new Date(),
      scheduledStartTime: null,
      endTime: newEndTime,
    }));

    scheduleTimerNotification(newEndTime, currentTask?.name, false);
    playSessionStartFeedback();
  },

  pauseSession: () => {
    const { isStrictMode } = get();
    if (isStrictMode) return; // Can't pause in strict mode

    set(() => ({
      status: 'paused',
    }));

    cancelAllNotifications();
  },

  resumeSession: () => {
    const { timeRemaining, currentTask } = get();
    const newEndTime = Date.now() + timeRemaining * 1000;

    set(() => ({
      status: 'running',
      sessionStartTime: new Date(),
      endTime: newEndTime,
    }));

    scheduleTimerNotification(newEndTime, currentTask?.name, false);
  },

  endSession: () => {
    const { isStrictMode } = get();
    if (isStrictMode) return; // Can't end early in strict mode

    set(() => ({
      status: 'reflection',
      endTime: null,
    }));

    cancelAllNotifications();
  },

  tick: () => {
    const { timeRemaining, status } = get();

    if (status !== 'running' && status !== 'break') return;

    if (timeRemaining <= 1) {
      // Timer completed in foreground - cancel the scheduled notification
      cancelAllNotifications();

      if (status === 'running') {
        // Focus session ended
        set(state => ({
          timeRemaining: 0,
          status: 'reflection',
          completedSessions: state.completedSessions + 1,
          endTime: null,
        }));
        playSessionEndFeedback();
      } else {
        // Break ended
        set(() => ({
          timeRemaining: 0,
          status: 'idle',
          endTime: null,
        }));
        playBreakEndFeedback();
      }
    } else {
      set(() => ({
        timeRemaining: timeRemaining - 1,
      }));
    }
  },

  startBreak: () => {
    const { completedSessions } = get();

    const isLongBreak = completedSessions % TimerDefaults.sessionsBeforeLongBreak === 0;
    const breakType: SessionType = isLongBreak ? 'longBreak' : 'shortBreak';
    const breakDuration = getDurationForSessionType(breakType);
    const newEndTime = Date.now() + breakDuration * 1000;

    set(() => ({
      status: 'break',
      sessionType: breakType,
      timeRemaining: breakDuration,
      sessionStartTime: new Date(),
      endTime: newEndTime,
    }));

    scheduleTimerNotification(newEndTime, undefined, true);
    playBreakStartFeedback();
  },

  skipBreak: () => {
    set(() => ({
      status: 'idle',
      sessionType: 'focus',
      timeRemaining: getDurationForSessionType('focus'),
      endTime: null,
    }));

    cancelAllNotifications();
  },

  goToReflection: () => {
    set(() => ({
      status: 'reflection',
      endTime: null,
    }));

    cancelAllNotifications();
  },

  recalculateFromBackground: () => {
    const { status, endTime } = get();

    if ((status !== 'running' && status !== 'break') || endTime === null) return;

    const now = Date.now();
    const remainingMs = endTime - now;

    if (remainingMs <= 0) {
      // Timer completed while in background - cancel the (already fired) notification
      cancelAllNotifications();

      if (status === 'running') {
        set(state => ({
          timeRemaining: 0,
          status: 'reflection',
          completedSessions: state.completedSessions + 1,
          endTime: null,
        }));
        playSessionEndFeedback();
      } else {
        // Break ended
        set(() => ({
          timeRemaining: 0,
          status: 'idle',
          endTime: null,
        }));
        playBreakEndFeedback();
      }
    } else {
      // Timer still running, update timeRemaining
      set(() => ({
        timeRemaining: Math.ceil(remainingMs / 1000),
      }));
    }
  },

  reset: () => {
    set(() => getDefaultState());
    cancelAllNotifications();
  },

  continueWithSameTask: () => {
    const { currentTask, isStrictMode } = get();

    set(() => ({
      status: 'committed',
      currentTask,
      isStrictMode,
      timeRemaining: getDurationForSessionType('focus'),
      sessionType: 'focus',
      sessionStartTime: null,
      endTime: null,
    }));

    cancelAllNotifications();
  },

  startNewTask: () => {
    set(() => ({
      status: 'idle',
      currentTask: null,
      isStrictMode: false,
      timeRemaining: getDurationForSessionType('focus'),
      sessionType: 'focus',
      sessionStartTime: null,
      endTime: null,
    }));

    cancelAllNotifications();
  },
}));
