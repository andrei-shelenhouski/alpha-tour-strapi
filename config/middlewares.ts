export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "belavia.by",
            "cdn.alphatour.by",
            "images.ctfassets.net",
            "market-assets.strapi.io",
            process.env.BUNNY_PULL_ZONE,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "belavia.by",
            "cdn.alphatour.by",
            "images.ctfassets.net",
            "market-assets.strapi.io",
            process.env.BUNNY_PULL_ZONE,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: [
        "http://localhost:1337",
        "http://localhost:3000",
        "https://belavia.by",
        "https://cdn.alphatour.by",
        "https://images.ctfassets.net",
        "https://market-assets.strapi.io",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
