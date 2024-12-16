import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
    PaginatedResponse,
    PaginationValues,
    ProvideIndustryDetail,
    Student,
    StudentStatusEnum,
    UserStatus,
} from '@types'

const PREFIX = 'subadmin'
export const studentsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    subAdminStudentCount: builder.query<any, void>({
        query: () => `${PREFIX}/students/count`,
        providesTags: [
            'SubAdminStudents',
            'SubAdminWorkplace',
            'BulkUsersDelete',
            'BulkStatus',
        ],
    }),
    getSubAdminStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/list-all`,
            params,
        }),
        providesTags: [
            'SubAdminStudents',
            'BulkUsersDelete',
            'BulkStatus',
            'Students',
        ],
    }),
    getSubAdminSnoozedStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/snoozed/students/list`,
            params,
        }),
        providesTags: [
            'SubAdminStudents',
            'BulkUsersDelete',
            'BulkStatus',
            'Students',
        ],
    }),
    getRtoSubadminStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/list-all`,
            params,
        }),
        providesTags: [
            'SubAdminStudents',
            'BulkUsersDelete',
            'BulkStatus',
            'Students',
        ],
    }),
    getSubAdminUrgentStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/urgent/list`,
            params,
        }),
        providesTags: [
            'SubAdminStudents',
            'BulkUsersDelete',
            'BulkStatus',
            'Students',
        ],
    }),
    subadminCompletedStudents: builder.query<
        PaginatedResponse<Student>,
        PaginationValues
    >({
        query: (params) => ({
            url: `${PREFIX}/completed-students/list`,
            params,
        }),
        providesTags: ['Students', 'SubAdminStudents'],
    }),
    subadminStudentAssignCourses: builder.mutation({
        query: (body) => ({
            url: `admin/student/course/assign`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    subadminStudentUnassignCourses: builder.mutation<
        any,
        { id: number; courseId: number }
    >({
        query: (body) => ({
            url: `admin/student/course/delete/${body.courseId}`,
            params: { student: body.id },
            method: 'DELETE',
        }),
        invalidatesTags: ['SubAdminStudents'],
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
    getSubAdminMyStudentsCallLog: builder.query<any, number>({
        query: (id) => `call-log/get/student/${id}/last`,
        providesTags: ['SubAdminStudents'],
    }),

    getRtoCoordinatorStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/list-by/rto-coordinator`,
            params,
        }),
        providesTags: ['SubAdminStudents'],
    }),

    getSubAdminNonContactableStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/list/not-contactable`,
            params,
        }),
        providesTags: ['SubAdminStudents'],
    }),

    getPlacementStartedStudents: builder.query<any, any>({
        query: (params) => ({
            url: `${PREFIX}/students/list/placement-started`,
            params,
        }),
        providesTags: ['SubAdminStudents'],
    }),

    updateSubAdminCourseDuration: builder.mutation<any, any | null>({
        query: ({ id, body }) => ({
            url: `${PREFIX}/student/course/timing/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    setNotContactable: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/student/update-not-contactable/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),
    calledStudent: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/student/update-to-called/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    getSubAdminStudentCourses: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/course/list-result/${id}`,
        providesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    getSubAdminMyRto: builder.query<any, string>({
        query: (id) => ({
            url: `${PREFIX}/student/view/${id}`,
            params: { id },
        }),
        providesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),
    getSubAdminStudentDetail: builder.query<Student, number>({
        query: (id) => `${PREFIX}/student/view/${id}`,
        providesTags: [
            'Notes',
            'SubAdminStudents',
            'AllCommunications',
            'AssessmentEvidence',
            'SubAdminWorkplace',
        ],
    }),

    getSubAdminStudentRtoDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/${id}/rto-details`,
        providesTags: [
            'Notes',
            'SubAdminStudents',
            'AllCommunications',
            'AssessmentEvidence',
            'SubAdminWorkplace',
        ],
    }),

    updateStudentDate: builder.mutation<
        any,
        { id: number; range: { startDate: Date; endDate: Date } }
    >({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/update/student/${id}/data`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['SubAdminStudents', 'Notes', 'Mails'],
    }),

    getSubAdminStudentWorkplaceDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/workplace-request/view/${id}`,
        providesTags: [
            'SubAdminStudents',
            'Notes',
            'AllCommunications',
            'AssessmentEvidence',
            'SubAdminWorkplace',
        ],
    }),

    getWorkplaceIndustryDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/workplace-request/${id}/details`,
        providesTags: [
            'SubAdminStudents',
            'Notes',
            'AllCommunications',
            'AssessmentEvidence',
            'SubAdminWorkplace',
        ],
    }),

    getWorkplaceStudentDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/workplace-request/${id}/student-details`,
        providesTags: [
            'SubAdminStudents',
            'Notes',
            'AllCommunications',
            'AssessmentEvidence',
            'SubAdminWorkplace',
        ],
    }),

    getWorkplaceForSchedule: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/${id}/industries`,
        providesTags: [
            'SubAdminStudents',
            'AllCommunications',
            'AssessmentEvidence',
            'SubAdminWorkplace',
        ],
    }),

    getSubAdminStudentWorkplace: builder.query<any, number>({
        query: (id) => `${PREFIX}/student/workplace-request/${id}`,
        providesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    getSubAdminStudentWorkplaceHistory: builder.query<any, { student: number }>(
        {
            query: ({ student }) =>
                `subadmin/activity-logger/view-by-object-id/${student}`,
            providesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
        }
    ),

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
        invalidatesTags: ['SubAdminStudentssss', 'Notes'],
    }),

    subAdminRequestIndustryWorkplace: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/student/workplace-request/apply/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    updateWorkplaceCourse: builder.mutation<
        any,
        { wpId: number; courseId: number }
    >({
        query: ({ wpId, courseId }) => ({
            url: `admin/workplace/${wpId}/course/update`,
            method: 'PATCH',
            params: { courseId },
        }),
        invalidatesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    subAdminCancelStudentWorkplaceRequest: builder.mutation<any, any>({
        query: (id) => ({
            url: `${PREFIX}/student/workplace-request/cancel/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    getStudentCancelledWP: builder.query<any, any>({
        query: (id) =>
            `${PREFIX}/student/${id}/workplace-request/get/cancelled`,
        providesTags: ['SubAdminStudents'],
    }),

    getStudentCallLog: builder.query<any, number>({
        query: (studentId) => ({
            url: `call-log`,
            params: { studentId },
        }),
        providesTags: ['SubAdminStudents'],
    }),

    studentCallLog: builder.mutation<any, { student: number }>({
        query: (body) => ({
            url: `call-log`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    studentAnsweredCall: builder.mutation<any, { id: number; status: string }>({
        query: ({ id, status }) => ({
            url: `call-log/action/answered/${id}`,
            method: 'PATCH',
            params: { status },
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),

    getRequiredDocs: builder.query<any, any>({
        query: ({ id, course, user }) => ({
            url: `${PREFIX}/student/required-document/${id}`,
            params: { course, user },
        }),
        providesTags: ['SubAdminStudents', 'SubAdminWorkplace'],
    }),

    getRequiredFolders: builder.query<
        any,
        { courseId: number; industryId: number }
    >({
        query: ({ courseId, industryId }) =>
            `${PREFIX}/student/required-document/${courseId}/${industryId}`,
        providesTags: [
            'SubAdminStudents',
            'IndustryWorkplace',
            'SubAdminWorkplace',
        ],
    }),

    addCourseStartEndDate: builder.mutation<
        any,
        {
            courseId: number
            startTime: Date
            endTime: Date
            studentId: number
        }
    >({
        query: ({ courseId, startTime, endTime, studentId }) => ({
            url: `${PREFIX}/student/course-hours/${studentId}`,
            method: 'POST',
            body: {
                course: courseId,
                startDate: startTime,
                endDate: endTime,
            },
        }),

        invalidatesTags: [
            'SubAdminStudents',
            'IndustryWorkplace',
            'SubAdminWorkplace',
        ],
    }),

    updateCourseStartEndDate: builder.mutation<
        any,
        {
            id: number
            startTime: Date
            endTime: Date
        }
    >({
        query: ({ id, startTime, endTime }) => ({
            url: `${PREFIX}/student/course-hours/update/${id}`,
            method: 'PATCH',
            body: {
                startDate: startTime,
                endDate: endTime,
            },
        }),

        invalidatesTags: [
            'SubAdminStudents',
            'IndustryWorkplace',
            'SubAdminWorkplace',
        ],
    }),

    getRequiredDocsResponse: builder.query<
        any,
        { selectedFolderId: number; studentId: number }
    >({
        query: ({ selectedFolderId, studentId }) =>
            `${PREFIX}/student/document-response/${selectedFolderId}/${studentId}`,
        providesTags: [
            'SubAdminStudents',
            'IndustryWorkplace',
            'SubAdminWorkplace',
        ],
    }),

    uploadRequiredDocs: builder.mutation<any, any>({
        query: ({ id, workplaceId, user, body }) => ({
            url: `${PREFIX}/student/workplace/response`,
            method: 'POST',
            params: { docs: [id], wpId: workplaceId, student: user },
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

    applyWorkplaceOnExistingIndustry: builder.mutation<
        any,
        {
            student: number
            IndustryId: number
            courseId: number
            location?: number
            document: number
        }
    >({
        query: ({ IndustryId, ...params }) => ({
            url: `${PREFIX}/student/workplace/existing-industry/${IndustryId}`,
            method: 'POST',
            params,
        }),
        invalidatesTags: ['SubAdminStudents'],
    }),
    addCustomIndustyForWorkplace: builder.mutation<any, any>({
        query: ({ id, document, body }) => ({
            url: `${PREFIX}/student/add/workplace`,
            method: 'POST',
            params: { student: id, document },
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
        { id: number; status: StudentStatusEnum }
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
    addCustomSecondWorkplace: builder.mutation<
        any,
        ProvideIndustryDetail & {
            studentId: number
        }
    >({
        query: ({ studentId, ...body }) => ({
            url: `subadmin/add-another/workplace/${studentId}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    downloadStudentCSV: builder.mutation<any, void>({
        query: () => ({
            url: `subadmin/students/download/csv`,
            method: 'POST',
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    getSubAdminTicketStudentsList: builder.query<any, void>({
        query: () => `${PREFIX}/students/list`,
        providesTags: ['SubAdminStudents'],
    }),
    sendPasswordToStudentMail: builder.mutation<any, string>({
        query: (email) => ({
            url: `${PREFIX}/users/password/send`,
            body: { email },
            method: 'POST',
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),
    problamaticStudent: builder.mutation<
        any,
        { studentId: number; comment?: string }
    >({
        query: ({ studentId, ...body }) => ({
            url: `shared/student/${studentId}/has-issue/toggle`,
            method: 'PATCH',
            body,
        }),
        invalidatesTags: ['Students', 'SubAdminStudents', 'Notes'],
    }),

    snoozeStudent: builder.mutation<Student, { id: number; date: Date }>({
        query: ({ id, ...body }) => ({
            url: `${PREFIX}/student/snooze/${id}`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Students', 'SubAdminStudents', 'Notes'],
    }),

    unSnoozeStudent: builder.mutation<Student, number>({
        query: (id) => ({
            url: `${PREFIX}/student/reactivate/${id}`,
            method: 'PATCH',
        }),
        invalidatesTags: ['Students', 'SubAdminStudents'],
    }),

    sendStudentMssage: builder.mutation<
        Student,
        { message: string; phoneNumber: string; recipient: number }
    >({
        query: (body) => ({
            url: `twilio-messages/send`,
            body,
            method: 'POST',
        }),
        invalidatesTags: ['StudentMessages'],
    }),

    getStudentMessagesList: builder.query<any, number>({
        query: (id) => `twilio-messages/user/${id}`,
        providesTags: ['StudentMessages'],
    }),
})
