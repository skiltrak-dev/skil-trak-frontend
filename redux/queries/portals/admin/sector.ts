import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { PaginatedResponse, Sector } from '@types'

const PREFIX = 'admin'
export const sectorEndpoints = (
   builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
   sectors: builder.query<PaginatedResponse<Sector>, any>({
      query: (params: any) => {
         return {
            url: `${PREFIX}/sector/list`,
            params,
         }
      },
      providesTags: ['Sectors'],
   }),

   sectorDetail: builder.query<Sector, number>({
      query: (id) => `${PREFIX}/sector/view/${id}`,
      providesTags: ['Sectors'],
   }),

   sectorAdd: builder.mutation({
      query: (body) => ({
         url: `${PREFIX}/sector/add`,
         method: 'POST',
         body,
      }),
      invalidatesTags: ['Sectors'],
   }),

   sectorUpdate: builder.mutation({
      query: ({ id, code, name }) => ({
         url: `${PREFIX}/sector/update/${id}`,
         method: 'PATCH',
         body: { code, name },
      }),
      invalidatesTags: ['Sectors'],
   }),

   sectorRemove: builder.mutation({
      query: (id) => ({
         url: `${PREFIX}/sector/delete/${id}`,
         method: 'DELETE',
      }),
      invalidatesTags: ['Sectors'],
   }),
})
