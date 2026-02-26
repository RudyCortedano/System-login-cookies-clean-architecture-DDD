import { describe, it, expect, vi, beforeEach } from "vitest";
import { ResetPassword } from "../../../src/modules/auth/application/ResetPassword";
import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";

describe("ResetPassword", () => {
  let mockRepository: AuthRepository;
  let resetPassword: ResetPassword;

  beforeEach(() => {
    mockRepository = {
      login: vi.fn(),
      register: vi.fn(),
      verify: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
      verifyChangePassword: vi.fn(),
    };

    resetPassword = new ResetPassword(mockRepository);
  });

  //  Este test verifica que el caso de uso lance un error
  // cuando la contraseña tiene menos de 6 caracteres
  // y que no llame al repository.
  it("should throw error if password is too short", async () => {
    const code = "Tincu123";
    const password = "123"; // menor a 6

    await expect(resetPassword.execute(code, password)).rejects.toThrow(
      "Password too short",
    );

    expect(mockRepository.resetPassword).not.toHaveBeenCalled();
  });

  //  Este test verifica que el caso de uso llame correctamente
  // al repository cuando la contraseña es válida.
  it("should call repository if password is valid", async () => {
    const code = "Tincu123";
    const password = "123456";

    (mockRepository.resetPassword as any).mockResolvedValue(undefined);

    const result = await resetPassword.execute(code, password);

    expect(mockRepository.resetPassword).toHaveBeenCalledOnce();
    expect(mockRepository.resetPassword).toHaveBeenCalledWith(code, password);
      expect(result).toBeUndefined();
  });

  //  Este test verifica que si el repository lanza un error
  // (por ejemplo código inválido),
  // el caso de uso lo propague correctamente.
  it("should propagate error if repository fails", async () => {
    const code = "Tincu123";
    const password = "123456";

    (mockRepository.resetPassword as any).mockRejectedValue(
      new Error("Invalid reset code"),
    );

    await expect(resetPassword.execute(code, password)).rejects.toThrow(
      "Invalid reset code",
    );

    expect(mockRepository.resetPassword).toHaveBeenCalledOnce();
  });
});
