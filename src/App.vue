<script setup lang="ts">
import { RouterView } from "vue-router";
import Theme3D from "./shared/layouts/Theme3D.vue";
</script>

<template>
  <div class="app-container">
    <Theme3D class="background" />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>


<style>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Fondo */
.background {
  position: fixed;  
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;      
}

/* Contenido encima */
.content {
  position: relative;
  z-index: 1;
}
</style>