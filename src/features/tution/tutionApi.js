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
          params,
        };
      },
      providesTags: ["Tuitions"]
    }),


    getTuition: builder.query({
      query: (id) => `/api/tutions/${id}`,
      providesTags: (result, error, id) => [{ type: "Tuition", id }],
    }),
    getMyTuitions: builder.query({
      query: () => '/api/tutions/my-tutions',
      providesTags: ['Tuition'],
    }),
    checkApplicationStatus: builder.query({
      query: (tuitionId) => `/api/tutions/applications/check/${tuitionId}`,
      providesTags: ['Application'],
    }),
    applyForTuition: builder.mutation({
      query: ({ tuitionId, ...data }) => ({
        url: `/api/tutions/${tuitionId}/apply`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { tuitionId }) => [
        { type: 'Tuition', id: tuitionId },
        'Application'
      ],
      transformResponse: (response) => response.data || response,
    }),
    getRecommendedTuitions: builder.query({
      query: ({ page = 1, limit = 10, city, grade, subject, tuitionType }) => {
        const params = {};

        if (page) params.page = page;
        if (limit) params.limit = limit;
        if (city) params.city = city;
        if (grade) params.grade = grade;
        if (subject) params.subject = subject;
        if (tuitionType) params.tuitionType = tuitionType;

        return {
          url: "/api/tutions/recommended",
          method: "GET",
          params,
        };
      },
      providesTags: ["Tuitions"],
    }),
    createCheckoutSession: builder.mutation({
      query: ({ tuitionId, tutorId }) => ({
        url: `/api/tutions/payments/create-checkout-session`,
        method: 'POST',
        body: { tuitionId, tutorId },
      }),

    }),
    rejectTutor: builder.mutation({
      query: ({ tuitionId, tutorId }) => ({
        url: `/api/tutions/reject-tution`,
        method: 'POST',
        body: { tuitionId, tutorId },
      }),


    }),
    getPaidTuitions: builder.query({
      query: () => '/api/tutions/paid-with-payment',
    }),
  }),
});

export const { useGetTuitionsQuery, useCreateTuitionMutation, useGetPaidTuitionsQuery, useCreateCheckoutSessionMutation, useRejectTutorMutation, useGetMyTuitionsQuery, useGetTuitionQuery, useApplyForTuitionMutation, useCheckApplicationStatusQuery, useGetRecommendedTuitionsQuery } = tutionApi;
