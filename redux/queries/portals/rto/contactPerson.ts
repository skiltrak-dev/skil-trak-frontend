import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { AdminStats, ContactPerson, PaginatedResponse, Rto } from '@types'

const PREFIX = 'rtos'
export const contactPersonEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    contactPersons: builder.query<PaginatedResponse<ContactPerson>, any>({
        query: (params: any) => {
            return {
                url: `${PREFIX}/contact-persons/list`,
                params,
            }
        },
        providesTags: ['ContactPersons'],
    }),
    addContactPerson: builder.mutation<any, any>({
        query: (body) => {
            return {
                url: `${PREFIX}/contact-person/add`,
                method: 'POST',
                body,
            }
        },
        invalidatesTags: ['ContactPersons'],
    }),
    updateContactPerson: builder.mutation<any, any>({
        query: (body) => {
            return {
                url: `${PREFIX}/contact-person/update/${body.id}`,
                method: 'PATCH',
                body,
            }
        },
        invalidatesTags: ['ContactPersons'],
    }),
    removeContactPerson: builder.mutation<any, number>({
        query: (id) => {
            return {
                url: `${PREFIX}/contact-person/remove/${id}`,
                method: 'DELETE',
            }
        },
        invalidatesTags: ['ContactPersons'],
    }),
})
