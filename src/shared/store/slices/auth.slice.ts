import { IUser } from "@/entities/user";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/features/auth";
import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  user: IUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    // Current user
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = true;
    });
  },
});

export default authSlice.reducer;
