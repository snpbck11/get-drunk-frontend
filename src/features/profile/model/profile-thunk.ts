import { createAppThunk } from "@/shared/lib/create-app-thunk";
import { profileApi } from "../api/profile-api";

export const getUserOrganizations = createAppThunk("user/organizations", async () => {
  const result = await profileApi.getMyOrganizations();
  return result.data;
});

