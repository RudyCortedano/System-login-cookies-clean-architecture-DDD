import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class VerifyChangePassword {
  // constructor(private repository: AuthRepository) {}
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async execute(code: string) {
    return this.repository.verifyChangePassword(code);
  }
}
