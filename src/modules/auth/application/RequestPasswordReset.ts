import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class RequestPasswordReset {
  // constructor(private repository: AuthRepository) {}
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async execute(email: string, frontBaseUrl: string) {
    return this.repository.requestPasswordReset({ email, frontBaseUrl });
  }
}
