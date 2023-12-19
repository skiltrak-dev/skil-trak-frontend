import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { EsignDocumentStatus } from '@utils'

const PREFIX = 'esign'
export const eSignEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    usersPendingDocumentsList: builder.query<
        any,
        { status?: EsignDocumentStatus }
    >({
        query: (params) => ({
            url: `${PREFIX}/documents/pending/retrieve-for-user`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),

    getUserTemplateDocumentForSign: builder.query<any, number>({
        query: (id) => `${PREFIX}/documents/${id}/retrieve-svgs`,
        providesTags: ['E-Sign'],
    }),

    getUserSignatureTabForTemplate: builder.query<
        any,
        { template: number; docId: number }
    >({
        query: ({ template, ...params }) => ({
            url: `${PREFIX}/signature-tab/retrieve-for-document/${template}`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),
    signDocumentByUser: builder.mutation<
        any,
        {
            documentId: number
            tabId: number
            signature: string
        }
    >({
        query: ({ signature, ...params }) => ({
            url: `${PREFIX}/document/sign`,
            method: 'POST',
            params,
            body: { signature },
        }),
        invalidatesTags: ['E-Sign'],
    }),

    cancelEsignDocument: builder.mutation<
        any,
        {
            documentId: number
            tabId: number
            signature: string
        }
    >({
        query: ({ signature, ...params }) => ({
            url: `${PREFIX}/document/sign`,
            method: 'POST',
            params,
            body: { signature },
        }),
        invalidatesTags: ['E-Sign'],
    }),

    addCustomFieldData: builder.mutation<
        any,
        {
            documentId: number
            tabsResponse: any
        }
    >({
        query: ({ documentId, ...body }) => ({
            url: `${PREFIX}/document/${documentId}/tab/response`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['E-Sign'],
    }),

    getDocumentForUsers: builder.query<any, number>({
        query: (docId) => `${PREFIX}/document/${docId}/get`,
        providesTags: ['E-Sign'],
    }),
    getTabsForUsers: builder.query<any, { docId: number; token: string }>({
        query: ({ docId, ...params }) => ({
            url: `${PREFIX}/signature-tab/get-for-document/${docId}`,
            params,
        }),
        providesTags: ['E-Sign'],
    }),
})
