import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Teacher"],
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: ({ page = 1, limit = 12, city, subject, minExperience, maxSalary }) => {
        const params = {};

        if (page) params.page = page;
        if (limit) params.limit = limit;
        if (city) params.city = city;
        if (subject) params.subject = subject;
        if (minExperience) params.minExperience = minExperience;
        if (maxSalary) params.maxSalary = maxSalary;

        return {
          url: "/api/teachers",
          method: "GET",
          params,
        };
      },
      providesTags: ["Teacher"],
    }),
    getMyApplications: builder.query({
      query: () => ({
        url: "/api/teachers/my-applications",
        method: "GET",
      }),
      providesTags: ["MyApplications"],
    }),

    updateMyApplication: builder.mutation({
  query: ({ tuitionId, data }) => ({
    url: `/api/teachers/applications/${tuitionId}`,
    method: "PATCH",
    body: data,
  }),
}),

withdrawMyApplication: builder.mutation({
  query: (tuitionId) => ({
    url: `/api/teachers/applications/${tuitionId}`,
    method: "DELETE",
  }),
}),
 getMyOngoingTuitions: builder.query({
      query: () => ({
        url: "/api/teachers/ongoing-tuitions",
        method: "GET",
      }),
      providesTags: ["OngoingTuitions"],
    }),



  }),
});

export const { useGetTeachersQuery,useGetMyApplicationsQuery ,  useGetMyOngoingTuitionsQuery,useUpdateMyApplicationMutation,
  useWithdrawMyApplicationMutation,} = teacherApi;
