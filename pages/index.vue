<template>
  <div class="w-full overflow-y-hidden">
    <section id="hero-carousel" class="relative w-full">
      <UCarousel
        v-slot="{ item }"
        loop
        :items="heroSlides"
        fade
        autoplay
        :ui="{ item: 'basis-full' }"
      >
        <div class="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <img
            :src="item.image"
            :alt="item.alt"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-black/65"></div>

          <div
            class="absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <h1
              class="max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              {{ item.headline }}
            </h1>
          </div>
        </div>
      </UCarousel>
    </section>

    <section class="bg-white">
      <About />
    </section>

    <p v-if="error" role="alert" class="px-8 py-4 text-center text-red-700">
      Practice areas and latest articles are temporarily unavailable.
    </p>

    <section>
      <Practices title="Our Practice" :practice-areas="practiceAreas" />
    </section>

    <section class="bg-white py-24 overflow-hidden">
      <div class="mx-auto max-w-[1700px] px-8 lg:px-14">
        <div class="flex flex-col lg:flex-row items-center">
          <!-- Left -->
          <div class="relative z-20 w-full lg:w-[54%] lg:pr-24">
            <span
              class="mb-7 block uppercase tracking-[0.35em] text-[14px] font-semibold text-[#d2a24b]"
            >
              Articles
            </span>

            <h2
              class="max-w-[620px] font-serif text-black leading-[0.94] text-[56px] xl:text-[68px]"
            >
              Latest Posts:
              <br />
              Relevant
              <br />
              Articles
            </h2>

            <div class="mt-16 space-y-11">
              <article
                class="flex gap-5"
                v-for="article in articles"
                :key="article.id"
              >
                <div
                  class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#d5aa4b]"
                >
                  <svg
                    class="h-3.5 w-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div>
                  <NuxtLink
                    :to="`/legal-article/${article.slug}`"
                    class="text-xl leading-snug font-medium text-black"
                  >
                    {{ article.title }}
                  </NuxtLink>

                  <p class="mt-2 text-m text-slate-400">
                    {{ new Date(article.created_at).toDateString() }}
                  </p>
                </div>
              </article>

              <NuxtLink
                to="/legal-articles"
                class="inline-flex items-center gap-2 rounded-full border border-pr/20 bg-pr/5 px-4 py-2 text-sm font-semibold text-pr tracking-wide"
              >
                More Articles
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Right -->
          <div class="relative mt-16 w-full lg:mt-0 lg:w-[46%]">
            <!-- Fade -->
            <div class="absolute left-0 top-0 z-10 h-full w-10" />

            <img
              src="/images/concept-justice-court-minimalist-forms-lines-judicial-system_94863-3701.jpg"
              alt="gavel-law-courts"
              class="h-[640px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>




  </div>
</template>

<script setup>

const heroSlides = [
{
    image:
      "/images/home-carousel/wooden-judges-gavel-table-courtroom-enforcement-office_1150-19608.jpg",
    alt: "Law professionals in a formal office setting",
    headline: "Your Legal Partner",
  },
  {
    image:
      "/images/home-carousel/photorealistic-lawyer-environment_23-2151152218.jpg",
    alt: "Legal consultation meeting",
    headline: "Your Trusted Legal Partner",
  },

  {
    image: "/images/home-carousel/court-room-1.jpg",
    alt: "Legal consultation meeting",
    headline: "The Reliable Partner",
  },
];
let { data, pending, error } = await useFetch("/api/home");

let practiceAreas = computed(() => data.value?.practices ?? []);
let articles = computed(() => data.value?.articles ?? []);

const requestUrl = useRequestURL();
const pageUrl = requestUrl.origin;
const firmName = "Flora C & Company Advocates";
const seoDescription =
  "Flora C & Company Advocates is a trusted law firm in Nairobi, Kenya, offering expert legal services in corporate law, litigation, conveyancing, family law, succession, and dispute resolution.";

useSeoMeta({
  title: "Flora C & Company Advocates | Law Firm in Nairobi, Kenya",
  description: seoDescription,
  keywords:
    "Law Firm Nairobi, Advocates Kenya, Corporate Lawyers Nairobi, Conveyancing Lawyers Kenya, Family Lawyers Nairobi, Litigation Lawyers Kenya, Succession Lawyers, Legal Services Kenya",
  ogTitle: "Flora C & Company Advocates | Law Firm in Nairobi, Kenya",
  ogDescription: seoDescription,
  ogType: "website",
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: "Flora C & Company Advocates | Law Firm in Nairobi, Kenya",
  twitterDescription: seoDescription,
});

useSchemaOrg([
  {
    "@type": "WebSite",
    "@id": `${pageUrl}/#website`,
    name: firmName,
    url: pageUrl,
    inLanguage: "en",
  },
  {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    name: "Home",
    url: pageUrl,
    description: seoDescription,
    isPartOf: {
      "@id": `${pageUrl}/#website`,
    },
  },
  {
    "@type": "LegalService",
    "@id": `${pageUrl}/#legal-service`,
    name: firmName,
    url: pageUrl,
    description: seoDescription,
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    serviceType: practiceAreas.value.map((practice) => practice.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal Services",
      itemListElement: practiceAreas.value.map((practice, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: practice.title,
          url: `${pageUrl}/practice/areas#${practice.slug}`,
        },
      })),
    },
  },
  {
    "@type": "ItemList",
    name: "Latest Legal Articles",
    itemListElement: articles.value.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${pageUrl}/legal-article/${item.slug}`,
      name: item.title,
    })),
  },
]);


</script>
