import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginationWithSearch, UserStatus } from '@types'

const PREFIX = 'esign'
export const eSignEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getEsignRtos: builder.query<any, void>({
        query: () => `rtos/list/for-esign`,
        providesTags: ['E-Sign'],
    }),
    saveEsign: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/template/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['E-Sign'],
    }),

    getEsignList: builder.query<any, PaginationWithSearch>({
        query: (params) => ({
            url: `${PREFIX}/template/list`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),
    getEsignTemplate: builder.query<any, number>({
        query: (id) => `${PREFIX}/template/get/${id}`,
        providesTags: ['E-Sign'],
    }),
    changeEsignStatus: builder.mutation<
        any,
        { id: number; status: UserStatus }
    >({
        query: ({ id, ...params }) => ({
            url: `${PREFIX}/template/status/update/${id}`,
            method: 'PATCH',
            params,
        }),
        invalidatesTags: ['E-Sign'],
    }),
})
