import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos/'
export const rtoIndustryCreditsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    createIndustryCredit: builder.mutation<
        any,
        {
            cost: number
            token: string
            network: 'shareable' | 'private'
        }
    >({
        query: (body) => ({
            url: `${PREFIX}network-update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['RTOIndustryCredits'],
    }),
})
