# Focus Flow - Implementation Tasks

## Overview

This document tracks all implementation tasks for the Focus Flow app. Tasks are organized by phase with dependencies noted.

---

## Phase 1: Foundation

These tasks have no dependencies and should be completed first.

- [x] **Task 1: Update theme to match UX design system**
  - Update colors (primary green, light/dark mode palettes)
  - Configure typography (Inter font, size scale)
  - Set spacing and border radius values
  - Files: `src/constants/theme.ts`, `tailwind.config.js`, `src/global.css`, `src/app/_layout.tsx`

- [x] **Task 3: Create Zustand store for app settings**
  - State: defaultStrictMode, soundAndVibrationEnabled, darkModeEnabled
  - Actions: updateSetting, resetToDefaults
  - Persist to AsyncStorage
  - File: `src/stores/settings-store.ts`

- [x] **Task 4: Create Zustand store for timer state**
  - State: status, currentTask, isStrictMode, timeRemaining, sessionType
  - Actions: commitToTask, startSession, pauseSession, tick, endSession, startBreak
  - Computed: progress, formattedTime
  - File: `src/stores/timer-store.ts`

- [x] **Task 5: Create Zustand store for session history**
  - Types: Session, SessionOutcome, IncompleteReason
  - State: sessions array
  - Actions: addSession, getSessionsForDate, getTodayStats, getWeekStats
  - Persist to AsyncStorage
  - File: `src/stores/session-store.ts`

---

## Phase 2: Core Structure

Complete after Phase 1 foundation is in place.

- [x] **Task 2: Setup 3-tab bottom navigation structure** _(blocked by: #1)_
  - Create tab layout with Focus, History, Settings tabs
  - Tab bar height: 80px with safe area
  - Icons from lucide-react-native
  - File: `src/app/(tabs)/_layout.tsx`

- [ ] **Task 9: Build circular progress ring component** _(blocked by: #1)_
  - SVG-based circular progress indicator
  - Size: 280px, stroke width: 4px
  - Background stroke: muted color, progress stroke: primary color
  - Rotation: -90deg (starts from top), stroke-linecap: round
  - Props: progress (0-1), size, strokeWidth, children (for centered timer text)
  - Animated with react-native-reanimated (0.5s ease on stroke-dashoffset)
  - File: `src/components/ProgressRing.tsx`

- [ ] **Task 7: Build Mode Selection modal** _(blocked by: #1, #3)_
  - Title: "Choose your mode"
  - Flexible mode: "You can end the session early if needed."
  - Strict mode: "Session runs until completion. Helps build discipline." + "Recommended" badge
  - Mode cards with radio selection indicator
  - Respects default from settings
  - Confirm button: "Begin session"
  - File: `src/components/ModeSelectionModal.tsx`

---

## Phase 3: Main Screens

Core app screens - complete after Phase 2.

- [ ] **Task 6: Build Task Commitment screen** _(blocked by: #1, #2, #4)_
  - Heading: "What are you working on?"
  - Task name input (required, placeholder: "Enter your task")
  - Success criteria input (optional, placeholder: "What does success look like? (optional)")
  - Helper text: "One task. One session."
  - "Start now" button and "Schedule start" link
  - File: `src/app/(tabs)/focus/index.tsx`

- [ ] **Task 8: Build Focus Session screen with timer** _(blocked by: #4, #9)_
  - Label: "FOCUSING ON" (uppercase, muted)
  - Task name display (heading style)
  - Large circular timer with progress ring
  - "End session" text link (hidden in strict mode)
  - Timer logic with setInterval
  - Hide bottom navigation
  - File: `src/app/(tabs)/focus/session.tsx`

- [ ] **Task 12: Build History screen with session list** _(blocked by: #2, #5)_
  - Title: "History"
  - Summary card: "Today" / "X / Y" / "sessions completed"
  - Filter chips: "Today", "7 days"
  - Session list with task name, time, outcome icon in circular background
  - Empty state handling
  - File: `src/app/(tabs)/history/index.tsx`

- [ ] **Task 13: Build Settings screen** _(blocked by: #2, #3)_
  - Toggle: Default to strict mode (with "Prevent early session exit" description)
  - Toggle: Sound & vibration (combined, with "Session start and end alerts" description)
  - Toggle: Dark mode (with "Easier on the eyes" description)
  - About card: "No account required. All data stays on your device."
  - Version display
  - File: `src/app/(tabs)/settings/index.tsx`

- [ ] **Task 11: Build Reflection/Accountability screen** _(blocked by: #4, #5)_
  - Header: "Session complete" with task name
  - Question: "Did you achieve what you set out to do?"
  - Outcome buttons: "Completed", "Partially completed", "Not completed"
  - Reason chips (optional): "Distracted", "Task too big", "Low energy", "Interrupted"
  - Reasons prompt: "What got in the way? (optional)"
  - Actions: "Continue" button, "New task" link, "End" link
  - Save session to history
  - File: `src/app/(tabs)/focus/reflection.tsx`

---

## Phase 4: Session Flow

Complete the full session experience.

- [ ] **Task 10: Build Break screen** _(blocked by: #4, #8)_
  - Header: "BREAK" (uppercase)
  - Timer display without progress ring
  - Message: "Step away. Rest your mind."
  - Muted background color
  - Skip break option
  - Hide bottom navigation
  - File: `src/app/(tabs)/focus/break.tsx`

- [ ] **Task 16: Build schedule start time picker** _(blocked by: #4, #6)_
  - Bottom sheet with time picker
  - Hour, minute, AM/PM selectors
  - Schedule confirmation
  - File: `src/components/ScheduleTimePicker.tsx`

---

## Phase 5: Polish

Final enhancements for production readiness.

- [ ] **Task 14: Implement timer background handling** _(blocked by: #4, #8)_
  - Store absolute end time
  - Recalculate on foreground return
  - Local notifications when timer completes
  - AppState listener integration
  - Files: `src/stores/timer-store.ts`, `src/services/notifications.ts`

- [ ] **Task 15: Add sound and vibration feedback** _(blocked by: #3, #8)_
  - Session start/end sounds
  - Break start/end sounds
  - Haptic feedback
  - Respect user settings
  - File: `src/lib/feedback.ts`

---

## Progress Summary

| Phase                   | Tasks  | Completed |
| ----------------------- | ------ | --------- |
| Phase 1: Foundation     | 4      | 4         |
| Phase 2: Core Structure | 3      | 1         |
| Phase 3: Main Screens   | 5      | 0         |
| Phase 4: Session Flow   | 2      | 0         |
| Phase 5: Polish         | 2      | 0         |
| **Total**               | **16** | **5**     |

---

## Notes

- All data stored locally using AsyncStorage
- No accounts or cloud sync
- Strict mode prevents early session exit
- Design follows focus-flow-ux prototype exactly
