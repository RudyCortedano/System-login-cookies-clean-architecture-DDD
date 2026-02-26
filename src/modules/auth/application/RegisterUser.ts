import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class RegisterUser {
  // constructor(private repository: AuthRepository) {}
  private repository: AuthRepository;

  constructor(repository: AuthRepository){
    this.repository = repository
  }

  async execute(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    if (!data.email.includes("@")) {
      throw new Error("Invalid email");
    }

    return this.repository.register(data);
  }
}
