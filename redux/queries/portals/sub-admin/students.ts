import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { PaginatedResponse, Student, UserCount, UserStatus } from '@types'

const PREFIX = 'subadmin'
export const studentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    subAdminStudentCount: builder.query<any, void>({
        query: () => `${PREFIX}/students/count`,
        providesTags: ['SubAdminStudents'],
    }),
    getSubAdminStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/list-all`,
            params,
        }),
        providesTags: ['SubAdminStudents'],
    }),

    subAdminFilteredStudents: builder.query<PaginatedResponse<any>, any>({
        query: (params: any) => ({
            url: `${PREFIX}/student-list/filter`,
            params,
        }),
        providesTags: ['SubAdminStudents'],
    }),

    getSubAdminMyStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/my-students/list`,
            params,
        }),
        providesTags: ['SubAdminStudents'],
    }),

    updateSubAdminCourseDuration: builder.mutation<any, any | null>({
        query: ({ id, body }: any) => ({
            url: `${PREFIX}/student/course/timing/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    setNotContactable: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/student/update-not-contactable/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    getSubAdminStudentCourses: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/course/list-result/${id}`,
        providesTags: ['SubAdminStudents'],
    }),

    getSubAdminMyRto: builder.query<any, string>({
        query: (id) => ({
            url: `${PREFIX}/student/view/${id}`,
            params: { id },
        }),
        providesTags: ['SubAdminStudents'],
    }),
    getSubAdminStudentDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/view/${id}`,
        providesTags: ['SubAdminStudents', 'Notes', 'AllCommunications'],
    }),

    getSubAdminStudentWorkplace: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/workplace-request/${id}`,
        providesTags: ['SubAdminStudents'],
    }),

    assignStudentsToSubAdmin: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/student/assign-subadmin/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    subAdminRequestWorkplace: builder.mutation<any, any>({
        query: (body) => ({
            url: `students/workplace-requests`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    subAdminRequestIndustryWorkplace: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/student/workplace-request/apply/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    subAdminCancelStudentWorkplaceRequest: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/student/workplace-request/cancel/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    getRequiredDocs: builder.query<any, any>({
        query: ({ id, course, user }) => ({
            url: `${PREFIX}/student/required-document/${id}`,
            params: { course, user },
        }),
        providesTags: ['SubAdminStudents'],
    }),

    getRequiredFolders: builder.query<
        any,
        { courseId: number; industryId: number }
    >({
        query: ({ courseId, industryId }) =>
            `${PREFIX}/student/required-document/${courseId}/${industryId}`,
        providesTags: ['IndustryWorkplace'],
    }),

    getRequiredDocsResponse: builder.query<
        any,
        { selectedFolderId: number; studentId: number }
    >({
        query: ({ selectedFolderId, studentId }) =>
            `${PREFIX}/student/document-response/${selectedFolderId}/${studentId}`,
        providesTags: ['IndustryWorkplace'],
    }),

    uploadRequiredDocs: builder.mutation<any, any>({
        query: ({ id, workplaceId, user, body }) => ({
            url: `${PREFIX}/student/workplace/response`,
            method: 'POST',
            params: { docs: [id], wpId: workplaceId, user },
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    // uploadIndustryChecks: builder.mutation<any, any>({
    //     query: ({ id, workplaceId, user, body }) => ({
    //         url: `${PREFIX}/workplace/response`,
    //         method: 'POST',
    //         params: { docs: [id], wpId: workplaceId, user },
    //         body,
    //     }),
    //     invalidatesTags: ['SubAdminStudents'],
    // }),

    findByAbnWorkplace: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/student/industry/find-by-abn`,
            method: 'POST',
            params: { abn: body },
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    applyWorkplaceOnExistingIndustry: builder.mutation<any, any>({
        query: ({ studentId, IndustryId }) => ({
            url: `${PREFIX}/student/workplcae/existing-industry/${IndustryId}`,
            method: 'POST',
            params: { student: studentId },
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    addCustomIndustyForWorkplace: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/student/add/workplace`,
            method: 'POST',
            params: { student: id },
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    studentCourses: builder.query<any, any>({
        query: (id) => `${PREFIX}/student/course/list/${id}`,
        providesTags: ['SubAdminStudents'],
    }),
    changeStudentPassword: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/student/update-password`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    updateStudentDetail: builder.mutation<any, any>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/student/edit-profile/${id}`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    changeStudentStatus: builder.mutation<
        Student,
        { id: number; status: UserStatus }
    >({
        query: ({ id, status }) => {
            return {
                url: `${PREFIX}/students/status`,
                method: 'PATCH',
                params: { id },
                body: { status },
            }
        },
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    changeStudentCurrentStatus: builder.mutation<
        Student,
        { id: number; status: UserStatus | null }
    >({
        query: ({ id, status }) => ({
            url: `${PREFIX}/student/status/update/${id}`,
            method: 'POST',
            body: { status },
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    addSecondWorkplace: builder.mutation<
        any,
        { industryId: number; courseId: number; studentId: number }
    >({
        query: ({ industryId, courseId, studentId }) => ({
            url: `students/workplace-requests/add/another/${industryId}`,
            method: 'POST',
            body: { course: courseId, studentId },
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    addCustomSecondWorkplace: builder.mutation<any, any>({
        query: ({ studentId, ...body }) => ({
            url: `subadmin/add-another/workplace/${studentId}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    downloadAllCourseFiles: builder.mutation<
        any,
        { studentId: number; courseId: number }
    >({
        query: ({ studentId, courseId }) => ({
            url: `shared/files/download/${studentId}/${courseId}`,
            method: 'POST',
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),

    // updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
    //     query: ({id, status}:any) => {
    //         return {
    //             url: `subadmin/student/update-status/${id}`,
    //             method: 'PATCH',
    //             body: {status}
    //         }
    //     },
    //     invalidatesTags: ['SubAdminRtos'],
    // }),
})
