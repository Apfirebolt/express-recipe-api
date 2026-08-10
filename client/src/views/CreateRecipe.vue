<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <h1 class="text-2xl font-bold text-stone-900 mb-6">Create New Recipe</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
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

        <!-- Form Action -->
        <div class="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {{ isSubmitting ? 'Saving...' : 'Save Recipe' }}
          </button>
        </div>
      </form>
    </div>   
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRecipeStore } from "../store/recipe.js";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isSubmitting = ref(false);
const recipeStore = useRecipeStore();

// Main Recipe Form
const recipe = reactive({
  title: "",
});

// Save to MongoDB API endpoint
const handleSubmit = async () => {
  if (!recipe.title.trim()) return;
  isSubmitting.value = true;

  try {
    await recipeStore.createRecipe(recipe);
    // Reset form after successful submission
    recipe.title = "";
  } catch (error) {
    console.error("Error creating recipe:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>