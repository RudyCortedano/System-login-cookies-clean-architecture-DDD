import { describe, expect, it } from "vitest";
import { UserRepositoryImpl } from "../../src/modules/user/infrastructure/UserRepositoryImpl";
import { http, HttpResponse } from "msw";
import { server } from "../msw/server";

describe("UserRepositoryImpl (integration)", () => {
  const repository = new UserRepositoryImpl();
  // ----------------------------------------------------------------------------- //
  // ----------------------------------------------------------------------------- //
  // Verifica que se retorne el usuario logueado cuando la sesión es válida.
  it("should return logged user profile when authenticated", async () => {
    server.use(
      http.get("*/user/profile", () => {
        return HttpResponse.json({
          id: "user-999",
          firstName: "Tincu",
          lastName: "Pareda",
          email: "tincu@test.com",
        });
      }),
    );

    const result = await repository.getUserLogged();

    expect(result.email).toBe("tincu@test.com");
  });
  // ----------------------------------------------------------------------------- //
  // ----------------------------------------------------------------------------- //
  // Verifica que se lance error cuando el usuario no está autenticado.
  it("should throw error when user is not authenticated", async () => {
    server.use(
      http.get("*/user/profile", () => {
        return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
      }),
    );

    await expect(repository.getUserLogged()).rejects.toThrow();
  });
});
