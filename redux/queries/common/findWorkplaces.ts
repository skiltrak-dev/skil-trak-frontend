import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Industry, PaginatedResponse, PaginationWithSearch } from '@types'

export const findWorkplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllFindWorkplaces: builder.query<
        PaginatedResponse<Industry>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `futureindustries/list`,
            params,
        }),
        providesTags: ['Industries'],
    }),
    findIndustriesCount: builder.query<any, void>({
        query: () => ({
            url: `industries/count`,
        }),
        providesTags: ['Industries'],
    }),
    industriesStatusChange: builder.mutation<
        Industry,
        { id: number; column: string }
    >({
        query: ({ id, column }) => ({
            url: `industries/status-change/${id}`,
            method: 'PATCH',
            params: { column },
        }),
        invalidatesTags: ['Industries'],
    }),
    addIndustry: builder.mutation<any, any>({
        query: (body) => ({
            url: `futureindustries/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
})
