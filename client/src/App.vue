<template>
  <div class="bg-light-blue">
    <header-component />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from './components/FooterComponent.vue';
</script>
