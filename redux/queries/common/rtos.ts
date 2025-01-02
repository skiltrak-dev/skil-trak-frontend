import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const rtosEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllRtos: builder.query<any, void>({
        query: () => `filter/rtos/all`,
        providesTags: ['RTO'],
    }),
    getFilterSubAdminRtos: builder.query<any, void>({
        query: () => `subadmin/rtos/list/all`,
        providesTags: ['RTO'],
    }),
    getRtosList: builder.query<any, void>({
        query: () => `shared/rtos/list`,
        providesTags: ['RTO'],
    }),
    getRtoWpTypes: builder.query<any, void>({
        query: () => `rtos/workplace-types/list`,
        providesTags: ['RTO'],
    }),
    addRtoWpType: builder.mutation<
        any,
        {
            userId: number
            courseId: number
            typeIds: number[]
        }
    >({
        query: ({ typeIds, courseId, ...params }) => ({
            url: `rtos/course/${courseId}/workplace-type/add`,
            method: 'POST',
            params,
            body: { typeIds },
        }),
        invalidatesTags: ['RTO', 'RTOS'],
    }),
    removeRtoWpType: builder.mutation<any, number>({
        query: (id) => ({
            url: `rtos/course/workplace-type/${id}/remove`,
            method: 'DELETE',
        }),
        invalidatesTags: ['RTO', 'RTOS'],
    }),
})
