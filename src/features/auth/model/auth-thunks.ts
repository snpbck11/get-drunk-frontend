import { createAppThunk } from "@/shared/lib/create-app-thunk";
import { authApi } from "../api/auth-api";
import { ILoginRequest, IRegisterRequest } from "../api/types";

export const loginUser = createAppThunk("auth/login", async (credentials: ILoginRequest) => {
  const response = await authApi.login(credentials);
  return response.data.user;
});

export const registerUser = createAppThunk(
  "auth/register",
  async (credentials: IRegisterRequest) => {
    const response = await authApi.register(credentials);
    return response.data.user;
  }
);

export const getCurrentUser = createAppThunk("users/me", async () => {
  const response = await authApi.getCurrentUser();
  return response.data.user;
});

export const logoutUser = createAppThunk("auth/logout", async () => {
  await authApi.logout();
});
