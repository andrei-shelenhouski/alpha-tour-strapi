/**
 * lead controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::lead.lead',
  ({ strapi }) => ({
    async create(ctx) {
      const { honeypot, ...data } = ctx.request.body?.data || {};

      if (honeypot) {
        // Bot detected via the honeypot field — pretend success, persist nothing.
        strapi.log.debug('Lead submission dropped: honeypot field was filled');

        return { data: { id: 0, documentId: '', ...data } };
      }

      ctx.request.body.data = data;

      return super.create(ctx);
    },
  }),
);
