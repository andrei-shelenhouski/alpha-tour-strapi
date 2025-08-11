export default ({ env }) => ({
  seo: {
    enabled: true,
  },
  upload: {
    config: {
      provider: "@nexide/strapi-provider-bunny",
      providerOptions: {
        api_key: env("BUNNY_API_KEY"),
        storage_zone: env("BUNNY_STORAGE_ZONE"),
        pull_zone: env("BUNNY_PULL_ZONE"),
        hostname: env("BUNNY_HOSTNAME"),
        upload_path: env("BUNNY_UPLOAD_PATH"),
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"), // Required
      },
      settings: {
        defaultFrom: "info@alphatour.by",
        defaultReplyTo: "zakaz@alphatour.by",
      },
    },
  },
});
