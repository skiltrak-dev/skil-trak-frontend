import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'todos'
export const todoListEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    todoListCount: builder.query<any, void>({
        query: () => `subadmin/todo-list/count`,
        providesTags: ['TODO'],
    }),

    highPriorityTodoList: builder.query<any, void>({
        query: () => `${PREFIX}/high-priority/data`,
        providesTags: ['TODO'],
    }),
})
