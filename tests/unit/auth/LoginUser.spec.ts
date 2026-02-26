import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginUser } from "../../../src/modules/auth/application/LoginUser";
import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";

describe("LoginUser", () => {
  let mockRepository: AuthRepository;
  let loginUser: LoginUser;

  beforeEach(() => {
    mockRepository = {
      login: vi.fn(),
      register: vi.fn(),
      verify: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
      verifyChangePassword: vi.fn(),
    };

    loginUser = new LoginUser(mockRepository);
  });

  // Este test verifica que el caso de uso lance un error
  // cuando el email está vacío y no intente llamar al repository.
  it("should throw error if email is empty", async () => {
    await expect(loginUser.execute("", "123456")).rejects.toThrow();

    expect(mockRepository.login).not.toHaveBeenCalled();
  });

  // Este test verifica que el caso de uso llame correctamente
  // al repository cuando los datos son válidos y retorne el usuario.
  it("should call repository login when data is valid", async () => {
    (mockRepository.login as any).mockResolvedValue({
      id: "1",
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu@test.com",
    });

    const result = await loginUser.execute("tincu@test.com", "123456");

    expect(mockRepository.login).toHaveBeenCalledOnce();
    // expect(mockRepository.login).toHaveBeenCalledWith(
    //   "tincu@test.com",
    //   "123456"
    // );
    expect(mockRepository.login).toHaveBeenCalledWith({
      email: "tincu@test.com",
      password: "123456",
    });

    expect(result.firstName).toBe("Tincu");
    expect(result.lastName).toBe("Pareda");
    expect(result.email).toBe("tincu@test.com");
  });

  // Este test verifica que si el repository lanza un error
  // (por ejemplo credenciales inválidas), el caso de uso lo propague correctamente.
  it("should throw error if repository fails", async () => {
    (mockRepository.login as any).mockRejectedValue(
      new Error("Invalid credentials"),
    );

    await expect(loginUser.execute("tincu@test.com", "123456")).rejects.toThrow(
      "Invalid credentials",
    );

    expect(mockRepository.login).toHaveBeenCalledOnce();
  });
});
