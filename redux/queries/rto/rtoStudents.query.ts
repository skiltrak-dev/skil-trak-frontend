import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const rtoStudentsApi = createApi({
    reducerPath: 'rtoStudentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/rtos/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentAppointments'],
    endpoints: (builder) => ({
        getRtoStudents: builder.query<any, any>({
            query: (params) => {
                return {
                    url: 'students/list',
                    params,
                }
            },
            providesTags: ['StudentAppointments'],
        }),
    }),
})

export const { useGetRtoStudentsQuery } = rtoStudentsApi
