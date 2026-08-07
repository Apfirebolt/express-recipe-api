<template>
  <div class="space-y-12 max-w-4xl mx-auto px-4 py-8">
    <!-- About Section -->
    <section id="about" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="p-6 sm:p-10">
        <div class="text-center max-w-2xl mx-auto">
          <span class="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Overview
          </span>
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 mt-3 mb-4">
            About Mini Url
          </h2>
          <p class="text-slate-600 text-lg leading-relaxed">
            Mini Url is a lightweight, reliable URL shortening service that transforms long, unwieldy web addresses into neat, shareable links.
          </p>
        </div>

        <!-- Tech Stack Cards -->
        <div class="mt-8 pt-8 border-t border-slate-100">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center mb-4">
            Built With Modern Tech
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="block text-sm font-semibold text-slate-800">Vue.js</span>
              <span class="text-xs text-slate-500">Frontend SPA</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="block text-sm font-semibold text-slate-800">Tailwind CSS</span>
              <span class="text-xs text-slate-500">Styling</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="block text-sm font-semibold text-slate-800">Express</span>
              <span class="text-xs text-slate-500">REST API</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="block text-sm font-semibold text-slate-800">MongoDB</span>
              <span class="text-xs text-slate-500">Database</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="p-6 sm:p-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <!-- Contact Info -->
          <div class="space-y-4">
            <span class="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 class="text-3xl font-bold tracking-tight text-slate-900">
              We'd love to hear from you
            </h2>
            <p class="text-slate-600 leading-relaxed text-sm">
              Have questions, feedback, or suggestions for Mini Url? Fill out the form and our team will get back to you as soon as possible.
            </p>
          </div>

          <!-- Contact Form -->
          <form class="space-y-5 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div>
              <label for="name" class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="How can we help?"
                class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-lg shadow-sm transition-colors duration-150 cursor-pointer"
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