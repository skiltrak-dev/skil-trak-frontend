import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    Appointment,
    AppointmentAvailableSlots,
    AppointmentType,
    CreateAppointment,
    GetAppointmentSlots,
    SubAdmin,
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
    approvePendingAppointment: builder.mutation<Appointment, number>({
        query: (id) => ({
            url: `${PREFIX}/approve/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Appointments'],
    }),

    getBookedAppointmnts: builder.query<
        any,
        {
            userId?: number
            status?: string | undefined
            skip?: number
            limit?: number
            search?: any
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
    cancellAppointment: builder.mutation<Appointment, number>({
        query: (id) => ({
            url: `${PREFIX}/cancel/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Appointments'],
    }),
    addNoteOnAppointment: builder.mutation<Appointment, any>({
        query: (body) => ({
            url: `${PREFIX}/note/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Appointments'],
    }),
    getAppointmentsAvailableSlots: builder.query<
        AppointmentAvailableSlots,
        GetAppointmentSlots
    >({
        query: (params) => ({
            url: `${PREFIX}/coordinator/available/slots`,
            params,
        }),
        providesTags: ['Appointments'],
    }),
    getRescheduleAppointmentsAvailableSlots: builder.query<
        AppointmentAvailableSlots,
        GetAppointmentSlots
    >({
        query: (params) => ({
            url: `${PREFIX}/available/slots`,
            params,
        }),
        providesTags: ['Appointments'],
    }),
    allCoordinators: builder.query<SubAdmin[], void>({
        query: () => `${PREFIX}/coordinator/list`,
        providesTags: ['Appointments'],
    }),
    getUpcommingAppointment: builder.query<Appointment, number | undefined>({
        query: (id) => ({
            url: `${PREFIX}/future/view`,
            params: { user: id },
        }),
        providesTags: ['Appointments'],
    }),
    rescheduleAppointment: builder.mutation<
        Appointment,
        {
            id: number
            body: {
                startTime?: Date | string
                endTime?: Date | string
                date: Date
            }
        }
    >({
        query: ({ id, body }) => ({
            url: `${PREFIX}/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Appointments'],
    }),
})
