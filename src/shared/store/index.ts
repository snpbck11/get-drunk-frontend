import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import organizationsReducer from "./slices/organizations.slice";
import userOrganizationsReducer from "./slices/user-organizations.slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      organizations: organizationsReducer,
      userOrganizations: userOrganizationsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
