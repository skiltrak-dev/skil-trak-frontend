import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Industry, PaginationWithSearch } from '@types'

const PREFIX = 'futureindustries'

export const findWorkplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllFindWorkplaces: builder.query<any, PaginationWithSearch>({
        query: (params) => ({
            url: `${PREFIX}/list`,
            params,
        }),
        providesTags: [''],
    }),
    getIndustryListingProfileDetails: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}/${id}/detail`,
        }),
        providesTags: [''],
    }),
    getIndustryListingNotes: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}/${id}/notes/list-all`,
        }),
        providesTags: [''],
    }),
    // ${PREFIX}/id/note-add body comment
    addIndustryListingDetailsNote: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/${id}/note-add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: [''],
    }),

    changePendingIndustryStatus: builder.mutation<
        any,
        { params: any; body?: any }
    >({
        query: ({ params, body }) => ({
            url: `department/industry-request/status`,
            method: 'PATCH',
            params,
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
    getFindWorkplacesCount: builder.query<any, void>({
        query: () => `${PREFIX}/count`,
        providesTags: ['Industries'],
    }),
    getFutureIndustryDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/${id}/detail`,
        providesTags: ['Industries'],
    }),
    findIndustriesCount: builder.query<any, void>({
        query: () => ({
            url: `industries/count`,
        }),
        providesTags: ['Industries'],
    }),
    getMapFutureIndustries: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/list/for-map`,
            params,
        }),
        providesTags: ['SubAdmin'],
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
    multipleIndustriesStatusChange: builder.mutation<
        Industry,
        { ids: number[]; status: string }
    >({
        query: ({ ids, status }) => ({
            url: `${PREFIX}/status-update/multiple`,
            method: 'PATCH',
            body: { status, ids },
        }),
        invalidatesTags: ['Industries'],
    }),
    addToSignup: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/sign-up/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Industries'],
    }),
    addFutureIndustryListingNote: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/${id}/note-add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
    updateFutureIndustryNote: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/comment/${id}/update`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Industries'],
    }),
    viewListingNote: builder.query<any, number>({
        query: (id) => `${PREFIX}/${id}/notes/list-all`,
        providesTags: ['Industries'],
    }),
    // remove/id
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

    importIndustriesList: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/bulk/create`,
            body,
            method: 'POST',
        }),
        invalidatesTags: ['Industries'],
    }),
    importIndustriesWithoutEmailList: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/bulk/create/without-email`,
            body,
            method: 'POST',
        }),
        invalidatesTags: ['Industries'],
    }),
    // get department industry listing
    getDepartmentApprovedIndustryList: builder.query<any, any>({
        query: (params) => ({
            url: `department/industries/approved-list`,
            params,
        }),
        providesTags: ['Industries'],
    }),
    getDepartmentFutureIndustriesList: builder.query<any, any>({
        query: (params) => ({
            url: `department/future/industries/list`,
            params,
        }),
        providesTags: ['Industries'],
    }),
})
