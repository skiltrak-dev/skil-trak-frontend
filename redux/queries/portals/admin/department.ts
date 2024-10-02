import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const departmentEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getDepartmentCoordinators: builder.query<any, void>({
        query: () => `${PREFIX}/subadmin/list-for-department`,
        providesTags: ['Departments'],
    }),
    getDepartments: builder.query<any, any>({
        query: (params) => ({
            url: `department`,
            params,
        }),
        providesTags: ['Departments'],
    }),

    getDepartmentDetails: builder.query<any, number>({
        query: (id) => `department/${id}`,
        providesTags: ['Departments'],
    }),

    getDeptCoordinatorsList: builder.query<any, any>({
        query: ({ id, params }) => ({
            url: `department/${id}/members-list`,
            params,
        }),
        providesTags: ['Departments'],
    }),
    getDeptStudentsList: builder.query<any, any>({
        query: ({ id, params }) => ({
            url: `department/${id}/students/list`,
            params,
        }),
        providesTags: ['Departments'],
    }),
    getDeptCoordinatorsDropdownList: builder.query<any, any>({
        query: (id) => ({
            url: `department/${id}/members`,
        }),
        providesTags: ['Departments'],
    }),
    getDepartmentCounts: builder.query<any, any>({
        query: (id) => ({
            url: `department/${id}/count`,
        }),
        providesTags: ['Departments'],
    }),
    getDepartmentChartStats: builder.query<any, any>({
        query: (id) => ({
            url: `department/${id}/workplace/count`,
        }),
        providesTags: ['Departments'],
    }),
    toggleHod: builder.mutation<any, any>({
        query: (id) => ({
            url: `department/member/${id}/hod-toggle`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Departments'],
    }),
    changeHod: builder.mutation<any, any>({
        query: (id) => ({
            url: `department/member/${id}/make-hod`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Departments'],
    }),
    removeDepartmentCoordinator: builder.mutation<any, any>({
        query: (id) => ({
            url: `department/member/${id}/remove`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Departments'],
    }),
    // department/id/courses/list
    departmentCourses: builder.query<any, any>({
        query: (id) => ({
            url: `department/${id}/courses-list`,
        }),
        providesTags: ['Departments'],
    }),

    addDepartment: builder.mutation<any, any>({
        query: (body) => ({
            url: `department`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Departments'],
    }),
    addDepartmentMembers: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `department/${id}/members/add`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Departments'],
    }),
    deleteDepartment: builder.mutation<any, any>({
        query: (id) => ({
            url: `department/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Departments'],
    }),

    // Map
    getDepartmentStudentsForMap: builder.query<any, any>({
        query: ({ id, params }) => ({
            url: `department/${id}/students/for-map`,
            params,
        }),
        providesTags: ['Departments'],
    }),
    getDepartmentIndustriesForMap: builder.query<any, any>({
        query: ({ id, params }) => ({
            url: `department/${id}/industries/for-map`,
            params,
        }),
        providesTags: ['Departments'],
    }),
    getDepartmentFutureIndustriesForMap: builder.query<any, any>({
        query: ({ id, params }) => ({
            url: `department/${id}/future/industries/for-map`,
            params,
        }),
        providesTags: ['Departments'],
    }),
    getStudentsSuburbsForMap: builder.query<any, any>({
        query: ({ id, params }) => ({
            url: `department/${id}/students/suburbs/for-map`,
            params,
        }),
        providesTags: ['Departments'],
    }),
    // get department sectors
    getDepartmentSectors: builder.query<any, void>({
        query: () => ({
            url: `department/sectors-list`,
        }),
        providesTags: ['Departments'],
    }),
})
