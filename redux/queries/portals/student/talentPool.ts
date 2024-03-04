import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'talentpool'
export const talentPoolEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getTalentPoolStudentProfile: builder.query<any, void>({
        query: () => `${PREFIX}/student/profile`,
        providesTags: ['StudentProfile'],
    }),
    getTalentPoolStudent: builder.query<any, void>({
        query: () => `${PREFIX}/student/get`,
        providesTags: ['StudentProfile'],
    }),
    getAppliedTalentPoolStudentProfile: builder.query<any, void>({
        query: () => `${PREFIX}/profile/get`,
        providesTags: ['StudentProfile'],
    }),
    getIndustriesRequest: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/connection-requests/list`,
            params,
        }),
        providesTags: ['StudentProfile'],
    }),
    applyForTalentPool: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/profile-create`,
            method: 'POST',

            body,
        }),
        invalidatesTags: ['StudentProfile'],
    }),
    uploadTalentPoolRequiredDocs: builder.mutation<any, any>({
        query: ({ body, folderId }) => ({
            url: `${PREFIX}/required-document/response-file/upload/${folderId}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['TalentPoolRequiredDocs', 'StudentProfile'],
        // FIle name should be file:, talentPoolProfileId:
    }),
    industryRequestStatus: builder.mutation<any, any>({
        query: ({ status, conId }) => ({
            url: `${PREFIX}/connection-request/${conId}/update-status`,
            method: 'PATCH',
            body: { status },
        }),
        invalidatesTags: ['StudentProfile'],
    }),
    getAcceptedTalentPoolIndustryProfile: builder.query<any, any>({
        query: (id: any) => ({
            url: `${PREFIX}/connection-request/${id}/detail`,
        }),
        providesTags: ['StudentProfile'],
    }),
    getTalentPoolRequiredDocsResponse: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}/required-document/${id}/response-list`,
        }),
        providesTags: ['TalentPoolRequiredDocs', 'StudentProfile'],
    }),
    // getTalentPoolProfiles: builder.query<any, void>({
    //     query: () => `${PREFIX}/student/profile`,
    //     providesTags: ['StudentProfile'],
    // }),
})
