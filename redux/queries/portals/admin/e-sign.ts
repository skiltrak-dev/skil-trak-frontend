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
    getTemplatePagesCount: builder.query<any, any>({
        query: (id) => `${PREFIX}/template/${id}/pages/get-count`,
        providesTags: ['E-Sign'],
    }),
    saveEsignTemplate: builder.mutation<any, any>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/template/tabs/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['E-Sign'],
    }),
    // getEsignTemplate: builder.query<any, number>({
    //     query: (id) => `${PREFIX}/template/tabs/${id}`,
    //     providesTags: ['E-Sign'],
    // }),

    getEsignList: builder.query<any, PaginationWithSearch>({
        query: (params) => ({
            url: `${PREFIX}/template/list`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),
    getEsignTemplateDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/template/view/${id}`,
        providesTags: ['E-Sign'],
    }),
    updateEsignTemplateDetail: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/template/update/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['E-Sign'],
    }),
    getEsignTemplate: builder.query<any, { id: number; pageNumber: number }>({
        query: ({ id, ...params }) => ({
            url: `${PREFIX}/template/get/${id}`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),
    getEsignTemplateTabs: builder.query<any, number>({
        query: (id) => `${PREFIX}/template/tabs-get/${id}`,
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
