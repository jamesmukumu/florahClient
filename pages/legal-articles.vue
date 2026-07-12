<template>
  <div class="bg-white">
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="/images/gavel-law-book.jpg"
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


    
    <section class="border-b border-black/5 bg-white py-8 sm:py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">


        <div
          class="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 text-center"
        >
          <NuxtLink
            to="/legal-articles"
            class="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition"
            :class="
              isAllActive
                ? 'border-[#C79A52] bg-[#C79A52] text-white shadow-sm'
                : 'border-black/10 bg-white text-slate-700 hover:border-[#C79A52] hover:text-[#C79A52]'
            "
          >
            All
          </NuxtLink>

          <NuxtLink
            v-for="category in categories"
            :key="categoryKey(category)"
            :to="{
              path: '/legal-articles',
              query: { category: categorySlug(category) },
            }"
            class="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition"
            :class="
              activeCategory === categorySlug(category)
                ? 'border-[#C79A52] bg-[#C79A52] text-white shadow-sm'
                : 'border-black/10 bg-white text-slate-700 hover:border-[#C79A52] hover:text-[#C79A52]'
            "
          >
            {{ categoryLabel(category) }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-[#F9FAFB]">
      <ArticlesCard :articles="articles"/>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const { data } = await useFetch("/api/articles");
const categories = computed(() => data.value?.categories ?? []);
const articles = computed(()=>data.value.articles ?? [])
const activeCategory = computed(() => {
  const value = route.query.category;
  return Array.isArray(value) ? value[0] : value || "";
});

const isAllActive = computed(() => !activeCategory.value);

function categorySlug(category) {
  return (
    category?.slug ?? category?.name ?? category?.title ?? String(category)
  );
}

function categoryLabel(category) {
  return category?.name ?? category?.title ?? String(category);
}

function categoryKey(category) {
  return category?.id ?? categorySlug(category);
}
</script>
