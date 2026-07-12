<template>
  <div class="bg-white">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="https://www.floracadvocates.co.ke/wp-content/uploads/2022/09/library-gcc26b4ac4_1920.jpg"
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
                  0{{ index + 1 }}
                </h2>

                <div class="mt-5 h-[2px] w-14 bg-[#C79A52]"></div>
              </div>
            </div>

            <!-- Content -->
            <div class="lg:pr-14 lg:border-r border-black/5">
              <h2
                class="font-serif text-4xl font-bold leading-tight text-[#072C63] lg:text-[46px]"
              >
                {{ practice.title }}
              </h2>

              <p
                class="mt-6 max-w-2xl text-[22px] leading-relaxed"
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
let { data, pending, error } = await useFetch("/api/home");

let practiceAreas = computed(() => data.value.practices ?? []);
</script>
