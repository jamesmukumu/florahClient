<template>
  <div class="bg-white text-slate-800">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="/images/home-carousel/court-room-1.jpg"
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
                Our Team
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white pb-14 pt-10 md:pb-20 md:pt-12">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-4xl text-center">
          <p
            class="mx-auto max-w-4xl text-base leading-8 text-slate-600 md:text-lg"
          >
            At Flora C & Company Advocates, our strength lies in a team of
            dedicated, forward-thinking, and highly skilled lawyers committed to
            delivering exceptional legal services.
          </p>
        </div>

        <div class="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="lawyer in patnersData"
            :key="lawyer.name"
            class="group isolate flex flex-col bg-white text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <NuxtLink
              :to="`/partner/${lawyer.slug}`"
              class="relative aspect-[4/5] cursor-pointer overflow-hidden bg-white flex-shrink-0"
            >
              <img
                :src="`${config.public.appUrl}/${lawyer.patnersImage}`"
                :alt="lawyer.slug"
                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </NuxtLink>

            <div class="relative z-10 bg-white px-3 py-4">
              <h3 class="text-xl text-bolder text-slate-900 md:text-2xl">
                {{ lawyer.name }}
              </h3>
              <p
                class="mt-2 text-sm uppercase tracking-[0.18em] text-slate-700"
              >
                {{ lawyer.title }}
              </p>
            </div>

            <div>
              
                      <NuxtLink
            :to="`/partner/${lawyer.slug}`"
            class="inline-flex items-center gap-2 rounded-full border border-pr/20 bg-pr/5 px-4 py-2 text-sm font-semibold text-pr tracking-wide m-5"
          >
            See More
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
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const patnersData = ref([]);
const config = useRuntimeConfig();
const { data } = await useFetch("/api/patners");

patnersData.value = data.value;

const requestUrl = useRequestURL();
const pageUrl = `${requestUrl.origin}/patners`;
const seoDescription =
  "Meet the legal team at Flora C & Company Advocates in Nairobi, Kenya. Explore partner profiles, legal backgrounds, and areas of practice.";

useSeoMeta({
  title: "Our Team | Flora C & Company Advocates",
  description: seoDescription,
  ogTitle: "Our Team | Flora C & Company Advocates",
  ogDescription: seoDescription,
  ogType: "website",
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: "Our Team | Flora C & Company Advocates",
  twitterDescription: seoDescription,
});

useSchemaOrg([
  {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection-page`,
    name: "Our Team",
    url: pageUrl,
    description: seoDescription,
  },
  {
    "@type": "ItemList",
    name: "Team Members",
    itemListElement: patnersData.value.map((lawyer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: lawyer.name,
        jobTitle: lawyer.title,
        url: `${requestUrl.origin}/partner/${lawyer.slug}`,
      },
    })),
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
        name: "Our Team",
        item: pageUrl,
      },
    ],
  },
]);
</script>
