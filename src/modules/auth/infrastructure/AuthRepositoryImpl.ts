import type { AuthRepository } from "../domain/repositories/AuthRepository";
import type { User } from "../domain/entities/User";
import http from "@/shared/infrastructure/http";

export class AuthRepositoryImpl implements AuthRepository {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    const response = await http.post("/auth/register", data);
    return response.data;
  }

  async login(data: { email: string; password: string }): Promise<User> {
    const response = await http.post("/auth/login", data);
    return response.data;
  }

  async verify(code: string): Promise<void> {
    await http.get(`/auth/verify/${code}`);
  }

  async requestPasswordReset(data: {
    email: string;
    frontBaseUrl: string;
  }): Promise<void> {
    await http.post("/auth/reset_password", data);
  }

  async resetPassword(code: string, password: string): Promise<void> {
    await http.post(`/auth/reset_password/${code}`, { password });
  }

  async verifyChangePassword(code: string): Promise<void> {
    await http.get(`/auth/verify_changePassword/${code}`);
  }

  async logout(): Promise<void> {
    await http.post("/auth/logout", {}, { withCredentials: true });
  }
}
