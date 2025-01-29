import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { PaginatedResponse, PaginationWithSearch, Sector } from '@types'

const PREFIX = 'admin'
export const sectorEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    sectors: builder.query<
        PaginatedResponse<Sector>,
        PaginationWithSearch | undefined
    >({
        query: (params) => ({
            url: `${PREFIX}/sector/list`,
            params,
        }),
        providesTags: ['Sectors'],
    }),

    sectorDetail: builder.query<Sector, number>({
        query: (id) => `${PREFIX}/sector/view/${id}`,
        providesTags: ['Sectors'],
    }),

    sectorAdd: builder.mutation<Sector, Sector>({
        query: (body) => ({
            url: `${PREFIX}/sector/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Sectors'],
    }),

    addSectorIndustryChecks: builder.mutation<Sector, Sector>({
        query: (body) => ({
            url: `industry-checks/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Sectors'],
    }),

    updateIndustryCheck: builder.mutation<any, any>({
        query: ({ id, ...body }) => ({
            url: `industry-checks/${id}/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Sectors'],
    }),

    removeIndustryCheck: builder.mutation<any, number>({
        query: (id) => ({
            url: `industry-checks/${id}/remove`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Sectors'],
    }),

    getIndustryChecks: builder.query<any, number>({
        query: (id) => `industry-checks/${id}/list`,
        providesTags: ['Sectors'],
    }),

    sectorUpdate: builder.mutation<Sector, Sector>({
        query: ({ id, code, name }) => ({
            url: `${PREFIX}/sector/update/${id}`,
            method: 'PATCH',
            body: { code, name },
        }),
        invalidatesTags: ['Sectors'],
    }),

    sectorRemove: builder.mutation<Sector, number>({
        query: (id) => ({
            url: `${PREFIX}/sector/delete/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Sectors'],
    }),
})
