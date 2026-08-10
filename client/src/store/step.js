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

export const useStepStore = defineStore("step", {
  state: () => ({
    steps: [],
    singleStep: null,
    loading: false,
    pagination: {
      total: 0,
      currentPage: 1,
    },
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
    // Fetch all steps with optional query params and auth headers
    async fetchSteps(params = {}) {
      this.loading = true;
      try {
        const config = {
          ...getAuthHeaders(),
          params,
        };
        const response = await httpClient.get("steps", config);
        if (response.data) {
          this.steps = response.data.steps || response.data;
          if (response.data.total) {
            this.pagination.total = response.data.total;
            this.pagination.currentPage = params.page || 1;
          }
        }
      } catch (error) {
        let message = "Failed to fetch steps!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error fetching steps:", error);
      } finally {
        this.loading = false;
      }
    },

    // Create new step with auth headers
    async createStep(stepData) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.post("steps", stepData, config);
        if (response.data && (response.status === 201 || response.status === 200)) {
          toast.success("Step published successfully!");
          this.steps.push(response.data);
        }
      } catch (error) {
        let message = "Failed to create step!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error creating step:", error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    // Update existing step with auth headers
    async updateStep(id, stepData) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.put(`steps/${id}`, stepData, config);
        if (response.data) {
          toast.success("Step updated successfully!");
          const index = this.steps.findIndex((s) => s._id === id || s.id === id);
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

    // Delete step with auth headers
    async deleteStep(id) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.delete(`steps/${id}`, config);
        if (response.status === 200 || response.status === 204) {
          this.steps = this.steps.filter((s) => (s._id || s.id) !== id);
          toast.success("Step deleted successfully!");
        }
      } catch (error) {
        let message = "Failed to delete step!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.log("Error deleting step:", error);
      } finally {
        this.loading = false;
      }
    },

    // Reset single step state
    clearSingleStep() {
      this.singleStep = null;
    },
  },
});