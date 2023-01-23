import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const subAdminAppointmentspoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    searchUser: builder.query<any, any | null>({
        query: (params: any) => ({
            url: `appointments/user/search`,
            params,
        }),
        providesTags: ['Appointment'],
    }),
    userAvailabilities: builder.query<any, any | null>({
        query: (params: any) => ({
            url: `subadmin/user/availabilities`,
            params,
        }),
        providesTags: ['Appointment'],
    }),
    subAdminCreateAppointment: builder.mutation({
        query: (body) => ({
            url: `subadmin/appointment/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Appointment'],
    }),
    getSubAdminAppointments: builder.query<any, any>({
        query: (params) => ({
            url: 'subadmin/my-appointments/view',
            params,
        }),
        providesTags: ['Appointment'],
    }),
    searchUserById: builder.query<any, any>({
        query: (params) => ({
            url: 'subadmin/user/find',
            params,
        }),
        providesTags: ['Appointment'],
    }),
    availabilityList: builder.query<any, any>({
        query: () => 'subadmin/availabilities/list',
        providesTags: ['Appointment'],
    }),
})
