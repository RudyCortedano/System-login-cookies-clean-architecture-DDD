<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useRouter } from "vue-router";
import { ref, toRaw } from "vue";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const isVerifiedUser = ref(true);

// hook
const { login, user, hasError } = useAuth();

// ZOD SCHEMA
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Password mínimo 6 caracteres"),
});

//  FORM CONFIG
const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

//  FIELDS
const [email] = defineField("email");
const [password] = defineField("password");

// SUBMIT
const submit = handleSubmit(async (values) => {
  const { email, password } = values;

  await login(email, password);
  const userData = toRaw(user.value);

  if (!userData?.user?.isVerified) {
    // Usuario NO verificado
    isVerifiedUser.value = false;
    return;
  }

  //  Usuario verificado
  isVerifiedUser.value = true;
  router.push("/");
});

const clearVerifyMessage = () => {
  isVerifiedUser.value = true;
  hasError.value = false;
};
</script>

<template>
  <div class="login_wrapper">
    <div class="login_glass_card">
      <h1 class="login_title">Iniciar sesión</h1>

      <form @submit.prevent="submit" class="login_form">
        <div class="login_field">
          <input
            @input="clearVerifyMessage"
            v-model="email"
            type="email"
            placeholder="*juanpareda001@mail.com"
            autocomplete="email"
          />
          <small v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="login_field">
          <input
            @input="clearVerifyMessage"
            v-model="password"
            type="password"
            placeholder="*mi_contraseña123/"
            autocomplete="current-password"
          />
          <small v-if="errors.password">{{ errors.password }}</small>

          <RouterLink to="/auth/reset_password" class="login_forgot_link">
            ¿Olvidaste tu contraseña?
          </RouterLink>
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Ingresando..." : "Iniciar sesión" }}
        </button>
      </form>

      <p class="login_auth_link">
        ¿No tienes una cuenta?
        <RouterLink to="/auth/register">Crea una</RouterLink>
      </p>
    </div>

    <!-- Mensaje verificación -->
    <div v-if="!isVerifiedUser" class="login_error_message_verify">
      Usted no ha verificado su correo electrónico. Revise su bandeja de entrada
      y haga clic en el botón de verificación.
    </div>

    <!-- Mensaje 401 -->
    <div v-if="hasError" class="login_error_message_401">
      Credenciales Incorrectas
    </div>
  </div>
</template>

<style scoped>
/* --------------------------------- */
/* --------------------------------- */
/* Fondo y centrado  */
.login_wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
/* --------------------------------- */
/* --------------------------------- */
/* Card del formulario login */
.login_glass_card {
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
/* Título*/
.login_title {
  text-align: center;
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 24px;
}
/* --------------------------------- */
/* --------------------------------- */
/* Formulario */
.login_form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.login_field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
/* --------------------------------- */
/* --------------------------------- */
/* Inputs*/
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
/* Estilo del boton de login*/
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
/* Estilos del Link */
.login_auth_link {
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
}
.login_auth_link a {
  margin-left: 4px;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}
.login_auth_link a:hover {
  text-decoration: underline;
}
.login_forgot_link {
  margin-top: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  align-self: flex-start;
}
.login_forgot_link:hover {
  color: #6366f1;
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
/* Errores */
.login_error_message_verify {
  background: rgba(255, 0, 0, 0.1);
  color: #ff5252;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  max-width: 400px;
  min-width: 400px;
  margin-top: 1rem;
  border: 1px solid #ff5252;
}
.login_error_message_401 {
  background: rgba(255, 0, 0, 0.1);
  color: #ff5252;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  max-width: 400px;
  min-width: 400px;
  margin-top: 1rem;
  border: 1px solid #ff5252;
}
/* --------------------------------- */
/* --------------------------------- */
</style>
