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

        <!-- Ingredients Section -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-stone-800">Ingredients</h2>
            <button
              type="button"
              @click="isIngredientModalOpen = true"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              + Add Ingredient
            </button>
          </div>
        </div>


        <!-- Steps Section -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-stone-800">Preparation Steps</h2>
            <button
              type="button"
              @click="isStepModalOpen = true"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              + Add Step
            </button>
          </div>
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

    <!-- ================= ADD INGREDIENT MODAL ================= -->
    <TransitionRoot appear :show="isIngredientModalOpen" as="template">
      <Dialog as="div" @close="isIngredientModalOpen = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-stone-900/40 backdrop-blur-xs" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-stone-100">
                <DialogTitle as="h3" class="text-lg font-bold text-stone-900 mb-4">
                  Add Ingredient
                </DialogTitle>

                <form @submit.prevent="addIngredient" class="space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Ingredient Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="newIngredient.name"
                      type="text"
                      placeholder="e.g., Heavy Cream"
                      class="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Quantity (Optional)
                    </label>
                    <input
                      v-model.number="newIngredient.quantity"
                      type="number"
                      step="any"
                      placeholder="e.g., 200"
                      class="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      @click="isIngredientModalOpen = false"
                      class="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- ================= ADD STEP MODAL ================= -->
    <TransitionRoot appear :show="isStepModalOpen" as="template">
      <Dialog as="div" @close="isStepModalOpen = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-stone-900/40 backdrop-blur-xs" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-stone-100">
                <DialogTitle as="h3" class="text-lg font-bold text-stone-900 mb-4">
                  Add Step {{ recipe.steps.length + 1 }}
                </DialogTitle>

                <form @submit.prevent="addStep" class="space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Step Description <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      v-model="newStep.description"
                      rows="3"
                      placeholder="e.g., Sauté garlic in olive oil until golden brown..."
                      class="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      required
                    ></textarea>
                  </div>

                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      @click="isStepModalOpen = false"
                      class="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Add Step
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRecipeStore } from "../store/recipe.js";
import { useIngredientStore } from "../store/ingredient.js"; 
import { useStepStore } from "../store/step.js";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

// Modal State
const isIngredientModalOpen = ref(false);
const isStepModalOpen = ref(false);
const isSubmitting = ref(false);
const recipeStore = useRecipeStore();
const stepStore = useStepStore();
const ingredientStore = useIngredientStore();

// Main Recipe Form
const recipe = reactive({
  title: "",
});

// Temp Modal States
const newIngredient = reactive({
  name: "",
  quantity: null,
});

const newStep = reactive({
  description: "",
});

// Add Ingredient to array and reset modal input
const addIngredient = () => {
  if (!newIngredient.name.trim()) return;
  ingredientStore.createIngredient({ name: newIngredient.name, quantity: newIngredient.quantity });
  newIngredient.name = "";
  newIngredient.quantity = null;
  isIngredientModalOpen.value = false;
};

// Add Step to array and reset modal input
const addStep = () => {
  if (!newStep.description.trim()) return;
  stepStore.createStep({ description: newStep.description });
  newStep.description = "";
  isStepModalOpen.value = false;
};

// Item Removal
const removeIngredient = (index) => {
  recipe.ingredients.splice(index, 1);
};

const removeStep = (index) => {
  recipe.steps.splice(index, 1);
};

// Save to MongoDB API endpoint
const handleSubmit = async () => {
  if (!recipe.title.trim()) return;
  isSubmitting.value = true;

  try {
    await recipeStore.createRecipe(recipe);
    // Reset form after successful submission
    recipe.title = "";
    recipe.ingredients = [];
    recipe.steps = [];
  } catch (error) {
    console.error("Error creating recipe:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>