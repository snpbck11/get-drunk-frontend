import { IOrganization } from "@/entities/organization";
import { getUserOrganizations } from "@/features/profile/model/profile-thunk";
import { createSlice } from "@reduxjs/toolkit";

interface IUserOrganizationsState {
  organizations: IOrganization[];
  currentOrganization: IOrganization | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserOrganizationsState = {
  organizations: [],
  currentOrganization: null,
  isLoading: false,
  error: null,
};

const userOrganizationsSlice = createSlice({
  name: "user/organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrganizations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrganizations.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export default userOrganizationsSlice.reducer;
