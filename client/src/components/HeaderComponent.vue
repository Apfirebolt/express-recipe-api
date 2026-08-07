<template>
  <Disclosure as="nav" class="bg-gradient-to-r from-dark to-tertiary shadow-md border-b border-tertiary/40" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left Section: Logo & Brand -->
        <div class="flex items-center space-x-3">
          <router-link to="/" class="flex items-center space-x-2 group">
            <span class="text-2xl transition-transform duration-200 group-hover:scale-110">🍳</span>
            <h2 class="text-2xl text-primary font-bold tracking-wide transition-colors duration-200 group-hover:text-secondary">
              RecipeHub
            </h2>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden md:block md:ml-8">
            <div class="flex items-center space-x-3">
              <router-link
                to="/"
                class="text-secondary hover:text-primary hover:bg-dark/40 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Home
              </router-link>

              <router-link
                to="/recipes"
                class="text-secondary hover:text-primary hover:bg-dark/40 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Explore Recipes
              </router-link>

              <router-link
                v-if="userData"
                to="/create-recipe"
                class="text-primary hover:bg-dark/50 border border-primary/40 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
              >
                <span>➕</span> Post Recipe
              </router-link>
            </div>
          </div>
        </div>

        <!-- Right Section: Auth & User Action -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-3">
            <span
              v-if="userData"
              class="text-secondary bg-dark/40 border border-tertiary px-3.5 py-1.5 rounded-full text-xs font-medium"
            >
              👨‍🍳 Welcome, <strong class="text-primary font-semibold">{{ userData.username }}</strong>
            </span>

            <router-link
              v-if="userData"
              to="/dashboard"
              class="text-secondary hover:text-primary hover:bg-dark/40 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              My Saved Box
            </router-link>

            <router-link
              v-if="!userData"
              to="/login"
              class="text-secondary hover:text-primary hover:bg-dark/40 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Login
            </router-link>

            <router-link
              v-if="!userData"
              to="/register"
              class="bg-primary text-black hover:bg-secondary px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              Register
            </router-link>

            <button
              v-if="userData"
              type="button"
              class="text-secondary hover:text-red-300 hover:bg-red-500/20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              @click="logoutUtil"
            >
              Log out
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="-mr-2 flex md:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <DisclosurePanel class="md:hidden border-t border-tertiary/50">
      <div class="px-4 pt-3 pb-4 space-y-2 bg-dark">
        <div
          v-if="userData"
          class="text-secondary bg-tertiary/30 border border-tertiary/50 px-3 py-2 rounded-md text-sm font-medium mb-3"
        >
          👨‍🍳 Welcome, <strong class="text-primary">{{ userData.username }}</strong>
        </div>

        <router-link
          to="/"
          class="text-secondary hover:text-primary hover:bg-tertiary/30 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
        >
          Home
        </router-link>

        <router-link
          to="/recipes"
          class="text-secondary hover:text-primary hover:bg-tertiary/30 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
        >
          Explore Recipes
        </router-link>

        <router-link
          v-if="userData"
          to="/create-recipe"
          class="text-primary border border-primary/40 hover:bg-tertiary/30 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
        >
          ➕ Post Recipe
        </router-link>

        <router-link
          v-if="userData"
          to="/dashboard"
          class="text-secondary hover:text-primary hover:bg-tertiary/30 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
        >
          My Saved Box
        </router-link>

        <router-link
          v-if="!userData"
          to="/login"
          class="text-secondary hover:text-primary hover:bg-tertiary/30 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
        >
          Login
        </router-link>

        <router-link
          v-if="!userData"
          to="/register"
          class="bg-primary text-black hover:bg-secondary block px-3 py-2 rounded-md text-base font-semibold text-center transition-all duration-200 shadow-sm"
        >
          Register
        </router-link>

        <button
          v-if="userData"
          type="button"
          class="w-full text-left text-secondary hover:text-red-300 hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
          @click="logoutUtil"
        >
          Log out
        </button>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../store/auth";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const auth = useAuth();
const userData = computed(() => auth.authData);

const logoutUtil = () => {
  auth.logout();
};
</script>