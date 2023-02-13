import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { appointmentsEndpoints } from './appointment'

import { availableShiftsEndpoints } from './availableShifts'
import { coursesEndpoints } from './courses'
import { employeeEndpoints } from './employee'
import { employeeTaskEndpoints } from './employeeTask'
import { foldersEndpoints } from './folders'
import { jobEndpoints } from './job'
import { messageEndpoints } from './message'
import { mouEndpoints } from './mou'
import { notificationsEndpoints } from './notifications'
import { rplEndpoints } from './rpl'
import { studentsEndpoints } from './students'
import { volunteerEndpoints } from './volunteer'
import { workplaceEndpoints } from './workplace'

export const industryApi = createApi({
    reducerPath: 'industryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    keepUnusedDataFor: 200,
    refetchOnMountOrArgChange: 100,
    refetchOnReconnect: true,
    // refetchOnFocus: true,
    tagTypes: [
        'RPL',
        'Course',
        'Employee',
        'Employee',
        'Students',
        'Document',
        'Industries',
        'EmployeeTask',
        'AvailableShifts',
    ],

    // ---------- RTO ENDPOINTS ---------- //
    endpoints: (build) => ({
        industryProfile: build.query<any, void>({
            query: () => 'industries/profile/get',
            providesTags: ['Industries'],
        }),
        updateIndustryProfile: build.mutation<any, any>({
            query: ({ id, body }) => ({
                url: 'industries/profile/update',
                method: 'PATCH',
                params: { industry: id },
                body,
            }),
            invalidatesTags: ['Industries'],
        }),

        ...coursesEndpoints(build),
        ...foldersEndpoints(build),
        ...employeeEndpoints(build),
        ...studentsEndpoints(build),
        ...employeeTaskEndpoints(build),
        ...availableShiftsEndpoints(build),
        ...appointmentsEndpoints(build),
        ...mouEndpoints(build),
        ...jobEndpoints(build),
        ...workplaceEndpoints(build),
        ...messageEndpoints(build),
        ...notificationsEndpoints(build),
        ...rplEndpoints(build),
        ...volunteerEndpoints(build),
    }),
})

export const {
    // ---- PROFILE ---- //
    useIndustryProfileQuery,
    useUpdateIndustryProfileMutation,

    // ------ AVAILABLE SHIFTS ------ //
    useGetShiftsQuery,
    useAddShiftMutation,
    useRemoveShiftMutation,
    useGetAvailableShiftsQuery,
    useAddWorkingHoursMutation,

    // ---- COURSES ---- //
    useAddCourseMutation,
    useAddCoursesMutation,
    useGetAllCoursesQuery,
    useGetCourseDetailQuery,
    useRemoveCourseMutation,
    useUpdateCourseMutation,
    useGetIndustryCoursesQuery,
    useGetIndustrySectorsQuery,

    // --- EMPLOYEE --- //
    useGetEmployeeQuery,
    useAddEmployeeMutation,
    useRemoveEmployeeMutation,
    useUpdateEmployeeMutation,
    useAddEmployeeTaskMutation,
    useDeleteEmployeeTaskMutation,
    useUpdateEmployeeTaskOnDragMutation,
    useChangeEmployeeTaskPriorityMutation,

    // --- EMPLOYEE TASK --- //
    useGetEmployeeTaskQuery,

    // ---- FOLDERS ---- //
    useGetDocumentsQuery,
    useAddFolderMutation,
    useAddDocumentMutation,
    useUpdateFolderMutation,
    useRemoveFolderMutation,
    useEditDocumentMutation,
    useAddChecklistMutation,
    useDeleteDocumentMutation,
    useRemoveChecklistMutation,
    useUpdateChecklistMutation,
    useAddOrUpdateRequiredDocumentMutation,

    // --- STUDENTS ---//
    useGetIndustryStudentsQuery,
    useGetFutureCandidatesQuery,
    useGetIndustryStudentProfileQuery,

    // --- WORKPLACE --- //
    useSignAgreementMutation,
    useCompleteWorkplaceMutation,
    useAddNoteByIndustryMutation,
    useTerminateWorkplaceMutation,
    useAddFeedbackMutation,
    useAddReportMutation,
    useCancelWorkplaceMutation,
    useGetIndustryWorkplaceQuery,
    useGetIndustryWorkplaceDetailQuery,
    useWorkplaceActionsMutation,
    useGetIndustryWorkplaceFoldersQuery,
    useStartPlacementByIndustryMutation,

    // --- APPOINTMENTS --- //
    useGetIndustryAppointmentsQuery,
    useCreateIndustryAppointmentMutation,
    useIndustryCoordinatorAvailabilityQuery,

    // ----- JOB ----- //
    useAddJobMutation,
    useGetAllJobsQuery,
    useUpdateJobMutation,
    useRemoveJobMutation,
    useGetJobDetailQuery,
    useGetIndustryJobsQuery,
    useJobChangeStatusMutation,
    useGetBrowseCandidatesQuery,

    // --- MESSAGE --- //
    useGetIndustryMessagesQuery,
    useSendMessageMutation,

    // ----- MOU ----- //
    useGetIndustryMOUQuery,
    useGetIndustryMOUDetailQuery,
    useGetDefaultMouContentQuery,
    useCreateMouByIndustryMutation,
    useCancelIndustryMOUMutation,
    useRejectIndustryMOUMutation,
    useAcceptMouByIndustryMutation,

    // --- NOTIFICATIONS --- //
    useGetNotificationsQuery,
    useGetNotificationDetailQuery,
    useReadNotificationMutation,

    // ----- RPL ----- //
    useGetRplQuery,
    useAddRplMutation,

    // ---- VOLUNTEER ---- //
    useRequestAVolunteerMutation,
} = industryApi

export const IndustryApi = {
    Profile: {
        useIndustryProfileQuery,
        useUpdateIndustryProfileMutation,
    },
    AvailableShifts: {
        useGetShiftsQuery,
        useAddShiftMutation,
        useRemoveShiftMutation,
        useGetAvailableShiftsQuery,
        useAddWorkingHoursMutation,
    },
    Courses: {
        useGetAllCoursesQuery,
        useGetCourseDetailQuery,
        useAddCourseMutation,
        useAddCoursesMutation,
        useRemoveCourseMutation,
        useGetIndustryCoursesQuery,
        useGetIndustrySectorsQuery,
        useUpdateCourseMutation,
    },
    Employee: {
        useGetEmployeeQuery,
        useAddEmployeeMutation,
        useRemoveEmployeeMutation,
        useUpdateEmployeeMutation,
        useAddEmployeeTaskMutation,
        useDeleteEmployeeTaskMutation,
        useUpdateEmployeeTaskOnDragMutation,
        useChangeEmployeeTaskPriorityMutation,
    },
    EmployeeTask: {
        useGetEmployeeTaskQuery,
    },
    Folders: {
        useGetDocumentsQuery,
        useAddFolderMutation,
        useAddDocumentMutation,
        useUpdateFolderMutation,
        useRemoveFolderMutation,
        useEditDocumentMutation,
        useAddChecklistMutation,
        useDeleteDocumentMutation,
        useRemoveChecklistMutation,
        useUpdateChecklistMutation,
        useAddOrUpdateRequiredDocumentMutation,
    },
    Students: {
        useGetIndustryStudentsQuery,
        useGetFutureCandidatesQuery,
        useGetIndustryStudentProfileQuery,
    },
    Workplace: {
        useSignAgreementMutation,
        useCompleteWorkplaceMutation,
        useAddNoteByIndustryMutation,
        useTerminateWorkplaceMutation,
        useAddFeedbackMutation,
        useAddReportMutation,
        useCancelWorkplaceMutation,
        useGetIndustryWorkplaceQuery,
        useWorkplaceDetail: useGetIndustryWorkplaceDetailQuery,
        useWorkplaceActionsMutation,
        useGetIndustryWorkplaceFoldersQuery,
        useStartPlacementByIndustryMutation,
    },
    Appointments: {
        useGetIndustryAppointmentsQuery,
        useCreateIndustryAppointmentMutation,
        useIndustryCoordinatorAvailabilityQuery,
    },
    Job: {
        useAddJobMutation,
        useGetAllJobsQuery,
        useUpdateJobMutation,
        useRemoveJobMutation,
        useGetJobDetailQuery,
        useGetIndustryJobsQuery,
        useJobChangeStatusMutation,
        useGetBrowseCandidatesQuery,
    },
    Messages: {
        useGetIndustryMessagesQuery,
        useSendMessageMutation,
    },
    Mou: {
        useGetIndustryMOUQuery,
        useGetIndustryMOUDetailQuery,
        useGetDefaultMouContentQuery,
        useCreateMouByIndustryMutation,
        useCancelIndustryMOUMutation,
        useRejectIndustryMOUMutation,
        useAcceptMouByIndustryMutation,
    },
    Notification: {
        useGetNotificationsQuery,
        useGetNotificationDetailQuery,
        useReadNotificationMutation,
    },
    Rpl: {
        useGetRplQuery,
        useAddRplMutation,
    },
    Volunteer: {
        useRequestAVolunteerMutation,
    },
}
