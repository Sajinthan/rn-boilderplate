import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================
// TYPES
// ============================================

export type SessionOutcome = 'completed' | 'partial' | 'not_completed';

export type IncompleteReason = 'distracted' | 'task_too_big' | 'low_energy' | 'interrupted';

export interface Session {
  id: string;
  taskName: string;
  successCriteria?: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationMinutes: number;
  outcome: SessionOutcome;
  reason?: IncompleteReason;
  isStrictMode: boolean;
}

export interface SessionStats {
  total: number;
  completed: number;
  partial: number;
  notCompleted: number;
}

export interface SessionState {
  sessions: Session[];
}

export interface SessionActions {
  addSession: (session: Omit<Session, 'id'>) => void;
  getSessionsForDate: (date: Date) => Session[];
  getSessionsForDateRange: (startDate: Date, endDate: Date) => Session[];
  getTodaySessions: () => Session[];
  getWeekSessions: () => Session[];
  getTodayStats: () => SessionStats;
  getWeekStats: () => SessionStats;
  clearAllSessions: () => void;
}

export type SessionStore = SessionState & SessionActions;

// ============================================
// HELPERS
// ============================================

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getStartOfDay = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getStartOfWeek = (date: Date): Date => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day;
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const calculateStats = (sessions: Session[]): SessionStats => {
  return {
    total: sessions.length,
    completed: sessions.filter(s => s.outcome === 'completed').length,
    partial: sessions.filter(s => s.outcome === 'partial').length,
    notCompleted: sessions.filter(s => s.outcome === 'not_completed').length,
  };
};

// ============================================
// STORE
// ============================================

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      sessions: [],

      addSession: sessionData =>
        set(state => ({
          sessions: [
            {
              ...sessionData,
              id: generateId(),
            },
            ...state.sessions,
          ],
        })),

      getSessionsForDate: date => {
        const { sessions } = get();
        return sessions.filter(session => {
          const sessionDate = new Date(session.startTime);
          return isSameDay(sessionDate, date);
        });
      },

      getSessionsForDateRange: (startDate, endDate) => {
        const { sessions } = get();
        const start = getStartOfDay(startDate).getTime();
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const endTime = end.getTime();

        return sessions.filter(session => {
          const sessionTime = new Date(session.startTime).getTime();
          return sessionTime >= start && sessionTime <= endTime;
        });
      },

      getTodaySessions: () => {
        const { getSessionsForDate } = get();
        return getSessionsForDate(new Date());
      },

      getWeekSessions: () => {
        const { getSessionsForDateRange } = get();
        const today = new Date();
        const weekStart = getStartOfWeek(today);
        return getSessionsForDateRange(weekStart, today);
      },

      getTodayStats: () => {
        const { getTodaySessions } = get();
        return calculateStats(getTodaySessions());
      },

      getWeekStats: () => {
        const { getWeekSessions } = get();
        return calculateStats(getWeekSessions());
      },

      clearAllSessions: () => {
        AsyncStorage.removeItem('session-storage');
        set(() => ({
          sessions: [],
        }));
      },
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// ============================================
// DISPLAY HELPERS
// ============================================

export const outcomeLabels: Record<SessionOutcome, string> = {
  completed: 'Completed',
  partial: 'Partially completed',
  not_completed: 'Not completed',
};

export const reasonLabels: Record<IncompleteReason, string> = {
  distracted: 'Distracted',
  task_too_big: 'Task too big',
  low_energy: 'Low energy',
  interrupted: 'Interrupted',
};
