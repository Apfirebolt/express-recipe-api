<template>
  <TransitionRoot appear :show="isPictureModalOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
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
                Upload Dish Photo 📷
              </DialogTitle>

              <form @submit.prevent="handleUpload" class="space-y-4">
                <!-- Picture Title -->
                <div>
                  <label
                    class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1"
                  >
                    Image Title / Caption <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="newPicture.title"
                    type="text"
                    placeholder="e.g., Plated Tuscan Chicken with Basil"
                    class="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    required
                  />
                </div>

                <!-- Drag and Drop Image Input -->
                <div>
                  <label
                    class="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1"
                  >
                    Select Photo <span class="text-red-500">*</span>
                  </label>

                  <!-- Image Preview (if file selected) -->
                  <div
                    v-if="imagePreview"
                    class="relative mb-3 rounded-xl overflow-hidden border border-stone-200 bg-stone-50 group"
                  >
                    <img
                      :src="imagePreview"
                      alt="Preview"
                      class="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      @click="removeSelectedFile"
                      class="absolute top-2 right-2 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full p-1.5 transition-colors cursor-pointer"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Upload Dropzone (if no file) -->
                  <div
                    v-else
                    @dragover.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleDrop"
                    :class="[
                      'border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer',
                      isDragging
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                    ]"
                    @click="$refs.fileInput.click()"
                  >
                    <div
                      class="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center text-amber-700"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p class="text-xs text-stone-600 font-medium">
                      Click to upload <span class="text-stone-400">or drag and drop</span>
                    </p>
                    <p class="text-[10px] text-stone-400 mt-1">PNG, JPG, or WEBP</p>
                  </div>

                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileChange"
                  />
                </div>

                <!-- Form Action Buttons -->
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
                    :disabled="isSubmitting || !selectedFile || !newPicture.title"
                    class="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
                  >
                    {{ isSubmitting ? 'Uploading...' : 'Upload Photo' }}
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
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { usePictureStore } from "../store/picture";

const props = defineProps({
  recipeId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["uploaded"]);

const pictureStore = usePictureStore();

// Modal & File States
const isPictureModalOpen = ref(false);
const isSubmitting = ref(false);
const isDragging = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);
const imagePreview = ref(null);

const newPicture = reactive({
  title: "",
});

// File Handlers
const handleFileChange = (e) => {
  const file = e.target.files[0];
  processFile(file);
};

const handleDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  processFile(file);
};

const processFile = (file) => {
  if (file && file.type.startsWith("image/")) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeSelectedFile = () => {
  selectedFile.value = null;
  imagePreview.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

const closeModal = () => {
  isPictureModalOpen.value = false;
  newPicture.title = "";
  removeSelectedFile();
};

// Upload Action
const handleUpload = async () => {
  if (!newPicture.title.trim() || !selectedFile.value) return;

  isSubmitting.value = true;

  try {
    // Form data fields matching req.body.title, req.body.recipe, req.file
    const formData = new FormData();
    formData.append("title", newPicture.title.trim());
    formData.append("recipe", props.recipeId);
    formData.append("file", selectedFile.value);

    await pictureStore.addPicture(formData);

    emit("uploaded");
    closeModal();
  } catch (error) {
    console.error("Error uploading picture:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Expose state so parent components can open modal
defineExpose({
  openModal: () => {
    isPictureModalOpen.value = true;
  },
});
</script>