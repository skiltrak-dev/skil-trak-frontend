import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const rtosEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllRtos: builder.query<any, void>({
        query: () => `filter/rtos/all`,
        providesTags: ['RTO'],
    }),
    getFilterSubAdminRtos: builder.query<any, void>({
        query: () => `subadmin/rtos/list/all`,
        providesTags: ['RTO'],
    }),
    getRtosList: builder.query<any, void>({
        query: () => `shared/rtos/list`,
        providesTags: ['RTO'],
    }),
})
