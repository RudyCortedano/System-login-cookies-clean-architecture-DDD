import { createRouter, createWebHistory } from "vue-router";

import AuthRoutes from "@/modules/auth/presentation/router";
import UserRoutes from "@/modules/user/presentation/router";
import NotFound from "@/shared/layouts/NotFound.vue";

const routes = [
  ...AuthRoutes,
  ...UserRoutes,
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  // Si la ruta NO necesita auth, entra
  if (!to.meta.requiresAuth) {
    return next();
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
      
      credentials: "include", // 🔑 cookies
    });

    if (!res.ok) throw new Error("Unauthorized");

    // Usuario autenticado
    next();
  } catch (error) {
    // No autenticado → login
    next("/auth/login");
  }
});

export default router;


