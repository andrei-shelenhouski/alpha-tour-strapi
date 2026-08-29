/**
 * tour controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::tour.tour', ({ strapi }) => ({
  /**
   * Extends the core `find` with an `?filters[exoticCountry]=true` flag.
   *
   * The "exotic" trait lives on the country page (`api::universal.universal`
   * `isExotic`), not on the tour. When the flag is present we resolve the set of
   * exotic country codes and constrain the tour query to `country $in` that set,
   * then delegate to the core handler so pagination / populate / sanitization
   * stay untouched.
   */
  async find(ctx) {
    const filters = ctx.query?.filters as Record<string, unknown> | undefined;
    const exoticFlag = filters?.['exoticCountry'];

    if (filters && (exoticFlag === true || exoticFlag === 'true')) {
      delete filters['exoticCountry'];

      const pages = (await strapi.db
        .query('api::universal.universal')
        .findMany({
          where: { isExotic: true, publishedAt: { $notNull: true } },
          select: ['country'],
        })) as Array<{ country?: string | null }>;

      const codes = [
        ...new Set(
          pages
            .map((page) => page.country)
            .filter((code): code is string => Boolean(code)),
        ),
      ];

      ctx.query.filters = {
        $and: [
          filters,
          // `__no_exotic__` guarantees an empty result set rather than "all
          // tours" when no country is flagged as exotic yet.
          { country: { $in: codes.length ? codes : ['__no_exotic__'] } },
        ],
      };
    }

    return super.find(ctx);
  },
}));
