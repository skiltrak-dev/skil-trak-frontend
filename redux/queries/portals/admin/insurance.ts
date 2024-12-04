import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const insuranceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getInsuranceType: builder.query<any, void>({
        query: () => `${PREFIX}/insurance-document/type/list`,
        providesTags: ['Insurance-Type'],
    }),
    getRtoByInsuranceType: builder.query<any, number>({
        query: (id) => `${PREFIX}/insurance-document/type/${id}`,
        providesTags: ['Insurance-Type'],
    }),
    getIndustriesByInsuranceType: builder.query<any, number>({
        query: (id) => `${PREFIX}/insurance-document/type/${id}/industries`,
        providesTags: ['Insurance-Type'],
    }),

    addInsuranceType: builder.mutation<any, { title: string }>({
        query: (body) => ({
            url: `${PREFIX}/insurance-document/type/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Insurance-Type'],
    }),
})
