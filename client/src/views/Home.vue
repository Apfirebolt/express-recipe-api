<template>
  <div class="space-y-12 max-w-5xl mx-auto px-4 py-8">
    <!-- Hero / About Section -->
    <section id="about" class="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
      <div class="p-8 sm:p-12">
        <div class="text-center max-w-3xl mx-auto">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 13.87A8 8 0 0 1 11.87 2A8 8 0 0 1 22 10.13 8 8 0 0 1 16.13 22 8 8 0 0 1 6 13.87z"/>
              <path d="M15.7 13.4a3 3 0 0 0-4.2 0l-1.4 1.4"/>
            </svg>
            Welcome to Recipehub
          </span>

          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mt-4 mb-4">
            Discover, Create & Share <span class="text-amber-600">Delicious Recipes</span>
          </h1>

          <p class="text-stone-600 text-lg leading-relaxed">
            Recipehub is a vibrant culinary community where food lovers, home cooks, and professional chefs gather to publish their favorite dishes, bookmark community creations, and explore flavors from around the globe.
          </p>
        </div>

        <!-- Platform Highlights -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div class="p-5 rounded-2xl bg-amber-50/50 border border-amber-100/80 text-center">
            <div class="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              🍳
            </div>
            <h3 class="font-bold text-stone-900 text-base mb-1">Easy Recipe Publishing</h3>
            <p class="text-xs text-stone-600 leading-relaxed">Share step-by-step instructions, ingredient lists, and high-res photos effortlessly.</p>
          </div>

          <div class="p-5 rounded-2xl bg-amber-50/50 border border-amber-100/80 text-center">
            <div class="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              📚
            </div>
            <h3 class="font-bold text-stone-900 text-base mb-1">Personal Cookbook</h3>
            <p class="text-xs text-stone-600 leading-relaxed">Save your favorite dishes from other foodies into custom collections.</p>
          </div>

          <div class="p-5 rounded-2xl bg-amber-50/50 border border-amber-100/80 text-center">
            <div class="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              🌱
            </div>
            <h3 class="font-bold text-stone-900 text-base mb-1">Dietary Filters</h3>
            <p class="text-xs text-stone-600 leading-relaxed">Find meal ideas tailored to vegan, keto, gluten-free, and quick 15-minute prep needs.</p>
          </div>
        </div>

        <!-- Tech Stack Badge Cards -->
        <div class="mt-10 pt-8 border-t border-stone-100">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-stone-400 text-center mb-4">
            Powered by modern web tech
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-100 transition-all hover:border-amber-200">
              <span class="block text-sm font-semibold text-stone-800">Vue 3</span>
              <span class="text-xs text-stone-500">Composition API</span>
            </div>
            <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-100 transition-all hover:border-amber-200">
              <span class="block text-sm font-semibold text-stone-800">Tailwind CSS</span>
              <span class="text-xs text-stone-500">Custom UI Design</span>
            </div>
            <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-100 transition-all hover:border-amber-200">
              <span class="block text-sm font-semibold text-stone-800">Express.js</span>
              <span class="text-xs text-stone-500">Recipe API Engine</span>
            </div>
            <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-100 transition-all hover:border-amber-200">
              <span class="block text-sm font-semibold text-stone-800">MongoDB</span>
              <span class="text-xs text-stone-500">Recipe & User Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact & Feedback Section -->
    <section id="contact" class="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
      <div class="p-8 sm:p-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <!-- Contact Info -->
          <div class="md:col-span-5 space-y-4">
            <span class="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60">
              Get in Touch
            </span>
            <h2 class="text-3xl font-bold tracking-tight text-stone-900">
              Have a culinary idea or feedback?
            </h2>
            <p class="text-stone-600 leading-relaxed text-sm">
              We are continuously improving Recipehub for home cooks everywhere. Reach out to report an issue, suggest a feature, or inquire about partnership opportunities.
            </p>
            
            <div class="pt-4 space-y-3 text-xs text-stone-500">
              <div class="flex items-center gap-2">
                <span class="p-2 rounded-lg bg-stone-100 text-stone-700">📧</span>
                <span>support@recipehub.com</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="p-2 rounded-lg bg-stone-100 text-stone-700">💬</span>
                <span>Community Discord Available 24/7</span>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <form class="md:col-span-7 space-y-4 bg-stone-50/80 p-6 sm:p-8 rounded-2xl border border-stone-100">
            <div>
              <label for="name" class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Chef Gordon"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="chef@recipehub.com"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label for="category" class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                Topic
              </label>
              <select 
                id="category" 
                name="category"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
              >
                <option value="general">General Inquiry</option>
                <option value="recipe-issue">Recipe Upload Issue</option>
                <option value="feature">Feature Suggestion</option>
                <option value="partnership">Partnerships</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell us what's cooking on your mind..."
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "../store/auth";

const auth = useAuth();

onMounted(async () => {
  await auth.getProfileData();
});
</script>