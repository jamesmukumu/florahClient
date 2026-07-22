// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/leaflet",
    "@nuxtjs/seo",
    "@vercel/speed-insights",
    "@vercel/analytics",
    "@nuxtjs/turnstile",
    "nuxt-schema-org",
  ],

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  site: {
    url: "https://www.floracadvocates.co.ke/",
    name: "Flora C Advocates",
  },
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Gabriela&display=swap",
        },
      ],
    },
  },
  turnstile: {
    siteKey: "0x4AAAAAAD1rdQ7ADy1oUWox",
  },

  sitemap:{
   autoLastmod:true,
   sources:[
    '/api/sitemap'
   ]
  },
  runtimeConfig: {
    public: {
      appUrl: "https://api.floracadvocates.co.ke/storage",
    },
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    },

    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      db_name: process.env.DB_NAME,
    },
  },
});