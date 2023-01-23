import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const setScheduleEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    setSchedule: builder.mutation<any, any | null>({
        query: (body: any) => {
            return {
                url: `${PREFIX}/schedule/add`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['SetSchedule'],
    }),
    setScheduledList: builder.query<any, void>({
        query: () => `${PREFIX}/availabilities/list`,
        providesTags: ['SetSchedule'],
    }),
})
