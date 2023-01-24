import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
    availableShiftsApi,
    authApi,
    volunteerApi,
    commonApi,
    studentJobsApi,
    industryStudentsApi,
    industryCourseApi,
    jobsApi,
    studentSignUpApi,
    studentCoursesApi,
    workplaceRequestApi,
    studentAppointmentsApi,
    studentAssessmentEvidenceApi,
    industryWorkplaceApi,
    folderApi,
    adminApi,
    messageApi,
    studentAssessmentApi,
    studentFindAbnApi,
    studentProfileApi,
    mouApi,
    employeeApi,
    employeeTaskApi,
    industryAppointmentApi,
    rtoApi,
    subAdminApi,
    industriesApi,
    rplApi,
} from '@queries'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [volunteerApi.reducerPath]: volunteerApi.reducer,
        [availableShiftsApi.reducerPath]: availableShiftsApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [industryAppointmentApi.reducerPath]: industryAppointmentApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [industryStudentsApi.reducerPath]: industryStudentsApi.reducer,
        [folderApi.reducerPath]: folderApi.reducer,
        [industryCourseApi.reducerPath]: industryCourseApi.reducer,
        [employeeTaskApi.reducerPath]: employeeTaskApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [industryWorkplaceApi.reducerPath]: industryWorkplaceApi.reducer,
        [studentJobsApi.reducerPath]: studentJobsApi.reducer,
        [studentCoursesApi.reducerPath]: studentCoursesApi.reducer,
        [workplaceRequestApi.reducerPath]: workplaceRequestApi.reducer,
        [studentAppointmentsApi.reducerPath]: studentAppointmentsApi.reducer,
        [studentAssessmentEvidenceApi.reducerPath]:
            studentAssessmentEvidenceApi.reducer,
        [studentSignUpApi.reducerPath]: studentSignUpApi.reducer,
        [studentAssessmentApi.reducerPath]: studentAssessmentApi.reducer,

        [studentFindAbnApi.reducerPath]: studentFindAbnApi.reducer,
        [studentProfileApi.reducerPath]: studentProfileApi.reducer,
        [mouApi.reducerPath]: mouApi.reducer,

        [rtoApi.reducerPath]: rtoApi.reducer,
        [subAdminApi.reducerPath]: subAdminApi.reducer,

        [industriesApi.reducerPath]: industriesApi.reducer,
        [rplApi.reducerPath]: rplApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            volunteerApi.middleware,
            availableShiftsApi.middleware,
            commonApi.middleware,
            industryAppointmentApi.middleware,
            messageApi.middleware,
            industryStudentsApi.middleware,
            folderApi.middleware,
            industryCourseApi.middleware,
            employeeTaskApi.middleware,
            employeeApi.middleware,
            adminApi.middleware,
            jobsApi.middleware,
            studentJobsApi.middleware,
            studentCoursesApi.middleware,
            workplaceRequestApi.middleware,
            industryWorkplaceApi.middleware,
            studentAppointmentsApi.middleware,
            studentAssessmentEvidenceApi.middleware,
            studentAssessmentApi.middleware,
            studentFindAbnApi.middleware,
            studentProfileApi.middleware,
            mouApi.middleware,
            rtoApi.middleware,
            subAdminApi.middleware,
            industriesApi.middleware,
            rplApi.middleware,
        ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
