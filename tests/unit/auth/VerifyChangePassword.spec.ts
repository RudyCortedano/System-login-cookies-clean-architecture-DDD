import { describe, it, expect, vi, beforeEach } from "vitest";
import { VerifyChangePassword } from "../../../src/modules/auth/application/VerifyChangePassword";
import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";

describe("VerifyChangePassword", () => {
  let mockRepository: AuthRepository;
  let verifyChangePassword: VerifyChangePassword;

  beforeEach(() => {
    mockRepository = {
      login: vi.fn(),
      register: vi.fn(),
      verify: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
      verifyChangePassword: vi.fn(),
    };

    verifyChangePassword = new VerifyChangePassword(mockRepository);
  });

  //  Este test verifica que el caso de uso llame correctamente
  // al repository enviando el código de verificación.
  it("should call repository with correct code", async () => {
    const code = "Tincu123";

    (mockRepository.verifyChangePassword as any).mockResolvedValue(undefined);

    const result = await verifyChangePassword.execute(code);

    expect(mockRepository.verifyChangePassword).toHaveBeenCalledOnce();
    expect(mockRepository.verifyChangePassword).toHaveBeenCalledWith(code);
    expect(result).toBeUndefined();
  });

  //  Este test verifica que si el repository lanza un error
  // (por ejemplo código inválido o expirado),
  // el caso de uso lo propague correctamente.
  it("should propagate error if repository fails", async () => {
    const code = "Tincu123";

    (mockRepository.verifyChangePassword as any).mockRejectedValue(
      new Error("Invalid or expired code"),
    );

    await expect(verifyChangePassword.execute(code)).rejects.toThrow(
      "Invalid or expired code",
    );

    expect(mockRepository.verifyChangePassword).toHaveBeenCalledOnce();
  });
});
