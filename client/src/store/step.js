import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import httpClient from "../plugins/interceptor";
import router from "../routes";

const toast = useToast();

export const useStepStore = defineStore("step", {
  state: () => ({
    steps: [],
    singleStep: null,
    loading: false,
  }),

  getters: {
    getSteps(state) {
      return state.steps;
    },
    getSingleStep(state) {
      return state.singleStep;
    },
    isLoading(state) {
      return state.loading;
    },
  },

  actions: {
    // Fetch all recipes with optional search, pagination, or category query params
    async fetchSteps(params = {}) {
      this.loading = true;
      try {
        const response = await httpClient.get("recipes", { params });
        if (response.data) {
          this.recipes = response.data.recipes || response.data;
          if (response.data.total) {
            this.pagination.total = response.data.total;
            this.pagination.currentPage = params.page || 1;
          }
        }
      } catch (error) {
        let message = "Failed to fetch recipes!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error fetching recipes:", error);
      } finally {
        this.loading = false;
      }
    },

    // Create / Upload new recipe
    async createStep(recipeData) {
      this.loading = true;
      try {
        const response = await httpClient.post("steps", recipeData);
        if (response.data && (response.status === 201 || response.status === 200)) {
          toast.success("Step published successfully!");
        }
      } catch (error) {
        let message = "Failed to create recipe!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error creating recipe:", error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    // Update existing step
    async updateStep(id, stepData) {
      this.loading = true;
      try {
        const response = await httpClient.put(`steps/${id}`, stepData);
        if (response.data) {
          toast.success("Step updated successfully!");
          const index = this.steps.findIndex((r) => r.id === id);
          if (index !== -1) {
            this.steps[index] = response.data;
          }
          this.singleStep = response.data;
          router.push(`/steps/${id}`);
        }
      } catch (error) {
        let message = "Failed to update step!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error updating step:", error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    // Delete recipe
    async deleteStep(id) {
      this.loading = true;
      try {
        const response = await httpClient.delete(`recipes/${id}`);
        if (response.status === 200 || response.status === 204) {
          this.recipes = this.recipes.filter((r) => r.id !== id);
          toast.success("Recipe deleted successfully!");
        }
      } catch (error) {
        let message = "Failed to delete recipe!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error deleting recipe:", error);
      } finally {
        this.loading = false;
      }
    },

    // Reset single recipe state (e.g. when unmounting view)
    clearSingleRecipe() {
      this.singleRecipe = null;
    },
  },
});