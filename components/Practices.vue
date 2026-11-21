<template>
  <div class="w-full grid place-content-center p-4 overflow-y-hidden">
    <h2
      class="heading-font text-4xl md:text-5xl text-center font-bold text-black mb-4"
    >
      {{ title }}
    </h2>
    <div class="w-24 h-1 bg-pr mx-auto"></div>
    <div class="mt-5 w-full max-w-7xl mx-auto flex justify-end">
      <NuxtLink
        to="/practice/areas"
        class="inline-flex items-center gap-2 rounded-full border border-pr/20 bg-pr/5 px-4 py-2 text-sm font-semibold text-pr tracking-wide"
      >
        View all practice areas
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
    <div class="mt-6 w-full">
      <div
        class="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-5"
      >
        <div
          v-for="item in practiceAreas"
          :key="item.slug"
          class="group block h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="`${config.public.appUrl}/${item.practiceAreaImage}`"
              :alt="item.slug"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <div class="p-5">
            <h3 class="text-xl font-semibold text-gray-800">
              {{ item.title }}
            </h3>
            <div
              v-html="item.overview"
              class="mt-3 line-clamp-3 text-sm text-gray-600"
            ></div>
          </div>

          <NuxtLink
            :to="`/practice/areas/?area=${item.slug}`"
            class="inline-flex items-center gap-2 rounded-full border border-pr/20 bg-pr/5 px-4 py-2 text-sm font-semibold text-pr tracking-wide m-5"
          >
            Read More
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
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "PracticeAreas" });
const config = useRuntimeConfig();
defineProps({
  practiceAreas: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
