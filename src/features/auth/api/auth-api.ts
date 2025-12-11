import api from "@/shared/api/api-base";
import { IAuthResponse, ILoginRequest, IRegisterRequest } from "./types";

export const authApi = {
  login: (data: ILoginRequest) => api.post<IAuthResponse>("/auth/login", data),

  register: (data: IRegisterRequest) => api.post<IAuthResponse>("/auth/register", data),

  getCurrentUser: () => api.get<IAuthResponse>("/users/me"),

  logout: () => api.post<void>("/auth/logout"),
};
