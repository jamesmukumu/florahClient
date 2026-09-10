<template>
  <div class="w-full grid place-content-center p-4">
    <div
      class="mt-4 w-full grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="article in articles"
        :key="article.id"
        class="flex relative w-full max-w-[350px] cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
      >
        <NuxtLink :to="`/legal-article/${article.slug}`">
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="`https://pub-40dbe868a46f4a7f914c7b730520d83b.r2.dev/${article.articleImage}`"
              :alt="''"
              class="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

          <div
            class="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 pt-4 text-xs text-gray-500"
          >
            <div class="flex items-center gap-2">
              <UIcon
                name="i-heroicons-user-circle-20-solid"
                class="h-4 w-4 text-pr"
              />
              <span class="font-medium text-black">{{
                article.admin_name ?? "Admin"
              }}</span>
            </div>

            <div class="flex items-center gap-2">
              <UIcon
                name="i-heroicons-calendar-days-20-solid"
                class="h-4 w-4 text-pr"
              />
              <span class="font-medium text-black">{{
                formatDate(article.created_at)
              }}</span>
            </div>
          </div>

          <h3 class="text-xl font-semibold text-black dark:text-white m-3">
            {{ article.title }}
          </h3>
          <div
            v-html="article.articleOverview"
            class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 m-3"
          ></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true,
  },
});

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>
