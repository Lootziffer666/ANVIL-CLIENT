import { type Connector } from './connectors';
import { getConnectorsSync } from './load-connectors';

export type PipelineStage = 'trigger' | 'llmProcessor' | 'action' | 'mcpContext';

export interface ScoredConnector {
  connector: Connector;
  score: number;
  topCategory: string;
}

export interface PipelineResult {
  trigger: ScoredConnector | null;
  llmProcessor: ScoredConnector | null;
  action: ScoredConnector | null;
  mcpContext: ScoredConnector | null;
}

type TierLevel = 'free' | 'freemium' | 'paid';

const TIER_RANK: Record<TierLevel, number> = {
  free: 0,
  freemium: 1,
  paid: 2,
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,;.!?()[\]{}"'\/\\|+=#@&*<>~`]+/)
    .filter((t) => t.length > 1);
}

const ROUTING_KEYWORDS = ['trigger', 'action', 'llm', 'ai', 'ml'];

function getStages(categories: string[]): PipelineStage[] {
  const lower = categories.map((c) => c.toLowerCase());
  const stages: PipelineStage[] = [];
  if (lower.includes('trigger')) stages.push('trigger');
  if (lower.includes('llm') || lower.includes('ai') || lower.includes('ml')) stages.push('llmProcessor');
  if (lower.includes('action')) stages.push('action');
  // Only assign to mcpContext if connector has NO routing keywords at all
  if (stages.length === 0) {
    stages.push('mcpContext');
  }
  return stages;
}

/**
 * Extracts a numeric monthly price from a pricing tier price string like "$9/mo" or "9".
 * Returns the cheapest numeric value found, or null if none could be parsed.
 */
export function parseCheapestPrice(
  tiers: { name: string; price: string; limits?: string }[],
): number | null {
  let cheapest: number | null = null;
  for (const t of tiers) {
    const match = t.price.match(/[\d]+(?:[.,]\d+)?/);
    if (match) {
      const value = parseFloat(match[0].replace(',', '.'));
      if (!isNaN(value) && (cheapest == null || value < cheapest)) {
        cheapest = value;
      }
    }
  }
  return cheapest;
}

export function computePipeline(
  stack: string,
  goal: string,
  tier: 'free' | 'freemium' | 'paid' | 'beliebig',
  maxMonthlyCost: number | null = null,
): PipelineResult {
  const goalTokens = tokenize(goal);
  const stackTokens = tokenize(stack);

  const stageScores: Record<PipelineStage, ScoredConnector | null> = {
    trigger: null,
    llmProcessor: null,
    action: null,
    mcpContext: null,
  };

  if (goalTokens.length === 0 && stackTokens.length === 0) {
    return stageScores;
  }

  // Allow a 10% tolerance over budget so slightly pricier but better-fitting connectors
  // still get suggested (e.g. 33 EUR passes when budget is 30 EUR).
  const budgetThreshold =
    maxMonthlyCost != null ? maxMonthlyCost * 1.1 : null;

  const connectors = getConnectorsSync();

  for (const connector of connectors) {
    if (connector.dead) continue;

    // Tier filter
    if (tier !== 'beliebig') {
      if (TIER_RANK[connector.tier] > TIER_RANK[tier]) continue;
    }

    // Budget filter: skip connectors that are provably over budget
    if (budgetThreshold != null) {
      if (connector.tier !== 'free') {
        const tiers = connector.pricingTiers ?? [];
        if (tiers.length > 0) {
          const cheapest = parseCheapestPrice(tiers);
          if (cheapest != null && cheapest > budgetThreshold) {
            continue;
          }
        }
      }
    }

    // Build searchable tokens from aiNotes and categories
    const connectorTokens = [
      ...tokenize(connector.aiNotes),
      ...connector.categories.map((c) => c.toLowerCase()),
    ];

    // Keyword overlap score
    let score = 0;
    for (const token of goalTokens) {
      if (connectorTokens.includes(token)) {
        score += 1;
      }
    }

    // Stack match bonus
    const slugLower = connector.slug.toLowerCase();
    const nameLower = connector.name.toLowerCase();
    for (const token of stackTokens) {
      if (slugLower.includes(token) || nameLower.includes(token)) {
        score += 3;
        break;
      }
    }

    // API access bonus: services with documented API get a slight boost
    if (connector.apiAccess === true) {
      score += 1;
    }

    if (score === 0) continue;

    // Normalize: use matched token count as base to avoid penalizing longer queries
    let matchedCount = 0;
    for (const token of goalTokens) {
      if (connectorTokens.includes(token)) {
        matchedCount += 1;
      }
    }
    const denominator = Math.max(matchedCount, 1) + 3;
    const scorePercent = Math.min(Math.round((score / denominator) * 100), 100);

    // Determine which stages this connector belongs to
    const stages = getStages(connector.categories);

    for (const stage of stages) {
      const current = stageScores[stage];
      if (!current || scorePercent > current.score) {
        // Pick the most relevant category for this stage
        let topCategory: string;
        if (stage === 'trigger') {
          topCategory = connector.categories.find((c) => c.toLowerCase() === 'trigger') || connector.categories[0] || '';
        } else if (stage === 'llmProcessor') {
          topCategory = connector.categories.find((c) => {
            const cl = c.toLowerCase();
            return cl === 'llm' || cl === 'ai' || cl === 'ml';
          }) || connector.categories[0] || '';
        } else if (stage === 'action') {
          topCategory = connector.categories.find((c) => c.toLowerCase() === 'action') || connector.categories[0] || '';
        } else {
          // mcpContext: filter out routing keywords, pick first domain category
          topCategory =
            connector.categories.find((c) => !ROUTING_KEYWORDS.includes(c.toLowerCase())) ||
            connector.categories[0] || '';
        }

        stageScores[stage] = {
          connector,
          score: scorePercent,
          topCategory,
        };
      }
    }
  }

  return stageScores;
}
