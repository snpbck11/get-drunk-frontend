import { IOrganization } from "@/entities/organization";
import api from "@/shared/api/api-base";
import {
  IGetOrganizationByInnResponse,
  IGetOrganizationsRequest,
  IGetOrganizationsResponse,
} from "./types";

export const organizationsApi = {
  getByPage: ({ page, limit }: IGetOrganizationsRequest) =>
    api.get<IGetOrganizationsResponse>(`/organizations?page=${page}&limit=${limit}`),

  findByInn: (inn: number) =>
    api.get<IGetOrganizationByInnResponse>(`/organizations/search/inn/${inn}`),

  createOrganization: ({ inn, email }: { inn: number; email: string }) =>
    api.post<IOrganization>("/organizations/create", { inn, email }),
};
