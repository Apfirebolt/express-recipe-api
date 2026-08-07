<template>
  <div class="min-h-screen bg-ghost-grey text-dark-slate-grey flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <!-- Top Branding Header -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-light-blue/30 border border-light-blue text-3xl shadow-sm">
        👨‍🍳
      </div>
      <h2 class="text-3xl font-extrabold text-dark-slate-grey tracking-tight">
        Welcome back to RecipeHub
      </h2>
      <p class="text-sm text-cadet-grey">
        Sign in to manage your saved recipes and share new dishes
      </p>
    </div>

    <!-- Main Card Container -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-dark-slate-grey text-ghost-grey py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-cadet-grey/30">
        
        <form class="space-y-6" @submit.prevent="onSubmit">
          
          <!-- Logo / Icon Showcase -->
          <div class="flex justify-center mb-2">
            <div class="flex items-center space-x-2">
              <span class="text-4xl">🍳</span>
              <span class="text-2xl font-bold text-light-blue tracking-wide">RecipeHub</span>
            </div>
          </div>

          <!-- Email Input Field -->
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
                v-bind="email"
                name="email"
                type="email"
                placeholder="chef@example.com"
                :class="[
                  'w-full pl-10 pr-4 py-3 bg-jet-black/40 border rounded-xl text-ghost-grey placeholder-cadet-grey text-sm focus:outline-none transition-all shadow-inner',
                  errors.email ? 'border-rose-400 focus:ring-2 focus:ring-rose-400' : 'border-cadet-grey/50 focus:ring-2 focus:ring-light-blue focus:border-transparent'
                ]"
              />
            </div>
            <p v-if="errors.email" class="text-xs font-medium text-rose-300 flex items-center gap-1 mt-1">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ errors.email }}</span>
            </p>
          </div>

          <!-- Password Input Field -->
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
                v-bind="password"
                name="password"
                type="password"
                placeholder="••••••••"
                :class="[
                  'w-full pl-10 pr-4 py-3 bg-jet-black/40 border rounded-xl text-ghost-grey placeholder-cadet-grey text-sm focus:outline-none transition-all shadow-inner',
                  errors.password ? 'border-rose-400 focus:ring-2 focus:ring-rose-400' : 'border-cadet-grey/50 focus:ring-2 focus:ring-light-blue focus:border-transparent'
                ]"
              />
            </div>
            <p v-if="errors.password" class="text-xs font-medium text-rose-300 flex items-center gap-1 mt-1">
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
              class="w-full py-3 px-4 bg-light-blue hover:bg-ghost-grey hover:text-dark-slate-grey active:scale-[0.98] text-jet-black font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Sign in to RecipeHub</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>

          <!-- Register Redirect -->
          <div class="pt-2 text-center">
            <p class="text-sm text-ghost-grey/80">
              New to RecipeHub?
              <router-link
                to="/register"
                class="font-semibold text-light-blue hover:text-ghost-grey transition-colors ml-1 underline underline-offset-4 decoration-light-blue/40"
              >
                Create an account
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