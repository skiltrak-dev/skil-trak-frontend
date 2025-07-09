import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const talentPoolEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getSubAdminTalentPoolList: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/talentpool/profiles`,
            params,
        }),
        providesTags: ['TalentPoolProfiles'],
    }),
})
