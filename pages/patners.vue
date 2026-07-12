<template>
  <div class="bg-white text-slate-800">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="/images/hero-image-1.jpg"
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
            At Ahmednasir Abdullahi Advocates LLP we are proud to have a team of
            passionate, creative and innovative lawyers. Our lawyers have the
            unique ability to deliver sophisticated representation to our
            clients on diverse practice areas.
          </p>
        </div>

        <div class="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="lawyer in patnersData"
            :key="lawyer.name"
            class="group isolate bg-white text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <NuxtLink
              :to="`/partner/${lawyer.slug}`"
              class="relative aspect-[4/5] cursor-pointer overflow-hidden bg-white"
            >
              <img
                :src="`${config.public.appUrl}/${lawyer.patnersImage}`"
                :alt="lawyer.slug"
                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </NuxtLink>

            <div class="relative z-10 bg-white pt-3">
              <h3 class="text-xl text-bolder text-slate-900 md:text-2xl">
                {{ lawyer.name }}
              </h3>
              <p
                class="mt-1 text-sm uppercase tracking-[0.18em] text-slate-500"
              >
                {{ lawyer.title }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
let patnersData = ref([]);
let config = useRuntimeConfig();
let { data, pending, error } = await useFetch("/api/patners");

patnersData.value = data.value;
console.log(data.value);
</script>
