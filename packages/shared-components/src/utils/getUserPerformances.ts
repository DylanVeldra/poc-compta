import { BalanceEntry } from '@shared-types';
import { DateTime } from 'luxon';

export function getPerformancePeriod(
  performances: BalanceEntry[],
  start: DateTime,
  end: DateTime,
): BalanceEntry[] {
  return performances.filter((item) => {
    const date = DateTime.fromISO(item.date);
    return date >= start && date <= end;
  });
}

export function getPerformancesProfits(performances: BalanceEntry[]) {
  return performances.reduce((acc, item) => acc + item.rawProfit, 0);
}

export function getPerformancesApy(
  performances: BalanceEntry[],
  previousValue = 0,
) {
  const apy = performances.reduce<number>((acc, cur) => {
    return acc + cur.perf * (1 + acc / 100);
  }, previousValue);
  return apy;
}
