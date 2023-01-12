import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

import { SubAdmin } from '@types'
import { notesEndpoints } from './notes'
import { workplaceEndpoints } from './workplace'
import { studentsEndpoints } from './students'
import { profileEndpoints } from './profile'

export const subAdminApi = createApi({
    reducerPath: 'subAdminApi',
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
    tagTypes: [
        'SubAdmin',
        'Notes',
        'SubAdminWorkplace',
        'SubAdminStudents',
        'Statistics',
    ],

    // ---------- Sub Admin ENDPOINTS ---------- //
    endpoints: (build) => ({
        profile: build.query<any, void>({
            query: () => `subadmin/me/profile`,
            providesTags: ['SubAdmin'],
        }),

        statistics: build.query<any, void>({
            query: () => `subadmin/dashboard/count`,
            providesTags: ['Statistics'],
        }),

        ...notesEndpoints(build),
        ...workplaceEndpoints(build),
        ...studentsEndpoints(build),
        ...profileEndpoints(build),
    }),
})

export const {
    // ------ SELF ------ //
    useProfileQuery,
    useUpdateSubAdminProfileMutation,

    // ------ NOTES ------ //
    useNotesQuery,
    useNoteAddMutation,
    useNoteDeleteMutation,
    useNoteStatusChangeMutation,

    // ------WORKPLACE------ //
    useAgrementSignMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useAssignToSubAdminMutation,
    useCompletePlacementMutation,
    useTerminatePlacementMutation,
    useGetMyStudentsWorkplacesQuery,
    useGetSubAdminWorkplacesQuery,
    useGetCancelledWorkplacesQuery,
    useGetSubAdminFilteredWorkplacesQuery,
    useSendInterviewNotificationMutation,
    useForwardWorkplaceToIndustryMutation,
    useAddWorkplaceNoteMutation,
    useGetWorkplaceFoldersQuery,
    useUpdateWorkplaceStatusMutation,
    useCancelWorkplaceStatusMutation,
    useGetAddedByStudentsWorkplacesQuery,
    useSubAdminApplyStudentWorkplaceMutation,
    useAddCustomIndustryMutation,
    useShowExistingIndustriesQuery,
    useAddExistingIndustriesMutation,
    useChangeCustomIndustryStatusMutation,

    // -----STUDENTS-------//
    useGetSubAdminStudentsQuery,
    useSubAdminRequestWorkplaceMutation,
    useSubAdminFilteredStudentsQuery,
    useGetSubAdminStudentWorkplaceQuery,
    useGetSubAdminMyRtoQuery,
    useGetSubAdminStudentDetailQuery,
    useUpdateSubAdminCourseDurationMutation,
    useGetSubAdminMyStudentsQuery,
    useAssignStudentsToSubAdminMutation,
    useSubAdminRequestIndustryWorkplaceMutation,
    useSubAdminCancelStudentWorkplaceRequestMutation,
    useGetRequiredDocsQuery,
    useUploadRequiredDocsMutation,
    useFindByAbnWorkplaceMutation,
    useApplyWorkplaceOnExistingIndustryMutation,
    useAddCustomIndustyForWorkplaceMutation,
    useStudentCoursesQuery,
    useChangeStudentPasswordMutation,
    useUpdateStudentDetailMutation,
    useChangeStudentStatusMutation,

    // -- COUNT -- //
    useStatisticsQuery,
} = subAdminApi

export const SubAdminApi = {
    Count: {
        statistics: useStatisticsQuery,
    },
    SubAdmin: {
        useProfile: useProfileQuery,
        useUpdateProfile: useUpdateSubAdminProfileMutation,
    },
    Notes: {
        useList: useNotesQuery,
        useCreate: useNoteAddMutation,
        useDelete: useNoteDeleteMutation,
        useStatusChange: useNoteStatusChangeMutation,
    },

    Student: {
        useChangePassword: useChangeStudentPasswordMutation,
        useUpdateDetail: useUpdateStudentDetailMutation,
        changeStatus: useChangeStudentStatusMutation,
    },
    Workplace: {
        AgreementSign: useAgrementSignMutation,
        useStartPlacementMutation,
        useIndustryResponseMutation,
        useAssignToSubAdminMutation,
        useCompletePlacementMutation,
        useTerminatePlacementMutation,
        useGetMyStudentsWorkplacesQuery,
        useGetSubAdminWorkplacesQuery,
        useGetCancelledWorkplacesQuery,
        useGetSubAdminFilteredWorkplacesQuery,
        useSendInterviewNotificationMutation,
        useForwardWorkplaceToIndustryMutation,
        useAddWorkplaceNoteMutation,
        useGetWorkplaceFoldersQuery,
        useUpdateWorkplaceStatusMutation,
        useCancelWorkplaceStatusMutation,
        useGetAddedByStudentsWorkplacesQuery,
        useSubAdminApplyStudentWorkplaceMutation,
        useAddCustomIndustryMutation,
        useShowExistingIndustriesQuery,
        useAddExistingIndustriesMutation,
        useChangeCustomIndustryStatusMutation,
    },

    Courses: {
        useStudentCourses: useStudentCoursesQuery,
    },
}
