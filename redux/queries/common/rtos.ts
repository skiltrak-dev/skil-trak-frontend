import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const rtosEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllRtos: builder.query<any, void>({
        query: () => `filter/rtos/all`,
        providesTags: ['RTO'],
    }),
})
