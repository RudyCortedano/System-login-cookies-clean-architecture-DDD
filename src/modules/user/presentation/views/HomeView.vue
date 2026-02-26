<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "../composables/useUser";
import { useAuth } from "@/modules/auth/presentation/composables/useAuth";

const router = useRouter();
const showMenu = ref(false);

// hooks
const { user, loading, loadUser } = useUser();
const { logout } = useAuth();

// Cargar usuario al montar
onMounted(() => {
  loadUser();
});

// Toggle menú
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Logout limpio (usa caso de uso)
const handleLogout = async () => {
  await logout();
  router.replace("/auth/login");
};

// Cerrar menú al hacer click fuera
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".home_user")) {
    showMenu.value = false;
  }
};

document.addEventListener("click", handleClickOutside);

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="home_global">
    <!--  Navbar  -->
    <nav class="home_navbar">
      <div class="home_logo">🛡️ MyApp</div>

      <div class="home_user" v-if="user">
        <div class="home_avatar">👤</div>
        <span class="home_username">{{ user.firstName }}</span>

        <button class="home_menu_btn" @click="toggleMenu">⋮</button>

        <div v-if="showMenu" class="home_dropdown">
          <button class="home_dropdown_item" @click="handleLogout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <!--  Content  -->
    <main class="home_content">
      <div v-if="loading">Cargando...</div>

      <div v-else-if="user">
        <h1 class="home_welcome_fullname">Bienvenido, {{ user.firstName }} {{ user.lastName }} ✨</h1>
        <!-- <p>Panel principal de la aplicación</p> -->
      </div>

      <div v-else>
        <p>No se pudo cargar el usuario.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* --------------------------------- */
/* --------------------------------- */
@keyframes ani-your_css_selector_here {
    0% {
        --c-0: hsla(291, 76%, 91%, 1);
        --x-0: 37%;
        --s-start-0: 15%;
        --s-end-0: 72%;
        --y-0: 99%;
        --c-1: hsla(224, 99%, 60%, 1);
        --s-start-1: 4%;
        --s-end-1: 56%;
        --y-1: 78%;
        --x-1: 41%;
        --x-2: 49%;
        --s-start-2: 2%;
        --s-end-2: 81%;
        --y-2: 27%;
        --c-2: hsla(183, 52%, 85%, 1);
        --c-3: hsla(207, 75%, 75%, 1);
        --y-3: 43%;
        --s-start-3: 7%;
        --s-end-3: 70%;
        --x-3: 59%;
        --x-4: 87%;
        --y-4: 8%;
        --s-start-4: 0%;
        --s-end-4: 62%;
        --c-4: hsla(183, 73%, 64%, 1);
    }

    100% {
        --c-0: hsla(276, 51%, 95%, 1);
        --x-0: 79%;
        --s-start-0: 19%;
        --s-end-0: 83%;
        --y-0: 13%;
        --c-1: hsla(298, 86%, 62%, 1);
        --s-start-1: 1%;
        --s-end-1: 73%;
        --y-1: 20%;
        --x-1: 66%;
        --x-2: 47%;
        --s-start-2: 15%;
        --s-end-2: 66%;
        --y-2: 96%;
        --c-2: hsla(218, 71%, 85%, 1);
        --c-3: hsla(236, 68%, 100%, 1);
        --y-3: 84%;
        --s-start-3: 5%;
        --s-end-3: 68%;
        --x-3: 28%;
        --x-4: 37%;
        --y-4: 82%;
        --s-start-4: 20%;
        --s-end-4: 75%;
        --c-4: hsla(239, 59%, 70%, 1);
    }
}

@property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(291, 76%, 91%, 1)
}

@property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 37%
}

@property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 15%
}

@property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 72%
}

@property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 99%
}

@property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(224, 99%, 60%, 1)
}

@property --s-start-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 4%
}

@property --s-end-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 56%
}

@property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 78%
}

@property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 41%
}

@property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 49%
}

@property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 81%
}

@property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 27%
}

@property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(183, 52%, 85%, 1)
}

@property --c-3 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(207, 75%, 75%, 1)
}

@property --y-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 43%
}

@property --s-start-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 7%
}

@property --s-end-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 70%
}

@property --x-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 59%
}

@property --x-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 87%
}

@property --y-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 8%
}

@property --s-start-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%
}

@property --s-end-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 62%
}

@property --c-4 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(183, 73%, 64%, 1)
}

.home_global {
    --c-0: hsla(291, 76%, 91%, 1);
    --x-0: 37%;
    --y-0: 99%;
    --c-1: hsla(224, 99%, 60%, 1);
    --y-1: 78%;
    --x-1: 41%;
    --x-2: 49%;
    --y-2: 27%;
    --c-2: hsla(183, 52%, 85%, 1);
    --c-3: hsla(207, 75%, 75%, 1);
    --y-3: 43%;
    --x-3: 59%;
    --x-4: 87%;
    --y-4: 8%;
    --c-4: hsla(183, 73%, 64%, 1);
    ;
    background-color: hsla(223, 89%, 87%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2)), radial-gradient(circle at var(--x-3) var(--y-3), var(--c-3) var(--s-start-3), transparent var(--s-end-3)), radial-gradient(circle at var(--x-4) var(--y-4), var(--c-4) var(--s-start-4), transparent var(--s-end-4));
    animation: ani-your_css_selector_here 10s linear infinite alternate;
    background-blend-mode: normal, normal, normal, normal, normal;
    will-change: transform, opacity;
    contain: paint
}
/* --------------------------------- */
/* --------------------------------- */
/* Estilos generales */
.home_global {
  min-height: 100vh;
  /* background: #f4f6f8; */
}
/* --------------------------------- */
/* --------------------------------- */
/* Navbar */
.home_navbar {
  height: 64px;
  background: rgba(255, 255, 255, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: green;
}
.home_logo {
  font-weight: bold;
  font-size: 18px;
}
/* --------------------------------- */
/* --------------------------------- */
/* User */
.home_user {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}
.home_avatar {
  width: 36px;
  height: 36px;
  background: #1e293b;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.home_username {
  font-weight: 500;
}
/* --------------------------------- */
/* --------------------------------- */
/* Menu */
.home_menu_btn {
  background: none;
  border: none;
  color: white;
  font-size: 25px;
  cursor: pointer;
  padding: 0 6px;
  color: green;
}
/* --------------------------------- */
/* --------------------------------- */
/* Dropdown */
.home_dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background: #020617;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  min-width: 160px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  overflow: hidden;

}
.home_dropdown_item {
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
}
.home_dropdown_item:hover {
  background: rgba(99, 102, 241, 0.15);
}
/* --------------------------------- */
/* --------------------------------- */
/* Content */
.home_content {
  padding: 40px;
}
/* --------------------------------- */
/* --------------------------------- */
/* Bienvenida al usuario */
.home_welcome_fullname{
  color: green;
}
/* --------------------------------- */
/* --------------------------------- */
</style>
