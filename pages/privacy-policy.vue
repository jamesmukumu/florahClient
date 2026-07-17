<template>
  <div class="bg-white">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[56vh] min-h-[420px] w-full overflow-hidden lg:h-[62vh]"
      >
        <img
          src="/images/still-life-with-scales-justice (1).jpg"
          alt="Privacy and legal compliance"
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
                class="mt-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
              >
                Privacy Policy
              </h1>
              <p class="mt-6 max-w-2xl text-lg text-white/85 md:text-xl">
                Learn how Flora C &amp; Company Advocates collects, uses, and
                protects your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white py-4 lg:py-4">
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <div class="space-y-8">
          <article class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-black">
              1. Information We Collect
            </h2>
            <p class="mt-5 text-lg leading-9 text-slate-700">
              We may collect personal information that you provide directly to
              us, including your name, phone number, email address, and details
              shared through appointment forms.
            </p>
            <p class="mt-4 text-lg leading-9 text-slate-700">
              We may also collect technical data such as browser type, IP
              address, and usage activity to help us maintain and improve our
              website.
            </p>
          </article>

          <article class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-slate-900">
              2. How We Use Your Information ?
            </h2>
            <p class="mt-5 text-lg leading-9 text-slate-700">
              Your information is used to respond to inquiries, manage
              appointments, deliver legal services, and communicate updates
              relevant to your attention.
            </p>
            <ul class="mt-6 space-y-3 text-lg leading-9 text-slate-700">
              <li>• Provide legal consultation and client support.</li>
              <li>
                • Maintain internal records and case-related communication.
              </li>
              <li>
                • Improve website performance, security, and user experience.
              </li>
            </ul>
          </article>

          <article class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-slate-900">
              3. Data Sharing &amp; Disclosure
            </h2>
            <p class="mt-5 text-lg leading-9 text-slate-700">
              We do not sell personal data. Information may be shared only where
              necessary to provide legal services, comply with legal
              obligations, protect lawful interests, or with your express
              consent.
            </p>
          </article>

          <article class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-slate-900">
              4. Data Security &amp; Retention
            </h2>
            <p class="mt-5 text-lg leading-9 text-slate-700">
              We implement reasonable technical and organizational safeguards to
              protect your information against unauthorized access, alteration,
              or disclosure.
            </p>
            <p class="mt-4 text-lg leading-9 text-slate-700">
              Personal data is retained only for as long as necessary to fulfill
              legal, regulatory, and professional obligations.
            </p>
          </article>

          <article class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-slate-900">5. Your Rights</h2>
            <p class="mt-5 text-lg leading-9 text-slate-700">
              Subject to applicable law, you may request access to, correction
              of, or deletion of your personal data, and object to certain
              processing activities.
            </p>
            <p class="mt-4 text-lg leading-9 text-slate-700">
              To exercise these rights, contact us using the details below.
            </p>
          </article>

          <article class="p-8 sm:p-10">
            <h2 class="text-3xl font-bold text-slate-900">7. Contact Us</h2>
            <p class="mt-5 text-lg leading-9 text-slate-700">
              If you have any questions about this Privacy Policy or your
              personal data, please contact Flora C &amp; Company Advocates.
            </p>

            <div class="mt-8 rounded-xl border border-pr/40 bg-pr/10 p-6">
              <p class="text-lg font-semibold text-slate-900">
                Flora C &amp; Company Advocates
              </p>
              <p class="mt-2 text-lg text-slate-700">
                Email: litigation@floracadvocate.co.ke
              </p>
              <p class="mt-1 text-lg text-slate-700">Phone: +254 714 416 325</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const requestUrl = useRequestURL();
const pageUrl = `${requestUrl.origin}/privacy-policy`;
const seoDescription =
  "Read the Privacy Policy of Flora C & Company Advocates to understand how personal information is collected, used, and protected.";

useSeoMeta({
  title: "Privacy Policy | Flora C & Company Advocates",
  description: seoDescription,
  ogTitle: "Privacy Policy | Flora C & Company Advocates",
  ogDescription: seoDescription,
  ogType: "website",
  ogUrl: pageUrl,
  twitterCard: "summary_large_image",
  twitterTitle: "Privacy Policy | Flora C & Company Advocates",
  twitterDescription: seoDescription,
});

useSchemaOrg([
  {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: "Privacy Policy",
    url: pageUrl,
    description: seoDescription,
  },
  {
    "@type": "PrivacyPolicy",
    name: "Privacy Policy",
    url: pageUrl,
    publisher: {
      "@type": "LegalService",
      name: "Flora C & Company Advocates",
      url: requestUrl.origin,
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
        name: "Privacy Policy",
        item: pageUrl,
      },
    ],
  },
]);
</script>
