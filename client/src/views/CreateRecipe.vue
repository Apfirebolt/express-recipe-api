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

          <!-- Empty State -->
          <div
            v-if="recipe.ingredients.length === 0"
            class="text-center py-6 border-2 border-dashed border-stone-200 rounded-xl text-stone-400 text-sm"
          >
            No ingredients added yet.
          </div>

          <!-- Ingredients List -->
          <ul v-else class="space-y-2">
            <li
              v-for="(item, index) in recipe.ingredients"
              :key="index"
              class="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200/60 text-sm"
            >
              <span class="font-medium text-stone-800">{{ item.name }}</span>
              <div class="flex items-center gap-4">
                <span v-if="item.quantity" class="text-stone-500 font-mono text-xs">
                  Qty: {{ item.quantity }}
                </span>
                <button
                  type="button"
                  @click="removeIngredient(index)"
                  class="text-stone-400 hover:text-red-600 transition-colors text-xs font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </li>
          </ul>
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

          <!-- Empty State -->
          <div
            v-if="recipe.steps.length === 0"
            class="text-center py-6 border-2 border-dashed border-stone-200 rounded-xl text-stone-400 text-sm"
          >
            No steps added yet.
          </div>

          <!-- Steps List -->
          <ol v-else class="space-y-2">
            <li
              v-for="(step, index) in recipe.steps"
              :key="index"
              class="flex items-start justify-between gap-4 px-4 py-3 bg-stone-50 rounded-xl border border-stone-200/60 text-sm"
            >
              <div class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                  {{ index + 1 }}
                </span>
                <p class="text-stone-700 leading-relaxed">{{ step.description }}</p>
              </div>
              <button
                type="button"
                @click="removeStep(index)"
                class="text-stone-400 hover:text-red-600 transition-colors text-xs font-semibold flex-shrink-0 cursor-pointer"
              >
                Remove
              </button>
            </li>
          </ol>
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

// Main Recipe Form
const recipe = reactive({
  title: "",
  ingredients: [],
  steps: [],
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
  recipe.ingredients.push({
    name: newIngredient.name.trim(),
    quantity: newIngredient.quantity ?? null,
  });
  newIngredient.name = "";
  newIngredient.quantity = null;
  isIngredientModalOpen.value = false;
};

// Add Step to array and reset modal input
const addStep = () => {
  if (!newStep.description.trim()) return;
  recipe.steps.push({
    description: newStep.description.trim(),
  });
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
    // Send data payload matching your Mongoose relationships
    // e.g., POST /api/recipes with payload: { title, ingredients, steps }
    console.log("Submitting Recipe Payload:", recipe);
    
    // Reset state after successful submit
    // recipe.title = "";
    // recipe.ingredients = [];
    // recipe.steps = [];
  } catch (error) {
    console.error("Failed to create recipe:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>