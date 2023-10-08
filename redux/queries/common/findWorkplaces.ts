import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Industry, PaginatedResponse, PaginationWithSearch } from '@types'

const PREFIX = 'futureindustries'

export const findWorkplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllFindWorkplaces: builder.query<
        PaginatedResponse<Industry>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}/list`,
            params,
        }),
        providesTags: ['Industries'],
    }),
    getFindWorkplacesCount: builder.query<any, void>({
        query: () => `${PREFIX}/count`,
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
            url: `${PREFIX}/status-update/${id}`,
            method: 'PATCH',
            body: { status },
        }),
        invalidatesTags: ['Industries'],
    }),
    addIndustry: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
    updateIndustry: builder.mutation<any, any>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
    removeFutureIndustry: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Industries'],
    }),
    removeMultiFutureIndustry: builder.mutation<any, any>({
        query: (ids) => ({
            url: `${PREFIX}/remove/multiple`,
            params: ids,
            method: 'DELETE',
        }),
        invalidatesTags: ['Industries'],
    }),
})
