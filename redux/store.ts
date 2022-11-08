import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
   authApi,
   studentJobsApi,
   studentCoursesApi,
   workplaceRequestApi,
   subAdminWorkplaceApi,
   studentAppointmentsApi,
   studentAssessmentEvidenceApi,
   rtoStudentsApi,
   rtoWorkplacesApi,
   rtoAssessmentToolsApi,
   subAdminRtosApi,
   subAdminIndustriesApi,
} from '@queries'

export const store = configureStore({
   reducer: {
      // Add the generated reducer as a specific top-level slice
      [authApi.reducerPath]: authApi.reducer,
      [rtoStudentsApi.reducerPath]: rtoStudentsApi.reducer,
      [rtoWorkplacesApi.reducerPath]: rtoWorkplacesApi.reducer,
      [rtoAssessmentToolsApi.reducerPath]: rtoAssessmentToolsApi.reducer,
      [subAdminRtosApi.reducerPath]: subAdminRtosApi.reducer,
      [subAdminIndustriesApi.reducerPath]: subAdminIndustriesApi.reducer,
      [studentJobsApi.reducerPath]: studentJobsApi.reducer,
      [studentCoursesApi.reducerPath]: studentCoursesApi.reducer,
      [workplaceRequestApi.reducerPath]: workplaceRequestApi.reducer,
      [studentAppointmentsApi.reducerPath]: studentAppointmentsApi.reducer,
      [subAdminWorkplaceApi.reducerPath]: subAdminWorkplaceApi.reducer,
      [studentAssessmentEvidenceApi.reducerPath]:
         studentAssessmentEvidenceApi.reducer,
   },
   // Adding the api middleware enables caching, invalidation, polling,
   // and other useful features of `rtk-query`.
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authApi.middleware,
         rtoStudentsApi.middleware,
         studentJobsApi.middleware,
         studentCoursesApi.middleware,
         workplaceRequestApi.middleware,
         subAdminWorkplaceApi.middleware,
         studentAppointmentsApi.middleware,
         studentAssessmentEvidenceApi.middleware,
      ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
