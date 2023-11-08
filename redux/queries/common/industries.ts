import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Course, Industry, PaginatedResponse, UserStatus } from '@types'

export const industriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
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
})
