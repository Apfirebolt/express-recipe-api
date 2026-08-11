<template>
  <TransitionRoot appear :show="isIngredientModalOpen" as="template">
    <Dialog
      as="div"
      @close="closeModal"
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
                    @click="closeModal"
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
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useRecipeStore } from "../store/recipe.js";

defineProps({
  isIngredientModalOpen: Boolean,
  recipe: Object,
});

const emit = defineEmits(["close-ingredient-modal", "submit-ingredient"]);

const newIngredient = ref({ name: "", quantity: null });

const addIngredient = () => {
  console.log('Adding ingredient:', newIngredient.value);  
  emit("submit-ingredient", newIngredient.value);
  newIngredient.value.name = "";
  newIngredient.value.quantity = null;
};

const closeModal = () => {
  emit("close-ingredient-modal");
};
</script>
