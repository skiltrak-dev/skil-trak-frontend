import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = `appointments`

export const appointmentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    coordinatorAvailablity: builder.query<any, any>({
        query: (user) => ({
            url: `${PREFIX}/availabilities/list`,
            params: { user },
        }),
        providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation<any, any | null>({
        query: (body) => ({ url: `${PREFIX}`, method: 'POST', body }),
        invalidatesTags: ['Appointments'],
    }),
    getBookedAppointmnts: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/my-appointments/view`,
            params,
        }),
        providesTags: ['Appointments'],
    }),
    getAppointmentsAvailableSlots: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/coordinator/available/slots`,
            params,
        }),
        providesTags: ['Appointments'],
    }),
    allCoordinators: builder.query<any, void>({
        query: () => `${PREFIX}/coordinator/list`,
        providesTags: ['Appointments'],
    }),
})
