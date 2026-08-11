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
        class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <span
            class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/60 mb-3"
          >
            🍳 Recipe By
            {{
              recipe.createdBy?.username || recipe.createdBy?.email || "Chef"
            }}
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
            v-if="user && user._id === recipe.createdBy?._id"
            @click="isDeleteModalOpen = true"
            class="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
          >
            Delete Recipe
          </button>
          <router-link
            v-if="user && user._id === recipe.createdBy?._id"
            :to="`/recipes/${recipe._id || recipe.id}/edit`"
            class="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
          >
            Edit Title
          </router-link>
        </div>
      </div>

      <!-- Grid Layout: Ingredients & Preparation Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column: Ingredients -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2
                class="text-xl font-bold text-stone-900 flex items-center gap-1.5"
              >
                <span>🥕</span> Ingredients
              </h2>
              <span
                class="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full"
              >
                {{ recipe.ingredients?.length || 0 }}
              </span>
            </div>

            <button
              v-if="user && user._id === recipe.createdBy?._id"
              type="button"
              @click="isIngredientModalOpen = true"
              class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              + Add
            </button>
          </div>

          <div
            v-if="!recipe.ingredients || recipe.ingredients.length === 0"
            class="p-6 bg-stone-50 rounded-2xl border border-stone-200/60 text-center text-sm text-stone-400"
          >
            No ingredients listed yet.
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="ingredient in recipe.ingredients"
              :key="ingredient._id || ingredient.id"
              @click="toggleCheck(ingredient._id || ingredient.id)"
              class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs hover:border-amber-200 transition-all cursor-pointer select-none group"
              :class="{
                'opacity-50 line-through bg-stone-50': checkedItems.has(
                  ingredient._id || ingredient.id,
                ),
              }"
            >
              <span class="text-sm font-medium text-stone-800">
                {{ ingredient.name }}
              </span>

              <div class="flex items-center gap-2">
                <span
                  v-if="ingredient.quantity"
                  class="text-xs font-mono font-semibold text-amber-800 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/60"
                >
                  {{ ingredient.quantity }}
                </span>

                <button
                  v-if="user && user._id === recipe.createdBy?._id"
                  type="button"
                  @click.stop="
                    handleIngredientDelete(ingredient._id || ingredient.id)
                  "
                  class="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
                  title="Remove Ingredient"
                >
                  <TrashIconOutline class="w-4 h-4" />
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right Column: Preparation Steps -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2
                class="text-xl font-bold text-stone-900 flex items-center gap-1.5"
              >
                <span>📝</span> Instructions
              </h2>
              <span
                class="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full"
              >
                {{ recipe.steps?.length || 0 }} Steps
              </span>
            </div>

            <button
              v-if="user && user._id === recipe.createdBy?._id"
              type="button"
              @click="isStepModalOpen = true"
              class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              + Add Step
            </button>
          </div>

          <div
            v-if="!recipe.steps || recipe.steps.length === 0"
            class="p-6 bg-stone-50 rounded-2xl border border-stone-200/60 text-center text-sm text-stone-400"
          >
            No instructions provided for this recipe.
          </div>

          <ol v-else class="space-y-3">
            <li
              v-for="(step, index) in recipe.steps"
              :key="step._id || step.id"
              class="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs flex items-start justify-between gap-4 group"
            >
              <div class="flex items-start gap-3.5">
                <span
                  class="flex-shrink-0 w-7 h-7 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs mt-0.5"
                >
                  {{ index + 1 }}
                </span>
                <p class="text-stone-800 leading-relaxed text-sm pt-0.5">
                  {{ step.description }}
                </p>
              </div>

              <button
                v-if="user && user._id === recipe.createdBy?._id"
                type="button"
                @click="handleStepDelete(step._id || step.id)"
                class="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 flex-shrink-0"
                title="Remove Step"
              >
                <TrashIconOutline class="w-4 h-4" />
              </button>
            </li>
          </ol>
        </div>
      </div>

      <!-- Pictures Section -->
      <div class="space-y-4 pt-4 border-t border-stone-200/60">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h2
              class="text-xl font-bold text-stone-900 flex items-center gap-1.5"
            >
              <span>📷</span> Photos
            </h2>
            <span
              class="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full"
            >
              {{ recipe.pictures?.length || 0 }}
            </span>
          </div>

          <button
            v-if="user && user._id === recipe.createdBy?._id"
            type="button"
            @click="openPictureModal"
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
          >
            + Upload Photo
          </button>
        </div>

        <div
          v-if="!recipe.pictures || recipe.pictures.length === 0"
          class="p-8 bg-stone-50 rounded-2xl border border-stone-200/60 text-center text-sm text-stone-400 space-y-2"
        >
          <p>No photos uploaded for this recipe yet.</p>
          <button
            v-if="user && user._id === recipe.createdBy?._id"
            type="button"
            @click="openPictureModal"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100/60 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
          >
            + Add First Photo
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <div
            v-for="picture in recipe.pictures"
            :key="picture._id || picture.id"
            class="relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xs group bg-stone-100"
          >
            <img
              :src="picture.url || `http://localhost:5000/uploads/${picture.name}`"
              :alt="picture.title || 'Recipe Picture'"
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <!-- Picture Overlay Bar -->
            <div
              class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent text-white p-3 pt-6 flex items-end justify-between transition-opacity"
            >
              <span class="text-xs font-medium truncate pr-2">
                {{ picture.title || "Untitled" }}
              </span>

              <button
                v-if="user && user._id === recipe.createdBy?._id"
                type="button"
                @click="handlePictureDelete(picture._id || picture.id)"
                class="p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer flex-shrink-0"
                title="Delete Photo"
              >
                <TrashIconOutline class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty / Error State -->
    <div
      v-else
      class="text-center py-12 bg-white rounded-3xl border border-stone-200/80 p-8 shadow-2xs"
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
    <IngredientForm
      v-if="isIngredientModalOpen"
      :is-ingredient-modal-open="isIngredientModalOpen"
      @submit-ingredient="addIngredient"
      @close-ingredient-modal="closeIngredientModal"
      :recipe="recipe"
    />

    <!-- ================= ADD PICTURE MODAL ================= -->
    <PictureUpload
      v-if="recipe"
      ref="pictureModalRef"
      :recipe="recipe"
      @uploaded="handlePictureUploaded"
      @close-picture-modal="closeUploadPictureModal"
    />

    <!-- ================= ADD STEP MODAL ================= -->
    <StepForm
      v-if="isStepModalOpen"
      :is-step-modal-open="isStepModalOpen"
      @submit-step="addStep"
      @close-step-modal="closeStepModal"
      :recipe="recipe"
    />
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
import { TrashIcon as TrashIconOutline } from "@heroicons/vue/outline";

import { useAuth } from "../store/auth";
import { useRecipeStore } from "../store/recipe";
import { useIngredientStore } from "../store/ingredient";
import { useStepStore } from "../store/step";
import { usePictureStore } from "../store/picture";

import PictureUpload from "../components/PictureUpload.vue";
import IngredientForm from "../components/IngredientForm.vue";
import StepForm from "../components/StepForm.vue";

const route = useRoute();
const router = useRouter();

const recipeStore = useRecipeStore();
const ingredientStore = useIngredientStore();
const stepStore = useStepStore();
const auth = useAuth();
const pictureStore = usePictureStore();

// Modal State
const isIngredientModalOpen = ref(false);
const isStepModalOpen = ref(false);

const closeIngredientModal = () => {
  isIngredientModalOpen.value = false;
};

const closeStepModal = () => {
  isStepModalOpen.value = false;
};

const closeUploadPictureModal = () => {};

// Modals & Local UI State
const isDeleteModalOpen = ref(false);
const isDeleting = ref(false);
const checkedItems = ref(new Set());
const pictureModalRef = ref(null);

// Computed Pinia States
const recipe = computed(() => recipeStore.getSingleRecipe);
const user = computed(() => auth.getAuthData);
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

const openPictureModal = () => {
  if (pictureModalRef.value) {
    pictureModalRef.value.openModal();
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

// Add Ingredient
const addIngredient = async (data) => {
  isIngredientModalOpen.value = false;
  const ingredientData = {
    recipe: recipe.value._id,
    name: data.name,
    quantity: data.quantity,
  };
  await ingredientStore.createIngredient(ingredientData);
  recipeStore.fetchRecipeById(recipe.value._id);
};

// Add Step
const addStep = async (data) => {
  isStepModalOpen.value = false;
  const stepData = {
    recipe: recipe.value._id,
    description: data.description,
  };
  await stepStore.createStep(stepData);
  recipeStore.fetchRecipeById(recipe.value._id);
};

// Handle Picture Uploaded event
const handlePictureUploaded = () => {
  if (recipe.value && (recipe.value._id || recipe.value.id)) {
    recipeStore.fetchRecipeById(recipe.value._id || recipe.value.id);
  }
};

// Handle Deletion
const handleDelete = async () => {
  const recipeId = route.params.id;
  isDeleting.value = true;
  try {
    await recipeStore.deleteRecipe(recipeId);
    isDeleteModalOpen.value = false;
    router.push("/dashboard");
  } catch (error) {
    console.error("Failed to delete recipe:", error);
  } finally {
    isDeleting.value = false;
  }
};

// Handle step delete
const handleStepDelete = async (stepId) => {
  try {
    await stepStore.deleteStep(stepId);
    recipeStore.fetchRecipeById(recipe.value._id);
  } catch (error) {
    console.error("Failed to delete step:", error);
  }
};

// Handle ingredient delete
const handleIngredientDelete = async (ingredientId) => {
  try {
    await ingredientStore.deleteIngredient(ingredientId);
    recipeStore.fetchRecipeById(recipe.value._id);
  } catch (error) {
    console.error("Failed to delete ingredient:", error);
  }
};

// Handle picture delete
const handlePictureDelete = async (pictureId) => {
  try {
    await pictureStore.deletePicture(pictureId);
    recipeStore.fetchRecipeById(recipe.value._id);
  } catch (error) {
    console.error("Failed to delete picture:", error);
  }
};

// Load Data on Mount
onMounted(async () => {
  const recipeId = route.params.id;
  if (recipeId) {
    await Promise.all([recipeStore.fetchRecipeById(recipeId)]);
  }
});

// Reset Single Recipe State on Unmount
onUnmounted(() => {
  recipeStore.clearSingleRecipe();
});
</script>
