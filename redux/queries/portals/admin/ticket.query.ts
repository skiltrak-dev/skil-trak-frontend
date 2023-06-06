import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const ticketEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    createTicket: builder.mutation<any, any>({
        query: ({ workplaceId, courseId }) => ({
            url: `${PREFIX}/workplace-request/assign-course/${workplaceId}/${courseId}`,
            method: 'POST',
        }),
        invalidatesTags: ['Workplaces'],
    }),
})
