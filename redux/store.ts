import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
    industryApi,
    authApi,
    commonApi,
    studentJobsApi,
    studentSignUpApi,
    studentCoursesApi,
    workplaceRequestApi,
    studentAppointmentsApi,
    studentAssessmentEvidenceApi,
    adminApi,
    studentAssessmentApi,
    studentFindAbnApi,
    studentProfileApi,
    rtoApi,
    subAdminApi,
} from '@queries'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [industryApi.reducerPath]: industryApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
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
        [rtoApi.reducerPath]: rtoApi.reducer,
        [subAdminApi.reducerPath]: subAdminApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            industryApi.middleware,
            commonApi.middleware,
            adminApi.middleware,
            studentJobsApi.middleware,
            studentCoursesApi.middleware,
            workplaceRequestApi.middleware,
            studentAppointmentsApi.middleware,
            studentAssessmentEvidenceApi.middleware,
            studentAssessmentApi.middleware,
            studentFindAbnApi.middleware,
            studentProfileApi.middleware,
            rtoApi.middleware,
            subAdminApi.middleware,
        ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
