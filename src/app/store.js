import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { userApi } from "../features/user/userApi";
import { tutionApi } from "../features/tution/tutionApi";
import { teacherApi } from "../features/teacher/teacherApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tutionApi.reducerPath]: tutionApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, tutionApi.middleware, teacherApi.middleware),
});
