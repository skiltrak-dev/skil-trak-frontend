import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { EsignDocumentStatus } from '@utils'

const PREFIX = 'esign/'
export const eSignEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getESignStudentDetail: builder.query<
        any,
        { student: number; courseId: number }
    >({
        query: ({ student, courseId }) =>
            `${PREFIX}student/${courseId}/${student}`,
        providesTags: ['E-Sign'],
    }),

    getESignTemplateDetail: builder.query<
        any,
        { folder: number; userId: number }
    >({
        query: ({ folder, ...params }) => ({
            url: `${PREFIX}folder/template/view/${folder}`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),

    previewAsSignerTemplate: builder.query<
        any,
        {
            folder: number
            industry?: number
            student?: number
            coordinator?: number
        }
    >({
        query: ({ folder, ...params }) => ({
            url: `${PREFIX}template/get-updated/${folder}`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),

    viewStudentEsignDocument: builder.query<
        any,
        {
            folder: number
            std: number
        }
    >({
        query: ({ folder, ...params }) => ({
            url: `${PREFIX}document/retrieve/folder/${folder}`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),

    initiateESign: builder.mutation<
        any,
        {
            template: number
            users: string
        }
    >({
        query: ({ template, ...params }) => ({
            url: `${PREFIX}document/initiate/${template}`,
            params,
            method: 'POST',
        }),
        invalidatesTags: ['E-Sign'],
    }),

    cancelESign: builder.mutation<
        any,
        { id: number; status: EsignDocumentStatus }
    >({
        query: ({ id, ...params }) => ({
            url: `${PREFIX}document/status-update/${id}`,
            params,
            method: 'PATCH',
        }),
        invalidatesTags: ['E-Sign'],
    }),

    requestResignForESign: builder.mutation<
        any,
        { document: number; userId: number }
    >({
        query: ({ document, userId }) => ({
            url: `${PREFIX}document/${document}/re-sign/${userId}/request`,
            method: 'PATCH',
        }),
        invalidatesTags: ['E-Sign'],
    }),
})
