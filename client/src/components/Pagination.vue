<template>
  <nav
    class="container mx-auto px-4 py-4 flex items-center justify-between border-t border-cadet-grey/30 sm:px-6"
    aria-label="Pagination"
  >
    <!-- Results Counter Display -->
    <div class="hidden sm:block">
      <p class="text-sm text-dark-slate-grey">
        Showing
        <span class="font-semibold text-dark">{{ startIndex }}</span>
        to
        <span class="font-semibold text-dark">{{ endIndex }}</span>
        of
        <span class="font-semibold text-dark">{{ totalItems }}</span>
        recipes
      </p>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex-1 flex justify-between sm:justify-end space-x-3">
      <button
        type="button"
        :disabled="isFirstPage"
        @click="previousPageHandler"
        class="relative inline-flex items-center px-4 py-2 border border-cadet-grey/40 text-sm font-semibold rounded-md transition-colors duration-200 shadow-sm"
        :class="[
          isFirstPage
            ? 'bg-ghost-grey/50 text-cadet-grey/50 border-cadet-grey/20 cursor-not-allowed'
            : 'bg-ghost-grey text-dark-slate-grey hover:bg-light-blue hover:text-dark hover:border-cadet-grey'
        ]"
      >
        ← Previous
      </button>

      <button
        type="button"
        :disabled="isLastPage"
        @click="nextPageHandler"
        class="relative inline-flex items-center px-4 py-2 border border-cadet-grey/40 text-sm font-semibold rounded-md transition-colors duration-200 shadow-sm"
        :class="[
          isLastPage
            ? 'bg-ghost-grey/50 text-cadet-grey/50 border-cadet-grey/20 cursor-not-allowed'
            : 'bg-ghost-grey text-dark-slate-grey hover:bg-light-blue hover:text-dark hover:border-cadet-grey'
        ]"
      >
        Next →
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  numberOfItemsPerPage: {
    type: Number,
    required: true,
    default: 10,
  },
  
  totalItems: {
    type: Number,
    required: true,
    default: 0,
  },
});

const emit = defineEmits(["goToPreviousPage", "goToNextPage"]);

const totalItems = computed(() => props.totalItems || 0);

const startIndex = computed(() => {
  if (totalItems.value === 0) return 0;
  return (props.currentPage - 1) * props.numberOfItemsPerPage + 1;
});

const endIndex = computed(() => {
  const calculatedEnd = props.currentPage * props.numberOfItemsPerPage;
  return calculatedEnd < totalItems.value ? calculatedEnd : totalItems.value;
});

const isFirstPage = computed(() => props.currentPage <= 1);

const isLastPage = computed(() => {
  if (totalItems.value === 0) return true;
  return props.currentPage * props.numberOfItemsPerPage >= totalItems.value;
});

const previousPageHandler = () => {
  if (!isFirstPage.value) {
    emit("goToPreviousPage");
  }
};

const nextPageHandler = () => {
  if (!isLastPage.value) {
    emit("goToNextPage");
  }
};
</script>