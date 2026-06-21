// TODO: Replace with dynamic load from RAPIER DB export
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CONNECTORS, type Connector } from './connectors';

const STORAGE_KEY = 'anvil_connectors_v1';

/**
 * Loads connectors from AsyncStorage if available, otherwise falls back
 * to the hardcoded CONNECTORS array bundled with the app.
 */
export async function loadConnectors(): Promise<Connector[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Connector[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fallback to hardcoded on any error
  }
  return CONNECTORS;
}

/**
 * Synchronous accessor returning the bundled connector list.
 * Use this when async loading is not feasible (e.g. initial render).
 */
export function getConnectorsSync(): Connector[] {
  return CONNECTORS;
}
