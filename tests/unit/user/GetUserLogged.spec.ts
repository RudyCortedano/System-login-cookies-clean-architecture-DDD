import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetUserLogged } from "../../../src/modules/user/application/GetUserLogged";
import type { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import type { User } from "@/modules/user/domain/entities/User";

describe("GetUserLogged", () => {
  let mockRepository: UserRepository;
  let getUserLogged: GetUserLogged;

  beforeEach(() => {
    mockRepository = {
      getUserLogged: vi.fn(),
    };

    getUserLogged = new GetUserLogged(mockRepository);
  });

  //  Este test verifica que el caso de uso
  // llame correctamente al repository y retorne
  // los datos del usuario logueado.
  it("should return logged user data", async () => {
    const mockUser: User = {
      id: "user-123",
      email: "tincu@test.com",
      firstName: "Tincu",
      lastName: "Pareda",
    };

    (mockRepository.getUserLogged as any).mockResolvedValue(mockUser);

    const result = await getUserLogged.execute();

    expect(mockRepository.getUserLogged).toHaveBeenCalledOnce();
    expect(result).toEqual(mockUser);
  });

  //  Este test verifica que si el repository lanza un error,
  // el caso de uso lo propague correctamente.
  it("should propagate error if repository fails", async () => {
    (mockRepository.getUserLogged as any).mockRejectedValue(
      new Error("Unauthorized")
    );

    await expect(getUserLogged.execute()).rejects.toThrow("Unauthorized");

    expect(mockRepository.getUserLogged).toHaveBeenCalledOnce();
  });
});
