import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  List,
  Text,
} from 'react-native-paper';

import type { Colors } from '@/constants/theme';
import {
  checkBellowsServerHealth,
  DEFAULT_BELLOWS_PORT,
  isAndroid,
  isTermuxInstalled,
  launchBellowsServer,
  openTermuxInstallPage,
  stopBellowsServer,
  type TermuxStatus,
} from '@/lib/termux';

type Palette = typeof Colors.light;

type TermuxSectionProps = {
  palette: Palette;
};

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 10;

export function TermuxSection({ palette }: TermuxSectionProps) {
  const [termuxStatus, setTermuxStatus] = useState<TermuxStatus | null>(null);
  const [serverHealthy, setServerHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollCountRef = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current !== null) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    pollCountRef.current = 0;
  }, []);

  const pollHealth = useCallback(() => {
    pollCountRef.current += 1;
    if (pollCountRef.current > POLL_MAX_ATTEMPTS) {
      stopPolling();
      return;
    }
    pollTimerRef.current = setTimeout(async () => {
      const healthy = await checkBellowsServerHealth(DEFAULT_BELLOWS_PORT);
      if (healthy) {
        setServerHealthy(true);
        stopPolling();
      } else {
        pollHealth();
      }
    }, POLL_INTERVAL_MS);
  }, [stopPolling]);

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  const checkStatus = useCallback(async () => {
    setIsChecking(true);
    setError(null);
    try {
      const [status, healthy] = await Promise.all([
        isTermuxInstalled(),
        checkBellowsServerHealth(DEFAULT_BELLOWS_PORT),
      ]);
      setTermuxStatus(status);
      setServerHealthy(healthy);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Status check failed');
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (isAndroid()) {
      void checkStatus();
    } else {
      setTermuxStatus({ available: false, platform: 'other' });
    }
  }, [checkStatus]);

  async function handleLaunchServer() {
    setIsLaunching(true);
    setError(null);
    try {
      await launchBellowsServer();
      // Start auto-polling for server health after launch
      stopPolling();
      pollHealth();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to launch server');
    } finally {
      setIsLaunching(false);
    }
  }

  async function handleStopServer() {
    setIsStopping(true);
    setError(null);
    try {
      await stopBellowsServer();
      setServerHealthy(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to stop server');
    } finally {
      setIsStopping(false);
    }
  }

  async function handleInstallTermux() {
    try {
      await openTermuxInstallPage();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to open install page');
    }
  }

  // Non-Android: show a brief notice
  if (termuxStatus?.platform === 'other') {
    return (
      <Card mode="contained" style={[styles.card, { backgroundColor: palette.surface }]}>
        <Card.Content style={styles.section}>
          <Text variant="titleLarge" style={[styles.title, { color: palette.text }]}>
            Termux Server
          </Text>
          <Text variant="bodyMedium" style={{ color: palette.muted }}>
            Local Bellows server via Termux is available on Android only.
          </Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: palette.surface }]}>
      <Card.Content style={styles.section}>
        <Text variant="titleLarge" style={[styles.title, { color: palette.text }]}>
          Termux Server
        </Text>

        {/* Termux install status */}
        <List.Item
          title="Termux"
          titleStyle={{ color: palette.text }}
          description={
            termuxStatus === null
              ? 'Checking...'
              : termuxStatus.available
                ? 'Detected'
                : 'Not installed'
          }
          descriptionStyle={{
            color: termuxStatus?.available ? palette.tint : palette.muted,
          }}
          left={(props) => <List.Icon {...props} icon="console" color={palette.text} />}
          style={styles.listItem}
        />

        {/* Server health status */}
        <List.Item
          title="Bellows Server"
          titleStyle={{ color: palette.text }}
          description={
            serverHealthy === null
              ? 'Checking...'
              : serverHealthy
                ? `Running on port ${DEFAULT_BELLOWS_PORT}`
                : 'Not reachable'
          }
          descriptionStyle={{
            color: serverHealthy ? palette.tint : palette.muted,
          }}
          left={(props) => <List.Icon {...props} icon="server" color={palette.text} />}
          style={styles.listItem}
        />

        {/* Action buttons */}
        <View style={styles.buttonRow}>
          {termuxStatus?.available ? (
            <>
              <Button
                mode="contained"
                loading={isLaunching}
                disabled={isLaunching || isStopping}
                onPress={() => void handleLaunchServer()}
                style={styles.button}
              >
                Start Server
              </Button>
              <Button
                mode="outlined"
                loading={isStopping}
                disabled={isLaunching || isStopping}
                onPress={() => void handleStopServer()}
                style={styles.button}
              >
                Stop Server
              </Button>
            </>
          ) : (
            <Button
              mode="contained"
              onPress={() => void handleInstallTermux()}
              style={styles.button}
            >
              Install Termux (F-Droid)
            </Button>
          )}
        </View>

        {/* Refresh status button */}
        <Button
          mode="text"
          loading={isChecking}
          onPress={() => void checkStatus()}
          compact
        >
          Refresh Status
        </Button>

        {/* Error display */}
        {error ? (
          <Text variant="bodySmall" style={{ color: palette.danger }}>
            {error}
          </Text>
        ) : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16 },
  section: { gap: 14 },
  title: { fontWeight: '600' },
  listItem: { paddingLeft: 0, paddingVertical: 4 },
  buttonRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  button: { flex: 1, minWidth: 130 },
});
