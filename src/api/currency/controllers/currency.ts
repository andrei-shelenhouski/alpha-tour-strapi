/**
 * currency controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::currency.currency', ({ strapi }) => ({
  /**
   * GET /currency-rates?country=BY
   *
   * Returns official exchange rates for the requested country's
   * central bank (BY -> NBRB, GE -> NBG).
   */
  async rates(ctx) {
    const { country } = ctx.query;

    if (!country || typeof country !== 'string') {
      return ctx.badRequest('Query parameter "country" is required (e.g. ?country=BY).');
    }

    try {
      ctx.body = await strapi.service('api::currency.currency').getRatesByCountry(country);
    } catch (error) {
      ctx.badRequest(error instanceof Error ? error.message : 'Failed to fetch currency rates');
    }
  },
}));
