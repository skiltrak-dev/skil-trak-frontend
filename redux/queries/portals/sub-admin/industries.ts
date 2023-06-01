import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const subAdminIndustriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    subadminIndustryStatisticsCount: builder.query<any, number>({
        query: (id) => `${PREFIX}/industry/students/count/${id}`,
        providesTags: ['Industries'],
    }),

    getSubadminIndustriesCount: builder.query<any, void>({
        query: () => `${PREFIX}/industries/count`,
        providesTags: ['SubAdminIndustries'],
    }),
    getSubAdminIndustries: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/industries/list`,
            params,
        }),
        providesTags: ['SubAdminIndustries'],
    }),
    getFavouriteIndustries: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/industries/favorite/list`,
            params,
        }),
        providesTags: ['SubAdminIndustries'],
    }),
    getSubAdminIndustriesProfile: builder.query<any, number>({
        query: (id) => {
            return {
                url: `${PREFIX}/industry/profile/${id}`,
                params: { id },
            }
        },
        providesTags: ['SubAdminIndustries'],
    }),
    getSubAdminIndustryStudents: builder.query<any, string>({
        query: (id) => {
            return {
                url: `${PREFIX}/industry/students/list/${id}`,
            }
        },
        providesTags: ['SubAdminIndustries'],
    }),
    addToFavorite: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/industry/favorite/add/${id}`,
            method: 'POST',
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),
    addToPartner: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/industry/partner/add/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),
})
