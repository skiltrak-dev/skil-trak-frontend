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
        { id: number; status: string }
    >({
        query: ({ id, status }) => ({
            url: `futureindustries/status-update/${id}`,
            method: 'PATCH',
            body: { status },
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
