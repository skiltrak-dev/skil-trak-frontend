import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const setScheduleApi = createApi({
    reducerPath: 'setScheduleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['SetSchedule'],
    endpoints: (builder) => ({
        setSchedule: builder.mutation<any, any | null>({
            query: (body: any) => {
                return {
                    url: `schedule/add`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SetSchedule'],
        }),
        setScheduledList: builder.query<any, void>({
            query: () => ({
                url: `availabilities/list`,
            }),
            providesTags: ['SetSchedule'],
        }),
    }),
})

export const { useSetScheduleMutation, useSetScheduledListQuery } =
    setScheduleApi
