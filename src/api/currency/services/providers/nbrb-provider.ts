import { normalizeRate, toIsoDate } from './rate-utils';
import { NormalizedRate } from './types';

const NBRB_BASE_URL = 'https://api.nbrb.by';

interface NbrbRate {
  Cur_Abbreviation?: string;
  Cur_Scale?: number;
  Cur_OfficialRate?: number;
}

/**
 * Fetches the official daily exchange rates published by the National
 * Bank of the Republic of Belarus (NBRB) for the given date.
 */
export async function fetchNbrbRates(date = new Date()): Promise<NormalizedRate[]> {
  const isoDate = toIsoDate(date);
  const url = `${NBRB_BASE_URL}/exrates/rates?periodicity=0&ondate=${isoDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`NBRB request failed with status ${response.status}`);
  }

  const data = (await response.json()) as NbrbRate[];

  return data
    .filter(
      (item): item is NbrbRate & { Cur_Abbreviation: string; Cur_OfficialRate: number } =>
        Boolean(item.Cur_Abbreviation) && typeof item.Cur_OfficialRate === 'number',
    )
    .map((item) => ({
      iso: item.Cur_Abbreviation,
      rate: normalizeRate(item.Cur_OfficialRate, item.Cur_Scale),
      quantity: 1 as const,
      date: isoDate,
    }));
}
