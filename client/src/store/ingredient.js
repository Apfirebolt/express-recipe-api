import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import Cookie from "js-cookie";
import httpClient from "../plugins/interceptor";
import router from "../routes";

const toast = useToast();

// Helper function to extract bearer token from cookie
const getAuthHeaders = () => {
  try {
    const authData = Cookie.get("user");
    if (!authData) return {};
    
    const parsedData = JSON.parse(authData);
    return {
      headers: {
        Authorization: `Bearer ${parsedData.token}`,
      },
    };
  } catch (error) {
    console.error("Error parsing user auth token from cookie:", error);
    return {};
  }
};

export const useIngredientStore = defineStore("ingredient", {
  state: () => ({
    ingredients: [],
    singleIngredient: null,
    loading: false,
    pagination: {
      total: 0,
      currentPage: 1,
    },
  }),

  getters: {
    getIngredients(state) {
      return state.ingredients;
    },
    getSingleIngredient(state) {
      return state.singleIngredient;
    },
    isLoading(state) {
      return state.loading;
    },
  },

  actions: {
    // Fetch all ingredients with search/pagination params and auth headers
    async fetchIngredients(params = {}) {
      this.loading = true;
      try {
        const config = {
          ...getAuthHeaders(),
          params,
        };
        const response = await httpClient.get("ingredients", config);
        if (response.data) {
          this.ingredients = response.data.ingredients || response.data;
          if (response.data.total) {
            this.pagination.total = response.data.total;
            this.pagination.currentPage = params.page || 1;
          }
        }
      } catch (error) {
        let message = "Failed to fetch ingredients!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error fetching ingredients:", error);
      } finally {
        this.loading = false;
      }
    },

    // Create / Add new ingredient with auth headers
    async createIngredient(ingredientData) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.post("ingredients", ingredientData, config);
        if (response.data && (response.status === 201 || response.status === 200)) {
          toast.success("Ingredient created successfully!");
          this.ingredients.unshift(response.data);
        }
      } catch (error) {
        let message = "Failed to create ingredient!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error creating ingredient:", error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    // Update existing ingredient with auth headers
    async updateIngredient(id, ingredientData) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.put(`ingredients/${id}`, ingredientData, config);
        if (response.data) {
          toast.success("Ingredient updated successfully!");
          const index = this.ingredients.findIndex((i) => i._id === id || i.id === id);
          if (index !== -1) {
            this.ingredients[index] = response.data;
          }
          this.singleIngredient = response.data;
          router.push(`/ingredients/${id}`);
        }
      } catch (error) {
        let message = "Failed to update ingredient!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error updating ingredient:", error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    // Delete ingredient with auth headers
    async deleteIngredient(id) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.delete(`ingredients/${id}`, config);
        if (response.status === 200 || response.status === 204) {
          this.ingredients = this.ingredients.filter((i) => (i._id || i.id) !== id);
          toast.success("Ingredient deleted successfully!");
        }
      } catch (error) {
        let message = "Failed to delete ingredient!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error deleting ingredient:", error);
      } finally {
        this.loading = false;
      }
    },

    // Reset single ingredient state
    clearSingleIngredient() {
      this.singleIngredient = null;
    },
  },
});