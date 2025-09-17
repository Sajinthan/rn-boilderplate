# React Native Boilerplate!

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Pre-requisites

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation) (recommended package manager)

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Create .env.local file

   ```bash
   cp .env .env.local
   ```

   Then, fill in the values for your environment variables.

   Example configuration:

   ```env
   EXPO_PUBLIC_API_KEY=
   ```

3. Start the app

   ```bash
   pnpm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Running on a physical iOS device

To run the app directly on a connected iOS device, use the following commands:

```bash
npx expo run:ios --device
```

To run the app on your device in Release mode:

```bash
npx expo run:ios --device --configuration Release
```

Make sure your device is connected to your Mac and trusted. You may need to have Xcode and the necessary provisioning profiles set up.

## Running on a physical Android device

To run the app directly on a connected Android device, use the following command:

```bash
npx expo run:android --device
```

To run the app on your Android device in Release mode:

```bash
npx expo run:android --device --variant Release
```

Ensure your Android device has USB debugging enabled and is connected to your computer. You may need to accept the debugging prompt on your device.

## Building with EAS

You can build production-ready binaries for iOS and Android using [EAS Build](https://docs.expo.dev/build/introduction/):

To build for Android:

```bash
eas build -p android
```

To build for iOS:

```bash
eas build -p ios
```

To build for iOS locally with the development profile:

```bash
eas build --platform ios --local --profile development
```

For more options and configuration, see the [EAS Build documentation](https://docs.expo.dev/build/).

## Code Quality

This project uses ESLint and Prettier to maintain code quality and consistent formatting.

### Available Scripts

- `pnpm run lint` - Run ESLint to check for code issues
- `pnpm run lint:fix` - Run ESLint and automatically fix issues
- `pnpm run format` - Format all files with Prettier
- `pnpm run format:check` - Check if files are formatted correctly

### Pre-commit Hooks

The project is configured with Husky and lint-staged to automatically run ESLint and Prettier on staged files before each commit. This ensures all code is properly formatted and follows the project's coding standards.

### Configuration

- **Prettier**: Configuration is in `.prettierrc`
- **ESLint**: Configuration is in `eslint.config.js`
- **Ignored files**: Listed in `.prettierignore`
