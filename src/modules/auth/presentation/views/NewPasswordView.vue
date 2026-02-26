<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuth } from "../composables/useAuth";

const route = useRoute();
const router = useRouter();
const { resetPassword } = useAuth();

//  Code desde la URL
const code = route.params.code as string;

//  Schema
const schema = toTypedSchema(
  z
    .object({
      password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    })
);

//  Form
const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: schema,
});

const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] =
  defineField("confirmPassword");

//  Submit
const submit = handleSubmit(async (values) => {
  await resetPassword(code, values.password);

  //  Redirigir al login
  router.push("/auth/login");
});
</script>

<template>
  <div class="newPassword_wrapper">
    <div class="newPassword_glass_card">
      <h1 class="newPassword_title">Actualizar contraseña</h1>

      <form @submit.prevent="submit" class="newPassword_form">
        <div class="newPassword_field">
          <input
            type="password"
            placeholder="Nueva contraseña"
            v-model="password"
            v-bind="passwordAttrs"
          />
          <small v-if="errors.password">
            {{ errors.password }}
          </small>
        </div>

        <div class="newPassword_field">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            v-model="confirmPassword"
            v-bind="confirmPasswordAttrs"
          />
          <small v-if="errors.confirmPassword">
            {{ errors.confirmPassword }}
          </small>
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Actualizando..." : "Actualizar contraseña" }}
        </button>
      </form>

      <p class="newPassword_auth_link">
        ¿Recordaste tu contraseña?
        <RouterLink to="/auth/login">Inicia sesión</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* --------------------------------- */
/* --------------------------------- */
/*  Fondo y centrado  */
.newPassword_wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* --------------------------------- */
/* --------------------------------- */
/* Card del formulario*/
.newPassword_glass_card {
  width: 100%;
  max-width: 400px;
  padding: 32px 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
/* --------------------------------- */
/* --------------------------------- */
/*  Título  */
.newPassword_title {
  text-align: center;
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 24px;
}
/* --------------------------------- */
/* --------------------------------- */
/* Formulario nueva contraseña */
.newPassword_form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.newPassword_field {
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
/*  Estilos de los errores  */
small {
  color: #fca5a5;
  font-size: 12px;
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
.newPassword_auth_link {
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
}
.newPassword_auth_link a {
  margin-left: 4px;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}
.newPassword_auth_link a:hover {
  text-decoration: underline;
}
/* --------------------------------- */
/* --------------------------------- */
</style>
