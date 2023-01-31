import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const volunteerEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    requestAVolunteer: builder.mutation<any, void>({
        query: (params) => ({
            url: `${PREFIX}/volunteer/request`,
            method: 'POST',
        }),
        invalidatesTags: ['RequestAVolunteer'],
    }),
})
