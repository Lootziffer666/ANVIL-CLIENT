import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, SegmentedButtons, Surface, Text, TextInput } from 'react-native-paper';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadConnectors } from '@/lib/wizard/load-connectors';
import { computePipeline, parseCheapestPrice, type PipelineResult, type ScoredConnector } from '@/lib/wizard/scoring';

type TierOption = 'free' | 'freemium' | 'paid' | 'beliebig';

const TIER_BUTTONS = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'beliebig', label: 'Beliebig' },
];

const STAGE_LABELS: Record<string, string> = {
  trigger: 'TRIGGER',
  llmProcessor: 'LLM PROCESSOR',
  action: 'ACTION',
  mcpContext: 'MCP CONTEXT',
};

const STAGE_ORDER: (keyof PipelineResult)[] = ['trigger', 'llmProcessor', 'action', 'mcpContext'];

function TierBadge({ tier, palette }: { tier: string; palette: (typeof Colors)['light'] }) {
  const badgeColor =
    tier === 'free' ? palette.success : tier === 'freemium' ? palette.warning : palette.danger;
  return (
    <Text style={[styles.tierBadge, { color: badgeColor }]}>
      {tier.toUpperCase()}
    </Text>
  );
}

function StageCard({
  stage,
  result,
  palette,
  isLast,
}: {
  stage: keyof PipelineResult;
  result: ScoredConnector | null;
  palette: (typeof Colors)['light'];
  isLast: boolean;
}) {
  return (
    <View>
      <Card mode="contained" style={[styles.stageCard, { backgroundColor: palette.surface }]}>
        <Card.Content style={styles.stageContent}>
          <Text variant="labelLarge" style={{ color: palette.tint }}>
            {STAGE_LABELS[stage]}
          </Text>
          {result ? (
            <View style={styles.stageResult}>
              <View style={styles.stageHeader}>
                <Text variant="titleMedium" style={{ color: palette.text, flex: 1 }}>
                  {result.connector.name}
                </Text>
                <Text variant="titleMedium" style={{ color: palette.tint, fontWeight: '700' }}>
                  {result.score}%
                </Text>
              </View>
              <View style={styles.chipRow}>
                <Chip compact textStyle={{ fontSize: 11 }} style={styles.categoryChip}>
                  {result.topCategory}
                </Chip>
                <TierBadge tier={result.connector.tier} palette={palette} />
              </View>
              {(result.connector.pricingTiers?.[0]?.price || result.connector.rateLimits) && (
                <View style={styles.pricingRow}>
                  {result.connector.pricingTiers?.[0]?.price ? (
                    <Text variant="bodySmall" style={{ color: palette.muted }}>
                      {result.connector.pricingTiers[0].price}
                    </Text>
                  ) : null}
                  {result.connector.rateLimits ? (
                    <Text variant="bodySmall" style={{ color: palette.muted }}>
                      {result.connector.rateLimits}
                    </Text>
                  ) : null}
                </View>
              )}
            </View>
          ) : (
            <Text variant="bodySmall" style={{ color: palette.muted }}>
              No match found
            </Text>
          )}
        </Card.Content>
      </Card>
      {!isLast && (
        <View style={styles.arrowContainer}>
          <Text style={{ color: palette.muted, fontSize: 20 }}>▼</Text>
        </View>
      )}
    </View>
  );
}

export default function WizardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const [stack, setStack] = useState('');
  const [goal, setGoal] = useState('');
  const [tier, setTier] = useState<TierOption>('beliebig');
  const [budgetText, setBudgetText] = useState('');
  const [pipeline, setPipeline] = useState<PipelineResult>({
    trigger: null,
    llmProcessor: null,
    action: null,
    mcpContext: null,
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload connectors on mount (prepares AsyncStorage path for future use)
  useEffect(() => {
    void loadConnectors();
  }, []);

  const maxMonthlyCost: number | null =
    budgetText.trim() !== '' && !isNaN(Number(budgetText)) ? Number(budgetText) : null;

  const runScoring = useCallback(() => {
    const result = computePipeline(stack, goal, tier, maxMonthlyCost);
    setPipeline(result);
  }, [stack, goal, tier, maxMonthlyCost]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      runScoring();
    }, 500);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [runScoring]);

  // Compute estimated cost: sum of cheapest pricing tier from each stage that has a result
  const estimatedCost = STAGE_ORDER.reduce((sum, stage) => {
    const result = pipeline[stage];
    if (!result) return sum;
    const tiers = result.connector.pricingTiers ?? [];
    if (tiers.length === 0) return sum;
    const cheapest = parseCheapestPrice(tiers);
    return sum + (cheapest ?? 0);
  }, 0);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Surface style={[styles.hero, { backgroundColor: palette.surface }]} elevation={1}>
        <Text variant="headlineSmall" style={{ color: palette.text }}>
          Synergy Wizard
        </Text>
        <Text variant="bodyMedium" style={{ color: palette.muted }}>
          Generate a 4-stage automation pipeline from your stack and goals.
        </Text>
      </Surface>

      <Card mode="contained" style={[styles.card, { backgroundColor: palette.surface }]}>
        <Card.Content style={styles.inputContent}>
          <TextInput
            label="Current Stack"
            placeholder="slack, notion, github..."
            value={stack}
            onChangeText={setStack}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Goal / Direction"
            placeholder="PRD creation, code review, lead nurturing..."
            value={goal}
            onChangeText={setGoal}
            mode="outlined"
            style={styles.input}
          />
          <Text variant="labelMedium" style={{ color: palette.text, marginTop: 8 }}>
            Budget Tier
          </Text>
          <SegmentedButtons
            value={tier}
            onValueChange={(value) => setTier(value as TierOption)}
            buttons={TIER_BUTTONS}
            style={styles.segmented}
          />
          <TextInput
            label="Max. Budget/Monat"
            placeholder="z.B. 0, 10, 50 (leer = kein Limit)"
            value={budgetText}
            onChangeText={setBudgetText}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <View style={styles.pipelineSection}>
        <Text variant="titleMedium" style={{ color: palette.text, marginBottom: 8 }}>
          Pipeline Result
        </Text>
        {STAGE_ORDER.map((stage, index) => (
          <StageCard
            key={stage}
            stage={stage}
            result={pipeline[stage]}
            palette={palette}
            isLast={index === STAGE_ORDER.length - 1}
          />
        ))}
        {estimatedCost > 0 && (
          <Surface style={[styles.costSummary, { backgroundColor: palette.surface }]} elevation={1}>
            <Text variant="labelLarge" style={{ color: palette.text }}>
              Estimated Cost
            </Text>
            <Text variant="titleMedium" style={{ color: palette.tint, fontWeight: '700' }}>
              ~${estimatedCost}/mo
            </Text>
          </Surface>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingTop: 28, gap: 16, paddingBottom: 28 },
  hero: { padding: 16, borderRadius: 16, gap: 12 },
  card: { borderRadius: 16 },
  inputContent: { gap: 12, paddingVertical: 12 },
  input: { backgroundColor: 'transparent' },
  segmented: { marginTop: 4 },
  pipelineSection: { marginTop: 8 },
  stageCard: { borderRadius: 12 },
  stageContent: { gap: 8, paddingVertical: 12 },
  stageResult: { gap: 6 },
  stageHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryChip: { alignSelf: 'flex-start' },
  tierBadge: { fontSize: 11, fontWeight: '700' },
  arrowContainer: { alignItems: 'center', paddingVertical: 4 },
  pricingRow: { flexDirection: 'row', gap: 12, marginTop: 2 },
  costSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
});
