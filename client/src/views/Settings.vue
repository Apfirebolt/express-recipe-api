<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-stone-900 tracking-tight">
        Account Settings ⚙️
      </h1>
      <p class="text-stone-500 text-sm mt-1">
        Manage your profile details and account security preferences.
      </p>
    </div>

    <!-- Main Container -->
    <div class="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
      <TabGroup>
        <!-- Tab Headers -->
        <div class="border-b border-stone-100 bg-stone-50/50 px-6 pt-4">
          <TabList class="flex space-x-6">
            <Tab
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'pb-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer focus:outline-none',
                  selected
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                ]"
              >
                Profile Information
              </button>
            </Tab>

            <Tab
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'pb-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer focus:outline-none',
                  selected
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                ]"
              >
                Change Password
              </button>
            </Tab>
          </TabList>
        </div>

        <!-- Tab Panels -->
        <TabPanels class="p-6 sm:p-8">
          
          <!-- TAB 1: Profile Information -->
          <TabPanel>
            <form @submit.prevent="handleUpdateProfile" class="space-y-6 max-w-xl">
              <div>
                <label for="username" class="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Username <span class="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  v-model="profileForm.username"
                  type="text"
                  placeholder="e.g., ChefGordon"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div>
                <label for="email" class="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="profileForm.email"
                  type="email"
                  placeholder="you@example.com"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div class="pt-2 flex justify-end">
                <button
                  type="submit"
                  :disabled="isUpdatingProfile"
                  class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {{ isUpdatingProfile ? 'Saving Changes...' : 'Save Profile' }}
                </button>
              </div>
            </form>
          </TabPanel>

          <!-- TAB 2: Change Password -->
          <TabPanel>
            <form @submit.prevent="handleChangePassword" class="space-y-5 max-w-xl">
              <div>
                <label for="currentPassword" class="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Current Password <span class="text-red-500">*</span>
                </label>
                <input
                  id="currentPassword"
                  v-model="passwordForm.currentPassword"
                  type="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div>
                <label for="newPassword" class="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  New Password <span class="text-red-500">*</span>
                </label>
                <input
                  id="newPassword"
                  v-model="passwordForm.newPassword"
                  type="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div>
                <label for="confirmPassword" class="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Confirm New Password <span class="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div class="pt-2 flex justify-end">
                <button
                  type="submit"
                  :disabled="isUpdatingPassword || !isPasswordValid"
                  class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {{ isUpdatingPassword ? 'Updating...' : 'Update Password' }}
                </button>
              </div>
            </form>
          </TabPanel>

        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useToast } from "vue-toastification";
import { useAuth } from "../store/auth";

const toast = useToast();
const auth = useAuth();

// Loading states
const isUpdatingProfile = ref(false);
const isUpdatingPassword = ref(false);

// Profile state
const profileForm = reactive({
  username: "",
  email: "",
});

// Password state
const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Password confirmation validation
const isPasswordValid = computed(() => {
  return (
    passwordForm.currentPassword.length > 0 &&
    passwordForm.newPassword.length >= 6 &&
    passwordForm.newPassword === passwordForm.confirmPassword
  );
});

// Pre-fill profile form on mount
onMounted(async () => {
  if (auth.getAuthData) {
    profileForm.username = auth.getAuthData.username || "";
    profileForm.email = auth.getAuthData.email || "";
  } else {
    try {
      await auth.getProfileData();
      if (auth.getAuthData) {
        profileForm.username = auth.getAuthData.username || "";
        profileForm.email = auth.getAuthData.email || "";
      }
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  }
});

// Handle Profile Update
const handleUpdateProfile = async () => {
  if (!profileForm.username.trim() || !profileForm.email.trim()) return;

  isUpdatingProfile.value = true;
  try {
    // Call your auth store method to update profile
    await auth.updateProfile({
      username: profileForm.username.trim(),
      email: profileForm.email.trim(),
    });
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update profile!";
    toast.error(message);
  } finally {
    isUpdatingProfile.value = false;
  }
};

// Handle Password Change
const handleChangePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    toast.error("New passwords do not match!");
    return;
  }

  isUpdatingPassword.value = true;
  try {
    // Call your auth store method to change password
    await auth.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
    // Reset form fields
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirmPassword = "";
  } catch (error) {
    const message = error.response?.data?.message || "Failed to change password!";
    toast.error(message);
  } finally {
    isUpdatingPassword.value = false;
  }
};
</script>