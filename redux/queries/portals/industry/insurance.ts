import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const insuranceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getIndustryInsuranceDocs: builder.query<any, number | undefined>({
        query: (userId) => {
            const params = userId ? { userId } : null
            return {
                url: `${PREFIX}/insurance-document/type/list`,
                params,
            }
        },
        providesTags: ['Insurance-Type'],
    }),
    requiredIndustryInsuranceType: builder.mutation<
        any,
        { docId: number; userId?: number }
    >({
        query: ({ docId, userId }) => {
            const params = userId ? { userId } : null
            return {
                url: `${PREFIX}/insurance/document/type/${docId}/add`,
                params,
                method: 'POST',
            }
        },
        invalidatesTags: ['Insurance-Type'],
    }),
})
