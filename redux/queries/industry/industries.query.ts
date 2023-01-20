import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const industriesApi = createApi({
    reducerPath: 'industriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/industries/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Industries'],
    endpoints: (builder) => ({
        getIndustryListCount: builder.query({
            query: () => 'admin/industries/list/count',
            providesTags: ['Industries'],
        }),
        getActiveIndustries: builder.query({
            query: (params) => {
                return {
                    url: 'admin/industries/list',
                    params,
                }
            },
            providesTags: ['Industries'],
        }),
        industryProfile: builder.query<any, void>({
            query: () => 'profile/get',
            providesTags: ['Industries'],
        }),
        updateIndustryProfile: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: 'profile/update',
                method: 'PATCH',
                params: { industry: id },
                body,
            }),
            invalidatesTags: ['Industries'],
        }),
        getArchivedIndustries: builder.query({
            query: (params) => {
                return {
                    url: 'admin/industries/archived/list',
                    params,
                }
            },
            providesTags: ['Industries'],
        }),
        getPendingIndustries: builder.query({
            query: (params) => {
                return {
                    url: 'admin/industries/pending/list',
                    params,
                }
            },
            providesTags: ['Industries'],
        }),
        getRejectedIndustries: builder.query({
            query: (params) => {
                return {
                    url: 'admin/industries/rejected/list',
                    params,
                }
            },
            providesTags: ['Industries'],
        }),
        getBlockedIndustries: builder.query({
            query: (params) => {
                return {
                    url: 'admin/industries/blocked/list',
                    params,
                }
            },
            providesTags: ['Industries'],
        }),
        getIndustryDetail: builder.query({
            query: (id) => `admin/industries/${id}`,
            providesTags: ['Industries'],
        }),
        changeIndustryStatus: builder.mutation({
            query: ({ id, status }) => {
                return {
                    url: `admin/industries/status`,
                    method: 'PATCH',
                    params: { id },
                    body: { status },
                }
            },
            invalidatesTags: ['Industries'],
        }),
        removeIndustry: builder.mutation({
            query: (id) => ({
                url: `admin/industry/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Industries'],
        }),
    }),
})

export const {
    useGetIndustryListCountQuery,
    useIndustryProfileQuery,
    useGetActiveIndustriesQuery,
    useGetArchivedIndustriesQuery,
    useGetIndustryDetailQuery,
    useUpdateIndustryProfileMutation,
    useGetPendingIndustriesQuery,
    useGetRejectedIndustriesQuery,
    useGetBlockedIndustriesQuery,
    useRemoveIndustryMutation,
    useChangeIndustryStatusMutation,
} = industriesApi
