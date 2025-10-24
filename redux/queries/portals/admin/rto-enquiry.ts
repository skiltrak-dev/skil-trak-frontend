import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin/'
export const rtoEnquiryEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRtoEnquiries: builder.query<any, { search?: string }>({
        query: (params) => ({
            url: `${PREFIX}rtos/inquires-list`,
            params,
        }),
        providesTags: ['AppointmentTypes'],
    }),

    getRtoEnquiryDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}rto/inquiry/${id}-detail`,
        providesTags: ['AppointmentTypes'],
    }),

    getRtoEnquiriesCounts: builder.query<any, { search: string }>({
        query: (params) => ({
            url: `${PREFIX}rtos/inquires-count`,
            params,
        }),
        providesTags: ['AppointmentTypes'],
    }),

    premiumIndustriesListForEnquiry: builder.query<any, number>({
        query: (id) => `${PREFIX}feature/${id}/industries-list`,
        providesTags: ['AppointmentTypes'],
    }),

    attachIndustry: builder.mutation<any, { id: number; indId: number }>({
        query: ({ id, indId }) => ({
            url: `${PREFIX}inquiry/${id}/industry/${indId}/add`,
            method: 'PATCH',
        }),
        invalidatesTags: ['AppointmentTypes'],
    }),

    closeEnquiry: builder.mutation<any, { id: number; closeNote: string }>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}inquiry/${id}/close`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['AppointmentTypes'],
    }),
})
