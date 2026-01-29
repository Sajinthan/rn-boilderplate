# AGENTS.md - React Native Boilerplate

## Project Overview

This is a React Native boilerplate built with Expo, TypeScript, and NativeWind (Tailwind CSS for React Native). It provides a solid foundation for building cross-platform mobile applications with a focus on developer experience and code quality.

## Tech Stack

- **Framework**: React Native 0.81+ with Expo 54+
- **Language**: TypeScript with strict mode
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (file-based routing)
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier, Husky (pre-commit hooks)

## Project Structure

```
src/
├── app/                    # Expo Router screens and layouts
│   ├── _layout.tsx         # Root layout with providers
│   └── index.tsx           # Home screen
├── assets/                 # Static assets (images, icons)
├── components/             # Reusable UI components
│   ├── Button/             # Button with variants and loading state
│   ├── Input/              # Form input with validation support
│   ├── Tab/                # Tabbed navigation component
│   ├── Picker/             # Dropdown/select component
│   ├── DatePicker/         # Platform-specific date picker
│   ├── TimePicker/         # Platform-specific time picker
│   ├── Toast/              # Toast notification system
│   ├── BackButton/         # Navigation back button
│   ├── BottomSheetWrapper/ # Bottom sheet modal wrapper
│   ├── KeyboardAwareWrapper/ # Keyboard-aware layout wrapper
│   └── index.ts            # Component exports
├── constants/              # App constants and theme
│   ├── theme.ts            # Colors, fonts, shadows
│   └── common.ts           # Common constants
├── hooks/                  # Custom React hooks
│   ├── useColorScheme.ts # Color scheme detection
│   └── useThemeColor.ts  # Theme color utilities
├── lib/                    # Utility functions
│   └── utils.ts            # Helper functions (cn, etc.)
└── global.css              # Tailwind CSS imports
```

## Component Guidelines

### Creating New Components

1. Create a new directory under `src/components/` with the component name
2. Add an `index.tsx` file with the component implementation
3. Export the component from `src/components/index.ts`
4. Use NativeWind classes for styling (Tailwind syntax)
5. Use the `cn()` utility for conditional class merging

### Component Patterns

```tsx
// Standard component structure
import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface Props {
  // Props definition
}

const MyComponent: React.FC<Props> = ({ ...props }) => {
  return <View className="flex-1">{/* Component content */}</View>;
};

export default MyComponent;
```

### Available Reusable Components

| Component              | Description                                                                       |
| ---------------------- | --------------------------------------------------------------------------------- |
| `Button`               | Versatile button with primary, secondary, danger, success, outline, text variants |
| `Input`                | Text input with label, icons, and form validation support                         |
| `Tab`                  | Tabbed navigation with animated indicator                                         |
| `Picker`               | Dropdown selection with modal                                                     |
| `DatePicker`           | Platform-specific date picker (iOS modal, Android native)                         |
| `TimePicker`           | Platform-specific time picker                                                     |
| `Toast`                | Error toast notifications                                                         |
| `BackButton`           | Navigation back button with platform-aware positioning                            |
| `BottomSheetWrapper`   | Gorhom bottom sheet wrapper with backdrop                                         |
| `KeyboardAwareWrapper` | Keyboard-aware view with dismiss on tap                                           |

## Styling Guidelines

### NativeWind (Tailwind) Classes

Use Tailwind classes via NativeWind for all styling:

```tsx
<View className="flex-1 bg-background p-4">
  <Text className="text-lg font-semibold text-foreground">Hello</Text>
</View>
```

### Theme Colors (CSS Variables)

The app uses CSS variables for theming. Common color classes:

- `bg-background`, `text-foreground` - Main background/text
- `bg-primary`, `text-primary` - Primary brand color
- `bg-secondary`, `text-secondary` - Secondary color
- `bg-destructive`, `text-destructive` - Error/danger color
- `bg-muted`, `text-muted-foreground` - Muted elements
- `border-border` - Border color

### Shadows (Inline Styles)

NativeWind doesn't fully support RN shadows. Use the SHADOWS constant:

```tsx
import { SHADOWS } from '@/constants/theme';

<View style={SHADOWS.calm}>{/* Content with shadow */}</View>;
```

## Navigation

This project uses Expo Router for file-based navigation:

- `src/app/_layout.tsx` - Root layout (providers, theme)
- `src/app/index.tsx` - Home screen (`/`)
- `src/app/[slug].tsx` - Dynamic routes
- `src/app/(tabs)/` - Tab navigation group

### Navigation Example

```tsx
import { useRouter } from 'expo-router';

const MyComponent = () => {
  const router = useRouter();

  return <Button title="Go to Profile" onPress={() => router.push('/profile')} />;
};
```

## Form Handling

Components support React Hook Form integration:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from '@/components';

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  return (
    <View>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field, fieldState }) => (
          <Input label="Email" value={field.value} onChangeText={field.onChange} error={fieldState.error} />
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

## Environment Variables

Create a `.env.local` file from `.env`:

```bash
cp .env .env.local
```

Environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in the app:

```
EXPO_PUBLIC_API_KEY=your_api_key
```

## Dependencies to Add for Components

Some components require additional dependencies. Install them as needed:

```bash
# Bottom sheet
pnpm add @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler

# Date/Time picker
pnpm add @react-native-community/datetimepicker react-native-modal

# Toast notifications
pnpm add react-native-toast-message

# Icons
pnpm add lucide-react-native react-native-svg

# Class merging utility
pnpm add clsx tailwind-merge
```

## Best Practices

1. **Component Organization**: Keep components small and focused
2. **Type Safety**: Use TypeScript interfaces for all props
3. **Styling**: Prefer NativeWind classes over inline styles
4. **Reusability**: Extract common patterns into reusable components
5. **Platform Handling**: Use `Platform.OS` for platform-specific code
6. **Error Handling**: Use Toast for user-facing errors
7. **Forms**: Use React Hook Form for form state management
