<template>
  <Disclosure as="nav" class="bg-gradient-to-r from-dark to-tertiary shadow-lg" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h2 class="text-2xl text-white font-bold tracking-wide drop-shadow-md">✂️ Mini Url</h2>
          </div>
          <div class="hidden sm:block sm:ml-10">
            <div class="flex space-x-2">
              <span
                v-if="userData"
                class="text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-white/20"
              >
                👋 Welcome, {{ userData.username }}
              </span>
              <router-link
                to="/"
                class="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                >Home</router-link
              >
              <router-link
                v-if="!userData"
                to="/login"
                class="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                >Login</router-link
              >
              <router-link
                v-if="!userData"
                to="/register"
                class="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-md"
                >Register</router-link
              >
              <router-link
                v-if="userData"
                to="/dashboard"
                class="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                >Dashboard</router-link
              >
              <router-link
                v-if="userData"
                to="/logout"
                class="text-white hover:bg-red-500/80 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                @click.prevent="logoutUtil"
                >Log out</router-link
              >
            </div>
          </div>
        </div>

        <div class="-mr-2 flex sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden border-t border-white/20">
      <div class="px-4 pt-3 pb-4 space-y-2 bg-gradient-to-b from-transparent to-black/10">
        <span
          v-if="userData"
          class="text-white bg-white/10 backdrop-blur-sm block px-4 py-2 rounded-lg text-base font-medium border border-white/20"
        >
          👋 Welcome, {{ userData.username }}
        </span>
        <router-link
          to="/"
          class="text-white hover:bg-white/20 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
          >Home</router-link
        >
        <router-link
          v-if="!userData"
          to="/login"
          class="text-white hover:bg-white/20 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
          >Login</router-link
        >
        <router-link
          v-if="!userData"
          to="/register"
          class="bg-white text-indigo-600 hover:bg-indigo-50 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 text-center shadow-md"
          >Register</router-link
        >
        <router-link
          v-if="userData"
          to="/dashboard"
          class="text-white hover:bg-white/20 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
          >Dashboard</router-link
        >
        <router-link
          v-if="userData"
          to="/logout"
          class="text-white hover:bg-red-500/80 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
          @click.prevent="logoutUtil"
          >Log out</router-link
        >
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
