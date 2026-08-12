import { normalizeRate, toIsoDate } from './rate-utils';
import { NormalizedRate } from './types';

const NBG_BASE_URL = 'https://nbg.gov.ge';

interface NbgCurrency {
  code?: string;
  quantity?: number;
  rate?: number;
}

interface NbgResponseEntry {
  date?: string;
  currencies?: NbgCurrency[];
}

/**
 * Fetches the official exchange rates published by the National Bank of
 * Georgia (NBG) for the given date. NBG publishes the *next* business
 * day's rate in the evening and carries the last business day's rate
 * forward over weekends/holidays, but a single date always resolves to
 * a single envelope containing every currency.
 */
export async function fetchNbgRates(date = new Date()): Promise<NormalizedRate[]> {
  const isoDate = toIsoDate(date);
  const url = `${NBG_BASE_URL}/gw/api/ct/monetarypolicy/currencies/en/json?date=${isoDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`NBG request failed with status ${response.status}`);
  }

  const data = (await response.json()) as NbgResponseEntry[];
  const currencies = data[0]?.currencies ?? [];

  return currencies
    .filter(
      (item): item is NbgCurrency & { code: string; rate: number } =>
        Boolean(item.code) && typeof item.rate === 'number',
    )
    .map((item) => ({
      iso: item.code,
      rate: normalizeRate(item.rate, item.quantity),
      quantity: 1 as const,
      date: isoDate,
    }));
}
