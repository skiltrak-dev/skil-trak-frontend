import { UserRoles } from '@constants'
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
    getRtoCoordinatorsIndustry: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/industries/list`,
            params,
        }),
        providesTags: ['SubAdminIndustries'],
    }),
    getSnoozedIndustry: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/snoozed-industries/list`,
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
        providesTags: ['SubAdminIndustries', 'Industries'],
    }),
    getSubAdminIndustryStudents: builder.query<
        any,
        { industry: number; skip: number; limit: number }
    >({
        query: ({ industry, ...params }) => ({
            url: `${PREFIX}/industry/students/list/${industry}`,
            params,
        }),
        providesTags: ['SubAdminIndustries'],
    }),
    addToFavorite: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/industry/favorite/add/${id}`,
            method: 'POST',
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),
    addToPartner: builder.mutation<
        any,
        { industry: number; studentCapacity?: number }
    >({
        query: ({ industry, studentCapacity }) => ({
            url: `${PREFIX}/industry/partner/add/${industry}`,
            body: { studentCapacity },
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),
    industryCallLog: builder.mutation<
        any,
        { industry: number; receiver: UserRoles }
    >({
        query: ({ industry, receiver }) => ({
            url: `call-log`,
            method: 'POST',
            params: { receiver },
            body: { industry },
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),
    getIndustryCallLog: builder.query<any, number>({
        query: (industryId) => ({
            url: `call-log`,
            params: { industryId },
        }),
        providesTags: ['SubAdminIndustries'],
    }),
    industryAnsweredCall: builder.mutation<any, { id: number; status: string }>(
        {
            query: ({ id, status }) => ({
                url: `call-log/action/answered/${id}`,
                method: 'PATCH',
                params: { status },
            }),
            invalidatesTags: ['SubAdminIndustries'],
        }
    ),

    makeIndustryHeadquarter: builder.mutation<
        any,
        { headQuarter: number; branch: number }
    >({
        query: (body) => ({
            url: `${PREFIX}/industry/branches/add`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),

    removeIndustryBranch: builder.mutation<any, { branch: number }>({
        query: (body) => ({
            url: `${PREFIX}/industry/branches/remove`,
            method: 'DELETE',
            body,
        }),
        invalidatesTags: ['SubAdminIndustries'],
    }),

    getIndustryBranches: builder.query<
        any,
        { id: number; skip: number; limit: number }
    >({
        query: ({ id, ...params }) => ({
            url: `${PREFIX}/industry/branches/list/${id}`,
            params,
        }),
        providesTags: ['SubAdminIndustries'],
    }),
})
