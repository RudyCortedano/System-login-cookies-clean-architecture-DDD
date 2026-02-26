import http from "@/shared/infrastructure/http";
import type { UserRepository } from "../domain/repositories/UserRepository";
import type { User } from "../domain/entities/User";

export class UserRepositoryImpl implements UserRepository {
  async getUserLogged(): Promise<User> {
    const { data } = await http.get("/user/profile");
    return data;
  }
}
