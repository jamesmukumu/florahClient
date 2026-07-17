<script setup>
const requestUrl = useRequestURL();
const pageUrl = `${requestUrl.origin}/book/appointment`;
const seoDescription =
  "Book a legal consultation with Flora C & Company Advocates in Nairobi, Kenya for practical, strategic legal support across corporate, litigation, family, conveyancing, and succession matters.";

useSeoMeta({
  title: "Book Appointment | Flora C & Company Advocates",
  description: seoDescription,
  ogTitle: "Book Appointment | Flora C & Company Advocates",
  ogDescription: seoDescription,
  ogType: "website",
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: "Book Appointment | Flora C & Company Advocates",
  twitterDescription: seoDescription,
});

useSchemaOrg([
  {
    "@type": "ContactPage",
    "@id": `${pageUrl}#contact-page`,
    name: "Schedule Appointment",
    url: pageUrl,
    description: seoDescription,
  },
  {
    "@type": "Service",
    "@id": `${pageUrl}#consultation-service`,
    name: "Legal Consultation Booking",
    description: seoDescription,
    serviceType: "Legal Consultation",
    provider: {
      "@type": "LegalService",
      name: "Flora C & Company Advocates",
      url: requestUrl.origin,
      areaServed: {
        "@type": "Country",
        name: "Kenya",
      },
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
        name: "Book Appointment",
        item: pageUrl,
      },
    ],
  },
]);
</script>

<template>
  <div>
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="/images/florac-appointment-hero.png"
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
                Schedule
              </h1>
              <h1
                class="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
              >
                Appointment
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <BookingForm />
    </section>
  </div>
</template>
