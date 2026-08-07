<template>
  <div class="min-h-screen bg-ghost-grey text-dark-slate-grey flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <!-- Top Branding Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-light-blue/30 border border-light-blue text-3xl shadow-sm">
        👩‍🍳
      </div>
      <h2 class="text-3xl font-extrabold text-dark-slate-grey tracking-tight">
        Join RecipeHub
      </h2>
      <p class="text-sm text-cadet-grey">
        Start sharing your homemade recipes and saving your favorite dishes
      </p>
    </div>

    <!-- Main Card Container -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-dark-slate-grey text-ghost-grey py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-cadet-grey/30">
        
        <!-- Logo Showcase -->
        <div class="flex justify-center mb-6">
          <div class="flex items-center space-x-2">
            <span class="text-4xl">🍳</span>
            <span class="text-2xl font-bold text-light-blue tracking-wide">RecipeHub</span>
          </div>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          
          <!-- Email Input -->
          <div class="space-y-1.5">
            <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-light-blue">
              Email Address <span class="text-light-blue">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cadet-grey">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <input
                id="email"
                name="email"
                v-model="email"
                type="email"
                required
                placeholder="chef@example.com"
                class="w-full pl-10 pr-4 py-3 bg-jet-black/40 border border-cadet-grey/50 rounded-xl text-ghost-grey placeholder-cadet-grey text-sm focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          <!-- Username Input -->
          <div class="space-y-1.5">
            <label for="username" class="block text-xs font-semibold uppercase tracking-wider text-light-blue">
              Chef Username <span class="text-light-blue">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cadet-grey">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                id="username"
                name="username"
                v-model="username"
                type="text"
                required
                placeholder="chef_john"
                class="w-full pl-10 pr-4 py-3 bg-jet-black/40 border border-cadet-grey/50 rounded-xl text-ghost-grey placeholder-cadet-grey text-sm focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-1.5">
            <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-light-blue">
              Password <span class="text-light-blue">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cadet-grey">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                id="password"
                name="password"
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 bg-jet-black/40 border border-cadet-grey/50 rounded-xl text-ghost-grey placeholder-cadet-grey text-sm focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              class="w-full py-3 px-4 bg-light-blue hover:bg-ghost-grey hover:text-dark-slate-grey active:scale-[0.98] text-jet-black font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Create Free Account</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>

          <!-- Login Link -->
          <div class="pt-2 text-center">
            <p class="text-sm text-ghost-grey/80">
              Already have an account?
              <router-link
                to="/login"
                class="font-semibold text-light-blue hover:text-ghost-grey transition-colors ml-1 underline underline-offset-4 decoration-light-blue/40"
              >
                Sign in instead
              </router-link>
            </p>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../store/auth";

const email = ref("");
const username = ref("");
const password = ref("");

const { registerAction } = useAuth();

const handleSubmit = async () => {
  if (!email.value || !username.value || !password.value) return;

  const payload = {
    email: email.value.trim(),
    username: username.value.trim(),
    password: password.value,
  };
  await registerAction(payload);
};
</script>