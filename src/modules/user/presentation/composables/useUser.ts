import { ref } from "vue";
import { UserRepositoryImpl } from "../../infrastructure/UserRepositoryImpl";
import { GetUserLogged } from "../../application/GetUserLogged";
import type { User } from "../../domain/entities/User";

const repository = new UserRepositoryImpl();
const getUserLoggedUseCase = new GetUserLogged(repository);

export function useUser() {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadUser = async () => {
    try {
      loading.value = true;
      error.value = null;
      user.value = await getUserLoggedUseCase.execute();
    } catch (err: any) {
      error.value = "Error cargando usuario";
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    loadUser,
  };
}
