import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos/'
export const availableServicesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getPremiumFeatures: builder.query<any, void>({
        query: () => `${PREFIX}premium/features-list`,
        providesTags: ['RTO'],
    }),

    submitAvailableServiceForm: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}send-inquiry`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTO'],
    }),

    // Add custom course requirements
})
