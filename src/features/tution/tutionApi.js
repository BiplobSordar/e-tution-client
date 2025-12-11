import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const tutionApi = createApi({
  reducerPath: "tutionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tuition"],
  endpoints: (builder) => ({
    getTuitions: builder.query({
      query: () => "/api/tutions/",
      providesTags: ["Tuition"],
    }),
    getTuition: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Tuition"],
    }),
    createTuition: builder.mutation({
      query: (data) => ({
        url: "/api/tutions/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tuition"],
    }),
  }),
});

export const { useGetTuitionsQuery, useGetTuitionQuery, useCreateTuitionMutation } = tutionApi;
