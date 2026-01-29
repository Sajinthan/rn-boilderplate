import packageJson from './package.json';

export default {
  expo: {
    name: 'focus-flow',
    slug: 'focus-flow',
    version: packageJson.version,
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'rnboilerplate',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.sajiron.focusflow',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './src/assets/images/android-icon-foreground.png',
        backgroundImage: './src/assets/images/android-icon-background.png',
        monochromeImage: './src/assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      package: 'com.sajiron.focusflow',
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'static',
      favicon: './src/assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-web-browser',
      [
        'expo-notifications',
        {
          sounds: [],
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
