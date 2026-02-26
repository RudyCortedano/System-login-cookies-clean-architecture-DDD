import { test, expect } from "@playwright/test";

/*
===============================================================================
CONFIGURACIÓN DE CREDENCIALES DESDE VARIABLES DE ENTORNO
===============================================================================
*/

const TEST_EMAIL = process.env.TEST_EMAIL as string;
const TEST_PASSWORD = process.env.TEST_PASSWORD as string;

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error(
    "❌ TEST_EMAIL o TEST_PASSWORD no están definidos en las variables de entorno"
  );
}

/*
===============================================================================
1)  ROUTE GUARD
Verifica que un usuario NO autenticado no pueda acceder
a una ruta protegida y sea redirigido automáticamente al login.
===============================================================================
*/
test("Unauthenticated user is redirected to login", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/auth\/login/);
});


/*
===============================================================================
2)  LOGIN INVÁLIDO
Verifica que el sistema:
- No permita acceso con credenciales incorrectas
- Permanezca en /auth/login
- Muestre mensaje de error
===============================================================================
*/
test("User sees error with invalid credentials", async ({ page }) => {
  await page.goto("/auth/login");

  await page
    .getByPlaceholder("*juanpareda001@mail.com")
    .fill("wrong@test.com");

  await page
    .getByPlaceholder("*mi_contraseña123/")
    .fill("wrongpass");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await expect(page).toHaveURL(/auth\/login/);

  await expect(
    page.getByText("Credenciales Incorrectas")
  ).toBeVisible();
});


/*
===============================================================================
3)  LOGIN EXITOSO
Verifica que un usuario con credenciales válidas:
- Pueda iniciar sesión
- Sea redirigido a "/"
- Visualice su información correctamente
===============================================================================
*/
test("User can login successfully", async ({ page }) => {
  await page.goto("/auth/login");

  await page
    .getByPlaceholder("*juanpareda001@mail.com")
    .fill(TEST_EMAIL);

  await page
    .getByPlaceholder("*mi_contraseña123/")
    .fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await page.waitForURL("/");

  await expect(
    page.getByText("Bienvenido, Tincu Pareda")
  ).toBeVisible();
});


/*
===============================================================================
4)  PERSISTENCIA DE SESIÓN
Verifica que después de iniciar sesión:
- Si el usuario recarga la página (F5)
- La sesión continúe activa
- El usuario siga autenticado
===============================================================================
*/
test("Session persists after page reload", async ({ page }) => {
  await page.goto("/auth/login");

  await page
    .getByPlaceholder("*juanpareda001@mail.com")
    .fill(TEST_EMAIL);

  await page
    .getByPlaceholder("*mi_contraseña123/")
    .fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await page.waitForURL("/");

  await page.reload();

  await expect(
    page.getByText("Bienvenido, Tincu Pareda")
  ).toBeVisible();
});


/*
===============================================================================
5)  LOGOUT
Verifica que:
- El usuario pueda cerrar sesión correctamente
- Sea redirigido al login
- No pueda volver a la ruta protegida usando navegación manual
===============================================================================
*/
test("User can logout successfully", async ({ page }) => {
  await page.goto("/auth/login");

  await page
    .getByPlaceholder("*juanpareda001@mail.com")
    .fill(TEST_EMAIL);

  await page
    .getByPlaceholder("*mi_contraseña123/")
    .fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await page.waitForURL("/");

  await expect(
    page.getByText("Bienvenido, Tincu Pareda")
  ).toBeVisible();

  await page.getByText("⋮").click();
  await page.getByText("Cerrar sesión").click();

  await page.waitForURL(/auth\/login/);

  await page.goto("/");

  await page.waitForURL(/auth\/login/);

  await expect(
    page.getByRole("button", { name: "Iniciar sesión" })
  ).toBeVisible();
});