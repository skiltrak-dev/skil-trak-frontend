import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'


const PREFIX = 'admin'
export const talentPoolEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getTalentPoolList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/talentpool/profiles-list`,
            params,
        }),
        providesTags: ['TalentPoolProfiles'],
    }),
    getTalentPoolProfile: builder.query<any, any>({
        query: (id) => ({
            url: `${PREFIX}/talentpoolprofile/${id}/detail`,
        }),
        providesTags: ['TalentPoolProfiles'],
    }),
   
    deleteTalentPoolProfile: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/talentpoolprofile/${id}/delete`,
            method: 'DELETE',
        }),
        invalidatesTags: ['TalentPoolProfiles'],
    }),
})
