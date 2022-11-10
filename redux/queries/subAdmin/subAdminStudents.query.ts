import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminStudentsApi = createApi({
    reducerPath: 'subAdminStudentsApi',
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
    tagTypes: ['SubAdminStudents'],
    endpoints: (builder) => ({

        getSubAdminStudents: builder.query<any[], void>({
            query: () => {
                return {
                    url: 'subadmin/students/list-all',
                }
            },
            providesTags: ['SubAdminStudents'],
        }),
        getSubAdminMyRto: builder.query<any[], string>({
            query: (id) => {
                return {
                    url: `subadmin/student/view/${id}`,
                    params: {id}

                }
            },
            providesTags: ['SubAdminStudents'],
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
    useGetSubAdminStudentsQuery,
    useGetSubAdminMyRtoQuery,
    
} = subAdminStudentsApi