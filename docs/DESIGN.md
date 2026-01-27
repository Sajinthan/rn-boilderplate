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
| `secondary-foreground` | `#0A0A0A`            | Text on secondary            |
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
| `secondary-foreground` | `#F5F5F5`            | Text on secondary   |
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

### Layout Constants

| Token              | Value       | Usage                       |
| ------------------ | ----------- | --------------------------- |
| `nav-height`       | 80px (5rem) | Bottom navigation height    |
| `max-width`        | 480px       | Content container max width |
| `screen-padding`   | 16px        | Horizontal screen padding   |
| `safe-area-bottom` | env()       | Dynamic safe area           |

### Border Radius

| Token         | Value          | Usage           |
| ------------- | -------------- | --------------- |
| `radius`      | 12px (0.75rem) | Default radius  |
| `radius-md`   | 10px           | Medium elements |
| `radius-sm`   | 8px            | Small elements  |
| `radius-full` | 9999px         | Pills, circular |

---

## Components

### Button

**Variants:**

- `primary`: Green background, white text
- `secondary`: Muted background, dark text
- `outline`: Border only, no fill
- `text`: No background or border

**States:**

- Default: Normal appearance
- Pressed: Scale to 98% (`press-scale`)
- Disabled: 50% opacity
- Loading: Spinner replaces content

**Sizes:**

- `default`: 48px height, 16px padding
- `sm`: 36px height, 12px padding
- `lg`: 56px height, 20px padding

### Input

**States:**

- Default: Border color `input`
- Focused: Border color `primary`, ring visible
- Error: Border color destructive, error message below
- Disabled: 50% opacity, not editable

**Anatomy:**

- Optional label above
- Optional left/right icons
- Optional helper text below
- Optional error message below

### Mode Card

Used for Flexible/Strict mode selection.

**States:**

- Unselected: `border` color, 2px border
- Selected: `primary` color border, subtle background tint

**Content:**

- Title (heading style)
- Description (helper style)
- Optional badge ("Recommended")

### Chip/Tag

Used for reason selection in reflection.

**States:**

- Unselected: `muted` background
- Selected: `primary` background, white text

**Sizing:**

- Padding: 8px 16px
- Border radius: full (pill shape)

### Progress Ring

Circular SVG progress indicator for timer.

**Properties:**

- Size: 200px default
- Stroke width: 6px
- Background: `border` color
- Progress: `primary` color
- Animation: 0.5s ease on progress change

### Session Item

List item for history screen.

**Anatomy:**

- Task name (body text)
- Time and duration (helper text)
- Outcome icon (right side)

**Styling:**

- Bottom border separator
- Padding: 16px vertical
- Flex row layout

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
│    What will you focus on?  │
│                             │
│    ┌─────────────────────┐  │
│    │ Enter your task     │  │
│    └─────────────────────┘  │
│                             │
│    ┌─────────────────────┐  │
│    │ Success criteria    │  │
│    └─────────────────────┘  │
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
├─────────────────────────────┤
│  Focus    History  Settings │
└─────────────────────────────┘
```

### History Tab

```
┌─────────────────────────────┐
│                             │
│  ┌───────────────────────┐  │
│  │  3 / 5 completed      │  │
│  │  Today                │  │
│  └───────────────────────┘  │
│                             │
│  [Today] [7 days]           │
│                             │
│  ┌───────────────────────┐  │
│  │ Write documentation ✓ │  │
│  │ 2:30 PM · 25 min      │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Review PR           ⚠ │  │
│  │ 1:00 PM · 25 min      │  │
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
│  TIMER                      │
│  Focus duration      25 min │
│  Break duration       5 min │
│  Long break          15 min │
│                             │
│  PREFERENCES                │
│  Default strict mode    [ ] │
│  Sound                  [✓] │
│  Vibration              [✓] │
│                             │
│  APPEARANCE                 │
│  Dark mode           System │
│                             │
│  ABOUT                      │
│  All data stays on device.  │
│  Version 1.0.0              │
│                             │
│  [Clear all data]           │
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
