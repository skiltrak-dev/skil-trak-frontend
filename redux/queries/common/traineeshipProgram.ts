import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const traineeshipProgramEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getTraineeshipProgram: builder.query<any, any>({
        query: (params) => ({
            url: 'queries',
            params,
        }),
    }),
    addTraineeshipProgram: builder.mutation<any, void>({
        query: (body) => ({
            url: `queries`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Traineeship'],
    }),
})
