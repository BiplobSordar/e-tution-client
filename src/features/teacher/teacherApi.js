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

   

  }),
});

export const {useGetTeachersQuery } =teacherApi;
