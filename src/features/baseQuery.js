
// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setAccessToken, clearUser } from "../features/auth/authSlice";


// export const baseQueryWithReauth = async (args, api, extraOptions) => {

//     const rawBaseQuery = fetchBaseQuery({
//         baseUrl: import.meta.env.VITE_API_BASE_URL,
//         credentials: "include",
//         prepareHeaders: (headers, { getState, endpoint }) => {
//             const token = getState().auth.accessToken;


//             if (token && endpoint !== "/api/auth/login" && endpoint !== "/api/auth/register") {
//                 headers.set("Authorization", `Bearer ${token}`);
//             }


//             if (endpoint === "/api/auth/login" ||
//                 endpoint === "/api/auth/firebase-login" ||
//                 endpoint === "/api/auth/register" ) {
//                 const firebaseToken = args.firebaseToken;
//                 if (firebaseToken) {
//                     headers.set("Authorization", `Bearer ${firebaseToken}`);
//                 }
//             }


//             return headers;
//         },
//     });


//     let result = await rawBaseQuery(args, api, extraOptions);


//     if (result.error && result.error.status === 401) {

//         const refreshResult = await rawBaseQuery("/api/auth/refresh-token", api, extraOptions);

//         if (refreshResult.data?.accessToken) {

//             api.dispatch(setAccessToken(refreshResult.data.accessToken));


//             result = await rawBaseQuery(args, api, extraOptions);
//         } else {

//             api.dispatch(clearUser());
//         }
//     }

//     return result;
// };







import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, clearUser } from "../features/auth/authSlice";

const AUTH_URLS = [
  "/api/auth/login",
  "/api/auth/firebase-login",
  "/api/auth/register",
];

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;


    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {

  const url =
    typeof args === "string" ? args : args?.url;


  if (AUTH_URLS.some((path) => url?.includes(path))) {
    const firebaseToken = args?.firebaseToken;
    if (firebaseToken) {
      args = {
        ...(typeof args === "string" ? { url: args } : args),
        headers: {
          ...(args.headers || {}),
          Authorization: `Bearer ${firebaseToken}`,
        },
      };
    }
  }

  let result = await rawBaseQuery(args, api, extraOptions);


  if (result?.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      {
        url: "/api/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.accessToken) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken));
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUser());
    }
  }

  return result;
};
