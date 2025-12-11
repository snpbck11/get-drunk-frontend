import { createAppThunk } from "@/shared/lib/create-app-thunk";
import { organizationsApi } from "../api/organizations-api";

export const getOrganizations = createAppThunk("/organizations", async (page: number) => {
  const result = await organizationsApi.getByPage({ page, limit: 12 });
  return result.data;
});

export const getOrganizationByInn = createAppThunk(
  "/organizations/searchByInn",
  async (inn: number) => {
    const result = await organizationsApi.findByInn({ inn });
    return result.data;
  }
);
