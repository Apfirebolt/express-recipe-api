<template>
  <div class="min-h-screen bg-stone-50/60 text-stone-800 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Top Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              Kitchen Dashboard
            </span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-2">
            My Recipes 👨‍🍳
          </h1>
          <p class="text-sm text-stone-500 mt-1">
            Manage your published culinary creations and view saved community dishes.
          </p>
        </div>

        <router-link
          to="/create-recipe"
          class="inline-flex items-center justify-center px-5 py-2.5 bg-amber-600 text-white font-semibold text-sm rounded-xl hover:bg-amber-700 shadow-xs transition-all duration-150 self-start md:self-auto gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Recipe</span>
        </router-link>
      </div>

      <!-- Filter Controls & Navigation Tabs -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
        
        <!-- Navigation Tabs -->
        <div class="flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <button
            type="button"
            @click="activeTab = 'my-recipes'"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer',
              activeTab === 'my-recipes'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            ]"
          >
            My Recipes
          </button>
          <button
            type="button"
            @click="activeTab = 'saved'"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer',
              activeTab === 'saved'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            ]"
          >
            Saved Recipe Box ({{ savedCount }})
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-72">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search recipes..."
            class="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="recipeLoading" class="py-16 text-center">
        <div class="inline-block w-10 h-10 rounded-full border-4 border-stone-200 border-t-amber-600 animate-spin mb-3"></div>
        <p class="text-stone-500 text-sm font-medium">Fetching your kitchen creations...</p>
      </div>

      <!-- Recipes Grid -->
      <div v-else-if="filteredRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="recipe in filteredRecipes" 
          :key="recipe._id || recipe.id"
          class="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-200 flex flex-col group"
        >
          <!-- Recipe Card Header Accent -->
          <div class="h-2 bg-amber-500/80 group-hover:bg-amber-600 transition-colors"></div>

          <!-- Recipe Body -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-stone-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                {{ recipe.title }}
              </h3>
              <div class="flex items-center gap-2 text-xs text-stone-400">
                <span class="font-medium text-stone-600">
                  By {{ recipe.user?.username || recipe.user?.email || recipe.username || 'Chef' }}
                </span>
                <span>•</span>
                <span>{{ formatDate(recipe.createdAt) }}</span>
              </div>
            </div>

            <!-- Actions Bar -->
            <div class="pt-4 border-t border-stone-100 flex items-center justify-between">
              <router-link
                :to="`/recipes/${recipe._id || recipe.id}`"
                class="px-4 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <span>View Dish</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l7 7m-7-7H3" />
                </svg>
              </router-link>

              <div class="flex items-center gap-2">
                <router-link
                  :to="`/recipes/${recipe._id || recipe.id}/edit`"
                  class="px-3 py-1.5 text-stone-500 hover:text-amber-700 hover:bg-stone-100 text-xs font-medium rounded-lg transition-colors"
                >
                  Edit
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-lg mx-auto space-y-4 shadow-2xs">
        <div class="w-16 h-16 mx-auto rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl">
          🍳
        </div>
        <h3 class="text-xl font-bold text-stone-900">No recipes found</h3>
        <p class="text-sm text-stone-500 leading-relaxed">
          {{ searchQuery ? 'No recipes match your current search query.' : 'You haven\'t posted any recipes yet. Share your first culinary creation with the community!' }}
        </p>
        <router-link
          v-if="!searchQuery"
          to="/create-recipe"
          class="inline-block px-5 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition-colors shadow-xs"
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

const activeTab = ref('my-recipes')
const searchQuery = ref('')
const savedCount = ref(0) // Connect to saved recipe store if applicable

const recipeStore = useRecipeStore()
const recipeLoading = computed(() => recipeStore.isLoading)
const recipes = computed(() => recipeStore.getAllRecipes || [])

const filteredRecipes = computed(() => {
  if (!searchQuery.value.trim()) return recipes.value
  return recipes.value.filter(recipe =>
    recipe.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const formatDate = (dateString) => {
  if (!dateString) return 'Recently'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(() => {
  recipeStore.fetchMyRecipes()
})
</script>