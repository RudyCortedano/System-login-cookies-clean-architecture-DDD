<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuth } from "../composables/useAuth";

// Hook
const { requestPasswordReset } = useAuth();

const successMessage = ref("");
const errorMessage = ref("");

// Schema
const resetSchema = z.object({
  email: z.string().email("Email inválido"),
});

// Form
const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(resetSchema),
});

const [email] = defineField("email");

// Submit
const submit = handleSubmit(async (values) => {
  try {
    const frontBaseUrl = window.location.origin;

    await requestPasswordReset(values.email, frontBaseUrl);

    successMessage.value =
      "Te hemos enviado un correo para restablecer tu contraseña.";
    errorMessage.value = "";
  } catch (err: any) {
    errorMessage.value =
      err?.response?.data?.message || "Error al enviar el correo";
    successMessage.value = "";
  }
});
</script>

<template>
  <div class="resetPassword_wrapper">
    <div class="resetPassword_glass_card">
      <h2 class="resetPassword_title">Recuperar contraseña</h2>

      <form @submit.prevent="submit" class="resetPassword_form">
        <div class="resetPassword_field">
          <input
            v-model="email"
            type="email"
            placeholder="*juanpareda001@mail.com"
            autocomplete="email"
          />
          <small v-if="errors.email">{{ errors.email }}</small>
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Enviando..." : "Enviar enlace" }}
        </button>
      </form>

      <!-- Mensajes -->
      <p v-if="successMessage" class="resetPassword_success">
        {{ successMessage }}
      </p>

      <p v-if="errorMessage" class="resetPassword_error">
        {{ errorMessage }}
      </p>

      <!-- Link -->
      <p class="resetPassword_auth_link">
        ¿Ya recordaste tu contraseña?
        <RouterLink to="/auth/login">Inicia sesión</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* --------------------------------- */
/* --------------------------------- */
/*  Fondo y centrado  */
.resetPassword_wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* --------------------------------- */
/* --------------------------------- */
/*  Card de solicitud de cambio de contraseña */
.resetPassword_glass_card {
  width: 100%;
  max-width: 400px;
  padding: 32px 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
/* --------------------------------- */
/* --------------------------------- */
/*  Title  */
.resetPassword_title {
  text-align: center;
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 24px;
}
/* --------------------------------- */
/* --------------------------------- */
/*  Formulario de solicitud de cambio de contraseña  */
.resetPassword_form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.resetPassword_field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
/* --------------------------------- */
/* --------------------------------- */
/*  Inputs  */
input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  outline: none;
  font-size: 14px;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
input:focus {
  border-color: rgba(99, 102, 241, 0.9);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.35);
}
/* --------------------------------- */
/* --------------------------------- */
/* nota de exito y error */
.resetPassword_error {
  margin-top: 0.5rem;
  color: #fca5a5;
  font-size: 12px;
}
.resetPassword_success {
  color: #86efac;
  font-size: 13px;
  margin-top: 12px;
  text-align: center;
}
/* --------------------------------- */
/* --------------------------------- */
/*  Button  */
button {
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-weight: 600;
  font-size: 15px;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}
button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
/* --------------------------------- */
/* --------------------------------- */
/*  Auth link  */
.resetPassword_auth_link {
  margin-top: 18px;
  text-align: center;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
}
.resetPassword_auth_link a {
  color: #818cf8;
  text-decoration: none;
  font-weight: 600;
  text-decoration: none;
}
.resetPassword_auth_link a:hover {
  text-decoration: underline;
}
/* --------------------------------- */
/* --------------------------------- */
</style>
