import { IOrganization } from "@/entities/organization";
import { getOrganizations } from "@/features/organizations";
import { createSlice } from "@reduxjs/toolkit";

interface IOrganizationsState {
  organizations: IOrganization[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrganizationsState = {
  organizations: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Orgs pagination
    builder
      .addCase(getOrganizations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.organizations = [...state.organizations, ...action.payload.items];
        state.page += 1;
        state.isLoading = false;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export default organizationsSlice.reducer;
