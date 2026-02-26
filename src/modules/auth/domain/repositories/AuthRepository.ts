import type { User } from "../entities/User";

export interface AuthRepository {
  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User>;

  login(data: {
    email: string;
    password: string;
  }): Promise<User>;

  verify(code: string): Promise<void>;

  requestPasswordReset(data: {
    email: string;
    frontBaseUrl: string;
  }): Promise<void>;

  resetPassword(code: string, password: string): Promise<void>;

  verifyChangePassword(code: string): Promise<void>;
}
