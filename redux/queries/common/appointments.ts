import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    Appointment,
    AppointmentType,
    CreateAppointment,
    PaginatedResponse,
} from '@types'

const PREFIX = `appointments`

export const appointmentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAppointmentsTypes: builder.query<AppointmentType[], string>({
        query: (appointmentFor) => ({
            url: `${PREFIX}/appointment-type/list`,
            params: { appointmentFor },
        }),
        providesTags: ['StudentAppointments'],
    }),
    coordinatorAvailablity: builder.query<any, number>({
        query: (user) => ({
            url: `${PREFIX}/availabilities/list`,
            params: { user },
        }),
        providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation<Appointment, CreateAppointment>({
        query: (body) => ({ url: `${PREFIX}`, method: 'POST', body }),
        invalidatesTags: ['Appointments'],
    }),
    getBookedAppointmnts: builder.query<
        any,
        {
            userId?: number
            status?: string | undefined
            skip?: number
            limit?: number
        }
    >({
        query: (params) => ({
            url: `${PREFIX}/my-appointments/view`,
            params,
        }),
        providesTags: ['Appointments'],
    }),

    appointmentDetail: builder.query<Appointment, number>({
        query: (id) => `${PREFIX}/view/${id}`,
        providesTags: ['Appointments'],
    }),
    cancellAppointment: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/cancel/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Appointments'],
    }),
    getAppointmentsAvailableSlots: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/coordinator/available/slots`,
            params,
        }),
        providesTags: ['Appointments'],
    }),
    getRescheduleAppointmentsAvailableSlots: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/available/slots`,
            params,
        }),
        providesTags: ['Appointments'],
    }),
    allCoordinators: builder.query<any, void>({
        query: () => `${PREFIX}/coordinator/list`,
        providesTags: ['Appointments'],
    }),
    getUpcommingAppointment: builder.query<any, number | undefined>({
        query: (id) => ({
            url: `${PREFIX}/future/view`,
            params: { user: id },
        }),
        providesTags: ['Appointments'],
    }),
    rescheduleAppointment: builder.mutation<
        Appointment,
        { id: number; body: { selectedTime: Date; date: Date } }
    >({
        query: ({ id, body }) => ({
            url: `${PREFIX}/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Appointments'],
    }),
})
