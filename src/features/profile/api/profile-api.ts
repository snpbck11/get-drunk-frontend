import { IOrganization } from "@/entities/organization";
import api from "@/shared/api/api-base";

export const profileApi = {
  getMyOrganizations: () => api.get<IOrganization[]>("/organizations/my"),
};
