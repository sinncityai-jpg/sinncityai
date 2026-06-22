'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { DigitStats } from '@/lib/types';

interface EvenOddViewProps {
  digitStats: DigitStats;
  lastDigit: number | null;
}

export function EvenOddView({ digitStats, lastDigit }: EvenOddViewProps) {
  const evenCount = [0, 2, 4, 6, 8].reduce((sum, digit) => sum + (digitStats.counts[digit] || 0), 0);
  const oddCount = [1, 3, 5, 7, 9].reduce((sum, digit) => sum + (digitStats.counts[digit] || 0), 0);
  const totalTicks = digitStats.totalTicks;
  const evenPercentage = totalTicks > 0 ? (evenCount / totalTicks) * 100 : 0;
  const oddPercentage = totalTicks > 0 ? (oddCount / totalTicks) * 100 : 0;
  const isCurrentEven = lastDigit !== null && lastDigit % 2 === 0;

  return (
    <Card className="shrink-0 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">Parity Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Even Numbers</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
                {evenPercentage.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={evenPercentage} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Odd Numbers</span>
              <Badge variant="outline" className="bg-pink-500/10 text-pink-700 dark:text-pink-400">
                {oddPercentage.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={oddPercentage} className="h-2" />
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground mb-1">Current Digit</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{lastDigit !== null ? lastDigit : '—'}</p>
            <Badge 
              variant="outline" 
              className={isCurrentEven ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-pink-500/10 text-pink-700 dark:text-pink-400"}
            >
              {isCurrentEven ? 'Even' : 'Odd'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
