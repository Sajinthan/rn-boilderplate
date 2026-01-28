# Focus Flow - Requirements

## Overview

Focus Flow is a task-based focus timer designed to help people start on time, stay with one piece of work, and reflect honestly on the outcome. Instead of measuring productivity only by time spent, each session begins with a clear task commitment and ends with a simple check on whether that task was completed, partially completed, or not completed.

---

## Core Philosophy

- **Task commitment over time tracking**: Each session starts with declaring what you'll work on
- **Honest reflection**: Sessions end with accountability, not just completion
- **Minimal and intentional**: No gamification, streaks, or social features
- **Local-first**: All data stays on device, no accounts required
- **Calm authority**: Interface supports focus, doesn't demand attention

---

## Functional Requirements

### FR-1: Task Commitment

| ID     | Requirement                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------------- |
| FR-1.1 | Screen displays heading "What are you working on?"                                                       |
| FR-1.2 | User must enter a task name before starting (placeholder: "Enter your task")                             |
| FR-1.3 | Task name is required, max 100 characters                                                                |
| FR-1.4 | User can optionally add success criteria (placeholder: "What does success look like? (optional)")        |
| FR-1.5 | Helper text displayed: "One task. One session."                                                          |
| FR-1.6 | User can start session immediately ("Start now" button) or schedule a start time ("Schedule start" link) |
| FR-1.7 | Scheduled sessions trigger a notification at the scheduled time                                          |

### FR-2: Mode Selection

| ID     | Requirement                                                           |
| ------ | --------------------------------------------------------------------- |
| FR-2.1 | Modal displays with title "Choose your mode"                          |
| FR-2.2 | User chooses between Flexible and Strict mode before each session     |
| FR-2.3 | Flexible mode: "You can end the session early if needed."             |
| FR-2.4 | Strict mode: "Session runs until completion. Helps build discipline." |
| FR-2.5 | Strict mode is marked with "Recommended" badge                        |
| FR-2.6 | Default mode is configurable in settings                              |
| FR-2.7 | Confirm button: "Begin session"                                       |

### FR-3: Focus Session

| ID     | Requirement                                            |
| ------ | ------------------------------------------------------ |
| FR-3.1 | Timer counts down from 25 minutes                      |
| FR-3.2 | Label "FOCUSING ON" displayed above task name          |
| FR-3.3 | Display shows current task name throughout session     |
| FR-3.4 | Circular progress ring shows visual progress           |
| FR-3.5 | Timer continues when app is backgrounded               |
| FR-3.6 | Session auto-advances to break when timer completes    |
| FR-3.7 | In Flexible mode, "End session" text link is available |
| FR-3.8 | In Strict mode, no early exit option is shown          |
| FR-3.9 | Bottom navigation is hidden during focus session       |

### FR-4: Break

| ID     | Requirement                                        |
| ------ | -------------------------------------------------- |
| FR-4.1 | Short break follows each focus session (5 minutes) |
| FR-4.2 | Long break after 4 sessions (15 minutes)           |
| FR-4.3 | Header displays "BREAK" in uppercase               |
| FR-4.4 | Timer displayed without progress ring              |
| FR-4.5 | Message displayed: "Step away. Rest your mind."    |
| FR-4.6 | Break screen uses muted background color           |
| FR-4.7 | User can skip break and proceed to reflection      |
| FR-4.8 | Bottom navigation is hidden during break           |

### FR-5: Reflection/Accountability

| ID     | Requirement                                                                           |
| ------ | ------------------------------------------------------------------------------------- |
| FR-5.1 | Header displays "Session complete" with task name below                               |
| FR-5.2 | Question displayed: "Did you achieve what you set out to do?"                         |
| FR-5.3 | User selects outcome: "Completed", "Partially completed", or "Not completed"          |
| FR-5.4 | For partial/not completed, prompt "What got in the way? (optional)" with reason chips |
| FR-5.5 | Available reasons: Distracted, Task too big, Low energy, Interrupted                  |
| FR-5.6 | Actions: "Continue" (primary button), "New task" (text link), "End" (text link)       |
| FR-5.7 | Session data is saved to history with outcome and optional reasons                    |

### FR-6: History

| ID     | Requirement                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------- |
| FR-6.1 | Screen title: "History"                                                                                 |
| FR-6.2 | Summary card displays "Today", "X / Y", "sessions completed"                                            |
| FR-6.3 | Filter chips: "Today" and "7 days"                                                                      |
| FR-6.4 | Each session shows: task name (medium weight), time                                                     |
| FR-6.5 | Outcome icon in circular muted background: ✓ (completed, primary color), ⚠ (partial), ✕ (not completed) |
| FR-6.6 | Empty state shown when no sessions exist                                                                |

### FR-7: Settings

| ID     | Requirement                                                                           |
| ------ | ------------------------------------------------------------------------------------- |
| FR-7.1 | Toggle: Default to strict mode (with description "Prevent early session exit")        |
| FR-7.2 | Toggle: Sound & vibration (combined, with description "Session start and end alerts") |
| FR-7.3 | Toggle: Dark mode (with description "Easier on the eyes")                             |
| FR-7.4 | Display about text: "No account required. All data stays on your device."             |
| FR-7.5 | Display app version                                                                   |

### FR-8: Feedback

| ID     | Requirement                                                |
| ------ | ---------------------------------------------------------- |
| FR-8.1 | Play sound on session start (if enabled)                   |
| FR-8.2 | Play sound on session end (if enabled)                     |
| FR-8.3 | Play sound on break start/end (if enabled)                 |
| FR-8.4 | Vibrate on session events (if enabled)                     |
| FR-8.5 | Show local notification when timer completes in background |

---

## Non-Functional Requirements

### NFR-1: Performance

| ID      | Requirement                                   |
| ------- | --------------------------------------------- |
| NFR-1.1 | App launches in under 2 seconds               |
| NFR-1.2 | Timer updates smoothly at 1-second intervals  |
| NFR-1.3 | Animations run at 60fps                       |
| NFR-1.4 | App remains responsive during timer operation |

### NFR-2: Data & Privacy

| ID      | Requirement                                 |
| ------- | ------------------------------------------- |
| NFR-2.1 | All data stored locally on device           |
| NFR-2.2 | No user accounts or authentication required |
| NFR-2.3 | No data transmitted to external servers     |
| NFR-2.4 | No analytics or tracking                    |
| NFR-2.5 | User can delete all data at any time        |

### NFR-3: Accessibility

| ID      | Requirement                             |
| ------- | --------------------------------------- |
| NFR-3.1 | Support system dark/light mode          |
| NFR-3.2 | Minimum touch target size: 44x44 points |
| NFR-3.3 | Color contrast meets WCAG AA standards  |
| NFR-3.4 | Support Dynamic Type / font scaling     |
| NFR-3.5 | VoiceOver/TalkBack compatible           |

### NFR-4: Platform Support

| ID      | Requirement                             |
| ------- | --------------------------------------- |
| NFR-4.1 | iOS 15.0+                               |
| NFR-4.2 | Android API 24+ (Android 7.0)           |
| NFR-4.3 | Portrait orientation only               |
| NFR-4.4 | Support notch/Dynamic Island safe areas |

---

## User Stories

### Epic: Focus Session

```
As a user who wants to focus,
I want to commit to a specific task before starting,
So that I have clear intention for my focus time.

As a user who struggles with distractions,
I want to use strict mode to prevent early exits,
So that I build discipline around focused work.

As a user completing a session,
I want to honestly reflect on whether I achieved my goal,
So that I can learn from my focus patterns.
```

### Epic: Session History

```
As a user tracking my focus,
I want to see my sessions for today and the past week,
So that I can understand my focus habits.

As a user reviewing my history,
I want to see which sessions were completed vs incomplete,
So that I can identify patterns in my productivity.
```

### Epic: Customization

```
As a user with different focus needs,
I want to adjust timer durations,
So that sessions match my optimal focus length.

As a user who dislikes sounds,
I want to disable audio feedback,
So that the app doesn't disturb me or others.
```

---

## Out of Scope (v1.0)

The following features are explicitly not included in the initial release:

- User accounts / authentication
- Cloud sync / backup
- Social features / sharing
- Streak tracking / gamification
- Task categories or projects
- Calendar integration
- Analytics dashboard
- Widget support
- Apple Watch / Wear OS
- Multiple timer presets
- Custom sounds
- Focus music / ambient sounds
- Configurable timer durations (uses defaults: 25min focus, 5min break, 15min long break)
- Separate sound/vibration toggles (combined into single toggle)
- System theme detection (manual dark mode toggle only)
- Clear all data option

---

## Success Metrics

The app succeeds if users:

1. Complete focus sessions with clear task commitment
2. Honestly reflect on session outcomes
3. Return to the app consistently over time
4. Feel the app supports focus without adding pressure

Note: These are qualitative goals. The app intentionally avoids metrics-driven features like streaks.
