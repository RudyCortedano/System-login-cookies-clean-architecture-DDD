import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { AuthRepositoryImpl } from "../../src/modules/auth/infrastructure/AuthRepositoryImpl";
import { server } from "../msw/server";

describe("AuthRepositoryImpl (integration)", () => {
  const repository = new AuthRepositoryImpl();

  // Verifica que login haga la petición HTTP real
  // y retorne correctamente el usuario.
  it("should login successfully and return user data", async () => {
    server.use(
      http.post("/auth/login", async () => {
        return HttpResponse.json({
          id: "user-123",
          email: "tincu@test.com",
          firstName: "Tincu",
          lastName: "Pareda",
        });
      }),
    );

    const result = await repository.login({
      email: "tincu@test.com",
      password: "123456",
    });

    expect(result).toEqual({
      id: "user-123",
      email: "tincu@test.com",
      firstName: "Tincu",
      lastName: "Pareda",
    });
  });

  // Verifica que lance error cuando backend responde 401.
  it("should throw error if backend returns 401", async () => {
    server.use(
      http.post("/auth/login", async () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    await expect(
      repository.login({
        email: "tincu@test.com",
        password: "wrong",
      }),
    ).rejects.toThrow();
  });
  // ---------------------------------------------------------------------------------------//
  // ---------------------------------------------------------------------------------------//
  // Verifica que el registro sea exitoso cuando se envían datos válidos.
  // Debe retornar el usuario creado con el email correcto.
  it("should register user successfully", async () => {
    const result = await repository.register({
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu@test.com",
      password: "123456",
    });

    expect(result.email).toBe("tincu@test.com");
    expect(result.firstName).toBe("Tincu");
    expect(result.lastName).toBe("Pareda");
  });

  // Verifica que se lance un error cuando el email ya existe en el sistema.
  // El backend mock debe responder con status 409.
  it("should throw error if email already exists", async () => {
    await expect(
      repository.register({
        firstName: "Tincu",
        lastName: "Pareda",
        email: "exists@test.com",
        password: "123456",
      }),
    ).rejects.toThrow();
  });
  // ---------------------------------------------------------------------------------------//
  // ---------------------------------------------------------------------------------------//
  // Verifica que la cuenta sea validada correctamente cuando el código es válido.
  it("should verify account successfully with valid code", async () => {
    await expect(repository.verify("valid-code")).resolves.not.toThrow();
  });

  // Verifica que se lance un error cuando el código de verificación es inválido.
  it("should throw error if verification code is invalid", async () => {
    await expect(repository.verify("invalid-code")).rejects.toThrow();
  });
  // ---------------------------------------------------------------------------------------//
  // ---------------------------------------------------------------------------------------//
  // Verifica que se envíe correctamente el correo de recuperación cuando el email existe.
  it("should send reset email successfully", async () => {
    await expect(
      repository.requestPasswordReset({
        email: "tincu@test.com",
        frontBaseUrl: "http://localhost:5173",
      }),
    ).resolves.not.toThrow();
  });

  // Verifica que se lance un error cuando el email no existe.
  it("should throw error if email does not exist", async () => {
    await expect(
      repository.requestPasswordReset({
        email: "unknown@test.com",
        frontBaseUrl: "http://localhost:5173",
      }),
    ).rejects.toThrow();
  });
  // ---------------------------------------------------------------------------------------//
  // ---------------------------------------------------------------------------------------//
  // Verifica que la contraseña se restablezca correctamente cuando el token es válido
  // y se envía una nueva contraseña válida.
  it("should reset password successfully with valid token", async () => {
    await expect(
      repository.resetPassword("valid-reset-token", "123456"),
    ).resolves.not.toThrow();
  });

  // Verifica que se lance un error cuando el token de reseteo es inválido
  // aunque se envíe una contraseña válida.
  it("should throw error if reset token is invalid", async () => {
    await expect(
      repository.resetPassword("invalid-token", "123456"),
    ).rejects.toThrow();
  });

  // Verifica que se lance un error cuando no se envía contraseña
  // (simula contrato HTTP inválido).
  it("should throw error if password is missing", async () => {
    // Forzamos el caso pasando string vacío
    await expect(
      repository.resetPassword("valid-reset-token", ""),
    ).rejects.toThrow();
  });
  // ---------------------------------------------------------------------------------------//
  // ---------------------------------------------------------------------------------------//
  // Verifica que el endpoint permita el cambio de contraseña cuando el código es válido.
  it("should verify password change successfully with valid code", async () => {
    await expect(
      repository.verifyChangePassword("valid-change-code"),
    ).resolves.not.toThrow();
  });

  // Verifica que se lance un error cuando el código ya fue usado o no existe.
  it("should throw error if change password code is invalid", async () => {
    await expect(
      repository.verifyChangePassword("invalid-code"),
    ).rejects.toThrow();
  });
  // ---------------------------------------------------------------------------------------//
  // ---------------------------------------------------------------------------------------//
});
