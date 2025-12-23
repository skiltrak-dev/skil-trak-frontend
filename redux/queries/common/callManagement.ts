import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const callManagementLoginEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAllAiCallList: builder.query<any, any>({
        query: (params) => {
            return {
                url: `ai-voice-calls/summaries/list`,
                params,
            }
        },
        providesTags: ['CallManagement'],
    }),
})
