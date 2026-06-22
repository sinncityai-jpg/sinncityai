'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DigitStats } from '@/lib/types';

interface MatchesDiffersViewProps {
  digitStats: DigitStats;
  lastDigit: number | null;
}

export function MatchesDiffersView({ digitStats, lastDigit }: MatchesDiffersViewProps) {
  const matchCount = lastDigit !== null ? (digitStats.counts[lastDigit] || 0) : 0;
  const totalTicks = digitStats.totalTicks;
  const matchPercentage = totalTicks > 0 ? ((matchCount / totalTicks) * 100).toFixed(1) : '0';

  return (
    <Card className="shrink-0 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">Strategy Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">Current Digit</p>
            <p className="text-2xl font-bold">{lastDigit !== null ? lastDigit : '—'}</p>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-3">
            <p className="text-xs text-muted-foreground mb-1">Frequency</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{matchPercentage}%</p>
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground mb-2">Recommendation</p>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
              🔄 Matches
            </Badge>
            <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400">
              ⛔ Differs
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
