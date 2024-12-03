import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const insuranceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getIndustryInsuranceDocs: builder.query<any, void>({
        query: () => `${PREFIX}/insurance-document/type/list`,
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
