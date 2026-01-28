import { create } from 'zustand';

import { TimerDefaults } from '@/constants/theme';

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

  startSession: () =>
    set(() => ({
      status: 'running',
      sessionStartTime: new Date(),
      scheduledStartTime: null,
    })),

  pauseSession: () => {
    const { isStrictMode } = get();
    if (isStrictMode) return; // Can't pause in strict mode

    set(() => ({
      status: 'paused',
    }));
  },

  resumeSession: () =>
    set(() => ({
      status: 'running',
      sessionStartTime: new Date(),
    })),

  endSession: () => {
    const { isStrictMode } = get();
    if (isStrictMode) return; // Can't end early in strict mode

    set(() => ({
      status: 'reflection',
    }));
  },

  tick: () => {
    const { timeRemaining, status } = get();

    if (status !== 'running' && status !== 'break') return;

    if (timeRemaining <= 1) {
      // Timer completed
      if (status === 'running') {
        // Focus session ended
        set(state => ({
          timeRemaining: 0,
          status: 'reflection',
          completedSessions: state.completedSessions + 1,
        }));
      } else {
        // Break ended
        set(() => ({
          timeRemaining: 0,
          status: 'idle',
        }));
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

    set(() => ({
      status: 'break',
      sessionType: breakType,
      timeRemaining: getDurationForSessionType(breakType),
      sessionStartTime: new Date(),
    }));
  },

  skipBreak: () =>
    set(() => ({
      status: 'idle',
      sessionType: 'focus',
      timeRemaining: getDurationForSessionType('focus'),
    })),

  goToReflection: () =>
    set(() => ({
      status: 'reflection',
    })),

  reset: () => set(() => getDefaultState()),

  continueWithSameTask: () => {
    const { currentTask, isStrictMode } = get();

    set(() => ({
      status: 'committed',
      currentTask,
      isStrictMode,
      timeRemaining: getDurationForSessionType('focus'),
      sessionType: 'focus',
      sessionStartTime: null,
    }));
  },

  startNewTask: () =>
    set(() => ({
      status: 'idle',
      currentTask: null,
      isStrictMode: false,
      timeRemaining: getDurationForSessionType('focus'),
      sessionType: 'focus',
      sessionStartTime: null,
    })),
}));
