<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <!-- Back Button -->
    <router-link
      :to="`/recipes/${route.params.id}`"
      class="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm font-medium mb-6 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Cancel & Back
    </router-link>

    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <h1 class="text-2xl font-bold text-stone-900 mb-6">Edit Recipe</h1>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="animate-pulse space-y-4">
        <div class="h-4 bg-stone-200 rounded w-1/4"></div>
        <div class="h-10 bg-stone-100 rounded-xl"></div>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Recipe Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-stone-700 mb-1">
            Recipe Title <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="recipe.title"
            type="text"
            placeholder="e.g., Creamy Garlic Tuscan Chicken"
            class="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <!-- Form Actions -->
        <div class="pt-4 border-t border-stone-100 flex justify-end gap-3">
          <router-link
            :to="`/recipes/${route.params.id}`"
            class="px-5 py-2.5 text-stone-600 hover:bg-stone-100 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {{ isSubmitting ? 'Updating...' : 'Update Recipe' }}
          </button>
        </div>
      </form>
    </div>   
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "../store/recipe.js";

const route = useRoute();
const recipeStore = useRecipeStore();

const isSubmitting = ref(false);
const isLoading = computed(() => recipeStore.isLoading);

// Form Reactive State
const recipe = reactive({
  title: "",
});

// Load existing recipe data on mount
onMounted(async () => {
  const recipeId = route.params.id;
  if (recipeId) {
    await recipeStore.fetchRecipeById(recipeId);
    const existingRecipe = recipeStore.getSingleRecipe;
    if (existingRecipe) {
      recipe.title = existingRecipe.title;
    }
  }
});

// Update Recipe submission
const handleSubmit = async () => {
  if (!recipe.title.trim()) return;
  
  const recipeId = route.params.id;
  isSubmitting.value = true;

  try {
    await recipeStore.updateRecipe(recipeId, recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>