'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { DigitStats } from '@/lib/types';

interface OverUnderViewProps {
  digitStats: DigitStats;
  lastDigit: number | null;
}

export function OverUnderView({ digitStats, lastDigit }: OverUnderViewProps) {
  const threshold = 5;
  const overCount = digitStats.counts.slice(threshold).reduce((a, b) => a + b, 0);
  const underCount = digitStats.counts.slice(0, threshold).reduce((a, b) => a + b, 0);
  const totalTicks = digitStats.totalTicks;
  const overPercentage = totalTicks > 0 ? (overCount / totalTicks) * 100 : 0;
  const underPercentage = totalTicks > 0 ? (underCount / totalTicks) * 100 : 0;

  return (
    <Card className="shrink-0 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">Distribution Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Over 5</span>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400">
                {overPercentage.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={overPercentage} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Under 5</span>
              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400">
                {underPercentage.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={underPercentage} className="h-2" />
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground mb-1">Current Digit</p>
          <p className="text-2xl font-bold">{lastDigit !== null ? lastDigit : '—'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
