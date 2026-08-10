<template>
  <div class="min-h-screen bg-ghost-grey text-dark-slate-grey flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full text-center space-y-8">
      
      <!-- Visual Illustration Badge -->
      <div class="relative inline-block">
        <!-- Background Glowing Glow Ring -->
        <div class="absolute -inset-2 rounded-full bg-light-blue/20 blur-xl animate-pulse"></div>
        
        <!-- Center Icon Box -->
        <div class="relative inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-dark-slate-grey text-light-blue border border-cadet-grey/30 shadow-xl">
          <span class="text-6xl animate-bounce">🍳</span>
        </div>
        
        <!-- Floating 404 Badge -->
        <span class="absolute -bottom-2 -right-2 bg-light-blue text-jet-black font-extrabold text-sm px-3 py-1 rounded-full shadow-md border border-cadet-grey/20">
          404 Error
        </span>
      </div>

      <!-- Main Copy -->
      <div class="space-y-3">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-dark-slate-grey tracking-tight">
          Oops! Page Burnt or Missing
        </h1>
        <p class="text-base sm:text-lg text-cadet-grey max-w-md mx-auto leading-relaxed">
          The recipe or page you are looking for seems to have vanished from our kitchen menu. Let’s get you back on track!
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <router-link
          to="/"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-light-blue hover:bg-dark-slate-grey hover:text-light-blue text-jet-black font-bold text-sm rounded-xl shadow-md transition-all duration-200 gap-2 active:scale-95"
        >
          <span>🏠</span>
          <span>Back to Home</span>
        </router-link>

        <router-link
          to="/recipes"
          class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-dark-slate-grey hover:bg-jet-black text-ghost-grey font-semibold text-sm rounded-xl border border-cadet-grey/30 shadow-md transition-all duration-200 gap-2 active:scale-95"
        >
          <span>🔍</span>
          <span>Explore Recipes</span>
        </router-link>
      </div>

      <!-- Footer Note -->
      <p class="text-xs text-cadet-grey/70 pt-4">
        Need assistance? <router-link to="/contact" class="text-dark-slate-grey font-semibold underline hover:text-light-blue transition-colors">Contact Support</router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
// No extra logic required for basic rendering
</script>