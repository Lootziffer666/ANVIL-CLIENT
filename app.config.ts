import type { ExpoConfig } from 'expo/config';
import { AndroidConfig, withAndroidManifest } from 'expo/config-plugins';
import type { ConfigPlugin } from 'expo/config-plugins';

/**
 * Config plugin that adds <queries><package android:name="com.termux"/></queries>
 * to AndroidManifest.xml for Android 11+ package visibility.
 */
const withTermuxQueries: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (modConfig) => {
    const manifest = modConfig.modResults.manifest;

    // Ensure the queries array exists
    if (!manifest.queries) {
      manifest.queries = [];
    }

    // Add the Termux package query
    manifest.queries.push({
      package: [{ $: { 'android:name': 'com.termux' } }],
    } as AndroidConfig.Manifest.ManifestQuery);

    return modConfig;
  });
};

function env(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

const appVariant = env('EXPO_APP_VARIANT') ?? 'production';
const isDevelopmentVariant = appVariant === 'development';
const isE2EMode = env('EXPO_PUBLIC_E2E_MODE') === '1';
const e2eServerUrl = env('EXPO_PUBLIC_E2E_SERVER_URL');
const defaultAndroidPackage = 'com.anvil.client';
const releaseAndroidPackage = env('EXPO_ANDROID_PACKAGE') ?? defaultAndroidPackage;
const developmentAndroidPackage = env('EXPO_ANDROID_PACKAGE_DEV') ?? `${releaseAndroidPackage}.dev`;
const androidPackage = isDevelopmentVariant ? developmentAndroidPackage : releaseAndroidPackage;

const config: ExpoConfig = {
  name: isDevelopmentVariant ? 'ANVIL Dev' : 'ANVIL',
  slug: 'anvil-client',
  version: '1.0.2',
  orientation: 'portrait',
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1A1D21"
  },
  icon: './assets/images/icon.png',
  scheme: 'anvilclient',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  android: {
    package: androidPackage,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: "#1A1D21"
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    permissions: ['com.termux.permission.RUN_COMMAND'],
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-notifications',
    'expo-background-task',
    [
      'expo-speech-recognition',
      {
        microphonePermission: 'Allow $(PRODUCT_NAME) to access the microphone for voice input.',
        speechRecognitionPermission: 'Allow $(PRODUCT_NAME) to convert speech to text on your device.',
        androidSpeechServicePackages: ['com.google.android.googlequicksearchbox', 'com.google.android.as'],
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#F6F2EB',
        dark: {
          backgroundColor: '#1A1D21',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    e2eMode: isE2EMode,
    e2eServerUrl,
  },
};

export default withTermuxQueries(config as Parameters<typeof withTermuxQueries>[0]) as unknown as ExpoConfig;
