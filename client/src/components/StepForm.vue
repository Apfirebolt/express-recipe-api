<template>
  <TransitionRoot appear :show="isStepModalOpen" as="template">
    <Dialog as="div" @close="onabort" class="relative z-50">
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

              <form @submit.prevent="onSubmit" class="space-y-4">
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
                    @click="onabort"
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
</template>

<script setup>
import { ref, reactive } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useRecipeStore } from "../store/recipe.js";

defineProps({
  isStepModalOpen: Boolean,
  recipe: Object,
});

const emit = defineEmits(["close-step-modal", "submit-step"]);

const newStep = ref({ description: "" });

const onabort = () => {
  emit("close-step-modal");
};

const onSubmit = () => {
  console.log('Submit new step:', newStep.value);  
  emit("submit-step", newStep.value);
  newStep.value.description = "";
};
</script>