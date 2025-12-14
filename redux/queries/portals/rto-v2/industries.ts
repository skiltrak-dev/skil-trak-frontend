import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    Industry,
    PaginatedResponse,
    PaginationWithSearch,
    Student,
    UserStatus,
} from '@types'

const PREFIX = 'rtos/'
const INDUSTRIESPREFIX = 'industries/'
export const industriesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    addSingleRtoIndustry: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}industry/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTOIndustries'],
    }),
    createAvailability: builder.mutation<any, any>({
        query: ({ userId, ...body }) => ({
            url: `${INDUSTRIESPREFIX}availability/create`,
            method: 'POST',
            params: { userId },
            body,
        }),
        invalidatesTags: ['RTOIndustries'],
    }),
    addBulkRtoIndustries: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}industry/bulk-create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RTOIndustries'],
    }),

    getRtoIndustries: builder.query<
        PaginatedResponse<Industry>,
        PaginationWithSearch
    >({
        query: (params) => ({
            url: `${PREFIX}industries/list-all`,
            params,
        }),
        providesTags: ['RTOIndustries'],
    }),

    getRtoIndustryDetail: builder.query<Industry, number>({
        query: (id) => ({
            url: `${INDUSTRIESPREFIX}${id}/get-details`,
        }),
        providesTags: ['RTOIndustries'],
    }),

    snoozeIndustry: builder.mutation<
        any,
        { id: number; startDate?: Date; endDate?: Date }
    >({
        query: ({ id, ...body }) => ({
            url: `${INDUSTRIESPREFIX}${id}/snooze`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['RTOIndustries'],
    }),

    industryUserStatusChange: builder.mutation<
        any,
        { id: number; status: UserStatus }
    >({
        query: ({ id, status }) => ({
            url: `${INDUSTRIESPREFIX}${id}/user-status-update`,
            method: 'PATCH',
            params: { status },
        }),
        invalidatesTags: ['RTOIndustries'],
    }),

    industryStudentsList: builder.query<
        PaginatedResponse<Student>,
        { params: PaginationWithSearch; industryId: number; sectorId: number }
    >({
        query: ({ params, industryId, sectorId }) => ({
            url: `${INDUSTRIESPREFIX}${industryId}/sector/${sectorId}/students-list`,
            params,
        }),
        providesTags: ['RTOIndustries'],
    }),

    industryStudentStats: builder.query<
        {
            totalStudents: number
            completedStudents: number
            inProgress: number
            pending: number
        },
        { industryId: number; sectorId: number }
    >({
        query: ({ industryId, sectorId }) =>
            `${INDUSTRIESPREFIX}${industryId}/sector/${sectorId}/students-count`,
        providesTags: ['RTOIndustries'],
    }),
})
