import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const insuranceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getIndustryInsuranceDocs: builder.query<any, number | undefined>({
        query: (userId) => {
            const params = userId ? { userId } : null
            console.log({ params })
            return {
                url: `${PREFIX}/insurance-document/type/list`,
                params,
            }
        },
        providesTags: ['Insurance-Type'],
    }),
    requiredIndustryInsuranceType: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/insurance/document/type/${id}/add`,
            method: 'POST',
        }),
        invalidatesTags: ['Insurance-Type'],
    }),
})
