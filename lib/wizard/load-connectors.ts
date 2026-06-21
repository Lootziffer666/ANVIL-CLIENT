// TODO: Replace with dynamic load from RAPIER DB export
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CONNECTORS, type Connector } from './connectors';

const STORAGE_KEY = 'anvil_connectors_v1';

let _cached: Connector[] | null = null;

/**
 * Loads connectors from AsyncStorage if available, otherwise falls back
 * to the hardcoded CONNECTORS array bundled with the app.
 * The result is cached so that getConnectorsSync() can return it.
 */
export async function loadConnectors(): Promise<Connector[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Connector[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        _cached = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to hardcoded on any error
  }
  _cached = CONNECTORS;
  return CONNECTORS;
}

/**
 * Synchronous accessor returning connectors. Returns the cached result from
 * loadConnectors() if available, otherwise falls back to the bundled array.
 */
export function getConnectorsSync(): Connector[] {
  return _cached ?? CONNECTORS;
}
