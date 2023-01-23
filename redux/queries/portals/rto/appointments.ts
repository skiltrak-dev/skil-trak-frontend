import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos'
export const appointmentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    createRTOAppointment: builder.mutation<any, any | null>({
        query: (body) => {
            return {
                url: `${PREFIX}/appointment/create`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['RTOAppointment'],
    }),
    getRTOAppointments: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/my-appointments/view`,
            params,
        }),
        providesTags: ['RTOAppointment'],
    }),
    getCoordinatorsForRTO: builder.query<any, void>({
        query: () => `${PREFIX}/assigned/coordinator/list`,
        providesTags: ['RTOAppointment'],
    }),
})
