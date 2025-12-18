import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/admin/users",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),



    getTuitions: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/api/admin/tutions?${queryString}`,
          method: "GET"
        };
      },
      providesTags: ["Tuition"]
    }),


    getTuitionById: builder.query({
      query: (id) => ({
        url: `/api/admin/tutions/${id}`,
        method: "GET"
      }),
      providesTags: ["Tuition"]
    }),


    approveTuition: builder.mutation({
      query: (id) => ({
        url: `/api/admin/tutions/${id}/approve`,
        method: "PUT"
      }),
      invalidatesTags: ["Tuition"]
    }),


    rejectTuition: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/api/admin/tutions/${id}/reject`,
        method: "PUT",
        body: { reason }
      }),
      invalidatesTags: ["Tuition"]
    }),


    updateTuitionStatus: builder.mutation({
      query: ({ id, status, reason }) => ({
        url: `/api/admin/tutions/${id}/status`,
        method: "PUT",
        body: { status, reason }
      }),
      invalidatesTags: ["Tuition"]
    }),


    deleteTuition: builder.mutation({
      query: (id) => ({
        url: `/api/admin/tutions/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Tuition"]
    }),


    getRevenueSummary: builder.query({
      query: () => '/api/admin/revenue',
    }),

    getTransactions: builder.query({
      query: (params = {}) => ({
        url: '/api/admin/transactions',
        params
      })
    }),

    getRevenueTrend: builder.query({
      query: (params = {}) => ({
        url: '/api/admin/revenue-trend',
        params
      })
    }),

    exportReport: builder.mutation({
      query: (data) => ({
        url: '/api/admin/export',
        method: 'POST',
        body: data
      })
    })




  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetTuitionsQuery,
  useGetTuitionByIdQuery,
  useApproveTuitionMutation,
  useRejectTuitionMutation,
  useUpdateTuitionStatusMutation,
  useDeleteTuitionMutation,
  useGetRevenueSummaryQuery,
  useGetTransactionsQuery,
  useGetRevenueTrendQuery,
  useExportReportMutation
} = adminApi
