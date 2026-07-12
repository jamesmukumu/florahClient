<template>
  <div class="bg-white">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div class="group relative h-[v30h] w-full overflow-hidden lg:h-[50vh]">
        <img
          src="/images/judges-gavel-book-wooden-table-law-justice-concept-background.jpg"
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
                Legal Insights
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div>
      <div
        class="flex flex-col lg:flex-row justify-center items-start gap-8 w-full max-w-[1300px] mx-auto bg-white p-4 sm:p-8 m-2 sm:m-5"
      >
        <div
          class="flex flex-col gap-6 flex-[2] w-full lg:max-w-[850px] self-start"
        >
          <h1 class="text-3xl font-bold text-black">{{ article.title }}</h1>

          <div class="w-full">
            <img
              :src="`https://florahadvocates-production-o7ug2i.laravel.cloud/storage/${article.articleImage}`"
              :alt="article.slug"
              class="w-full max-h-[400px] object-cover rounded-sm"
            />
          </div>

          <div
            class="prose flex flex-col gap-2"
            v-html="article.articleBody"
          ></div>
        </div>

        <aside class="w-full lg:flex-1 lg:max-w-[350px] self-start">
          <RelatedArticles :articles="article.related_blogs" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
let route = useRoute();

let { data, pending, error } = await useFetch("/api/article", {
  query: {
    slug: route.params.slug,
  },
});

let article = computed(() => data.value ?? {});
</script>
