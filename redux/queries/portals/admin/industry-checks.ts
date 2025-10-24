import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    PaginatedResponse,
    PaginationWithSearch,
    IndustryCheck,
    IndustryCheckFilterType,
} from '@types'

const PREFIX = 'admin'
export const industryChecksEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    industryChecks: builder.query<
        PaginatedResponse<IndustryCheck>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/industry-checks/list`,
            params,
        }),
        providesTags: ['IndustryChecks'],
    }),

    // List industry checks for a specific sector (for dropdowns)
    industryChecksBySector: builder.query<IndustryCheck[], number>({
        query: (sectorId) => ({
            url: `${PREFIX}/sector/${sectorId}/industry-checks-detail`,
        }),
        providesTags: ['IndustryChecks'],
    }),

    industryCheckDetail: builder.query<IndustryCheck, number>({
        query: (id) => `${PREFIX}/industry-check/${id}/detail`,
        providesTags: ['IndustryChecks'],
    }),

    addIndustryCheck: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/industry-check/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['IndustryChecks'],
    }),

    updateIndustryCheck: builder.mutation<
        IndustryCheck,
        {
            id: number
            name: string
            sector: number
            capacity: number
            link: string
            description?: string
            isRequired: boolean
        }
    >({
        query: ({ id, ...params }) => ({
            url: `${PREFIX}/industry-check/${id}/update`,
            method: 'PATCH',
            body: params,
        }),
        invalidatesTags: ['IndustryChecks'],
    }),

    removeIndustryCheck: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/industry-check/${id}/delete`,
            method: 'DELETE',
        }),
        invalidatesTags: ['IndustryChecks'],
    }),
})
