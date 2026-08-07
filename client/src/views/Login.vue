<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <!-- Top Branding Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shadow-lg shadow-amber-400/5">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
        </svg>
      </div>
      <h2 class="text-3xl font-extrabold text-white tracking-tight">
        Sign in to your account
      </h2>
      <p class="text-sm text-slate-400">
        Access your personalized dashboard and link workspace
      </p>
    </div>

    <!-- Main Card Container -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-slate-800/60 backdrop-blur-md border border-slate-700/60 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
        
        <form class="space-y-6" @submit.prevent="onSubmit">
          
          <!-- Logo Showcase -->
          <div class="flex justify-center mb-2">
            <img class="h-28 w-auto object-contain filter drop-shadow-lg" src="../assets/1.png" alt="Workflow" />
          </div>

          <!-- Email Input Field -->
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
                v-bind="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                :class="[
                  'w-full pl-10 pr-4 py-3 bg-slate-900/90 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all shadow-inner',
                  errors.email ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500' : 'border-slate-700/80 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                ]"
              />
            </div>
            <p v-if="errors.email" class="text-xs font-medium text-rose-400 flex items-center gap-1 mt-1">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ errors.email }}</span>
            </p>
          </div>

          <!-- Password Input Field -->
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
                v-bind="password"
                name="password"
                type="password"
                placeholder="••••••••"
                :class="[
                  'w-full pl-10 pr-4 py-3 bg-slate-900/90 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all shadow-inner',
                  errors.password ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500' : 'border-slate-700/80 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                ]"
              />
            </div>
            <p v-if="errors.password" class="text-xs font-medium text-rose-400 flex items-center gap-1 mt-1">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ errors.password }}</span>
            </p>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Sign in</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>

          <!-- Register Redirect -->
          <div class="pt-2 text-center">
            <p class="text-sm text-slate-400">
              Don't have an account?
              <router-link
                to="/register"
                class="font-semibold text-amber-400 hover:text-amber-300 transition-colors ml-1 underline underline-offset-4 decoration-amber-400/30 hover:decoration-amber-300"
              >
                Create one now
              </router-link>
            </p>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../store/auth";
import { useForm } from "vee-validate";
import router from "../routes/index";

const auth = useAuth();
const authData = computed(() => auth.getAuthData);

if (authData.value) {
  router.push({ name: 'Dashboard' });
}

// Validation functions
function required(value) {
  return value ? true : "Email field is required";
}

function passwordRequired(value) {
  if (!value) {
    return "Password is a required field";
  }
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  return true;
}

// Create form with vee-validate
const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    email: required,
    password: passwordRequired,
  },
});

// Define input bindings
const email = defineInputBinds("email");
const password = defineInputBinds("password");

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  await auth.loginAction(values);
});
</script>