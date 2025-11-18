import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos/'
export const approvalRequestEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    approvalRequestDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}workplace-approval/${id}/get-details`,
        providesTags: ['RTO'],
    }),
})
