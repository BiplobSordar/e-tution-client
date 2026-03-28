import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const guardianApi = createApi({
  reducerPath: "guardianApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
     getGuardianDashboard: builder.query({
      query: () =>  ({
        url: "/api/guardian/",
        method: "GET",
      }),
      
    }),
     getGuardianStudents: builder.query({
      query: () =>  ({
        url: "/api/guardian/students",
        method: "GET",
      }),
      
    }),
     createGuardianRequest: builder.mutation({
      query: (body) => ({
        url: '/api/guardian/guardian-requests',
        method: 'POST',
        body,
      }),
      
    }),
    getStudentProgress: builder.query({
      query: (body) => ({
        url: '/api/guardian/students/:studentId/progress',
        method: 'GET',
      
      }),
      
    }),
    getGuardianRequests: builder.query({
      query: () =>  ({
        url: "/api/guardian/guardian-requests",
        method: "GET",
      }),
    }),
     updateRequestStatus: builder.mutation({
      query: ({ requestId, status }) => ({
        url: `/api/guardian/guardian-requests/${requestId}`,
        method: 'PUT',
        body: { status },
      }),
    
    }),
    
  }),
});

export const { useGetGuardianRequestsQuery ,useUpdateRequestStatusMutation ,useGetGuardianDashboardQuery,useGetGuardianStudentsQuery,useCreateGuardianRequestMutation,useGetStudentProgressQuery} = guardianApi;