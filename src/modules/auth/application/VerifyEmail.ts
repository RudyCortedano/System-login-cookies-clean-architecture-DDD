import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class VerifyEmail {
  // constructor(private repository: AuthRepository) {}
  private repository: AuthRepository;

  constructor(repository: AuthRepository){
    this.repository = repository
  }

  async execute(code: string) {
    if (!code) throw new Error("Invalid code");
    return this.repository.verify(code);
  }
}
