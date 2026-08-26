import type { Core } from '@strapi/strapi';

// Content types the public website reads directly (no auth) via
// StrapiClientService / AbstractCollectionService — see STRAPI_COLLECTION in
// the frontend's strapi.const.ts for the source of truth.
const PUBLIC_READ_CONTENT_TYPES = [
  'api::airport.airport',
  'api::author.author',
  'api::category.category',
  'api::config.config',
  'api::hotel.hotel',
  'api::meal-type.meal-type',
  'api::place.place',
  'api::post.post',
  'api::room-category.room-category',
  'api::room-type.room-type',
  'api::tour.tour',
  'api::tour-schedule.tour-schedule',
  'api::tour-type.tour-type',
  'api::transport-type.transport-type',
  'api::universal.universal',
];

// Actions the Public role needs so the website works without an
// authenticated user: reading marketing content, and writing leads/
// subscriptions from the site's forms. Idempotent: re-run on every boot,
// only inserts permissions that don't already exist.
const PUBLIC_ACTIONS = [
  ...PUBLIC_READ_CONTENT_TYPES.flatMap((uid) => [
    `${uid}.find`,
    `${uid}.findOne`,
  ]),
  'api::lead.lead.create',
  'api::subscription.subscription.create',
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn(
        'Public role not found — skipping public permission bootstrap',
      );

      return;
    }

    for (const action of PUBLIC_ACTIONS) {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { role: publicRole.id, action } });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });

        strapi.log.info(`Granted public permission: ${action}`);
      }
    }
  },
};
