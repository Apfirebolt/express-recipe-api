<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <!-- Top Branding Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shadow-lg shadow-amber-400/5">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-extrabold text-white tracking-tight">
        Create an account
      </h2>
      <p class="text-sm text-slate-400">
        Start shortening URLs and tracking engagement stats
      </p>
    </div>

    <!-- Main Card Container -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
        
        <!-- Logo Showcase -->
        <div class="flex justify-center mb-6">
          <img class="h-28 w-auto object-contain filter drop-shadow-lg" src="../assets/1.png" alt="Workflow" />
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          
          <!-- Email Input -->
          <div class="space-y-1.5">
            <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Email Address <span class="text-amber-400">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                placeholder="name@example.com"
                class="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          <!-- Username Input -->
          <div class="space-y-1.5">
            <label for="username" class="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Username <span class="text-amber-400">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                placeholder="johndoe"
                class="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-1.5">
            <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password <span class="text-amber-400">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                class="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              class="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>

          <!-- Login Link -->
          <div class="pt-2 text-center">
            <p class="text-sm text-slate-400">
              Already have an account?
              <router-link
                to="/login"
                class="font-semibold text-amber-400 hover:text-amber-300 transition-colors ml-1 underline underline-offset-4 decoration-amber-400/30 hover:decoration-amber-300"
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