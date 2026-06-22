'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StrategyInfo } from '@/components/custom/strategy-info';
import { StrategySelector } from '@/components/custom/strategy-selector';
import { MatchesDiffersView } from '@/components/strategy/matches-differs-view';
import { OverUnderView } from '@/components/strategy/over-under-view';
import { EvenOddView } from '@/components/strategy/even-odd-view';
import { useState } from 'react';
import type { TradeType, DigitStats } from '@/lib/types';

// Mock data for preview
const MOCK_DIGIT_STATS: DigitStats = {
  counts: [12, 15, 8, 14, 11, 16, 9, 13, 10, 12],
  percentages: [12, 15, 8, 14, 11, 16, 9, 13, 10, 12],
  totalTicks: 120,
};

const STRATEGY_OPTIONS = [
  {
    value: 'matches-differs' as TradeType,
    label: 'Matches/Differs',
    icon: '🔄',
    description: 'Compare current & next digit',
    color: 'text-blue-600',
  },
  {
    value: 'over-under' as TradeType,
    label: 'Over/Under',
    icon: '📊',
    description: 'Predict digit range',
    color: 'text-purple-600',
  },
  {
    value: 'even-odd' as TradeType,
    label: 'Even/Odd',
    icon: '🎲',
    description: 'Predict digit parity',
    color: 'text-green-600',
  },
];

export default function PreviewPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<TradeType>('matches-differs');
  const mockLastDigit = 7;

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Strategy UI Preview</h1>
          <p className="text-muted-foreground">
            Interactive preview of the enhanced trading strategy components
          </p>
        </div>

        {/* Strategy Info */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Strategy Information</h2>
          <StrategyInfo tradeType={selectedStrategy} />
        </section>

        {/* Strategy Selector */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Strategy Selector</h2>
          <StrategySelector
            value={selectedStrategy}
            options={STRATEGY_OPTIONS}
            onValueChange={setSelectedStrategy}
          />
        </section>

        {/* Strategy Analysis */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Strategy Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Real-time analysis for <span className="font-semibold">{STRATEGY_OPTIONS.find(s => s.value === selectedStrategy)?.label}</span>
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main View */}
            <div className="lg:col-span-2">
              {selectedStrategy === 'matches-differs' && (
                <MatchesDiffersView digitStats={MOCK_DIGIT_STATS} lastDigit={mockLastDigit} />
              )}
              {selectedStrategy === 'over-under' && (
                <OverUnderView digitStats={MOCK_DIGIT_STATS} lastDigit={mockLastDigit} />
              )}
              {selectedStrategy === 'even-odd' && (
                <EvenOddView digitStats={MOCK_DIGIT_STATS} lastDigit={mockLastDigit} />
              )}
            </div>

            {/* Stats Card */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Mock Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Ticks Analyzed</p>
                  <p className="text-2xl font-bold">{MOCK_DIGIT_STATS.totalTicks}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Digit</p>
                  <p className="text-2xl font-bold">{mockLastDigit}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Digit Frequencies</p>
                  <div className="grid grid-cols-5 gap-1">
                    {MOCK_DIGIT_STATS.percentages.map((pct, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-xs font-semibold">{idx}</p>
                        <p className="text-xs text-muted-foreground">{pct}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Views Comparison */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">All Strategy Views</h2>
          <p className="text-sm text-muted-foreground">Side-by-side comparison of all three strategies</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2">Matches/Differs</p>
              <MatchesDiffersView digitStats={MOCK_DIGIT_STATS} lastDigit={mockLastDigit} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Over/Under</p>
              <OverUnderView digitStats={MOCK_DIGIT_STATS} lastDigit={mockLastDigit} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Even/Odd</p>
              <EvenOddView digitStats={MOCK_DIGIT_STATS} lastDigit={mockLastDigit} />
            </div>
          </div>
        </section>

        {/* Component Info */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Component Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Strategy Info</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Displays strategy details with difficulty level and description.</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">components/custom/strategy-info.tsx</code>
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Strategy Selector</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Beautiful card grid for selecting trading strategies with hover effects.</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">components/custom/strategy-selector.tsx</code>
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Matches/Differs View</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Shows current digit, frequency %, and match/differ predictions.</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">components/strategy/matches-differs-view.tsx</code>
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Over/Under View</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Visualizes digit distribution with progress bars and percentages.</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">components/strategy/over-under-view.tsx</code>
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Even/Odd View</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Analyzes even/odd parity with current digit classification.</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">components/strategy/even-odd-view.tsx</code>
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Progress Component</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Radix UI-based progress bar for percentage visualizations.</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">components/ui/progress.tsx</code>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="space-y-3 pb-8">
          <h2 className="text-2xl font-semibold">Integration Guide</h2>
          <Card className="border shadow-sm bg-muted/20">
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">1. Import Components</h3>
                  <code className="block bg-background p-3 rounded border border-border text-xs overflow-x-auto">
{`import { StrategyInfo } from '@/components/custom/strategy-info';
import { StrategySelector } from '@/components/custom/strategy-selector';
import { MatchesDiffersView } from '@/components/strategy/matches-differs-view';
import { OverUnderView } from '@/components/strategy/over-under-view';
import { EvenOddView } from '@/components/strategy/even-odd-view';`}
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Use in Your Component</h3>
                  <code className="block bg-background p-3 rounded border border-border text-xs overflow-x-auto">
{`<StrategyInfo tradeType={selectedStrategy} />

<StrategySelector
  value={selectedStrategy}
  options={STRATEGY_OPTIONS}
  onValueChange={setSelectedStrategy}
/>

{selectedStrategy === 'matches-differs' && (
  <MatchesDiffersView digitStats={digitStats} lastDigit={lastDigit} />
)}`}
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Props Reference</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">StrategyInfo</code> - Requires <code className="bg-muted px-1.5 py-0.5 rounded text-xs">tradeType: TradeType</code></li>
                    <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">StrategySelector</code> - Requires <code className="bg-muted px-1.5 py-0.5 rounded text-xs">value, options, onValueChange</code></li>
                    <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">*View Components</code> - Require <code className="bg-muted px-1.5 py-0.5 rounded text-xs">digitStats, lastDigit</code></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
