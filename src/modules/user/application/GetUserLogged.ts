import type { User } from "../domain/entities/User";
import type { UserRepository } from "../domain/repositories/UserRepository";

export class GetUserLogged {
  // constructor(private repository: UserRepository) {}
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async execute(): Promise<User> {
    return this.repository.getUserLogged();
  }
}
