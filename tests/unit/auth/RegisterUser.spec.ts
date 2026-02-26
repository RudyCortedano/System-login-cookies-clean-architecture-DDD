import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterUser } from "../../../src/modules/auth/application/RegisterUser";
import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";

describe("RegisterUser", () => {
  let mockRepository: AuthRepository;
  let registerUser: RegisterUser;

  beforeEach(() => {
    mockRepository = {
      login: vi.fn(),
      register: vi.fn(),
      verify: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
      verifyChangePassword: vi.fn(),
    };

    registerUser = new RegisterUser(mockRepository);
  });

  //  Este test verifica que el caso de uso lance un error
  // cuando el email no es válido y no llame al repository.
  it("should throw error if email is invalid", async () => {
    const data = {
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu",
      password: "123456",
    };

    await expect(registerUser.execute(data))
      .rejects
      .toThrow("Invalid email");

    expect(mockRepository.register).not.toHaveBeenCalled();
  });

  //  Este test verifica que el caso de uso llame correctamente
  // al repository cuando el email es válido y retorne el usuario creado.
  it("should call repository if email is valid", async () => {
    const data = {
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu@test.com",
      password: "123456",
    };

    (mockRepository.register as any).mockResolvedValue({
      id: "1",
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu@test.com",
    });

    const result = await registerUser.execute(data);

    expect(mockRepository.register).toHaveBeenCalledOnce();
    expect(mockRepository.register).toHaveBeenCalledWith(data);

    expect(result.firstName).toBe("Tincu");
    expect(result.lastName).toBe("Pareda");
    expect(result.email).toBe("tincu@test.com");
  });

  //  Este test verifica que si el repository falla
  // (por ejemplo el email ya existe), el caso de uso propague el error.
  it("should propagate error if repository fails", async () => {
    const data = {
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu@test.com",
      password: "123456",
    };

    (mockRepository.register as any).mockRejectedValue(
      new Error("Email already exists")
    );

    await expect(registerUser.execute(data))
      .rejects
      .toThrow("Email already exists");

    expect(mockRepository.register).toHaveBeenCalledOnce();
  });
});
