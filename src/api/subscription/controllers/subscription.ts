/**
 * subscription controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::subscription.subscription',
  ({ strapi }) => ({
    async create(ctx) {
      const { honeypot, email } = ctx.request.body?.data || {};

      if (honeypot) {
        // Bot detected via the honeypot field — pretend success, persist nothing.
        strapi.log.debug(
          'Subscription submission dropped: honeypot field was filled',
        );

        return {
          data: { message: `Email ${email} успешно подписан на нашу рассылку` },
        };
      }

      const existing = await strapi
        .query('api::subscription.subscription')
        .findOne({ where: { email } });

      if (existing) {
        return {
          data: { message: `Email ${email} уже подписан на нашу рассылку` },
        };
      }

      await strapi.query('api::subscription.subscription').create({
        data: { email },
      });

      return {
        data: { message: `Email ${email} успешно подписан на нашу рассылку` },
      };
    },
  }),
);
