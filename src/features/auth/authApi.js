
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
   
    registerUser: builder.mutation({
      query: ({ idToken, body }) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
        firebaseToken: idToken, 
      }),
    }),
    refreshToken: builder.mutation({
      query: ({firebaseToken}) => ({
        url: "/api/auth/refresh-token",
        method: "POST",
        withCredentials: true,  
         firebaseToken
      
       
      }),
    }),


    loginUser: builder.mutation({
      query: ({ idToken }) => ({
        url: "/api/auth/login",
        method: "POST",
        firebaseToken: idToken,
      }),
    }),

 
    firebaseLogin: builder.mutation({
      query: ({ idToken }) => ({
        url: "/api/auth/firebase-login",
        method: "POST",
        body: { provider: "google", role: "student" },
        firebaseToken: idToken, 
      }),
    }),

 


 
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFirebaseLoginMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation
} = authApi;
