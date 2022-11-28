import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginCredentials, Packages } from '@types'

const PREFIX = 'auth/'
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
    }),
    tagTypes: ['Sectors', 'Packages'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginCredentials) => ({
                url: `${PREFIX}login`,
                method: 'POST',
                body,
            }),
        }),

        registerIndustry: builder.mutation({
            query: (body) => ({
                url: `${PREFIX}register/industry`,
                method: 'POST',
                body,
            }),
        }),

        registerRto: builder.mutation({
            query: (body) => ({
                url: `rtos`,
                method: 'POST',
                body,
            }),
        }),

        registerStudent: builder.mutation({
            query: (body) => ({
                url: `${PREFIX}register/student`,
                method: 'POST',
                body,
            }),
        }),

        getSectors: builder.query({
            query: () => `${PREFIX}sectors`,
            providesTags: ['Sectors'],
        }),

        rtoPackages: builder.query<Packages[], void>({
            query: () => `${PREFIX}rto-packages`,
            providesTags: ['Packages'],
        }),

        checkEmail: builder.mutation({
            query: (body) => ({
                url: `${PREFIX}email-exists`,
                method: 'POST',
                body,
            }),
        }),

        checkStatus: builder.mutation<any, number>({
            query: (id) => ({
                url: `${PREFIX}user-status/${id}`,
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
    useRtoPackagesQuery,
} = authApi

export const AuthApi = {
    useLogin: useLoginMutation,

    useStatusCheck: useCheckStatusMutation,
    useEmailCheck: useCheckEmailMutation,

    useSectors: useGetSectorsQuery,
    usePackages: useRtoPackagesQuery,

    useRegisterIndustry: useRegisterIndustryMutation,
    useRegisterRto: useRegisterRtoMutation,
    useRegisterStudent: useRegisterStudentMutation,
}
