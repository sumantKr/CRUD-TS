import { baseApi } from "../baseApi";


const auth_api = "/auth"

const dummyCreds = {
    "email": "sumant.kumar@jaspercolin.com",
    "name": "sumant kumar",
    "password": "password"
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: () => {
                return {
                    url: `${auth_api}/login`,
                    method: "POST",
                    body: dummyCreds,
                    credentials: "include"
                }
            }
        }),
        logout: build.mutation({
            query: () => {
                return {
                    url: `${auth_api}/logout`,
                    method: "POST",
                    credentials: "include"
                }
            }
        }),
    }),
})

export const { useLoginMutation, useLogoutMutation } = authApi