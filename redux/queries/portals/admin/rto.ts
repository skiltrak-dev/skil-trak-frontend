import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { RtoCount, PaginatedResponse, Rto } from '@types'

export const rtoEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    rtosCount: builder.query<RtoCount, void>({
        query: () => 'rtos/count',
        providesTags: ['RTOS'],
    }),
    rtosList: builder.query<PaginatedResponse<Rto>, any>({
        query: (params: any) => {
            return {
                url: 'rtos/list',
                params,
            }
        },
        providesTags: ['RTOS'],
    }),
    getPendingRtosList: builder.query({
        query: (params: any) => {
            return {
                url: 'admin/rtos/pending/list',
                params,
            }
        },
        providesTags: ['RTOS'],
    }),
    getActiveRtosList: builder.query({
        query: (params: any) => {
            return {
                url: 'admin/rtos/list',
                params,
            }
        },
        providesTags: ['RTOS'],
    }),
    getRejectedRtosList: builder.query({
        query: (params: any) => {
            return {
                url: 'admin/rtos/rejected/list',
                params,
            }
        },
        providesTags: ['RTOS'],
    }),
    getBlockedRtosList: builder.query({
        query: (params: any) => {
            return {
                url: 'admin/rtos/blocked/list',
                params,
            }
        },
        providesTags: ['RTOS'],
    }),
    getArchivedRtosList: builder.query({
        query: (params: any) => {
            return {
                url: 'admin/rtos/archived/list',
                params,
            }
        },
        providesTags: ['RTOS'],
    }),
    getRTODetail: builder.query({
        query: (id: any) => `admin/rtos/view/${id}`,
        providesTags: ['RTOS'],
    }),
    getSectorsForRTO: builder.query({
        query: (id: any) => `admin/rtos/course/${id}`,
        providesTags: ['RTOS'],
    }),
    assignSectors: builder.mutation({
        query: (body: any) => {
            return {
                url: `admin/rtos/course/add`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['RTOS'],
    }),
    removeAssignedCourses: builder.mutation({
        query: (body: any) => ({
            url: `admin/rtos/course/delete/${body.courseId}`,
            params: { rto: body.rtoId },
            method: 'DELETE',
        }),
        invalidatesTags: ['RTOS'],
    }),
    assignSubAdmins: builder.mutation({
        query: (body: any) => {
            return {
                url: `admin/rtos/subadmin/assign`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['RTOS'],
    }),
    getRTOSubAdmins: builder.query({
        query: (id: any) => `admin/rto/subadmin/${id}`,
        providesTags: ['RTOS'],
    }),
    removeAssignedSubAdmins: builder.mutation({
        query: (body: any) => ({
            url: `admin/rto/subadmin/remove/${body.rtoId}`,
            params: { subadmin: body.subAdmin },
            method: 'DELETE',
        }),
        invalidatesTags: ['RTOS'],
    }),
    changeRtoStatus: builder.mutation({
        query: ({ id, status }: any) => {
            return {
                url: `admin/rtos/status`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }
        },
        invalidatesTags: ['RTOS'],
    }),
    removeRto: builder.mutation({
        query: (id: any) => ({
            url: `admin/rto/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['RTOS'],
    }),

    // RTO Portal
    getRTOProfileDetail: builder.query({
        query: () => `rtos/profile/view`,
        providesTags: ['RTOS'],
    }),
})
