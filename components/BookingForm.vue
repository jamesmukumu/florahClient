<template>
  <div
    class="w-full mx-auto rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row"
  >
    <!-- LEFT: Contact Form -->
    <div class="flex-1 bg-white p-6 md:p-10">
      <h2 class="text-2xl text-black font-semibold mb-2">
        Book An Appointment
      </h2>
      <p class="text-sm text-gray-500 mb-8">
        Fill in the form and we'll get back to you shortly.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- FIRST + LAST -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <input
              v-model="form.firstName"
              placeholder="First Name"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
              {{ errors.firstName }}
            </p>
          </div>
          <div class="w-full">
            <input
              v-model="form.lastName"
              placeholder="Last Name"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
              {{ errors.lastName }}
            </p>
          </div>
        </div>

        <!-- EMAIL + PHONE -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <input
              v-model="form.email"
              type="email"
              placeholder="Email Address"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">
              {{ errors.email }}
            </p>
          </div>
          <div class="w-full">
            <input
              v-model="form.phone"
              placeholder="Phone"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
              {{ errors.phone }}
            </p>
          </div>
        </div>

        <!-- MESSAGE -->
        <div>
          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Your Message"
            class="w-full border rounded-md px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p v-if="errors.message" class="text-red-500 text-xs mt-1">
            {{ errors.message }}
          </p>
        </div>

        <div>
          <NuxtTurnstile ref="turnstile" v-model="token" />
          <p v-if="errors.token" class="text-red-500 text-xs mt-1">
            {{ errors.token }}
          </p>
        </div>

        <!-- SUBMIT -->
        <div v-if="isTurnstileVerified" class="pt-2">
          <button
            type="submit"
            :disabled="save || !isTurnstileVerified"
            class="w-full md:w-auto bg-pr hover:bg-pr cursor-pointer text-white text-sm font-medium px-8 py-2.5 rounded-md transition disabled:opacity-50"
          >
            {{ save ? "Sending..." : "Submit" }}
          </button>
        </div>
        <p v-else class="text-s text-red-500">
          Complete the verification above to reveal the submit button.
        </p>
      </form>
    </div>

    <!-- RIGHT: Contact Info Card -->
    <div
      class="lg:w-96 bg-pr text-white flex flex-col justify-center p-8 gap-6"
    >
      <h3 class="text-xl font-semibold mb-2 border-b border-white/30 pb-3">
        Contact Information
      </h3>

      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2 mb-1">
          <svg
            class="w-5 h-5 shrink-0 opacity-80"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.23 1.02L7.5 9.5a16.06 16.06 0 006.99 7l1.5-1.62a1 1 0 011.02-.23l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2C9.16 21 3 14.84 3 7V5z"
            />
          </svg>
          <span class="text-sm font-semibold uppercase tracking-wide opacity-90"
            >Telephone &amp; Phone</span
          >
        </div>
        <div class="flex items-center gap-3 text-sm">
          <svg
            class="w-4 h-4 shrink-0 opacity-75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.23 1.02L7.5 9.5a16.06 16.06 0 006.99 7l1.5-1.62a1 1 0 011.02-.23l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2C9.16 21 3 14.84 3 7V5z"
            />
          </svg>
          <div>
            <p class="opacity-70 text-xs">Telephone</p>
            <p>+254 714 416 325</p>
          </div>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <svg
            class="w-4 h-4 shrink-0 opacity-75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <div>
            <p class="opacity-70 text-xs">Phone</p>
            <p>+254 714 416 325</p>
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2 mb-1">
          <svg
            class="w-5 h-5 shrink-0 opacity-80"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="text-sm font-semibold uppercase tracking-wide opacity-90"
            >Email</span
          >
        </div>
        <div class="flex items-center gap-3 text-sm">
          <svg
            class="w-4 h-4 shrink-0 opacity-75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div class="break-all">
            <p class="opacity-70 text-xs">General</p>
            <p>litigation@floraadvocates.co.ke</p>
          </div>
        </div>
      </div>

      <!-- Address & Hours -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2 mb-1">
          <svg
            class="w-5 h-5 shrink-0 opacity-80"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span class="text-sm font-semibold uppercase tracking-wide opacity-90"
            >Address &amp; Hours</span
          >
        </div>

        <div class="flex items-start gap-3 text-sm">
          <svg
            class="w-4 h-4 shrink-0 mt-0.5 opacity-75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p class="opacity-70 text-xs">Office</p>
            <p class="leading-snug">
              General Conference Building,<br />3rd Riverside Drive, 2nd Floor,
              Kenya.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3 text-sm">
          <svg
            class="w-4 h-4 shrink-0 mt-0.5 opacity-75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6-4m12 4l-6-4m0 0V9"
            />
          </svg>
          <div>
            <p class="opacity-70 text-xs">Postal</p>
            <p>P.O. Box 6377-00100, Nairobi, Kenya.</p>
          </div>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <svg
            class="w-4 h-4 shrink-0 opacity-75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="opacity-70 text-xs">Hours</p>
            <p>Monday–Friday, 8:00 AM–5:00 PM</p>
          </div>
        </div>
      </div>

      <!-- Social Media -->
      <div class="mt-2">
        <p
          class="text-xs font-semibold uppercase tracking-wide opacity-70 mb-3"
        >
          Reach Us
        </p>
        <div
          class="flex rounded-lg overflow-hidden border border-white/20 divide-x divide-white/20"
        >
          <!-- Facebook -->
          <a
            target="_blank"
            href="https://m.facebook.com/pages/Flora-C-Company-Advocates/103302635872156/?locale=hi_IN"
            class="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-white/20 transition group"
            title="Facebook"
          >
            <svg
              class="w-5 h-5 opacity-80 group-hover:opacity-100"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
              />
            </svg>
            <span class="text-[10px] opacity-70 group-hover:opacity-100"
              >Facebook</span
            >
          </a>

          <!-- LinkedIn -->
          <a
            target="_blank"
            href="https://ke.linkedin.com/in/flora-c-advocates-924463250"
            class="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-white/20 transition group"
            title="LinkedIn"
          >
            <svg
              class="w-5 h-5 opacity-80 group-hover:opacity-100"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span class="text-[10px] opacity-70 group-hover:opacity-100"
              >LinkedIn</span
            >
          </a>

          <!-- Instagram -->
          <a
            target="_blank"
            href="https://www.instagram.com/floracadvocates/"
            class="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-white/20 transition group"
            title="Instagram"
          >
            <svg
              class="w-5 h-5 opacity-80 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            <span class="text-[10px] opacity-70 group-hover:opacity-100"
              >Instagram</span
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let token = ref("");
const turnstile = ref(null);
const isTurnstileVerified = computed(() => Boolean(token.value));

const save = ref(false);
let props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  message: props.message,
});

const errors = reactive({});

function validate() {
  errors.firstName = form.firstName ? "" : "First name is required";
  errors.lastName = form.lastName ? "" : "Last name is required";
  errors.email =
    form.email && form.email.includes("@") ? "" : "Valid email is required";
  errors.phone = form.phone ? "" : "Phone number is required";
  errors.message = form.message ? "" : "Message is required";
  errors.token = token.value ? "" : "Please complete the verification";

  return !Object.values(errors).some((e) => e);
}

async function handleSubmit() {
  if (!validate()) return;

  save.value = true;

  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phoneNumber: form.phone,
    message: form.message,
    "cf-turnstile-response": token.value,
  };
  let toast = useToast();
  try {
   let response =  await $fetch("https://api.floracadvocates.co.ke/api/add/new/enquiry", {
      method: "POST",
      body: payload,
    });
if(response.success){
 toast.add({
      title: "Enquiry Added",
      description: "Enquiry Received Successfully",
    });
    token.value = "";
    turnstile.value?.reset();
}else{
   toast.add({
      title: "Failed",
      description: response.message ,
    });
}
   
  } catch (err) {
    console.error(err);
    toast.add({
      title: "Failed",
      description: "Something Went Wrong",
      color: "error",
    });
  }

  save.value = false;
}
</script>
