<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Back Button -->
    <router-link
      to="/dashboard"
      class="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm font-medium mb-6 transition-colors"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Recipes
    </router-link>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-10 bg-stone-200 rounded-xl w-3/4"></div>
      <div class="h-4 bg-stone-200 rounded w-1/4"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        <div class="space-y-4">
          <div class="h-6 bg-stone-200 rounded w-1/2"></div>
          <div class="h-12 bg-stone-100 rounded-xl"></div>
          <div class="h-12 bg-stone-100 rounded-xl"></div>
        </div>
        <div class="md:col-span-2 space-y-4">
          <div class="h-6 bg-stone-200 rounded w-1/2"></div>
          <div class="h-20 bg-stone-100 rounded-xl"></div>
          <div class="h-20 bg-stone-100 rounded-xl"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="recipe" class="space-y-8">
      <!-- Header / Title Section -->
      <div
        class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <span
            class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 mb-3"
          >
            🍳 Recipe
          </span>
          <h1
            class="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight"
          >
            {{ recipe.title }}
          </h1>
          <p v-if="recipe.createdAt" class="text-xs text-stone-400 mt-2">
            Published on {{ formatDate(recipe.createdAt) }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <button
            @click="isDeleteModalOpen = true"
            class="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
          >
            Delete
          </button>
          <router-link
            :to="`/recipes/${recipe._id || recipe.id}/edit`"
            class="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
          >
            Edit
          </router-link>
        </div>
      </div>

      <!-- Grid Layout: Ingredients & Preparation Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column: Ingredients -->
        
        <div class="space-y-4">
             <button
              type="button"
              @click="isIngredientModalOpen = true"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              + Add Ingredient
            </button>
          <div class="flex items-center justify-between">
            <h2
              class="text-xl font-bold text-stone-900 flex items-center gap-2"
            >
              <span>🥕</span> Ingredients
            </h2>
            <!-- Ingredients Section -->
            
            <span
              class="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full"
            >
              {{ recipe.ingredients.length }}
            </span>
            <span v-if="recipe.ingredients.length === 0" class="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
              0
            </span>
          </div>

          <div
            v-if="recipe && recipe.ingredients.length === 0"
            class="p-6 bg-stone-50 rounded-2xl border border-stone-100 text-center text-sm text-stone-400"
          >
            No ingredients listed for this recipe.
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="ingredient in recipe.ingredients"
              :key="ingredient._id || ingredient.id"
              @click="toggleCheck(ingredient._id || ingredient.id)"
              class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-stone-100 shadow-2xs hover:border-amber-200 transition-all cursor-pointer select-none"
              :class="{
                'opacity-50 line-through bg-stone-50': checkedItems.has(
                  ingredient._id || ingredient.id,
                ),
              }"
            >
              <span class="text-sm font-medium text-stone-800">
                {{ ingredient.name }}
              </span>
              <span
                v-if="ingredient.quantity"
                class="text-xs font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100"
              >
                {{ ingredient.quantity }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Right Column: Preparation Steps -->
        <div class="md:col-span-2 space-y-4">
            <div>
              <button
                type="button"
                @click="isStepModalOpen = true"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
              >
                + Add Step
              </button>
            </div>
          <div class="flex items-center justify-between">
            <h2
              class="text-xl font-bold text-stone-900 flex items-center gap-2"
            >
              <span>📝</span> Instructions
            </h2>
            <!-- Steps Section -->
            
            <span
              class="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full"
            >
              {{ recipe.steps.length }} Steps
            </span>
          </div>

          <div
            v-if="recipe && recipe.steps.length === 0"
            class="p-6 bg-stone-50 rounded-2xl border border-stone-100 text-center text-sm text-stone-400"
          >
            No instructions provided for this recipe.
          </div>

          <ol v-else class="space-y-4">
            <li
              v-for="(step, index) in recipe.steps"
              :key="step._id || step.id"
              class="p-5 bg-white rounded-2xl border border-stone-100 shadow-2xs flex items-start gap-4"
            >
              <span
                class="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-600 text-white font-bold text-sm flex items-center justify-center shadow-xs"
              >
                {{ index + 1 }}
              </span>
              <div class="space-y-1">
                <p class="text-stone-800 leading-relaxed text-sm">
                  {{ step.description }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Empty / Error State -->
    <div
      v-else
      class="text-center py-12 bg-white rounded-3xl border border-stone-100 p-8"
    >
      <p class="text-stone-500 font-medium">
        Recipe not found or has been removed.
      </p>
    </div>

    <!-- Confirm Delete Modal (Headless UI) -->
    <TransitionRoot appear :show="isDeleteModalOpen" as="template">
      <Dialog as="div" @close="isDeleteModalOpen = false" class="relative z-50">
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
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-stone-100"
              >
                <DialogTitle as="h3" class="text-lg font-bold text-stone-900">
                  Delete Recipe?
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-stone-500">
                    Are you sure you want to delete
                    <strong class="text-stone-800">"{{ recipe?.title }}"</strong
                    >? This action cannot be undone.
                  </p>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    @click="isDeleteModalOpen = false"
                    class="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="handleDelete"
                    :disabled="isDeleting"
                    class="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {{ isDeleting ? "Deleting..." : "Confirm Delete" }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- ================= ADD INGREDIENT MODAL ================= -->
    <TransitionRoot appear :show="isIngredientModalOpen" as="template">
      <Dialog
        as="div"
        @close="isIngredientModalOpen = false"
        class="relative z-50"
      >
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
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-stone-100"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-bold text-stone-900 mb-4"
                >
                  Add Ingredient
                </DialogTitle>

                <form @submit.prevent="addIngredient" class="space-y-4">
                  <div>
                    <label
                      class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1"
                    >
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
                    <label
                      class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1"
                    >
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
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-stone-100"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-bold text-stone-900 mb-4"
                >
                  Add Step {{ recipe.steps.length + 1 }}
                </DialogTitle>

                <form @submit.prevent="addStep" class="space-y-4">
                  <div>
                    <label
                      class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1"
                    >
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useRecipeStore } from "../store/recipe";
import { useIngredientStore } from "../store/ingredient";
import { useStepStore } from "../store/step";

const route = useRoute();
const router = useRouter();

const recipeStore = useRecipeStore();
const ingredientStore = useIngredientStore();
const stepStore = useStepStore();

// Modal State
const isIngredientModalOpen = ref(false);
const isStepModalOpen = ref(false);

// Modals & Local UI State
const isDeleteModalOpen = ref(false);
const isDeleting = ref(false);
const checkedItems = ref(new Set());
const newStep = ref({ description: "" });
const newIngredient = ref({ name: "", quantity: null });

// Computed Pinia States
const recipe = computed(() => recipeStore.getSingleRecipe);
const loading = computed(
  () =>
    recipeStore.isLoading || ingredientStore.isLoading || stepStore.isLoading,
);

// Toggle ingredient checkbox state
const toggleCheck = (id) => {
  if (checkedItems.value.has(id)) {
    checkedItems.value.delete(id);
  } else {
    checkedItems.value.add(id);
  }
};

// Format Date string
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Add Ingredient to array and reset modal input
const addIngredient = () => {
  if (!newIngredient.value.name.trim()) return;
  ingredientStore.createIngredient({
    name: newIngredient.value.name,
    quantity: newIngredient.value.quantity,
    recipe: recipe.value._id
  });
  newIngredient.value.name = "";
  newIngredient.value.quantity = null;
  isIngredientModalOpen.value = false;
  // call the recipe store to fetch the updated recipe with ingredients
  recipeStore.fetchRecipeById(recipe.value._id);
};

// Add Step to array and reset modal input
const addStep = () => {
  if (!newStep.value.description.trim()) return;
  stepStore.createStep({ description: newStep.value.description, recipe: recipe.value._id });
  newStep.value.description = "";
  isStepModalOpen.value = false;

  // call the recipe store to fetch the updated recipe with steps
  recipeStore.fetchRecipeById(recipe.value._id);
};

// Handle Deletion
const handleDelete = async () => {
  const recipeId = route.params.id;
  isDeleting.value = true;
  try {
    await recipeStore.deleteRecipe(recipeId);
    isDeleteModalOpen.value = false;
    router.push("/recipes");
  } catch (error) {
    console.error("Failed to delete recipe:", error);
  } finally {
    isDeleting.value = false;
  }
};

// Load Data on Mount
onMounted(async () => {
  const recipeId = route.params.id;
  if (recipeId) {
    await Promise.all([
      recipeStore.fetchRecipeById(recipeId),
    ]);
  }
});

// Reset Single Recipe State on Unmount
onUnmounted(() => {
  recipeStore.clearSingleRecipe();
});
</script>
