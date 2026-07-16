<template>
  <div class="min-h-screen bg-white text-slate-800">
    <!-- Background Pattern -->
    <section id="hero-carousel" class="relative w-full overflow-hidden">
      <div
        class="group relative h-[62vh] min-h-[480px] w-full overflow-hidden lg:h-[68vh]"
      >
        <img
          src="/images/practice-areas/justice-image.jpg"
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
                {{ patnerInfo?.name || "Team Member" }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="patnerInfo"
      class="relative z-10 mx-auto max-w-7xl px-8 pb-24 pt-10"
    >
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_520px]">
        <div class="order-2 lg:order-1">
          <h1 class="text-5xl font-serif leading-tight text-black lg:text-6xl">
            {{ patnerInfo.name }}
          </h1>

          <h2 class="mt-3 text-4xl font-serif text-pr">
            {{ patnerInfo.title }}
          </h2>

          <div class="mb-8 mt-8 h-px bg-pr"></div>

          <div class="space-y-3 text-gray-700">
            <div class="flex items-center gap-4">
              <UIcon name="ic:baseline-email" />
              <a :href="`mailto:${patnerInfo.email}`">{{ patnerInfo.email }}</a>
            </div>

            <div class="flex items-center gap-4">
              <UIcon name="ic:baseline-phone" />
              <span>{{ patnerInfo.phoneNumber }}</span>
            </div>

            <div
              v-if="patnerInfo.secondaryPhoneNumber"
              class="flex items-center gap-4"
            >
              <UIcon name="ic:baseline-smartphone" />
              <span>{{ patnerInfo.secondaryPhoneNumber }}</span>
            </div>
          </div>

          <div class="mt-8 text-gray-500">
            <NuxtLink to="/" class="hover:text-[#16386c]"> Home </NuxtLink>
            <span class="mx-2">|</span>
            <NuxtLink to="/patner" class="hover:text-[#16386c]">
              Team
            </NuxtLink>
            <span class="mx-2">|</span>
            <span class="text-sky-600">{{ patnerInfo.name }}</span>
          </div>

          <button
          @click="bookAppointment"
            class="mt-10 cursor-pointer border border-[#16386c] px-12 py-4 text-sm uppercase tracking-[0.3em] transition hover:bg-[#16386c] hover:text-white"
          >
            Book Appointment
          </button>

          <div class="mt-20 border-b border-slate-200">
            <div class="flex flex-wrap gap-2 md:gap-4">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                type="button"
                class="border-b-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-colors md:text-base"
                :class="
                  activeTab === tab.key
                    ? 'border-[#16386c] text-[#16386c] cursor-pointer'
                    : 'border-transparent text-slate-500 hover:text-[#16386c] cursor-pointer'
                "
                @click="activeTab = tab.key"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <div class="mt-10 border-t border-slate-100 pt-8 md:pt-10">
            <h3 class="mb-5 text-3xl font-serif text-black">
              {{ activeTabLabel }}
            </h3>
            <div
              class="leading-8 text-gray-700"
              v-html="activeTabContent"
            ></div>
          </div>
        </div>

        <aside class="order-1 lg:order-2">
          <div
            ref="imageRevealRef"
            class="mx-auto w-full max-w-sm lg:max-w-none lg:sticky lg:top-36"
          >
            <div class="bg-white p-3 sm:p-4 lg:p-6">
              <img
                :src="`https://api.floracadvocates.co.ke/storage/${patnerInfo.patnersImage}`"
                :alt="patnerInfo.name"
                class="relative z-10 max-h-[420px] w-full object-contain transition-all duration-1000 ease-out sm:max-h-[520px] md:max-h-[620px] lg:max-h-[860px]"
                :class="
                  hasImageEntered
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-12 opacity-0 scale-[0.96]'
                "
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const route = useRoute();

const { slug } = route.params;

const { data } = await useFetch("/api/partner", {
  query: {
    slug,
  },
});

const patnerInfo = computed(() => data.value?.[0] || null);

const tabs = [
  { key: "work", label: "Work" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
];

const activeTab = ref("work");

const activeTabLabel = computed(() => {
  const current = tabs.find((tab) => tab.key === activeTab.value);
  return current?.label || "Work";
});

const activeTabContent = computed(() => {
  if (!patnerInfo.value) return "";

  const workContent =
    patnerInfo.value.workBackground || patnerInfo.value.overview || "";
  const educationContent = patnerInfo.value.educationBackground || "";
  const experienceContent =
    patnerInfo.value.overview ||
    patnerInfo.value.workExperience ||
    patnerInfo.value.workBackground ||
    "";

  if (activeTab.value === "education") {
    return educationContent || "No education details available.";
  }

  if (activeTab.value === "experience") {
    return experienceContent || "No experience details available.";
  }

  return workContent || "No work details available.";
});
let bookAppointment = ()=>navigateTo("/book/appointment")
const imageRevealRef = ref(null);
const hasImageEntered = ref(false);

let observer;

onMounted(() => {
  if (!imageRevealRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        hasImageEntered.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.2 },
  );

  observer.observe(imageRevealRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

console.log(patnerInfo);
</script>
