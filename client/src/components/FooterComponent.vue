<template>
  <footer class="bg-dark-slate-grey text-ghost-grey pt-12 pb-8 mt-auto border-t border-cadet-grey/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        <!-- Brand & Description -->
        <div class="md:col-span-1">
          <div class="flex items-center space-x-2 mb-3">
            <span class="text-2xl">🍳</span>
            <h3 class="font-bold text-xl text-light-blue tracking-wide">
              RecipeHub
            </h3>
          </div>
          <p class="text-sm text-ghost-grey/80 leading-relaxed">
            Discover, create, and share delicious homemade recipes with a global community of food lovers.
          </p>
        </div>

        <!-- Explore Links -->
        <div>
          <h4 class="font-semibold text-light-blue text-sm uppercase tracking-wider mb-4">
            Explore
          </h4>
          <ul class="text-sm space-y-2.5">
            <li>
              <a href="/recipes" class="text-ghost-grey/80 hover:text-light-blue transition-colors duration-200 flex items-center gap-1.5">
                <span>🥗</span> Trending Recipes
              </a>
            </li>
            <li>
              <a href="/categories" class="text-ghost-grey/80 hover:text-light-blue transition-colors duration-200 flex items-center gap-1.5">
                <span>📁</span> Categories & Cuisines
              </a>
            </li>
            <li>
              <a href="/popular" class="text-ghost-grey/80 hover:text-light-blue transition-colors duration-200 flex items-center gap-1.5">
                <span>🔥</span> Top Rated
              </a>
            </li>
          </ul>
        </div>

        <!-- Community & Features -->
        <div>
          <h4 class="font-semibold text-light-blue text-sm uppercase tracking-wider mb-4">
            Community
          </h4>
          <ul class="text-sm space-y-2.5">
            <li>
              <a href="/create-recipe" class="text-ghost-grey/80 hover:text-light-blue transition-colors duration-200 flex items-center gap-1.5">
                <span>✍️</span> Submit a Recipe
              </a>
            </li>
            <li>
              <a href="/creators" class="text-ghost-grey/80 hover:text-light-blue transition-colors duration-200 flex items-center gap-1.5">
                <span>👩‍🍳</span> Featured Chefs
              </a>
            </li>
            <li>
              <a href="/saved" class="text-ghost-grey/80 hover:text-light-blue transition-colors duration-200 flex items-center gap-1.5">
                <span>🔖</span> Saved Recipe Box
              </a>
            </li>
          </ul>
        </div>

        <!-- Call to Action / Account -->
        <div>
          <h4 class="font-semibold text-light-blue text-sm uppercase tracking-wider mb-4">
            Join Us
          </h4>
          <p class="text-xs text-ghost-grey/80 mb-3">
            Sign up to save your favorite dishes and share your culinary creations.
          </p>
          <div class="flex flex-col space-y-2">
            <a 
              href="/register" 
              class="inline-flex justify-center items-center px-4 py-2 text-sm font-semibold text-jet-black bg-light-blue hover:bg-ghost-grey rounded-md shadow-sm transition-colors duration-200"
            >
              Create Free Account
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-cadet-grey/30 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-ghost-grey/60 gap-4">
        <p>&copy; {{ currentYear }} RecipeHub. All rights reserved.</p>
        <div class="flex space-x-6">
          <a href="/privacy" class="hover:text-light-blue transition-colors">Privacy Policy</a>
          <a href="/terms" class="hover:text-light-blue transition-colors">Terms of Service</a>
          <a href="/contact" class="hover:text-light-blue transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>