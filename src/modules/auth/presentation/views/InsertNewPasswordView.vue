<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import NewPassword from "./NewPasswordView.vue";
import NotFound from "@/shared/layouts/NotFound.vue";
import { useAuth } from "../composables/useAuth";
import Spinner from "@/shared/layouts/Spinner.vue";

const route = useRoute();
const code = route.params.code as string;

// hook
const { verifyChangePassword, loading, isAuthorizePasswordChange } = useAuth();

onMounted(() => {
  verifyChangePassword(code);
});
</script>

<template>
  <Spinner v-if="loading" />

  <NewPassword v-else-if="isAuthorizePasswordChange" />

  <NotFound v-else />
</template>
