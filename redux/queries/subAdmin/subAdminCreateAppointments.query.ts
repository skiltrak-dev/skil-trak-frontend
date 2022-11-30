import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminCreateAppointmentApi = createApi({
    reducerPath: 'subAdminCreateAppointmentApi',
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
    tagTypes: ['Appointment'],
    endpoints: (builder) => ({
        searchUser: builder.query<any, any | null>({
            query: (params: any) => {
                return {
                    url: `appointments/user/search`,
                    params,
                }
            },
            providesTags: ['Appointment'],
        }),
    }),
})

export const { useSearchUserQuery } = subAdminCreateAppointmentApi
