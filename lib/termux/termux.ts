/**
 * Termux / Shizuku Integration Helpers
 *
 * Provides functions to detect, launch, and interact with Termux on Android
 * for running the Bellows (LiteLLM) server locally on the device.
 */

import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const TERMUX_PACKAGE = 'com.termux';
export const TERMUX_RUN_COMMAND_ACTION = 'com.termux.RUN_COMMAND';
export const TERMUX_FDROID_URL = 'https://f-droid.org/packages/com.termux/';
export const DEFAULT_BELLOWS_PORT = 4000;
export const DEFAULT_BELLOWS_COMMAND =
  'litellm --config ~/bellows-config.yaml --port 4000';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TermuxStatus = {
  available: boolean;
  platform: 'android' | 'other';
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Checks whether the current platform is Android (Termux only exists on Android).
 */
export function isAndroid(): boolean {
  return Platform.OS === 'android';
}

/**
 * Attempts to detect if Termux is installed on the device.
 *
 * On Android, tries to resolve the Termux package via an intent.
 * On other platforms, always returns { available: false, platform: 'other' }.
 */
export async function isTermuxInstalled(): Promise<TermuxStatus> {
  if (!isAndroid()) {
    return { available: false, platform: 'other' };
  }

  try {
    // Try launching with VIEW action to check if Termux is resolvable
    await IntentLauncher.startActivityAsync('android.intent.action.MAIN', {
      packageName: TERMUX_PACKAGE,
    });
    return { available: true, platform: 'android' };
  } catch {
    // If the intent fails, Termux is likely not installed
    return { available: false, platform: 'android' };
  }
}

/**
 * Launches Termux with an optional command via the RUN_COMMAND intent.
 *
 * Requires Termux:API and appropriate permissions (com.termux.permission.RUN_COMMAND).
 */
export async function launchTermux(command?: string): Promise<void> {
  if (!isAndroid()) {
    return;
  }

  if (!command) {
    // Just open Termux without a command
    await IntentLauncher.startActivityAsync('android.intent.action.MAIN', {
      packageName: TERMUX_PACKAGE,
    });
    return;
  }

  // Launch with RUN_COMMAND intent
  await IntentLauncher.startActivityAsync(TERMUX_RUN_COMMAND_ACTION, {
    packageName: TERMUX_PACKAGE,
    extra: {
      'com.termux.RUN_COMMAND_PATH': '/data/data/com.termux/files/usr/bin/bash',
      'com.termux.RUN_COMMAND_ARGUMENTS': ['-c', command],
      'com.termux.RUN_COMMAND_BACKGROUND': false,
    },
  });
}

/**
 * Launches the Bellows (LiteLLM) server inside Termux.
 */
export async function launchBellowsServer(): Promise<void> {
  await launchTermux(DEFAULT_BELLOWS_COMMAND);
}

/**
 * Sends a kill command to stop the Bellows server running in Termux.
 */
export async function stopBellowsServer(): Promise<void> {
  await launchTermux('pkill -f litellm || true');
}

/**
 * Opens the F-Droid page for installing Termux.
 */
export async function openTermuxInstallPage(): Promise<void> {
  await Linking.openURL(TERMUX_FDROID_URL);
}

/**
 * Checks if the Bellows server is reachable on localhost.
 */
export async function checkBellowsServerHealth(
  port: number = DEFAULT_BELLOWS_PORT,
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`http://127.0.0.1:${port}/health`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}
