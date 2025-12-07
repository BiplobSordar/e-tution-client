
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, clearUser } from "../features/auth/authSlice";


export const baseQueryWithReauth = async (args, api, extraOptions) => {
 
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = getState().auth.accessToken;

           
            if (token && endpoint !== "/api/auth/login" && endpoint !== "/api/auth/register") {
                headers.set("Authorization", `Bearer ${token}`);
            }

          
            if (endpoint === "/api/auth/login" || '/api/auth/firebase-login' || '/api/auth/register' || "/api/auth/refresh-token") {
                const firebaseToken = args.firebaseToken; 
                if (firebaseToken) {
                    headers.set("Authorization", `Bearer ${firebaseToken}`);
                }
            }


            return headers;
        },
    });

   
    let result = await rawBaseQuery(args, api, extraOptions);

   
    if (result.error && result.error.status === 401) {
      
        const refreshResult = await rawBaseQuery("/api/auth/refresh-token", api, extraOptions);

        if (refreshResult.data?.accessToken) {
         
            api.dispatch(setAccessToken(refreshResult.data.accessToken));

        
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
         
            api.dispatch(clearUser());
        }
    }

    return result;
};
