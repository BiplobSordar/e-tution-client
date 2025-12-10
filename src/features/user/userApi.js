import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
  
    getMyProfile: builder.query({
      query: (id) => `/api/users`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),


    updateMyProfile: builder.mutation({
      query: ( data ) => ({
        url: `/api/users`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error,) => [
        { type: "User" },
      ],
    }),
    uploadAvatar: builder.mutation({
      query: (avatarBase64) => ({
        url: "/api/users/avatar",
        method: "POST",
        body: { avatarBase64 },
      }),
    }),
  }),
});

export const {
 
 useUpdateMyProfileMutation,
  useGetMyProfileQuery,
  useUploadAvatarMutation
} = userApi;
