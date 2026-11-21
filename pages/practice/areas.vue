<template>
  <div class="bg-white">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="/images/downloads-home.jpeg"
          alt="Legal team in a modern office setting"
          class="h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
        />

        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/55 to-slate-900/20"
        ></div>
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(21,53,91,0.35),transparent_30%)]"
        ></div>

        <div class="absolute inset-0 flex items-end">
          <div class="container mx-auto px-6 pb-16 lg:pb-20">
            <div class="max-w-4xl text-white">
              <h1
                class="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
              >
                Our
              </h1>
              <h1
                class="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
              >
                Practice Areas
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          v-for="(practice, index) in practiceAreas"
          :key="practice.slug"
          :id="practice.slug"
          class="relative pb-16 mb-16 last:mb-0 last:pb-0"
        >
          <div
            class="grid grid-cols-1 items-start gap-12 lg:grid-cols-[130px_1fr_420px] lg:gap-14"
          >
            <div class="flex lg:block">
              <div>
                <h2
                  class="font-serif text-[72px] leading-none font-bold text-[#C79A52]"
                >
                  {{ index + 1 > 9 ? "0" : "" }}{{ index + 1 }}
                </h2>

                <div class="mt-5 h-[2px] w-14 bg-[#C79A52]"></div>
              </div>
            </div>

            <!-- Content -->
            <div class="lg:pr-14 lg:border-r border-black/5">
              <h2
                class="text-4xl font-bold leading-tight text-black lg:text-2xl"
              >
                {{ practice.title }}
              </h2>

              <p
                class="mt-6 max-w-2xl leading-relaxed"
                v-html="practice.overview"
              ></p>
            </div>

            <div class="lg:pl-2">
              <h3 class="text-xl font-bold text-[#072C63]">Key outcomes:</h3>

              <div v-html="practice.description" class="mt-8 space-y-7"></div>
            </div>
          </div>

          <div class="mt-14 flex items-center gap-4">
            <div
              class="h-px flex-1 bg-gradient-to-r from-transparent via-black/5 to-transparent"
            ></div>
            <div
              class="h-2.5 w-2.5 rounded-full bg-[#C79A52] shadow-[0_0_0_6px_rgba(199,154,82,0.08)]"
            ></div>
            <div
              class="h-px flex-1 bg-gradient-to-r from-transparent via-black/5 to-transparent"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/home");

const practiceAreas = computed(() => data.value.practices ?? []);

const requestUrl = useRequestURL();
const pageUrl = `${requestUrl.origin}/practice/areas`;
const firmName = "Flora C & Company Advocates";
const seoDescription =
  "Flora C & Company Advocates is a leading law firm in Nairobi, Kenya, offering Commercial & Corporate Law, Litigation & Dispute Resolution, Family Law, Conveyancing & Real Estate, and Succession Law services with practical, strategic, client-focused legal solutions.";
const serviceTypes = [
  "Commercial & Corporate Law",
  "Litigation & Dispute Resolution",
  "Family Law",
  "Conveyancing",
  "Real Estate Law",
  "Succession Law",
];

useSeoMeta({
  title: "Practice Areas | Flora C & Company Advocates",
  description: seoDescription,
  ogTitle: "Practice Areas | Flora C & Company Advocates",
  ogDescription: seoDescription,
  ogType: "website",
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: "Practice Areas | Flora C & Company Advocates",
  twitterDescription: seoDescription,
});

useSchemaOrg([
  defineWebPage({
    name: "Practice Areas",
    description: seoDescription,
    url: pageUrl,
  }),

  {
    "@type": "LegalService",
    "@id": `${pageUrl}#legal-service`,
    name: firmName,
    description: seoDescription,
    url: pageUrl,
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    serviceType: serviceTypes,
    provider: {
      "@type": "Organization",
      name: firmName,
      url: requestUrl.origin,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal Services",
      itemListElement: practiceAreas.value.map((practice, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: practice.title,
          url: `${pageUrl}#${practice.slug}`,
        },
      })),
    },
  },

  {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: requestUrl.origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Practice Areas",
        item: pageUrl,
      },
    ],
  },
]);

const route = useRoute();

async function scrollToSlug(slug) {
  if (!slug) return;
  await nextTick();
  const el = document.getElementById(slug);
  if (el) {
    // Scroll the element into view and align it to the top of the viewport
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function extractSlugFromRoute(r) {
  // 1) hash (#slug)
  if (r.hash && r.hash.length > 1) return r.hash.replace("#", "");

  // 2) query ?area=...
  if (r.query && r.query.area)
    return Array.isArray(r.query.area) ? r.query.area[0] : r.query.area;

  // 3) path segment: /practice/areas/:slug
  const parts = (r.path || "").split("/").filter(Boolean);
  const areasIndex =
    parts.indexOf("practice") >= 0 ? parts.indexOf("practice") : -1;
  if (
    areasIndex >= 0 &&
    parts[areasIndex + 1] === "areas" &&
    parts.length > areasIndex + 2
  ) {
    return parts[areasIndex + 2];
  }

  return null;
}

onMounted(() => {
  const slug = extractSlugFromRoute(route);
  if (slug) scrollToSlug(slug);
});

watch(
  () => [route.path, route.hash, route.query && route.query.area],
  () => {
    const slug = extractSlugFromRoute(route);
    if (slug) scrollToSlug(slug);
  },
);
</script>
