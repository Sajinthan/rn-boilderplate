# Focus Flow - Design System

## Design Philosophy

**Calm Authority** - The app uses a minimalist design with a monochromatic palette and a single strategic green accent. The design prioritizes focus and reducing distractions through clean typography, ample whitespace, and subtle interactions.

### Principles

1. **Minimalist & Focused**: Only one accent color reduces decision fatigue
2. **Typography-Driven**: Clear hierarchy with defined text scales
3. **Monochromatic Base**: Grey/black/white with green signals
4. **Accessibility First**: High contrast, simple patterns
5. **Mobile-First**: Optimized for focused, single-hand use
6. **No Bloat**: Every element serves a purpose

---

## Styling Approach

**Use NativeWind/Tailwind classes for all styling:**

```tsx
// Preferred - use className with Tailwind classes
<View className="px-6 py-12 space-y-4 bg-muted rounded-xl">
<Text className="text-body text-foreground mb-8">
```

**Use theme constants only when needed programmatically:**

```tsx
// For SVG calculations
import { Layout } from '@/constants/theme';
const radius = (Layout.progressRingSize - Layout.progressRingStroke) / 2;

// For colors in non-className contexts (e.g., icons, SVG stroke)
import { useColors } from '@/hooks/useColors';
const colors = useColors();
<Circle stroke={colors.primary} />
<Icon color={colors.mutedForeground} />

// For shadows (NativeWind doesn't support RN shadow syntax)
import { SHADOWS } from '@/constants/theme';
<View style={SHADOWS.calm}>
```

---

## Color Palette

### Light Mode (Default)

| Token                  | Value                | Usage                        |
| ---------------------- | -------------------- | ---------------------------- |
| `background`           | `#FFFFFF`            | Primary background           |
| `foreground`           | `#0A0A0A`            | Primary text                 |
| `muted`                | `#F5F5F5`            | Secondary surfaces, cards    |
| `muted-foreground`     | `#737373`            | Secondary text, placeholders |
| `primary`              | `hsl(142, 71%, 45%)` | Green accent, CTAs           |
| `primary-foreground`   | `#FFFFFF`            | Text on primary              |
| `secondary`            | `#F5F5F5`            | Secondary buttons            |
| `secondary-foreground` | `#333333`            | Text on secondary            |
| `border`               | `#E5E5E5`            | Borders, dividers            |
| `input`                | `#E5E5E5`            | Input borders                |
| `ring`                 | `hsl(142, 71%, 45%)` | Focus rings                  |

### Dark Mode

| Token                  | Value                | Usage               |
| ---------------------- | -------------------- | ------------------- |
| `background`           | `#0A0A0A`            | Primary background  |
| `foreground`           | `#F5F5F5`            | Primary text        |
| `muted`                | `#1F1F1F`            | Secondary surfaces  |
| `muted-foreground`     | `#8C8C8C`            | Secondary text      |
| `primary`              | `hsl(142, 71%, 45%)` | Green accent (same) |
| `primary-foreground`   | `#FFFFFF`            | Text on primary     |
| `secondary`            | `#1F1F1F`            | Secondary buttons   |
| `secondary-foreground` | `#CCCCCC`            | Text on secondary   |
| `border`               | `#282828`            | Borders, dividers   |
| `input`                | `#282828`            | Input borders       |
| `ring`                 | `hsl(142, 71%, 45%)` | Focus rings         |

### Semantic Colors

| Token         | Light        | Dark         | Usage                  |
| ------------- | ------------ | ------------ | ---------------------- |
| `success`     | Green accent | Green accent | Completed states       |
| `warning`     | `#F59E0B`    | `#F59E0B`    | Partial completion     |
| `destructive` | `#737373`    | `#8C8C8C`    | Neutral/muted (no red) |

**Note**: The design intentionally avoids red/destructive colors to maintain a calm tone.

---

## Typography

### Font Family

**Primary**: Inter

- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Fallback: system-ui, -apple-system, sans-serif

### Type Scale

| Class           | Size             | Weight | Line Height | Usage                       |
| --------------- | ---------------- | ------ | ----------- | --------------------------- |
| `text-title`    | 32px (2rem)      | 500    | 1.2         | Main titles, screen headers |
| `text-heading`  | 18px (1.125rem)  | 600    | 1.3         | Section headings            |
| `text-body`     | 15px (0.9375rem) | 400    | 1.5         | Body copy, primary content  |
| `text-button`   | 15px (0.9375rem) | 500    | 1           | Button labels               |
| `text-helper`   | 13px (0.8125rem) | 400    | 1.4         | Labels, hints, captions     |
| `timer-display` | 48px (3rem)      | 500    | 1           | Timer countdown             |

### Letter Spacing

- Headings: `-0.02em` (tight)
- Body: `0` (normal)
- Helper: `0.01em` (slightly loose)

---

## Spacing & Layout

### Spacing Scale

Uses Tailwind's default spacing scale:

- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px
- `10` = 40px
- `12` = 48px
- `16` = 64px
- `20` = 80px
- `32` = 128px

### Layout Constants

| Token              | Value        | Usage                       |
| ------------------ | ------------ | --------------------------- |
| `nav-height`       | 80px (5rem)  | Bottom navigation height    |
| `max-width`        | 480px        | Content container max width |
| `screen-padding-x` | 24px (px-6)  | Horizontal screen padding   |
| `screen-padding-y` | 48px (py-12) | Vertical screen padding     |
| `safe-area-bottom` | env()        | Dynamic safe area           |

### Screen Layout Patterns

| Screen          | Padding                   | Notes                              |
| --------------- | ------------------------- | ---------------------------------- |
| Task Commitment | `px-6 py-12`              | Content max-w-sm (384px), centered |
| Focus Session   | `px-6 pt-16 pb-32`        | Nav hidden, timer centered         |
| Break           | `px-6 pt-20`, spacer h-32 | Muted background, nav hidden       |
| Reflection      | `px-6 py-12`              | Nav visible                        |
| History         | `px-6 py-12`              | Header pt-4                        |
| Settings        | `px-6 py-12`              | Header pt-4, about mt-auto         |

### Common Spacing Patterns

| Pattern           | Value         | Pixels  | Usage                          |
| ----------------- | ------------- | ------- | ------------------------------ |
| Section gap       | `mb-8`        | 32px    | Between major sections         |
| Element group gap | `space-y-3`   | 12px    | Between buttons, outcome cards |
| Form field gap    | `space-y-4`   | 16px    | Between input fields           |
| Header to content | `mb-8`        | 32px    | After screen title             |
| Card padding      | `p-5`/`p-6`   | 20-24px | Internal card padding          |
| List item padding | `py-4`/`py-5` | 16-20px | Vertical list item padding     |
| Chip/tag gap      | `gap-2`       | 8px     | Between chips                  |
| Settings item gap | `space-y-1`   | 4px     | Between settings rows          |

### Element-Specific Spacing

#### Task Commitment Screen

| Element                | Spacing      | Value       |
| ---------------------- | ------------ | ----------- |
| Screen padding         | `px-6 py-12` | 24px / 48px |
| Heading to inputs      | `mb-8`       | 32px        |
| Between input fields   | `space-y-4`  | 16px        |
| Inputs to helper text  | `mb-6`       | 24px        |
| Helper text to buttons | `mb-8`       | 32px        |
| Between buttons        | `space-y-3`  | 12px        |
| Schedule link icon gap | `gap-2`      | 8px         |

#### Focus Session Screen

| Element                  | Spacing           | Value              |
| ------------------------ | ----------------- | ------------------ |
| Top section padding      | `px-6 pt-16 pb-8` | 24px / 64px / 32px |
| Label to task name       | `mt-2`            | 8px                |
| Timer section padding    | `px-6`            | 24px               |
| Bottom section padding   | `px-6 pb-32`      | 24px / 128px       |
| End session link padding | `py-4`            | 16px               |

#### Break Screen

| Element          | Spacing      | Value       |
| ---------------- | ------------ | ----------- |
| Top padding      | `px-6 pt-20` | 24px / 80px |
| Timer to message | `mb-8`       | 32px        |
| Bottom spacer    | `h-32`       | 128px       |

#### Reflection Screen

| Element                    | Spacing          | Value       |
| -------------------------- | ---------------- | ----------- |
| Screen padding             | `px-6 py-12`     | 24px / 48px |
| Header section             | `pt-8 mb-12`     | 32px / 48px |
| "Session complete" to task | `mb-2`           | 8px         |
| Question to outcomes       | `mb-8`           | 32px        |
| Between outcome buttons    | `space-y-3`      | 12px        |
| Outcome icon gap           | `gap-4`          | 16px        |
| Outcomes to reasons        | `mb-8`           | 32px        |
| Reasons label to chips     | `mb-4`           | 16px        |
| Between reason chips       | `gap-2`          | 8px         |
| Actions section            | `pt-8 space-y-3` | 32px / 12px |
| Between action links       | `gap-3`          | 12px        |
| Action link padding        | `py-3`           | 12px        |

#### History Screen

| Element              | Spacing      | Value       |
| -------------------- | ------------ | ----------- |
| Screen padding       | `px-6 py-12` | 24px / 48px |
| Header section       | `pt-4 mb-8`  | 16px / 32px |
| Summary card padding | `p-6`        | 24px        |
| Summary card margin  | `mb-8`       | 32px        |
| "Today" to count     | `mb-1`       | 4px         |
| Count to suffix      | `mt-1`       | 4px         |
| Filter tabs gap      | `gap-2`      | 8px         |
| Filters to list      | `mb-6`       | 24px        |
| Session item padding | `py-4`       | 16px        |
| Icon margin left     | `ml-4`       | 16px        |

#### Settings Screen

| Element              | Spacing              | Value              |
| -------------------- | -------------------- | ------------------ |
| Screen padding       | `px-6 py-12`         | 24px / 48px        |
| Header section       | `pt-4 mb-8`          | 16px / 32px        |
| Between settings     | `space-y-1`          | 4px                |
| Setting item padding | `py-5`               | 20px               |
| Label to description | `mt-0.5`             | 2px                |
| About section        | `mt-auto pt-12 pb-8` | auto / 48px / 32px |
| About card padding   | `p-5`                | 20px               |
| About to version     | `mt-6`               | 24px               |

#### Mode Selection Modal

| Element              | Spacing       | Value     |
| -------------------- | ------------- | --------- |
| Header padding       | `pb-2`        | 8px       |
| Content padding      | `py-4`        | 16px      |
| Between mode cards   | `space-y-3`   | 12px      |
| Mode card padding    | `p-5`         | 20px      |
| Card content gap     | `gap-3`       | 12px      |
| Title to description | `mt-1`        | 4px       |
| Badge padding        | `px-2 py-0.5` | 8px / 2px |
| Footer padding       | `pt-2`        | 8px       |

#### Schedule Sheet

| Element             | Spacing     | Value |
| ------------------- | ----------- | ----- |
| Header padding      | `pb-4`      | 16px  |
| Content padding     | `py-6`      | 24px  |
| Time picker gap     | `gap-4`     | 16px  |
| Time picker margin  | `mb-8`      | 32px  |
| AM/PM button gap    | `gap-1`     | 4px   |
| Summary margin      | `mb-8`      | 32px  |
| Between actions     | `space-y-3` | 12px  |
| Cancel link padding | `py-3`      | 12px  |

### Border Radius

| Token         | Value          | Usage                   |
| ------------- | -------------- | ----------------------- |
| `radius`      | 12px (0.75rem) | Default radius, cards   |
| `radius-xl`   | 16px (1rem)    | Mode cards, large cards |
| `radius-2xl`  | 24px (1.5rem)  | Modal corners           |
| `radius-lg`   | 12px           | Chips, inputs           |
| `radius-md`   | 10px           | Medium elements         |
| `radius-sm`   | 8px            | Small elements          |
| `radius-full` | 9999px         | Pills, circular icons   |

---

## Components

### Bottom Navigation

Fixed navigation bar at bottom of screen.

**Sizing:**

- Height: 80px (h-20)
- Position: `fixed bottom-0 left-0 right-0`
- Z-index: 50
- Safe area padding: `pb-safe`

**Layout:**

- Container: `app-container` (max-width 480px, centered)
- Tabs: `flex items-center justify-around`
- Each tab: `flex flex-col items-center justify-center flex-1 h-full gap-1`

**Tab Content:**

- Icon: 24px (w-6 h-6)
- Icon stroke: 2px when active, 1.5px when inactive
- Label: `text-helper font-medium`
- Active color: `text-foreground`
- Inactive color: `text-muted-foreground`

**Styling:**

- Background: `bg-background`
- Border: `border-t border-border`
- Interaction: `press-scale`

**Tab Labels:**

- Focus (Clock icon)
- History (History icon)
- Settings (Settings icon)

**Visibility:**

- Hidden during Focus Session and Break screens

### Button

**Variants:**

- `primary`: Green background, white text
- `secondary`: Muted background, dark text
- `outline`: Border only, no fill
- `text`: No background or border (used for "End session", "New task", "End" links)

**States:**

- Default: Normal appearance
- Pressed: Scale to 98% (`press-scale`)
- Disabled: 50% opacity
- Loading: Spinner replaces content

**Sizes:**

- `lg` (primary actions): 56px height (h-14), full width
- `default`: 48px height, 16px padding
- `sm`: 36px height, 12px padding
- `text-link`: py-3 or py-4, no fixed height

### Input

**Sizing:**

- Task input (primary): 56px height (h-14)
- Success criteria input: 48px height (h-12)
- Background: `muted` color, no visible border
- Text style: `text-body`
- Placeholder opacity: 60%

**States:**

- Default: `bg-muted border-0`
- Focused: Border color `primary`, ring visible
- Error: Border color destructive, error message below
- Disabled: 50% opacity, not editable

**Anatomy:**

- Optional label above
- Optional left/right icons
- Optional helper text below
- Optional error message below

### Mode Card

Used for Flexible/Strict mode selection in the "Choose your mode" modal.

**Sizing:**

- Padding: `p-5` (20px)
- Border radius: `rounded-xl` (16px)
- Border: 2px
- Gap between cards: `space-y-3` (12px)

**States:**

- Unselected: `border-border`
- Selected: `border-primary`

**Content Layout:**

- Layout: `flex items-start justify-between gap-3`
- Title: `text-body font-medium text-foreground`
- Description: `text-helper text-muted-foreground mt-1`
- Selection indicator: 20px circle (w-5 h-5), `rounded-full border-2`

**Recommended Badge:**

- Padding: `px-2 py-0.5`
- Border radius: `rounded-full`
- Background: `bg-primary/10`
- Text: `text-helper font-medium text-primary`

**Mode Options:**

- **Flexible mode**: "You can end the session early if needed."
- **Strict mode**: "Session runs until completion. Helps build discipline." + Recommended badge

**Modal Layout:**

- Modal width: `sm:max-w-md` (448px), `mx-4` margin on mobile
- Modal radius: `rounded-2xl` (24px)
- Header padding: `pb-2`
- Content padding: `py-4`
- Footer padding: `pt-2`
- Button height: `h-14` (56px)

### Outcome Button

Used for outcome selection in reflection screen (Completed, Partially completed, Not completed).

**Sizing:**

- Padding: `p-4` (16px)
- Border radius: `rounded-xl` (16px)
- Border: 2px
- Gap between buttons: `space-y-3` (12px)
- Icon container: 40px (w-10 h-10), `rounded-full`
- Icon size: 20px (w-5 h-5)

**Layout:**

- `flex items-center gap-4`
- Label: `text-body font-medium`

**States:**

- Unselected: `border-border`, icon bg `bg-muted text-muted-foreground`
- Selected (Completed): `border-primary bg-primary/5`, icon bg `bg-primary text-primary-foreground`
- Selected (Partial/Not): `border-foreground bg-foreground/5`, icon bg `bg-foreground text-background`

**Interaction:**

- Press scale: `scale-[0.98]` on active

### Chip/Tag

Used for reason selection in reflection and filter tabs in history.

**States:**

- Unselected: `muted` background, `muted-foreground` text
- Selected: `primary` background, `primary-foreground` text

**Sizing:**

- Padding: `px-4 py-2` (16px horizontal, 8px vertical)
- Border radius: `rounded-lg` (12px)
- Text style: `text-sm font-medium`
- Gap between chips: `gap-2` (8px)

### Progress Ring

Circular SVG progress indicator for timer.

**Properties:**

- Size: 280px
- Stroke width: 4px
- Background stroke: `muted` color
- Progress stroke: `primary` color
- Rotation: -90deg (starts from top)
- Stroke linecap: round
- Animation: 0.5s ease on stroke-dashoffset change

**Timer Text:**

- Centered inside ring using absolute positioning
- Style: `timer-display` (48px, medium weight, tabular-nums)

### Summary Card

Used for today's session summary in History screen.

**Sizing:**

- Padding: `p-6` (24px)
- Border radius: `rounded-xl` (16px)
- Background: `bg-muted`
- Margin bottom: `mb-8` (32px)

**Content:**

- Label: `text-helper text-muted-foreground mb-1` ("Today")
- Count: `text-title text-foreground` (e.g., "3")
- Total: `text-muted-foreground font-normal` (e.g., "/ 5")
- Suffix: `text-helper text-muted-foreground mt-1` ("sessions completed")

### Session Item

List item for history screen.

**Anatomy:**

- Task name: `text-body font-medium`, truncate overflow
- Time: `text-helper text-muted-foreground`
- Outcome icon: 16px (w-4 h-4) in 32px circular container (w-8 h-8)

**Styling:**

- Layout: `flex items-center justify-between`
- Padding: `py-4` (16px vertical)
- Border: `border-b border-border`, `last:border-0`
- Icon container: `rounded-full bg-muted`
- Icon margin: `ml-4`

### Settings Item

Used for toggle settings in Settings screen.

**Sizing:**

- Padding: `py-5` (20px vertical)
- Border: `border-b border-border`
- Gap between items: `space-y-1` (4px)

**Layout:**

- `flex items-center justify-between`
- Label: `text-foreground text-body font-medium`
- Description: `text-helper text-muted-foreground mt-0.5`
- Switch on right side

### About Card

Used for privacy notice in Settings screen.

**Sizing:**

- Padding: `p-5` (20px)
- Border radius: `rounded-xl` (16px)
- Background: `bg-muted`
- Position: `mt-auto` (pushed to bottom)
- Top padding: `pt-12` (48px)
- Bottom padding: `pb-8` (32px)

**Content:**

- Text: `text-helper text-muted-foreground leading-relaxed`
- Version below: `text-center text-helper text-muted-foreground mt-6`

### Schedule Sheet

Bottom sheet for scheduling session start time.

**Sheet Layout:**

- Border radius: `rounded-t-2xl` (24px top corners)
- Header padding: `pb-4`
- Content padding: `py-6`

**Time Picker:**

- Layout: `flex items-center justify-center gap-4`
- Margin bottom: `mb-8`
- Select inputs: 80px width, 64px height (w-20 h-16)
- Select style: `text-3xl font-medium text-center bg-muted rounded-xl border-0`
- Colon separator: `text-3xl font-medium text-muted-foreground`

**AM/PM Toggle:**

- Layout: `flex flex-col gap-1`
- Button padding: `px-4 py-2`
- Button radius: `rounded-lg`
- Active state: `bg-foreground text-background`
- Inactive state: `bg-muted text-muted-foreground`

**Summary Text:**

- Style: `text-center text-muted-foreground text-body`
- Time highlight: `text-foreground font-medium`
- Margin: `mb-8`

**Actions:**

- Button spacing: `space-y-3`
- Primary button: "Confirm schedule", `h-14` (56px)
- Cancel link: `py-3 text-helper text-muted-foreground`

---

## Animations

| Name            | Duration | Easing      | Usage                     |
| --------------- | -------- | ----------- | ------------------------- |
| `fade-in`       | 300ms    | ease-out    | Screen transitions        |
| `press-scale`   | instant  | -           | Button press (scale 0.98) |
| `progress-ring` | 500ms    | ease        | Timer progress updates    |
| `slide-up`      | 200ms    | ease-out    | Bottom sheets, modals     |
| `pulse-subtle`  | 2000ms   | ease-in-out | Gentle notifications      |

### Motion Principles

- Subtle and purposeful
- No bouncy or playful animations
- Respect reduced motion preferences
- Progress updates smooth, not jumpy

---

## Iconography

**Library**: Lucide React Native

**Size**: 24px default

**Stroke**: 2px

### Icon Usage

| Icon            | Usage                  |
| --------------- | ---------------------- |
| `Clock`         | Focus tab, timer       |
| `History`       | History tab            |
| `Settings`      | Settings tab           |
| `Check`         | Completed outcome      |
| `AlertTriangle` | Partial outcome        |
| `X`             | Not completed outcome  |
| `Play`          | Start session          |
| `Pause`         | Pause (flexible mode)  |
| `ChevronRight`  | Navigation, disclosure |

---

## Screen Layouts

### Focus Tab - Commitment

```
┌─────────────────────────────┐
│                             │
│                             │
│  What are you working on?   │
│                             │
│    ┌─────────────────────┐  │
│    │ Enter your task     │  │
│    └─────────────────────┘  │
│                             │
│    ┌─────────────────────┐  │
│    │ What does success   │  │
│    │ look like? (optional)│  │
│    └─────────────────────┘  │
│                             │
│    One task. One session.   │
│                             │
│    ┌─────────────────────┐  │
│    │     Start now       │  │
│    └─────────────────────┘  │
│                             │
│       Schedule start        │
│                             │
├─────────────────────────────┤
│  Focus    History  Settings │
└─────────────────────────────┘
```

### Focus Tab - Session

```
┌─────────────────────────────┐
│                             │
│        FOCUSING ON          │
│        Current Task         │
│                             │
│                             │
│          ┌─────┐            │
│         /       \           │
│        │  24:30  │          │
│         \       /           │
│          └─────┘            │
│                             │
│                             │
│                             │
│        End session          │
│                             │
│  (nav hidden during focus)  │
└─────────────────────────────┘
```

### Focus Tab - Break

```
┌─────────────────────────────┐
│                             │
│           BREAK             │
│                             │
│                             │
│                             │
│           4:59              │
│                             │
│   Step away. Rest your mind.│
│                             │
│                             │
│                             │
│  (nav hidden during break)  │
└─────────────────────────────┘
```

**Break Screen Notes:**

- Background uses `muted` color instead of `background`
- Timer display without progress ring
- Simple, calming message

### Focus Tab - Reflection

```
┌─────────────────────────────┐
│                             │
│  Session complete           │
│  Task Name Here             │
│                             │
│  Did you achieve what you   │
│  set out to do?             │
│                             │
│  ┌─────────────────────┐    │
│  │ ✓  Completed        │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ ⚠  Partially done   │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ ✕  Not completed    │    │
│  └─────────────────────┘    │
│                             │
│  What got in the way?       │
│  (optional)                 │
│                             │
│  [Distracted] [Task too big]│
│  [Low energy] [Interrupted] │
│                             │
│    ┌─────────────────────┐  │
│    │     Continue        │  │
│    └─────────────────────┘  │
│                             │
│     New task      End       │
│                             │
├─────────────────────────────┤
│  Focus    History  Settings │
└─────────────────────────────┘
```

### History Tab

```
┌─────────────────────────────┐
│                             │
│  History                    │
│                             │
│  ┌───────────────────────┐  │
│  │  Today                │  │
│  │  3 / 5                │  │
│  │  sessions completed   │  │
│  └───────────────────────┘  │
│                             │
│  [Today] [7 days]           │
│                             │
│  ┌───────────────────────┐  │
│  │ Write documentation ✓ │  │
│  │ 9:00 AM               │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Review PR           ⚠ │  │
│  │ 10:30 AM              │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  Focus    History  Settings │
└─────────────────────────────┘
```

### Settings Tab

```
┌─────────────────────────────┐
│                             │
│  Settings                   │
│                             │
│  Default to strict mode     │
│  Prevent early session exit │
│                         [ ] │
│  ─────────────────────────  │
│  Sound & vibration          │
│  Session start and end      │
│  alerts                 [✓] │
│  ─────────────────────────  │
│  Dark mode                  │
│  Easier on the eyes     [ ] │
│  ─────────────────────────  │
│                             │
│  ┌───────────────────────┐  │
│  │ No account required.  │  │
│  │ All data stays on     │  │
│  │ your device.          │  │
│  └───────────────────────┘  │
│                             │
│       Version 1.0.0         │
│                             │
├─────────────────────────────┤
│  Focus    History  Settings │
└─────────────────────────────┘
```

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

### Touch Targets

Minimum touch target: 44x44 points

### Focus States

All interactive elements have visible focus rings using `ring` color.

### Motion

Respect `prefers-reduced-motion`:

- Disable animations
- Instant transitions
- Static progress indicators

---

## Platform Considerations

### iOS

- Safe area insets for notch/Dynamic Island
- System fonts fallback
- Native date/time pickers
- Haptic feedback via Taptic Engine

### Android

- Edge-to-edge display
- Material-style ripples optional
- Native date/time pickers
- Vibration feedback

---

## Assets

### App Icon

- Simple, monochromatic design
- Green accent optional
- Works at all sizes (1024px master)

### Splash Screen

- Centered logo/icon
- Background matches theme
- Fade transition to app

---

## References

- Source design: `~/Projects/focus-flow-ux`
- Tailwind config: `tailwind.config.ts`
- Color constants: `src/constants/Colors.ts`
