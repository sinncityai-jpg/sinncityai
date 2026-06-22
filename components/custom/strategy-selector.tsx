'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { TradeType } from '@/lib/types';

interface StrategyOption {
  value: TradeType;
  label: string;
  icon: string;
  description: string;
  color: string;
}

interface StrategySelectorProps {
  value: TradeType;
  options: StrategyOption[];
  onValueChange: (value: TradeType) => void;
}

export function StrategySelector({
  value,
  options,
  onValueChange,
}: StrategySelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className="relative group"
          >
            <Card
              className={cn(
                'p-4 cursor-pointer transition-all duration-200 border-2',
                isSelected
                  ? `${option.color} border-current shadow-lg scale-105`
                  : 'border-muted-foreground/20 hover:border-muted-foreground/40 hover:shadow-md'
              )}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">{option.icon}</span>
                <h3 className="font-semibold text-sm">{option.label}</h3>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-current" />
              )}
            </Card>
          </button>
        );
      })}
    </div>
  );
}
