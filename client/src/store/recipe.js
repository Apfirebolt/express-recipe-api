import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import httpClient from "../plugins/interceptor";
import router from "../routes";

const toast = useToast();

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [],
    singleRecipe: null,
    loading: false,
    pagination: {
      currentPage: 1,
      numberOfItemsPerPage: 10,
      total: 0,
    },
  }),

  getters: {
    getAllRecipes(state) {
      return state.recipes;
    },
    getSingleRecipe(state) {
      return state.singleRecipe;
    },
    isLoading(state) {
      return state.loading;
    },
    getPagination(state) {
      return state.pagination;
    },
  },

  actions: {
    // Fetch all recipes with optional search, pagination, or category query params
    async fetchRecipes(params = {}) {
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

    // Fetch single recipe details by ID
    async fetchRecipeById(id) {
      this.loading = true;
      try {
        const response = await httpClient.get(`recipes/${id}`);
        if (response.data) {
          this.singleRecipe = response.data;
        }
      } catch (error) {
        let message = "Recipe not found!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error fetching single recipe:", error);
      } finally {
        this.loading = false;
      }
    },

    // Create / Upload new recipe
    async createRecipe(recipeData) {
      this.loading = true;
      try {
        const response = await httpClient.post("recipes", recipeData);
        if (response.data && (response.status === 201 || response.status === 200)) {
          toast.success("Recipe published successfully!");
          this.recipes.unshift(response.data);
          router.push("/dashboard");
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

    // Update existing recipe
    async updateRecipe(id, recipeData) {
      this.loading = true;
      try {
        const response = await httpClient.put(`recipes/${id}`, recipeData);
        if (response.data) {
          toast.success("Recipe updated successfully!");
          const index = this.recipes.findIndex((r) => r.id === id);
          if (index !== -1) {
            this.recipes[index] = response.data;
          }
          this.singleRecipe = response.data;
          router.push(`/recipes/${id}`);
        }
      } catch (error) {
        let message = "Failed to update recipe!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error updating recipe:", error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    // Delete recipe
    async deleteRecipe(id) {
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