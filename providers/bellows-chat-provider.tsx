import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  type BellowsChatMessage,
  type BellowsConnectionSettings,
  type BellowsModel,
  bellowsChatCompletion,
  bellowsListModels,
} from '@/lib/bellows/client';
import { useOpencode } from '@/providers/opencode-provider';
import {
  BELLOWS_CHAT_MESSAGES_STORAGE_KEY,
  BELLOWS_CHAT_SESSIONS_STORAGE_KEY,
  BELLOWS_CHAT_SYSTEM_PROMPT_STORAGE_KEY,
  BELLOWS_CHAT_ACTIVE_SESSION_STORAGE_KEY,
} from '@/lib/storage-keys';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BellowsTokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface BellowsDisplayMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  tokenUsage?: BellowsTokenUsage;
}

export interface BellowsSession {
  id: string;
  title: string;
  messages: BellowsDisplayMessage[];
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

interface BellowsChatContextValue {
  sessions: BellowsSession[];
  activeSession: BellowsSession | null;
  createSession: () => void;
  switchSession: (id: string) => void;
  deleteSession: () => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  loading: boolean;
  error: string | null;
  models: BellowsModel[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  sendMessage: (text: string) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function createEmptySession(): BellowsSession {
  return {
    id: generateId(),
    title: 'New Chat',
    messages: [],
    tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
  };
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const BellowsChatContext = createContext<BellowsChatContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function BellowsChatProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useOpencode();

  const connectionSettings = useMemo<BellowsConnectionSettings>(() => ({
    serverUrl: settings.bellowsServerUrl || 'http://127.0.0.1:4000',
    apiKey: settings.bellowsApiKey || 'sk-anvil-safe-key',
  }), [settings.bellowsServerUrl, settings.bellowsApiKey]);

  const [sessions, setSessions] = useState<BellowsSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [systemPrompt, setSystemPromptState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<BellowsModel[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [initialized, setInitialized] = useState(false);

  const sessionsRef = useRef(sessions);
  sessionsRef.current = sessions;

  const activeSessionIdRef = useRef(activeSessionId);
  activeSessionIdRef.current = activeSessionId;

  const connectionSettingsRef = useRef(connectionSettings);
  connectionSettingsRef.current = connectionSettings;

  const systemPromptRef = useRef(systemPrompt);
  systemPromptRef.current = systemPrompt;

  // -------------------------------------------------------------------------
  // Persistence helpers
  // -------------------------------------------------------------------------

  const persistSessions = useCallback((updatedSessions: BellowsSession[]) => {
    void AsyncStorage.setItem(BELLOWS_CHAT_SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
  }, []);

  const persistActiveSessionId = useCallback((id: string) => {
    void AsyncStorage.setItem(BELLOWS_CHAT_ACTIVE_SESSION_STORAGE_KEY, id);
  }, []);

  // -------------------------------------------------------------------------
  // Load persisted state + migration
  // -------------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      try {
        const [storedSessions, storedActiveId, storedSystemPrompt, legacyMessages] = await Promise.all([
          AsyncStorage.getItem(BELLOWS_CHAT_SESSIONS_STORAGE_KEY),
          AsyncStorage.getItem(BELLOWS_CHAT_ACTIVE_SESSION_STORAGE_KEY),
          AsyncStorage.getItem(BELLOWS_CHAT_SYSTEM_PROMPT_STORAGE_KEY),
          AsyncStorage.getItem(BELLOWS_CHAT_MESSAGES_STORAGE_KEY),
        ]);

        if (cancelled) return;

        if (storedSystemPrompt) {
          setSystemPromptState(storedSystemPrompt);
        }

        if (storedSessions) {
          const parsed = JSON.parse(storedSessions) as BellowsSession[];
          if (parsed.length > 0) {
            setSessions(parsed);
            const activeId = storedActiveId && parsed.some(s => s.id === storedActiveId)
              ? storedActiveId
              : parsed[parsed.length - 1].id;
            setActiveSessionId(activeId);
            setInitialized(true);
            return;
          }
        }

        // Migration: old single-session data
        if (legacyMessages) {
          const parsed = JSON.parse(legacyMessages) as BellowsChatMessage[];
          if (parsed.length > 0) {
            const migratedSession: BellowsSession = {
              id: generateId(),
              title: parsed.find(m => m.role === 'user')?.content.slice(0, 30) || 'Migrated Chat',
              messages: parsed.map(m => ({ ...m })),
              tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
            };
            setSessions([migratedSession]);
            setActiveSessionId(migratedSession.id);
            void AsyncStorage.setItem(BELLOWS_CHAT_SESSIONS_STORAGE_KEY, JSON.stringify([migratedSession]));
            void AsyncStorage.setItem(BELLOWS_CHAT_ACTIVE_SESSION_STORAGE_KEY, migratedSession.id);
            void AsyncStorage.removeItem(BELLOWS_CHAT_MESSAGES_STORAGE_KEY);
            setInitialized(true);
            return;
          }
        }

        // No data - create a fresh session
        const fresh = createEmptySession();
        setSessions([fresh]);
        setActiveSessionId(fresh.id);
        void AsyncStorage.setItem(BELLOWS_CHAT_SESSIONS_STORAGE_KEY, JSON.stringify([fresh]));
        void AsyncStorage.setItem(BELLOWS_CHAT_ACTIVE_SESSION_STORAGE_KEY, fresh.id);
        setInitialized(true);
      } catch {
        // On failure, start with a fresh session
        if (!cancelled) {
          const fresh = createEmptySession();
          setSessions([fresh]);
          setActiveSessionId(fresh.id);
          setInitialized(true);
        }
      }
    }

    void loadState();
    return () => { cancelled = true; };
  }, []);

  // -------------------------------------------------------------------------
  // Fetch models
  // -------------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function fetchModels() {
      try {
        const result = await bellowsListModels(connectionSettings);
        if (!cancelled) {
          setModels(result);
        }
      } catch {
        // Models list is optional
      }
    }

    void fetchModels();
    return () => { cancelled = true; };
  }, [connectionSettings]);

  // -------------------------------------------------------------------------
  // Session management
  // -------------------------------------------------------------------------

  const createSession = useCallback(() => {
    const newSession = createEmptySession();
    const updated = [...sessionsRef.current, newSession];
    setSessions(updated);
    setActiveSessionId(newSession.id);
    setError(null);
    persistSessions(updated);
    persistActiveSessionId(newSession.id);
  }, [persistSessions, persistActiveSessionId]);

  const switchSession = useCallback((id: string) => {
    if (sessionsRef.current.some(s => s.id === id)) {
      setActiveSessionId(id);
      setError(null);
      persistActiveSessionId(id);
    }
  }, [persistActiveSessionId]);

  const deleteSession = useCallback(() => {
    const remaining = sessionsRef.current.filter(s => s.id !== activeSessionIdRef.current);
    const fresh = createEmptySession();
    const updated = remaining.length > 0 ? remaining : [fresh];
    const newActiveId = remaining.length > 0 ? remaining[remaining.length - 1].id : fresh.id;
    setSessions(updated);
    setActiveSessionId(newActiveId);
    setError(null);
    persistSessions(updated);
    persistActiveSessionId(newActiveId);
  }, [persistSessions, persistActiveSessionId]);

  // -------------------------------------------------------------------------
  // System prompt
  // -------------------------------------------------------------------------

  const setSystemPrompt = useCallback((prompt: string) => {
    setSystemPromptState(prompt);
    void AsyncStorage.setItem(BELLOWS_CHAT_SYSTEM_PROMPT_STORAGE_KEY, prompt);
  }, []);

  // -------------------------------------------------------------------------
  // Send message
  // -------------------------------------------------------------------------

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: BellowsDisplayMessage = { role: 'user', content: text };

    // Update active session with user message
    const currentSessions = sessionsRef.current;
    const activeId = activeSessionIdRef.current;
    const sessionIndex = currentSessions.findIndex(s => s.id === activeId);
    if (sessionIndex === -1) return;

    const activeSession = currentSessions[sessionIndex];
    const updatedMessages = [...activeSession.messages, userMessage];
    const title = activeSession.messages.length === 0
      ? text.slice(0, 30)
      : activeSession.title;

    const updatedSession: BellowsSession = { ...activeSession, messages: updatedMessages, title };
    const updatedSessions = [...currentSessions];
    updatedSessions[sessionIndex] = updatedSession;
    setSessions(updatedSessions);
    persistSessions(updatedSessions);
    setLoading(true);
    setError(null);

    try {
      // Build messages for API: system prompt first (if set), then conversation
      const apiMessages: BellowsChatMessage[] = [];
      const currentSystemPrompt = systemPromptRef.current;
      if (currentSystemPrompt.trim()) {
        apiMessages.push({ role: 'system', content: currentSystemPrompt });
      }
      for (const msg of updatedMessages) {
        apiMessages.push({ role: msg.role, content: msg.content });
      }

      const response = await bellowsChatCompletion(connectionSettingsRef.current, {
        model: selectedModel,
        messages: apiMessages,
      });

      const assistantContent = response.choices[0]?.message;
      if (assistantContent) {
        const assistantMessage: BellowsDisplayMessage = {
          role: 'assistant',
          content: assistantContent.content,
          tokenUsage: response.usage,
        };

        const latestSessions = sessionsRef.current;
        const latestIdx = latestSessions.findIndex(s => s.id === activeId);
        if (latestIdx !== -1) {
          const latestSession = latestSessions[latestIdx];
          const withAssistant = [...latestSession.messages, assistantMessage];
          const newTokenUsage = response.usage
            ? {
                promptTokens: latestSession.tokenUsage.promptTokens + response.usage.prompt_tokens,
                completionTokens: latestSession.tokenUsage.completionTokens + response.usage.completion_tokens,
                totalTokens: latestSession.tokenUsage.totalTokens + response.usage.total_tokens,
              }
            : latestSession.tokenUsage;

          const finalSession: BellowsSession = {
            ...latestSession,
            messages: withAssistant,
            tokenUsage: newTokenUsage,
          };
          const finalSessions = [...latestSessions];
          finalSessions[latestIdx] = finalSession;
          setSessions(finalSessions);
          persistSessions(finalSessions);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Request failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [selectedModel, persistSessions]);

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------

  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === activeSessionId) ?? null;
  }, [sessions, activeSessionId]);

  // -------------------------------------------------------------------------
  // Context value
  // -------------------------------------------------------------------------

  const value = useMemo<BellowsChatContextValue>(() => ({
    sessions,
    activeSession,
    createSession,
    switchSession,
    deleteSession,
    systemPrompt,
    setSystemPrompt,
    loading,
    error,
    models,
    selectedModel,
    setSelectedModel,
    sendMessage,
  }), [sessions, activeSession, createSession, switchSession, deleteSession, systemPrompt, setSystemPrompt, loading, error, models, selectedModel, sendMessage]);

  if (!initialized) {
    return null;
  }

  return (
    <BellowsChatContext.Provider value={value}>
      {children}
    </BellowsChatContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useBellowsChat(): BellowsChatContextValue {
  const ctx = useContext(BellowsChatContext);
  if (!ctx) {
    throw new Error('useBellowsChat must be used within a BellowsChatProvider');
  }
  return ctx;
}
