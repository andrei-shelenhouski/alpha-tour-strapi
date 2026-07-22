# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Strapi 5 (v5.50.2) headless CMS backend for Alpha Tour (alphatour.by), a travel/tour agency site. It models tours, hotels, flights, and CMS pages, and serves content via Strapi's REST API to a separate frontend. TypeScript throughout, SQLite by default locally / configurable via env for Postgres or MySQL in other environments.

## Commands

- `npm run develop` — start Strapi with autoReload (admin panel + API), primary dev command
- `npm run start` — start without autoReload (production-like)
- `npm run build` — build the admin panel bundle
- `npm run console` — open the Strapi interactive console (REPL with app context)
- `npm run deploy` — deploy via Strapi Cloud CLI
- `npm run upgrade` / `npm run upgrade:dry` — run `@strapi/upgrade` to bump Strapi version (dry-run first to preview)

There is no test suite, lint config, or formatter configured in this repo.

Admin panel runs at `/admin` (port 1337 by default, from `HOST`/`PORT` env vars).

## Architecture

### Content-type structure (`src/api/*`)

Each content type follows Strapi's standard convention-over-configuration layout:
```
src/api/<name>/
  content-types/<name>/schema.json   # attributes, relations, i18n/draft-publish options
  controllers/<name>.ts              # factories.createCoreController — all currently default, no overrides
  routes/<name>.ts                   # factories.createCoreRouter — all currently default
  services/<name>.ts                 # factories.createCoreService — all currently default
```
No content type currently has custom controller/route/service logic — everything relies on Strapi's generated CRUD. When adding business logic, extend the relevant factory in `controllers|services/<name>.ts` rather than editing schema.json to add behavior.

### Domain model

The core entity graph:
- **`universal`** ("Page") is the generic CMS page type — has a `dynamiczone` of `slices.*` components (hero, mosaic, slider, promotions, tourvisor, etc.), an SEO component, and relations to `config`, `category`, and `hotel`. Pages are the composable building block for most frontend routes.
- **`config`** is a per-domain site configuration singleton-like collection (keyed by `domain`, e.g. `alphatour.by`) holding navigation, footer, feature toggles (`showPhoneNumber`, `showSubscriptionForm`, `showInternetAcquiring`, etc.) with conditional-visibility fields tied to those booleans (`conditions.visible` JSON-logic in the schema).
- **`tour`** is the central booking/product entity: relations to `place`, `transport_type`, `departure_airport`, `meal_type`, `room_type`, `room_category`, `provider` (private), `config`, and `page` (a `universal`). Carries pricing (`price`, `currency` enum, `exchange_rate_multiplier`), dates, and a `service_note` marked `private` (never exposed over the public API).
- **`hotel`** relates to `place`, has `pages` (one-to-many `universal`) and `posts`.
- **`post`** (blog/content) relates to `page`, `hotel`, and many-to-many `configs`.
- Reference/lookup collection types: `place`, `airport`, `category`, `currency`, `meal-type`, `room-type`, `room-category`, `transport-type`, `tour-type`, `provider`.
- `country` fields across content types use the `plugin::country-select.country` custom field, not a plain string/enum.

### i18n and draft/publish

Most content types have `draftAndPublish: true` and per-field `pluginOptions.i18n.localized` flags — some fields are localized (e.g. `title`, `description`), others are shared across locales (e.g. `price`, dates, relations). When adding a field, decide localization deliberately based on whether the value should vary by locale.

### Components (`src/components/*`)

Reusable schema fragments grouped by purpose:
- `global/*` — site-wide singletons used from `config` (navigation, footer, subscription form)
- `shared/*` — cross-cutting building blocks (seo, link, button, card, meta-social, edito)
- `slices/*` — dynamiczone entries used in `universal.slices` (hero, mosaic, slider, promotions, tourvisor, markdown, rich-text, flexible-blocks, etc.)

### Config (`config/*.ts`)

- `server.ts` — host/port/app keys; also enables the `mcp` plugin
- `database.ts` — client selection via `DATABASE_CLIENT` env (`sqlite` default, `postgres`, `mysql`), connection built from `DATABASE_*` env vars
- `plugins.ts` — `seo` plugin, `upload` via `@nexide/strapi-provider-bunny` (Bunny CDN, configured through `BUNNY_*` env vars), `email` via `strapi-provider-email-resend` (default sender `info@alphatour.by`), `mcp` plugin with in-memory session
- `middlewares.ts` — customizes `strapi::security` CSP to allow images/media from Bunny's pull zone (`process.env.BUNNY_PULL_ZONE`) and a couple of hardcoded third-party image hosts (`market-assets.strapi.io`, `images.ctfassets.net`, `belavia.by`)
- `api.ts` — REST defaults: `defaultLimit: 25`, `maxLimit: 100`, `withCount: true`

### Generated types

`types/generated/{components,contentTypes}.d.ts` are auto-generated by Strapi from schemas — do not hand-edit; they regenerate when the server starts against changed schemas.

### Deployment

`Dockerfile` is a multi-stage Alpine build (build stage installs full deps + `npm run build`, runtime stage copies `node_modules` + built app, runs as non-root `node` user, exposes 1337). Requires native build tools (`vips-dev` etc.) for `better-sqlite3`/sharp-style image processing dependencies.
