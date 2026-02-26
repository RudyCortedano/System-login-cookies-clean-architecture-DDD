<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="private-layout">
    <!-- Aquí podrías poner navbar privada si quieres -->
    <RouterView />
  </div>
</template>

<style scoped>
.private-layout {
  min-height: 100vh;
}
</style>
