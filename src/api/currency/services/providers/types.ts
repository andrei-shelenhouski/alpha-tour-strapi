export interface NormalizedRate {
  iso: string;
  rate: number;
  quantity: 1;
  date: string;
}

export interface RatesPayload {
  country: string;
  source: string;
  base: string;
  date: string | null;
  rates: NormalizedRate[];
}

export type RateProvider = (date?: Date) => Promise<NormalizedRate[]>;
