import { ref } from "vue";
import { AuthRepositoryImpl } from "../../infrastructure/AuthRepositoryImpl";
import { LoginUser } from "../../application/LoginUser";
import { RegisterUser } from "../../application/RegisterUser";
import { VerifyEmail } from "../../application/VerifyEmail";
import { RequestPasswordReset } from "../../application/RequestPasswordReset";
import { ResetPassword } from "../../application/ResetPassword";
import { VerifyChangePassword } from "../../application/VerifyChangePassword";

export function useAuth() {
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const hasError = ref(false);
  const infoApi = ref<boolean>(false)

  const user = ref<any>(null);
  const isAuthorizePasswordChange = ref(false);
  const isAuthorizeVerify = ref(false)

  const repository = new AuthRepositoryImpl();

  const loginUseCase = new LoginUser(repository);
  const registerUseCase = new RegisterUser(repository);
  const verifyUseCase = new VerifyEmail(repository);
  const requestResetUseCase = new RequestPasswordReset(repository);
  const resetPasswordUseCase = new ResetPassword(repository);
  const verifyChangePasswordUseCase = new VerifyChangePassword(repository);

  const execute = async (callback: () => Promise<any>) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      infoApi.value = false
      return await callback();
    } catch (error: any) {
      infoApi.value = true
      hasError.value = true;
      errorMessage.value =
        error?.response?.data?.message || error.message || "Unexpected error";
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const login = (email: string, password: string) =>
    execute(async () => {
      user.value = await loginUseCase.execute(email, password);
    });

  const register = (data: any) =>
    execute(async () => {
      user.value = await registerUseCase.execute(data);
    });

  // const verify = (code: string) => execute(() => verifyUseCase.execute(code));
  const verify = (code: string) => execute(async () => {
    await execute (async () => {
      await verifyUseCase.execute(code);
      isAuthorizeVerify.value = true
    })
  })

  const requestPasswordReset = (email: string, frontBaseUrl: string) =>
    execute(() => requestResetUseCase.execute(email, frontBaseUrl));

  const resetPassword = (code: string, password: string) =>
    execute(() => resetPasswordUseCase.execute(code, password));

  const verifyChangePassword = async (code: string) => {
    await execute(async () => {
      await verifyChangePasswordUseCase.execute(code);
      isAuthorizePasswordChange.value = true;
    });
  };

  const logout = () =>
    execute(async () => {
      await repository.logout();
      user.value = null;
    });

  return {
    user,
    loading,
    errorMessage,
    isAuthorizePasswordChange,
    login,
    register,
    verify,
    requestPasswordReset,
    resetPassword,
    verifyChangePassword,
    hasError,
    logout,
    infoApi,
    isAuthorizeVerify,
  };
}
