# Focus Flow - Implementation Tasks

## Overview

This document tracks all implementation tasks for the Focus Flow app. Tasks are organized to build complete features incrementally - each phase delivers working functionality.

---

## Phase 1: Foundation

Essential setup before building features.

- [x] **Task 1: Update theme to match UX design system**
  - Update colors (primary green, light/dark mode palettes)
  - Configure typography (Inter font, size scale)
  - Set spacing and border radius values
  - Files: `src/constants/theme.ts`, `tailwind.config.js`, `src/global.css`, `src/app/_layout.tsx`

- [x] **Task 2: Setup 3-tab bottom navigation structure**
  - Create tab layout with Focus, History, Settings tabs
  - Tab bar height: 80px with safe area
  - Icons from lucide-react-native
  - File: `src/app/(tabs)/_layout.tsx`

---

## Phase 2: Settings Feature

Complete settings functionality.

- [x] **Task 3: Create Zustand store for app settings**
  - State: defaultStrictMode, soundAndVibrationEnabled, darkModeEnabled
  - Actions: updateSetting, resetToDefaults
  - Persist to AsyncStorage
  - File: `src/stores/settings-store.ts`

- [x] **Task 4: Build Settings screen**
  - Toggle: Default to strict mode (with "Prevent early session exit" description)
  - Toggle: Sound & vibration (combined, with "Session start and end alerts" description)
  - Toggle: Dark mode (with "Easier on the eyes" description)
  - About card: "No account required. All data stays on your device."
  - Version display
  - SettingsItem extracted to reusable component
  - Files: `src/app/(tabs)/settings/index.tsx`, `src/components/SettingsItem/index.tsx`

---

## Phase 3: Task Commitment Flow

Start a focus session with task commitment.

- [x] **Task 5: Create Zustand store for timer state**
  - State: status, currentTask, isStrictMode, timeRemaining, sessionType
  - Actions: commitToTask, startSession, pauseSession, tick, endSession, startBreak
  - Computed: progress, formattedTime
  - File: `src/stores/timer-store.ts`

- [x] **Task 6: Build Task Commitment screen**
  - Heading: "What are you working on?"
  - Task name input (required, placeholder: "Enter your task")
  - Success criteria input (optional, placeholder: "What does success look like? (optional)")
  - Helper text: "One task. One session."
  - "Start now" button and "Schedule start" link
  - File: `src/app/(tabs)/focus/index.tsx`

- [x] **Task 7: Build Mode Selection modal**
  - Title: "Choose your mode"
  - Flexible mode: "You can end the session early if needed."
  - Strict mode: "Session runs until completion. Helps build discipline." + "Recommended" badge
  - Mode cards with radio selection indicator
  - Respects default from settings
  - Confirm button: "Begin session"
  - File: `src/components/ModeSelectionModal/index.tsx`

---

## Phase 4: Focus Session

Active timer with progress visualization.

- [x] **Task 8: Build circular progress ring component**
  - SVG-based circular progress indicator
  - Size: 280px, stroke width: 4px
  - Background stroke: muted color, progress stroke: primary color
  - Rotation: -90deg (starts from top), stroke-linecap: round
  - Props: progress (0-1), size, strokeWidth, children (for centered timer text)
  - File: `src/components/ProgressRing/index.tsx`

- [x] **Task 9: Build Focus Session screen with timer**
  - Label: "FOCUSING ON" (uppercase, muted)
  - Task name display (heading style)
  - Large circular timer with progress ring
  - "End session" text link (hidden in strict mode)
  - Timer logic with setInterval
  - Hide bottom navigation
  - File: `src/app/(tabs)/focus/session.tsx`

---

## Phase 5: Session Completion

Break and reflection after focus session.

- [x] **Task 10: Build Break screen**
  - Header: "BREAK" (uppercase)
  - Timer display without progress ring
  - Message: "Step away. Rest your mind."
  - Muted background color
  - Skip break option
  - Hide bottom navigation
  - File: `src/app/(tabs)/focus/break.tsx`

- [x] **Task 11: Create Zustand store for session history**
  - Types: Session, SessionOutcome, IncompleteReason
  - State: sessions array
  - Actions: addSession, getSessionsForDate, getTodayStats, getWeekStats
  - Persist to AsyncStorage
  - File: `src/stores/session-store.ts`

- [ ] **Task 12: Build Reflection/Accountability screen**
  - Header: "Session complete" with task name
  - Question: "Did you achieve what you set out to do?"
  - Outcome buttons: "Completed", "Partially completed", "Not completed"
  - Reason chips (optional): "Distracted", "Task too big", "Low energy", "Interrupted"
  - Reasons prompt: "What got in the way? (optional)"
  - Actions: "Continue" button, "New task" link, "End" link
  - Save session to history
  - File: `src/app/(tabs)/focus/reflection.tsx`

---

## Phase 6: History Feature

View past sessions.

- [ ] **Task 13: Build History screen with session list**
  - Title: "History"
  - Summary card: "Today" / "X / Y" / "sessions completed"
  - Filter chips: "Today", "7 days"
  - Session list with task name, time, outcome icon in circular background
  - Empty state handling
  - File: `src/app/(tabs)/history/index.tsx`

---

## Phase 7: Polish

Enhancements for production readiness.

- [ ] **Task 14: Build schedule start time picker**
  - Bottom sheet with time picker
  - Hour, minute, AM/PM selectors
  - Schedule confirmation
  - File: `src/components/ScheduleTimePicker.tsx`

- [ ] **Task 15: Implement timer background handling**
  - Store absolute end time
  - Recalculate on foreground return
  - Local notifications when timer completes
  - AppState listener integration
  - Files: `src/stores/timer-store.ts`, `src/services/notifications.ts`

- [ ] **Task 16: Add sound and vibration feedback**
  - Session start/end sounds
  - Break start/end sounds
  - Haptic feedback
  - Respect user settings
  - File: `src/lib/feedback.ts`

---

## Progress Summary

| Phase                       | Tasks  | Completed |
| --------------------------- | ------ | --------- |
| Phase 1: Foundation         | 2      | 2         |
| Phase 2: Settings Feature   | 2      | 2         |
| Phase 3: Task Commitment    | 3      | 3         |
| Phase 4: Focus Session      | 2      | 2         |
| Phase 5: Session Completion | 3      | 2         |
| Phase 6: History Feature    | 1      | 0         |
| Phase 7: Polish             | 3      | 0         |
| **Total**                   | **16** | **11**    |

---

## Notes

- All data stored locally using AsyncStorage
- No accounts or cloud sync
- Strict mode prevents early session exit
- Design follows focus-flow-ux prototype exactly
