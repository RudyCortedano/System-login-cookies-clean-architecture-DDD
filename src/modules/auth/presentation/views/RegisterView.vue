<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useAuth } from "../composables/useAuth";

// hook
const { register, user, errorMessage } = useAuth();

//  ZOD SCHEMA (como RHF)
const registerSchema = z.object({
  firstName: z.string().min(2, "Nombre mínimo 2 caracteres"),
  lastName: z.string().min(2, "Apellido mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Password mínimo 6 caracteres"),
});

// FORM CONFIG
const { handleSubmit, errors, defineField, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

//  FIELDS (como register())
const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [email] = defineField("email");
const [password] = defineField("password");

//  SUBMIT
const submit = handleSubmit(async (values) => {
  const frontBaseUrl = window.location.origin;

  await register({
    ...values,
    frontBaseUrl,
  });

  resetForm({
    values: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
});
</script>

<template>
  <div class="register_wrapper">
    <div class="register_glass_card">
      <h2 class="register_title">Crear cuenta</h2>

      <form @submit.prevent="submit" class="register_form">
        <div class="register_field">
          <input v-model="firstName" type="text" placeholder="*Juan" />
          <small v-if="errors.firstName">{{ errors.firstName }}</small>
        </div>

        <div class="register_field">
          <input v-model="lastName" type="text" placeholder="*Pareda" />
          <small v-if="errors.lastName">{{ errors.lastName }}</small>
        </div>

        <div class="register_field">
          <input
            v-model="email"
            type="email"
            placeholder="*juanpareda001@mail.com"
          />
          <small v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="register_field">
          <input
            v-model="password"
            type="password"
            placeholder="*mi_contraseña123/"
          />
          <small v-if="errors.password">{{ errors.password }}</small>
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Registrando..." : "Registrar" }}
        </button>
      </form>

      <p class="register_auth_link">
        ¿Ya tienes una cuenta?
        <RouterLink to="/auth/login">Inicia sesión</RouterLink>
      </p>
    </div>

    <!-- Mensajes -->
    <div v-if="user && !errorMessage" class="register_success_message">
      Registro exitoso. Revisa el correo que ingresastes para verificar tu
      identidad.
    </div>

    <div v-if="errorMessage" class="register_error_message">
      Este usuario ya existe o correo invalido.
    </div>
  </div>
</template>

<style scoped>
/* --------------------------------- */
/* --------------------------------- */
/*Fondo y centrado  */
.register_wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
/* --------------------------------- */
/* --------------------------------- */
/* Card del formulario registro*/
.register_glass_card {
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
/*  Título  */
.register_title {
  text-align: center;
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 24px;
}
/* --------------------------------- */
/* --------------------------------- */
/*  Formulario */
.register_form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.register_field {
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
/* Estilo del boton de register*/
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
/* Estilos de los Links */
.register_auth_link {
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
}
.register_auth_link a {
  margin-left: 4px;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}
.register_auth_link a:hover {
  text-decoration: underline;
}
/* --------------------------------- */
/* --------------------------------- */
/* Notificaciones de errores*/
small {
  color: #fca5a5;
  font-size: 12px;
}
/* --------------------------------- */
/* --------------------------------- */
/* nota de exito y error */
.register_success_message {
  background: rgba(0, 255, 120, 0.5);
  color: #094723;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  max-width: 400px;
  margin-top: 1rem;
  border: 1px solid green;
}
.register_error_message {
  background: rgba(255, 0, 0, 0.1);
  color: #ff5252;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  max-width: 400px;
  min-width: 400px;
  margin-top: 1rem;
}
/* --------------------------------- */
/* --------------------------------- */
</style>
