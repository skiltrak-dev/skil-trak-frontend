import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Industry, PaginationValues } from '@types'

export const industriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    isIndustryHiring: builder.mutation<Industry, number | undefined>({
        query: (id) => {
            const params = id ? { id } : {}
            return {
                url: `industries/toggle/hiring-status`,
                method: 'PATCH',
                params,
            }
        },
        invalidatesTags: ['Industries'],
    }),

    getAllIndustries: builder.query<any, void>({
        query: () => `filter/industries/all`,
        providesTags: ['Industry'],
    }),

    allGetIndustriesList: builder.query<any, void>({
        query: () => `shared/industries/list`,
        providesTags: ['Industry'],
    }),

    getBulkEmailSubadminIndustries: builder.query<any, void>({
        query: () => `subadmin/industries/courses/all`,
        providesTags: ['Industry'],
    }),

    getAllAdvertisedJobs: builder.query<any, any>({
        query: ({ industry }) => ({
            url: `jobs/list`,
            params: { industry },
        }),
        providesTags: ['Industry'],
    }),

    snoozeIndustry: builder.mutation<Industry, { id: number; date: Date }>({
        query: ({ id, date }) => ({
            url: `shared/industry/snooze/${id}`,
            method: 'POST',
            body: { date },
        }),
        invalidatesTags: ['Industries'],
    }),

    unSnoozeIndustry: builder.mutation<Industry, number>({
        query: (id) => ({
            url: `shared/industry/reactivate/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Industries'],
    }),

    applyForJobFromHomePage: builder.mutation<any, any>({
        query: ({ id, body }) => {
            return {
                url: `students/job/apply/from-website/${id}`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['Industry'],
    }),
    getAdvertisedJobDetail: builder.query<any, any>({
        query: (id) => `jobs/view-related/${id}`,
        providesTags: ['Industry'],
    }),
    getAdvertisedJobCount: builder.query<any, number>({
        query: (id) => `jobs/${id}/increment-views`,
        providesTags: ['Industry'],
    }),

    // Industry Custom Address
    industryBranchesAddressList: builder.query<any, any>({
        query: ({ id, ...params }) => ({
            url: `locations/industry/${id}/list`,
            params,
        }),
        providesTags: ['IndustryBranchesAddress'],
    }),

    addIndustryBranchesAddress: builder.mutation<any, any>({
        query: (body) => {
            return {
                url: `locations/add`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['IndustryBranchesAddress'],
    }),

    updateIndustryBranchAddress: builder.mutation<any, any>({
        query: ({ id, ...body }) => {
            return {
                url: `locations/update/${id}`,
                method: 'PATCH',
                body,
            }
        },
        invalidatesTags: ['IndustryBranchesAddress'],
    }),

    removeIndustryBranchAddress: builder.mutation<any, number>({
        query: (id) => ({
            url: `locations/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['IndustryBranchesAddress'],
    }),
    addProfileVisitor: builder.query<any, number>({
        query: (id) => `activity-logger/profile/${id}/add-profile-visitor`,
        providesTags: ['IndustriesAddProfile'],
    }),
    viewProfileVisitor: builder.query<
        any,
        PaginationValues & {
            userId: number
        }
    >({
        query: ({ userId, ...params }) => ({
            url: `activity-logger/profile/${userId}/visitor-get`,
            params,
        }),
        providesTags: ['IndustriesAddProfile'],
    }),

    getIndustryWPType: builder.query<any, number>({
        query: (userId) => {
            const params = userId ? { userId } : null
            return {
                url: `industries/workplace-type`,
                params,
            }
        },
        providesTags: ['Industry'],
    }),

    addIndustryWpType: builder.mutation<
        any,
        { userId: number; wpTypeId: number }
    >({
        query: ({ wpTypeId, ...params }) => {
            console.log({ params })
            return {
                url: `industries/workplace-type/${wpTypeId}/add`,
                method: 'POST',
                params,
            }
        },
        invalidatesTags: ['Industry'],
    }),

    removeIndustryWPType: builder.mutation<any, number>({
        query: (userId) => {
            const params = userId ? { userId } : null
            return {
                url: `industries/workplace-type/remove`,
                method: 'PATCH',
                params,
            }
        },
        invalidatesTags: ['Industry'],
    }),
})
