import type { RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";
import PrivateRouter from "../private/PrivateRouter.vue";

const UserRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: PrivateRouter,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: HomeView,
      },
    ],
  },
];

export default UserRoutes;
