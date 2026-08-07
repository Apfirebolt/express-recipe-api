<template>
  <footer class="bg-dark text-white py-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <!-- About Section -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Mini Url</h3>
          <p class="text-sm">
            A powerful URL shortening service with analytics and tracking capabilities.
          </p>
        </div>

        <!-- Features Section -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Features</h3>
          <ul class="text-sm space-y-2">
            <li>✓ URL Shortening</li>
            <li>✓ Click Analytics</li>
            <li>✓ Traffic Charts</li>
          </ul>
        </div>

        <!-- Analytics Section -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Analytics</h3>
          <ul class="text-sm space-y-2">
            <li>📊 Real-time Statistics</li>
            <li>📈 Visual Charts</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-6">
        <p class="text-center text-sm">
          &copy; {{ currentYear }} Mini Url - A URL Shortening Service with Advanced Analytics
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>
