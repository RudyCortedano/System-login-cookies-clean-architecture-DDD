import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class ResetPassword {
  // constructor(private repository: AuthRepository) {}
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async execute(code: string, password: string) {
    if (password.length < 6) {
      throw new Error("Password too short");
    }

    return this.repository.resetPassword(code, password);
  }
}
