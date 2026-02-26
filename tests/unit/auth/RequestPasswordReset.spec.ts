import { describe, it, expect, vi, beforeEach } from "vitest";
import { RequestPasswordReset } from "../../../src/modules/auth/application/RequestPasswordReset";
import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";

describe("RequestPasswordReset", () => {
  let mockRepository: AuthRepository;
  let requestPasswordReset: RequestPasswordReset;

  beforeEach(() => {
    mockRepository = {
      login: vi.fn(),
      register: vi.fn(),
      verify: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
      verifyChangePassword: vi.fn(),
    };

    requestPasswordReset = new RequestPasswordReset(mockRepository);
  });

  //  Este test verifica que el caso de uso llame correctamente
  // al repository enviando el email y la URL del frontend.
  it("should call repository with correct parameters", async () => {
    const email = "tincu@test.com";
    const frontBaseUrl = "http://localhost:5173";

    (mockRepository.requestPasswordReset as any).mockResolvedValue(undefined);

    const result = await requestPasswordReset.execute(email, frontBaseUrl);

    expect(mockRepository.requestPasswordReset).toHaveBeenCalledOnce();
    expect(mockRepository.requestPasswordReset).toHaveBeenCalledWith({
      email,
      frontBaseUrl,
    });

    expect(result).toBeUndefined();
  });

  //  Este test verifica que si el repository falla
  // (por ejemplo usuario no encontrado),
  // el caso de uso propague correctamente el error.
  it("should propagate error if repository fails", async () => {
    const email = "tincu@test.com";
    const frontBaseUrl = "http://localhost:5173";

    (mockRepository.requestPasswordReset as any).mockRejectedValue(
      new Error("User not found"),
    );

    await expect(
      requestPasswordReset.execute(email, frontBaseUrl),
    ).rejects.toThrow("User not found");

    expect(mockRepository.requestPasswordReset).toHaveBeenCalledOnce();
  });
});
