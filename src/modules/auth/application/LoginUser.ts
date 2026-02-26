import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class LoginUser {
  // constructor(private repository: AuthRepository) {}
  private repository: AuthRepository

  constructor(repository: AuthRepository){
    this.repository = repository
  }

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    return this.repository.login({ email, password });
  }
}
