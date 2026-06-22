'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TradeType } from '@/lib/types';

interface StrategyInfoProps {
  tradeType: TradeType;
}

const STRATEGY_INFO: Record<TradeType, { title: string; description: string; icon: string; difficulty: string; color: string }> = {
  'matches-differs': {
    title: 'Matches/Differs',
    description: 'Predict if the last digit of the next tick will match or differ from the current digit.',
    icon: '🔄',
    difficulty: 'Easy',
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  },
  'over-under': {
    title: 'Over/Under',
    description: 'Predict if the last digit will be higher or lower than a chosen threshold.',
    icon: '📊',
    difficulty: 'Medium',
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  },
  'even-odd': {
    title: 'Even/Odd',
    description: 'Predict if the last digit will be an even or odd number.',
    icon: '🎯',
    difficulty: 'Easy',
    color: 'bg-green-500/10 text-green-700 dark:text-green-400',
  },
};

export function StrategyInfo({ tradeType }: StrategyInfoProps) {
  const info = STRATEGY_INFO[tradeType];

  return (
    <Card className="shrink-0 border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{info.icon}</span>
            <CardTitle className="text-lg">{info.title}</CardTitle>
          </div>
          <Badge variant="secondary" className={info.color}>
            {info.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{info.description}</p>
      </CardContent>
    </Card>
  );
}
