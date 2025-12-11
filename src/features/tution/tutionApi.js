import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const tutionApi = createApi({
  reducerPath: "tutionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tuition"],
  endpoints: (builder) => ({

    createTuition: builder.mutation({
      query: (data) => ({
        url: "/api/tutions/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tuition"],
    }),

   getTuitions: builder.query({
      query: ({ page = 1, limit = 10, city, grade, subject, tuitionType }) => {
        const params = {};

        if (page) params.page = page;
        if (limit) params.limit = limit;
        if (city) params.city = city;
        if (grade) params.grade = grade;
        if (subject) params.subject = subject;
        if (tuitionType) params.tuitionType = tuitionType;

        return {
          url: "/api/tutions",
          method: "GET",
          params, // RTK Query automatically converts to query string
        };
      },
      providesTags: ["Tuitions"]
    }),
  }),
});

export const { useGetTuitionsQuery, useCreateTuitionMutation } = tutionApi;
