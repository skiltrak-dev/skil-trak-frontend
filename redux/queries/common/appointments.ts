import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = `appointments`

export const appointmentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
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
})
