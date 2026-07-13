<template>
  <div>
    <header :class="headerClass">
      <!-- Top Bar -->
      <div :class="topBarClass">
        <div
          class="container mx-auto px-4 flex justify-between items-center text-sm"
        >
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
              <UIcon name="ic:sharp-call" />

              <span>+254 714 416 325</span>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <UIcon name="ic:round-mail" />
              <a href="mailto:litigation@floraadvocates.co.ke"
                >litigation@floraadvocates.co.ke</a
              >
            </div>
          </div>

          <div class="flex items-center space-x-5">
            <a
              href="https://m.facebook.com/pages/Flora-C-Company-Advocates/103302635872156/?locale=hi_IN"
              class="text-xl cursor-pointer"
            >
              <UIcon name="mdi:facebook" />
            </a>
            <a
              href="https://ke.linkedin.com/in/flora-c-advocates-924463250"
              class="text-xl cursor-pointer"
            >
              <UIcon name="mdi:instagram" />
            </a>

            <a
              href="https://www.instagram.com/floracadvocates/"
              class="text-xl cursor-pointer"
            >
              <UIcon name="mdi:linkedin" />
            </a>
          </div>
        </div>
      </div>

      <!-- Main Nav -->
      <div :class="mainNavClass">
        <NuxtLink to="/" class="flex items-center gap-3 shrink-0 group">
          <img
            src="/images/logo-florah-advocates-removebg-preview.png"
            alt="Malaso Africa Safaris logo"
            class="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav
          class="hidden lg:flex flex-1 items-center gap-6 text-base font-medium flex-wrap justify-center"
        >
          <NuxtLink
            to="/"
            :class="[navLinkClass, isActive('/') ? activeLinkClass : '']"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            :class="[navLinkClass, isActive('/about') ? activeLinkClass : '']"
          >
            About Us
          </NuxtLink>

          <NuxtLink
            to="/practice/areas"
            :class="[
              navLinkClass,
              isActive('/practice/areas') ? activeLinkClass : '',
            ]"
          >
            Practice Areas
          </NuxtLink>
          <NuxtLink
            to="/patners"
            :class="[navLinkClass, isActive('/patners') ? activeLinkClass : '']"
          >
            Our Team
          </NuxtLink>

          <NuxtLink
            to="/legal-articles"
            :class="[
              navLinkClass,
              isActive('/legal-articles') ? activeLinkClass : '',
            ]"
          >
            Law Articles
          </NuxtLink>

          <NuxtLink to="/book/appointment" :class="contactButtonClass">
            Contact Us
          </NuxtLink>
        </nav>

        <!-- Hamburger -->
        <button @click="toggleMenu" :class="mobileMenuButtonClass">
          <UIcon name="ic:sharp-menu" />
        </button>
      </div>
    </header>

    <!-- Overlay -->
    <div
      v-if="isOpen"
      @click="toggleMenu"
      class="fixed inset-0 bg-black/50 z-40 transition-opacity"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="flex justify-between items-center p-6 border-b">
        <h2 class="text-lg font-semibold">Menu</h2>
        <button @click="toggleMenu" class="text-2xl">
          <UIcon name="material-symbols:close" />
        </button>
      </div>

      <ul class="flex flex-col p-6 space-y-6 text-lg font-medium">
        <li><NuxtLink to="/" @click="closeMenu">Home</NuxtLink></li>
        <li><NuxtLink to="/about" @click="closeMenu">About Us</NuxtLink></li>
        <li><NuxtLink to="/patners" @click="closeMenu">Our Team</NuxtLink></li>
        <li>
          <NuxtLink to="/practice/areas" @click="closeMenu"
            >Practice Areas</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/legal-articles" @click="closeMenu"
            >Law Articles</NuxtLink
          >
        </li>

        <NuxtLink
          to="/book/appointment"
          @click="closeMenu"
          class="px-6 py-2 rounded bg-pr hover:bg-pr transition text-sm font-semibold text-white"
        >
          Contact Us
        </NuxtLink>
      </ul>
    </aside>
  </div>
</template>

<script setup>
const isOpen = ref(false);
const isTransparent = ref(false);
const route = useRoute();

const isActive = (path) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const updateHeaderState = () => {
  const heroSection = document.getElementById("hero-carousel");
  if (!heroSection) {
    isTransparent.value = false;
    return;
  }

  const heroBounds = heroSection.getBoundingClientRect();
  const isAtTop = window.scrollY <= 24;
  const isHeroVisible = heroBounds.bottom > 0;
  isTransparent.value = isAtTop && isHeroVisible;
};

watch(
  () => route.path,
  async () => {
    await nextTick();
    updateHeaderState();
  },
);

onMounted(() => {
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", updateHeaderState);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateHeaderState);
  window.removeEventListener("resize", updateHeaderState);
});

const headerClass = computed(() => {
  if (isTransparent.value) {
    return "w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-transparent shadow-none";
  }

  return "w-full fixed top-0 left-0 z-50 bg-white shadow-md";
});

const topBarClass = computed(() => {
  if (isTransparent.value) {
    return "bg-pr/75 text-white py-2";
  }

  return "bg-pr text-white py-2";
});

const mainNavClass = computed(() => {
  const base =
    "container mx-auto px-6 py-4 flex items-center justify-between position-fixed transition-colors duration-300";

  if (isTransparent.value) {
    return `${base} text-white`;
  }

  return `${base} text-gray-900`;
});

const navLinkClass = computed(() => {
  if (isTransparent.value) {
    return "hover:text-white/80";
  }

  return "hover:text-pr";
});

const activeLinkClass = computed(() => {
  if (isTransparent.value) {
    return "pb-1 border-b-2 border-white";
  }

  return "pb-1 border-b-2 border-pr";
});

const contactButtonClass = computed(() => {
  if (isTransparent.value) {
    return "ml-4 px-4 py-2 rounded bg-white text-pr hover:bg-white/90 transition text-base font-semibold";
  }

  return "ml-4 px-4 py-2 rounded bg-pr hover:bg-pr transition text-base font-semibold text-white";
});

const mobileMenuButtonClass = computed(() => {
  if (isTransparent.value) {
    return "lg:hidden text-2xl text-white";
  }

  return "lg:hidden text-2xl";
});
</script>
