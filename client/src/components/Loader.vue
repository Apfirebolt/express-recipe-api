<template>
  <div class="flex flex-col justify-center items-center min-h-[200px] w-full p-6 space-y-4">
    <!-- Outer Spinner Wrapper -->
    <div class="relative flex justify-center items-center">
      <!-- Spinning Ring -->
      <div 
        class="w-16 h-16 rounded-full border-4 border-tertiary/30 border-t-primary animate-spin"
      ></div>
      
      <!-- Bouncing Central Food Emoji -->
      <span class="absolute text-2xl animate-bounce">
        🍳
      </span>
    </div>

    <!-- Status Text -->
    <p class="text-dark font-medium text-sm tracking-wide animate-pulse">
      Simmering up recipes...
    </p>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Loader',
});
</script>