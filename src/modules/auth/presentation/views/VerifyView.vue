<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NotFound from "@/shared/layouts/NotFound.vue";
import { useAuth } from "../composables/useAuth";
import Spinner from "@/shared/layouts/Spinner.vue";
import WelcomeVerifyUser from "./WelcomeVerifyUser.vue";

const route = useRoute();
const verified = ref(false);

// hook
const { verify, loading, isAuthorizeVerify } = useAuth();

onMounted(async () => {
  const code = route.params.code as string;

  if (code) {
    try {
      await verify(code);
      verified.value = true;
    } catch (err) {
      verified.value = false;
    }
  }
});
</script>

<template>
  <Spinner v-if="loading" />

  <WelcomeVerifyUser v-else-if="isAuthorizeVerify" />

  <NotFound v-else />
</template>
