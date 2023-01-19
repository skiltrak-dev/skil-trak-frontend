import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminIndustriesApi = createApi({
    reducerPath: 'subAdminIndustriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['SubAdminIndustries'],
    endpoints: (builder) => ({
        getSubAdminIndustries: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'subadmin/industries/list',
                    params,
                }
            },
            providesTags: ['SubAdminIndustries'],
        }),
        getSubAdminIndustriesProfile: builder.query<any, number>({
            query: (id) => {
                return {
                    url: `subadmin/industry/profile/${id}`,
                    params: { id },
                }
            },
            providesTags: ['SubAdminIndustries'],
        }),
        getSubAdminIndustryStudents: builder.query<any, string>({
            query: (id) => {
                return {
                    url: `subadmin/industry/students/list/${id}`,
                }
            },
            providesTags: ['SubAdminIndustries'],
        }),

        // updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
        //     query: ({id, status}:any) => {
        //         return {
        //             url: `subadmin/student/update-status/${id}`,
        //             method: 'PATCH',
        //             body: {status}
        //         }
        //     },
        //     invalidatesTags: ['SubAdminRtos'],
        // }),
    }),
})

export const {
    useGetSubAdminIndustriesQuery,
    useGetSubAdminIndustryStudentsQuery,
    useGetSubAdminIndustriesProfileQuery,
} = subAdminIndustriesApi
