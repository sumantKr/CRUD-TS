import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseApiUrl = "http://127.0.0.1:5500/api/v1"

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        credentials: "include",
    }),
    endpoints: () => ({}),
    reducerPath: baseApiUrl,

})