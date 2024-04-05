import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { DocumentsType } from 'types/documents.type'

const PREFIX = 'management'
export const documentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    // getDocuments: builder.query<DocumentsType[], void>({
    //     query: () => `${PREFIX}/document/list`,
    //     providesTags: ['Documents'],
    // }),
    uploadKpiReport: builder.mutation<any, any>({
        query: (body) => ({
            url: `https://dummy.restapiexample.com/api/v1/create`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['KpiReportDocument'],
    }),
})
