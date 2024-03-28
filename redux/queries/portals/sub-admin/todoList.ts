import { UserRoles } from '@constants'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'subadmin'
export const todoListEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    todoListCount: builder.query<any, void>({
        query: () => `${PREFIX}/todo-list/count`,
        providesTags: ['TODO'],
    }),
})
