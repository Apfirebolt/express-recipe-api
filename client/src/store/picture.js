import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import Cookie from "js-cookie";
import httpClient from "../plugins/interceptor";

const toast = useToast();

// Helper function to extract bearer token from cookie
const getAuthHeaders = (isFormData = false) => {
  try {
    const authData = Cookie.get("user");
    if (!authData) return {};

    const parsedData = JSON.parse(authData);
    const headers = {
      Authorization: `Bearer ${parsedData.token}`,
    };

    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    return { headers };
  } catch (error) {
    console.error("Error parsing user auth token from cookie:", error);
    return {};
  }
};

export const usePictureStore = defineStore("picture", {
  state: () => ({
    pictures: [],
    singlePicture: null,
    loading: false,
  }),

  getters: {
    getPictures(state) {
      return state.pictures;
    },
    getSinglePicture(state) {
      return state.singlePicture;
    },
    isLoading(state) {
      return state.loading;
    },
  },

  actions: {
    // Fetch all pictures
    async fetchPictures(params = {}) {
      this.loading = true;
      try {
        const response = await httpClient.get("pictures", { params });
        if (response.data) {
          this.pictures = response.data;
        }
      } catch (error) {
        let message = "Failed to fetch pictures!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.error("Error fetching pictures:", error);
      } finally {
        this.loading = false;
      }
    },

    // Fetch picture by ID
    async fetchPictureById(id) {
      this.loading = true;
      try {
        const response = await httpClient.get(`pictures/${id}`);
        if (response.data) {
          this.singlePicture = response.data;
        }
      } catch (error) {
        let message = "Picture not found!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.error("Error fetching picture:", error);
      } finally {
        this.loading = false;
      }
    },

    // Upload / Add new picture (expects FormData object containing 'title', 'recipe', and 'file')
    async addPicture(formData) {
      this.loading = true;
      try {
        const config = getAuthHeaders(true); // pass true for multipart/form-data
        const response = await httpClient.post("pictures", formData, config);
        
        if (response.data && (response.status === 201 || response.status === 200)) {
          toast.success("Picture uploaded successfully!");
          this.pictures.push(response.data);
          return response.data;
        }
      } catch (error) {
        let message = "Failed to upload picture!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.error("Error adding picture:", error);
        return Promise.reject(error);
      } finally {
        this.loading = false;
      }
    },

    // Update picture title (PATCH /api/pictures/:id)
    async updatePicture(id, updateData) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.patch(`pictures/${id}`, updateData, config);
        
        if (response.data) {
          toast.success("Picture updated successfully!");
          const updated = response.data.data || response.data;
          
          const index = this.pictures.findIndex((p) => (p._id || p.id) === id);
          if (index !== -1) {
            this.pictures[index] = updated;
          }
          this.singlePicture = updated;
        }
      } catch (error) {
        let message = "Failed to update picture!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.error("Error updating picture:", error);
        return Promise.reject(error);
      } finally {
        this.loading = false;
      }
    },

    // Delete picture by ID
    async deletePicture(id) {
      this.loading = true;
      try {
        const config = getAuthHeaders();
        const response = await httpClient.delete(`pictures/${id}`, config);
        
        if (response.status === 200 || response.status === 204) {
          this.pictures = this.pictures.filter((p) => (p._id || p.id) !== id);
          if (this.singlePicture && (this.singlePicture._id || this.singlePicture.id) === id) {
            this.singlePicture = null;
          }
          toast.success("Picture removed successfully!");
        }
      } catch (error) {
        let message = "Failed to delete picture!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        toast.error(message);
        console.error("Error deleting picture:", error);
        return Promise.reject(error);
      } finally {
        this.loading = false;
      }
    },

    // Clear single picture state
    clearSinglePicture() {
      this.singlePicture = null;
    },
  },
});