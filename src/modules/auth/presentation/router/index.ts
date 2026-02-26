import type { RouteRecordRaw } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import VerifyView from "../views/VerifyView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";
import InsertNewPasswordView from "../views/InsertNewPasswordView.vue";
import NewPasswordView from "../views/NewPasswordView.vue";

const AuthRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    children: [
      { path: "login", component: LoginView },
      { path: "register", component: RegisterView },
      { path: "verify_email/:code", component: VerifyView },
      { path: "reset_password", component: ResetPasswordView },
      { path: "password_change/:code", component: InsertNewPasswordView },
      { path: "reset_password/:code", component: NewPasswordView },
    ],
  },
];

export default AuthRoutes;
