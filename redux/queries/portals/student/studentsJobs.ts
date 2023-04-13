import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { StudentJobType, StudentJobsType } from 'redux/queryTypes'

const PREFIX = 'students'
export const studentJobEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getStudentJobs: builder.query<StudentJobsType, void>({
        query: (params: any) => {
            return {
                url: `${PREFIX}/jobs/list`,
                params,
            }
        },
        providesTags: ['StudentJobs'],
    }),
    getStudentJobDetail: builder.query<StudentJobType, string>({
        query: (id: string) => `${PREFIX}/jobs/view/${id}`,
        providesTags: ['StudentJobs'],
    }),
    saveJob: builder.mutation({
        query: (id) => ({
            url: `${PREFIX}/jobs/save/${id}`,
            method: 'POST',
        }),
        invalidatesTags: ['StudentJobs'],
    }),
})
