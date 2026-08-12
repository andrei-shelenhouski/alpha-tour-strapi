/**
 * currency service
 */

import { factories } from '@strapi/strapi';

import { fetchNbgRates } from './providers/nbg-provider';
import { fetchNbrbRates } from './providers/nbrb-provider';
import { RateProvider, RatesPayload } from './providers/types';

const CACHE_TTL_MS = 5 * 60 * 1000;

const PROVIDERS: Record<string, { source: string; base: string; fetchRates: RateProvider }> = {
  BY: { source: 'NBRB', base: 'BYN', fetchRates: fetchNbrbRates },
  GE: { source: 'NBG', base: 'GEL', fetchRates: fetchNbgRates },
};

const cache = new Map<string, { expiresAt: number; payload: RatesPayload }>();

export default factories.createCoreService('api::currency.currency', () => ({
  /**
   * Returns the current official exchange rates for the given ISO
   * country code, dispatching to that country's central bank
   * (BY -> NBRB, GE -> NBG). Responses are cached in-process for a
   * few minutes so page views don't each hit the bank's API directly.
   */
  async getRatesByCountry(countryCode: string): Promise<RatesPayload> {
    const country = countryCode?.toUpperCase();
    const provider = PROVIDERS[country];

    if (!provider) {
      throw new Error(
        `Unsupported country code "${countryCode}". Supported: ${Object.keys(PROVIDERS).join(', ')}`,
      );
    }

    const cached = cache.get(country);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.payload;
    }

    const rates = await provider.fetchRates();

    const payload: RatesPayload = {
      country,
      source: provider.source,
      base: provider.base,
      date: rates[0]?.date ?? null,
      rates,
    };

    cache.set(country, { expiresAt: Date.now() + CACHE_TTL_MS, payload });

    return payload;
  },
}));
