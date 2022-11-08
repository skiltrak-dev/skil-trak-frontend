import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginCredentials } from '@types'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/auth`,
    }),
    tagTypes: ['Sectors'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginCredentials) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
        }),

        registerIndustry: builder.mutation({
            query: (body) => ({
                url: `auth/register/industry`,
                method: 'POST',
                body,
            }),
        }),

        registerRto: builder.mutation({
            query: (body) => ({
                url: `auth/register/rto`,
                method: 'POST',
                body,
            }),
        }),

        registerStudent: builder.mutation({
            query: (body) => ({
                url: `auth/register/student`,
                method: 'POST',
                body,
            }),
        }),

        getSectors: builder.query({
            query: () => 'sectors',
            providesTags: ['Sectors'],
        }),

        checkEmail: builder.mutation({
            query: (body) => ({
                url: `auth/email-exists`,
                method: 'POST',
                body,
            }),
        }),

        checkStatus: builder.mutation({
            query: () => ({
                url: `user-status`,
                method: 'POST',
            }),
        }),
    }),
})

const {
    useLoginMutation,
    useCheckStatusMutation,
    useCheckEmailMutation,
    useGetSectorsQuery,
    useRegisterIndustryMutation,
    useRegisterRtoMutation,
    useRegisterStudentMutation,
} = authApi

export const AuthApi = {
    useLoginMutation,
    useCheckStatusMutation,
    useCheckEmailMutation,
    useGetSectorsQuery,
    useRegisterIndustryMutation,
    useRegisterRtoMutation,
    useRegisterStudentMutation,
}
