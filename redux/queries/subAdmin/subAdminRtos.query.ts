import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminRtosApi = createApi({
    reducerPath: 'subAdminRtosApi',
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
    tagTypes: ['SubAdminRtos'],
    endpoints: (builder) => ({

        getSubAdminRtos: builder.query<any[], void>({
            query: () => {
                return {
                    url: 'subadmin/rtos/list',
                }
            },
            providesTags: ['SubAdminRtos'],
        }),
        getSubAdminRtosStudents: builder.query<any[], string>({
            query: (id) => {
                console.log("rto students", id);
                
                return {
                    url: `subadmin/rto/students/list/${id}`,
                    params: {id}
                }
            },
            providesTags: ['SubAdminRtos'],
        }),
        getSubAdminRtoAppointments: builder.query<any[], string>({
            query: (id) => {
                console.log("rto appointments", id);
                return {
                    url: `subadmin/rto/appointments/${id}`,
                    params: {id}
                }
            },
            providesTags: ['SubAdminRtos'],
        }),

        updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
            query: ({id, status}:any) => {
                return {
                    url: `subadmin/student/update-status/${id}`,
                    method: 'PATCH',
                    body: {status}
                }
            },
            invalidatesTags: ['SubAdminRtos'],
        }),
       
    }),
})

export const {
    useGetSubAdminRtosQuery,
    useGetSubAdminRtosStudentsQuery,
    useGetSubAdminRtoAppointmentsQuery, 
    useUpdateSubAdminRtoStudentStatusMutation
} = subAdminRtosApi