// Data loader: tries bundled full DB (9.6k entries from RAPIER export),
// then AsyncStorage, then hardcoded CONNECTORS as ultimate fallback.
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CONNECTORS, type Connector } from './connectors';

const STORAGE_KEY = 'anvil_connectors_v1';

let _cached: Connector[] | null = null;

/**
 * Attempt to load the full 9.6k connector database exported from RAPIER.
 * Returns null if the asset is not bundled or fails to load.
 */
function loadBundledFull(): Connector[] | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../../assets/connectors-full.json') as Connector[];
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch {
    // Asset not available in this build - fall through
  }
  return null;
}

/**
 * Loads connectors with the following priority:
 * 1. Bundled full DB (assets/connectors-full.json) - 9.6k entries from RAPIER
 * 2. AsyncStorage (for dynamic updates)
 * 3. Hardcoded CONNECTORS array (166 entries, ultimate fallback)
 *
 * The result is cached so that getConnectorsSync() can return it.
 */
export async function loadConnectors(): Promise<Connector[]> {
  // Priority 1: Bundled full DB
  const bundled = loadBundledFull();
  if (bundled) {
    _cached = bundled;
    return bundled;
  }

  // Priority 2: AsyncStorage
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

  // Priority 3: Hardcoded fallback
  _cached = CONNECTORS;
  return CONNECTORS;
}

/**
 * Synchronous accessor returning connectors. Returns the cached result from
 * loadConnectors() if available, otherwise attempts bundled JSON, then
 * falls back to the bundled array.
 */
export function getConnectorsSync(): Connector[] {
  if (_cached) return _cached;
  const bundled = loadBundledFull();
  if (bundled) {
    _cached = bundled;
    return bundled;
  }
  return CONNECTORS;
}
