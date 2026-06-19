import React, { useCallback, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, IconButton, Menu, Modal, Portal, Surface, Text, TextInput } from 'react-native-paper';

import { type BellowsDisplayMessage } from '@/providers/bellows-chat-provider';
import { MarkdownText } from '@/components/chat/chat-markdown';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BellowsChatProvider, useBellowsChat } from '@/providers/bellows-chat-provider';

// ---------------------------------------------------------------------------
// Message Bubble
// ---------------------------------------------------------------------------

function MessageBubble({ message, palette }: { message: BellowsDisplayMessage; palette: typeof Colors.light }) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
      <Surface
        style={[
          styles.bubble,
          {
            backgroundColor: isUser ? palette.bubbleUser : palette.bubbleAssistant,
            alignSelf: isUser ? 'flex-end' : 'flex-start',
          },
        ]}
        elevation={1}
      >
        {isUser ? (
          <Text
            style={[
              styles.bubbleText,
              { color: palette.onBubbleUser },
            ]}
          >
            {message.content}
          </Text>
        ) : (
          <MarkdownText
            text={message.content}
            color={palette.onBubbleAssistant}
            mutedColor={palette.muted}
          />
        )}
      </Surface>
      {!isUser && message.tokenUsage && (
        <Text style={[styles.tokenLabel, { color: palette.muted }]}>
          {'\u2191'}{message.tokenUsage.prompt_tokens}{' '}
          {'\u2193'}{message.tokenUsage.completion_tokens}{' '}
          {'\u03A3'}{message.tokenUsage.total_tokens}
        </Text>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Session Chips
// ---------------------------------------------------------------------------

function SessionChips({ palette }: { palette: typeof Colors.light }) {
  const { sessions, activeSession, switchSession } = useBellowsChat();

  return (
    <View style={[styles.chipsContainer, { borderBottomColor: palette.border }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContent}>
        {sessions.map(session => {
          const isActive = session.id === activeSession?.id;
          return (
            <Surface
              key={session.id}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? palette.tint : palette.surfaceAlt,
                },
              ]}
              elevation={0}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isActive ? '#fff' : palette.text },
                ]}
                numberOfLines={1}
                onPress={() => switchSession(session.id)}
              >
                {session.title}
              </Text>
            </Surface>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ---------------------------------------------------------------------------
// System Prompt Modal
// ---------------------------------------------------------------------------

function SystemPromptModal({
  visible,
  onDismiss,
  palette,
}: {
  visible: boolean;
  onDismiss: () => void;
  palette: typeof Colors.light;
}) {
  const { systemPrompt, setSystemPrompt } = useBellowsChat();
  const [draft, setDraft] = useState(systemPrompt);

  // Sync draft when modal opens
  React.useEffect(() => {
    if (visible) {
      setDraft(systemPrompt);
    }
  }, [visible, systemPrompt]);

  const handleSave = () => {
    setSystemPrompt(draft);
    onDismiss();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modalContainer, { backgroundColor: palette.surface }]}>
        <Text style={[styles.modalTitle, { color: palette.text }]}>System Prompt</Text>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={6}
          value={draft}
          onChangeText={setDraft}
          placeholder="Enter a system prompt (optional)..."
          placeholderTextColor={palette.muted}
          textColor={palette.text}
          outlineColor={palette.border}
          activeOutlineColor={palette.tint}
          style={[styles.modalInput, { backgroundColor: palette.surfaceAlt }]}
        />
        <View style={styles.modalButtons}>
          <Button onPress={onDismiss} textColor={palette.muted}>Cancel</Button>
          <Button onPress={handleSave} textColor={palette.tint}>Save</Button>
        </View>
      </Modal>
    </Portal>
  );
}

// ---------------------------------------------------------------------------
// Chat Content (uses the provider)
// ---------------------------------------------------------------------------

function BellowsChatContent() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const {
    activeSession,
    createSession,
    deleteSession,
    loading,
    error,
    models,
    selectedModel,
    setSelectedModel,
    sendMessage,
  } = useBellowsChat();

  const [inputText, setInputText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [systemPromptVisible, setSystemPromptVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const messages = activeSession?.messages ?? [];
  const sessionTokens = activeSession?.tokenUsage;

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || loading) return;
    setInputText('');
    await sendMessage(text);
  }, [inputText, loading, sendMessage]);

  const renderItem = useCallback(({ item }: { item: BellowsDisplayMessage }) => (
    <MessageBubble message={item} palette={palette} />
  ), [palette]);

  const keyExtractor = useCallback((_: BellowsDisplayMessage, index: number) => String(index), []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: palette.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: palette.surface, borderBottomColor: palette.border }]}>
        <IconButton
          icon="plus"
          size={20}
          iconColor={palette.tint}
          onPress={createSession}
          accessibilityLabel="New Chat"
          style={styles.toolbarIcon}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Surface
              style={[styles.modelButton, { backgroundColor: palette.surfaceAlt }]}
              elevation={0}
            >
              <Text
                style={[styles.modelLabel, { color: palette.text }]}
                onPress={() => setMenuVisible(true)}
                numberOfLines={1}
              >
                {selectedModel}
              </Text>
              <IconButton
                icon="chevron-down"
                size={16}
                iconColor={palette.muted}
                onPress={() => setMenuVisible(true)}
                style={styles.chevronButton}
              />
            </Surface>
          }
        >
          {models.map((m) => (
            <Menu.Item
              key={m.id}
              title={m.id}
              onPress={() => {
                setSelectedModel(m.id);
                setMenuVisible(false);
              }}
            />
          ))}
          {models.length === 0 && (
            <Menu.Item title="No models loaded" disabled />
          )}
        </Menu>
        <View style={styles.toolbarSpacer} />
        {sessionTokens && sessionTokens.totalTokens > 0 && (
          <Text style={[styles.sessionTokens, { color: palette.muted }]}>
            {'\u03A3'}{sessionTokens.totalTokens}
          </Text>
        )}
        <IconButton
          icon="tune"
          size={20}
          iconColor={palette.muted}
          onPress={() => setSystemPromptVisible(true)}
          accessibilityLabel="System Prompt"
          style={styles.toolbarIcon}
        />
        <IconButton
          icon="delete"
          size={20}
          iconColor={palette.muted}
          onPress={deleteSession}
          accessibilityLabel="Clear Chat"
          style={styles.toolbarIcon}
        />
      </View>

      {/* Session Chips */}
      <SessionChips palette={palette} />

      {/* System Prompt Modal */}
      <SystemPromptModal
        visible={systemPromptVisible}
        onDismiss={() => setSystemPromptVisible(false)}
        palette={palette}
      />

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: palette.muted }]}>
              Start a conversation with Bellows
            </Text>
          </View>
        }
      />

      {/* Error display */}
      {error && (
        <View style={[styles.errorBar, { backgroundColor: palette.danger }]}>
          <Text style={styles.errorText} numberOfLines={2}>{error}</Text>
        </View>
      )}

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={palette.tint} />
          <Text style={[styles.loadingText, { color: palette.muted }]}>Thinking...</Text>
        </View>
      )}

      {/* Input */}
      <View style={[styles.inputRow, { backgroundColor: palette.surface, borderTopColor: palette.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: palette.surfaceAlt }]}
          textColor={palette.text}
          placeholderTextColor={palette.muted}
          placeholder="Message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          multiline
          mode="outlined"
          outlineColor={palette.border}
          activeOutlineColor={palette.tint}
          dense
        />
        <IconButton
          icon="send"
          iconColor={palette.tint}
          size={24}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

// ---------------------------------------------------------------------------
// Screen (wraps in provider)
// ---------------------------------------------------------------------------

export default function BellowsChatScreen() {
  return (
    <BellowsChatProvider>
      <BellowsChatContent />
    </BellowsChatProvider>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  toolbarSpacer: {
    flex: 1,
  },
  toolbarIcon: {
    margin: 0,
  },
  modelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 4,
  },
  modelLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  chevronButton: {
    margin: 0,
  },
  sessionTokens: {
    fontSize: 12,
    marginRight: 4,
  },
  chipsContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  chipsContent: {
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    maxWidth: 120,
  },
  messageList: {
    padding: 12,
    paddingBottom: 8,
    flexGrow: 1,
  },
  bubbleRow: {
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bubbleRowUser: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 21,
  },
  tokenLabel: {
    fontSize: 11,
    marginTop: 2,
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 15,
  },
  errorBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 13,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 15,
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalInput: {
    minHeight: 120,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
});
