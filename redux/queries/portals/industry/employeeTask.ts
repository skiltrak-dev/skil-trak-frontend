import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'industries'
export const employeeTaskEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getEmployeeTask: builder.query({
        query: () => `${PREFIX}/employeetask/list`,
        providesTags: ['EmployeeTask'],
    }),
})
