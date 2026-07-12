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
  ],

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

  runtimeConfig: {
    public: {
      appUrl: "https://florahadvocates-production-o7ug2i.laravel.cloud/storage",
    },
    db:{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    db_name:process.env.DB_NAME
    }

  
  },
});
