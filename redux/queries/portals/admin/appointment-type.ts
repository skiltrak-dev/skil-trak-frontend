import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { AppointmentType, PaginatedResponse } from '@types'

const PREFIX = 'admin/'
export const appointmentTypeEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  appointmentTypes: builder.query<PaginatedResponse<AppointmentType>, any>({
    query: (params) => {
      return {
        url: `${PREFIX}appointment-type/list`,
        params,
      }
    },
    providesTags: ['AppointmentTypes'],
  }),

  appointmentTypeDetail: builder.query<AppointmentType, number>({
    query: (id) => `${PREFIX}appointment-type/view/${id}`,
    providesTags: ['AppointmentTypes'],
  }),

  appointmentTypeAdd: builder.mutation({
    query: (body) => ({
      url: `${PREFIX}appointment-type/add`,
      method: 'POST',
      body: body,
    }),
    invalidatesTags: ['AppointmentTypes'],
  }),

  appointmentTypeUpdate: builder.mutation({
    query: (body: any) => ({
      url: `${PREFIX}appointment-type/update/${body.id}`,
      method: 'PATCH',
      body: body,
    }),
    invalidatesTags: ['AppointmentTypes'],
  }),

  appointmentTypeRemove: builder.mutation({
    query: (id) => ({
      url: `${PREFIX}appointment-type/remove/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['AppointmentTypes'],
  }),
})
