import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    LoginCredentials,
    Packages,
    Student,
    StudentFormQueryType,
} from '@types'

const PREFIX = 'auth/'
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
    }),
    tagTypes: ['Sectors', 'Packages', 'Rtos'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginCredentials) => ({
                url: `${PREFIX}login`,
                method: 'POST',
                body,
            }),
        }),

        registerIndustry: builder.mutation<any, any>({
            query: (body) => ({
                url: `industries`,
                method: 'POST',
                body,
            }),
        }),
        

        registerRto: builder.mutation<any, any>({
            query: (body) => ({
                url: `rtos`,
                method: 'POST',
                body,
            }),
        }),

        registerStudent: builder.mutation<Student, StudentFormQueryType>({
            query: (body) => ({
                url: `students`,
                method: 'POST',
                body,
            }),
        }),

        getSectors: builder.query<any, any>({
            query: () => `${PREFIX}sectors`,
            providesTags: ['Sectors'],
        }),
        getRtos: builder.query<any, any>({
            query: () => `${PREFIX}rtos`,
            providesTags: ['Rtos'],
        }),
        rtoPackages: builder.query<Packages[], void>({
            query: () => `${PREFIX}rto-packages`,
            providesTags: ['Packages'],
        }),

        checkEmail: builder.mutation<any, any>({
            query: (body) => ({
                url: `${PREFIX}email-exists`,
                method: 'POST',
                body,
            }),
        }),

        checkAbn: builder.mutation<any, any>({
            query: (body) => ({
                url: `industries/abn/validate`,
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
    useCheckAbnMutation,
    useGetSectorsQuery,
    useCheckStatusMutation,
    useCheckEmailMutation,
    useRegisterIndustryMutation,
    useRegisterRtoMutation,
    useRegisterStudentMutation,
    useRtoPackagesQuery,
    useGetRtosQuery,
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
    useRtos: useGetRtosQuery,

    useAbn: useCheckAbnMutation,
}
