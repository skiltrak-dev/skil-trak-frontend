import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { DocumentsType } from 'types/documents.type'

const PREFIX = 'rtos'
export const rtoDocumentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRtoDocuments: builder.query<DocumentsType[], number>({
        query: (id) => {
            const params = id ? { id } : {}
            return {
                url: `${PREFIX}/documents/get`,
                params,
            }
        },
        providesTags: ['RtoDocuments'],
    }),
    addRtoDocuments: builder.mutation<DocumentsType, FormData>({
        query: (body) => ({
            url: `${PREFIX}/documents/create`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['RtoDocuments'],
    }),
})
