import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const availableShiftsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAvailableShifts: builder.query<any, void>({
        query: () => `${PREFIX}/working-hours/list`,
        providesTags: ['AvailableShifts'],
    }),
    addWorkingHours: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/working-hours/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['AvailableShifts'],
    }),
    addShift: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/available-shift/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['AvailableShifts'],
    }),
    getShifts: builder.query<any, number>({
        query: (id) => `${PREFIX}/available-shift/list/${id}`,
        providesTags: ['AvailableShifts'],
    }),
    removeShift: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/available-shift/remove/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['AvailableShifts'],
    }),
})
