import { describe, it, expect, vi, beforeEach } from "vitest";
import { VerifyEmail } from "../../../src/modules/auth/application/VerifyEmail";
import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";

describe("VerifyEmail", () => {
  let mockRepository: AuthRepository;
  let verifyEmail: VerifyEmail;

  beforeEach(() => {
    mockRepository = {
      login: vi.fn(),
      register: vi.fn(),
      verify: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
      verifyChangePassword: vi.fn(),
    };

    verifyEmail = new VerifyEmail(mockRepository);
  });

  //  Este test verifica que el caso de uso lance un error
  // cuando el código de verificación está vacío
  // y que no intente llamar al repository.
  it("should throw error if code is empty", async () => {
    await expect(verifyEmail.execute("")).rejects.toThrow("Invalid code");

    expect(mockRepository.verify).not.toHaveBeenCalled();
  });

  //  Este test verifica que el caso de uso llame correctamente
  // al repository cuando el código es válido.
  it("should call repository if code is valid", async () => {
    const code = "Tincu123";

    (mockRepository.verify as any).mockResolvedValue(undefined);

    const result = await verifyEmail.execute(code);

    expect(mockRepository.verify).toHaveBeenCalledOnce();
    expect(mockRepository.verify).toHaveBeenCalledWith(code);
    expect(result).toBeUndefined();
  });

  //  Este test verifica que si el repository lanza un error
  // (por ejemplo código inválido o expirado),
  // el caso de uso lo propague correctamente.
  it("should propagate error if repository fails", async () => {
    const code = "Tincu123";

    (mockRepository.verify as any).mockRejectedValue(
      new Error("Invalid verification code"),
    );

    await expect(verifyEmail.execute(code)).rejects.toThrow(
      "Invalid verification code",
    );

    expect(mockRepository.verify).toHaveBeenCalledOnce();
  });
});
