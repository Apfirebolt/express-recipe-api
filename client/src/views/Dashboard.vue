<template>
  <div class="min-h-screen bg-ghost-grey text-dark-slate-grey py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Dashboard Top Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-cadet-grey/20 pb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-dark-slate-grey tracking-tight">
            Chef Dashboard 👨‍🍳
          </h1>
          <p class="text-sm text-cadet-grey mt-1">
            Manage your published recipes, view stats, and access saved dishes.
          </p>
        </div>

        <router-link
          to="/create-recipe"
          class="inline-flex items-center justify-center px-5 py-2.5 bg-light-blue text-jet-black font-semibold rounded-xl hover:bg-ghost-grey hover:text-dark-slate-grey border border-cadet-grey/30 shadow-sm transition-all duration-200 self-start md:self-auto gap-2"
        >
          <span>➕</span>
          <span>Create New Recipe</span>
        </router-link>
      </div>

      <!-- Filter Controls & Navigation Tabs -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 p-4 rounded-2xl border border-cadet-grey/20 backdrop-blur-sm">
        
        <!-- Navigation Tabs -->
        <div class="flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <button
            type="button"
            @click="activeTab = 'my-recipes'"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap',
              activeTab === 'my-recipes'
                ? 'bg-dark-slate-grey text-light-blue shadow-sm'
                : 'text-cadet-grey hover:bg-cadet-grey/10 hover:text-dark-slate-grey'
            ]"
          >
            My Recipes
          </button>
          <button
            type="button"
            @click="activeTab = 'saved'"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap',
              activeTab === 'saved'
                ? 'bg-dark-slate-grey text-light-blue shadow-sm'
                : 'text-cadet-grey hover:bg-cadet-grey/10 hover:text-dark-slate-grey'
            ]"
          >
            Saved Recipe Box ({{ savedCount }})
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-72">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cadet-grey">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search recipes..."
            class="w-full pl-9 pr-4 py-2 bg-white border border-cadet-grey/40 rounded-xl text-sm text-dark-slate-grey placeholder-cadet-grey focus:outline-none focus:ring-2 focus:ring-light-blue transition-all"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-16 text-center">
        <div class="inline-block w-12 h-12 rounded-full border-4 border-cadet-grey/30 border-t-light-blue animate-spin mb-3"></div>
        <p class="text-cadet-grey text-sm">Fetching your kitchen creations...</p>
      </div>

      <!-- Recipes Grid -->
      <div v-else-if="recipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="recipe in recipes" 
          :key="recipe.id"
          class="bg-white rounded-2xl overflow-hidden border border-cadet-grey/20 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
        >

          <!-- Recipe Body -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 class="text-xl font-bold text-dark-slate-grey line-clamp-1">
                {{ recipe.title }}
              </h3>
            </div>

            <!-- Actions Bar -->
            <div class="pt-3 border-t border-cadet-grey/10 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <router-link
                  :to="`/recipes/${recipe._id}`"
                  class="px-3 py-1.5 bg-ghost-grey text-dark-slate-grey hover:bg-light-blue text-xs font-semibold rounded-lg transition-colors"
                >
                  View
                </router-link>
                <button
                  v-if="activeTab === 'my-recipes'"
                  @click="deleteRecipeHandler(recipe.id)"
                  type="button"
                  class="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl p-12 text-center border border-cadet-grey/20 max-w-lg mx-auto space-y-4">
        <div class="text-5xl">🍳</div>
        <h3 class="text-xl font-bold text-dark-slate-grey">No recipes found</h3>
        <p class="text-sm text-cadet-grey">
          {{ searchQuery ? 'No recipes match your current search criteria.' : 'You haven\'t posted any recipes yet. Share your first dish with the community!' }}
        </p>
        <router-link
          v-if="!searchQuery"
          to="/create-recipe"
          class="inline-block px-5 py-2.5 bg-light-blue text-jet-black text-sm font-semibold rounded-xl hover:bg-dark-slate-grey hover:text-light-blue transition-colors shadow-sm"
        >
          Post a Recipe Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRecipeStore } from '../store/recipe'

const isLoading = ref(false)
const activeTab = ref('my-recipes')
const searchQuery = ref('')
const recipeStore = useRecipeStore()
const recipeLoading = computed(() => recipeStore.isLoading)
const recipes = computed(() => recipeStore.getAllRecipes)

console.log(recipes.value)

const deleteRecipeHandler = (id) => {
  if (confirm('Are you sure you want to delete this recipe?')) {
    myRecipes.value = myRecipes.value.filter(r => r.id !== id)
  }
}

onMounted(() => {
  // Add API calls here if needed
  recipeStore.fetchRecipes()
})
</script>