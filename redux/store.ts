import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
    authApi,
    studentJobsApi,
    studentCoursesApi,
    workplaceRequestApi,
    studentAppointmentsApi,
} from '@queries'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [studentJobsApi.reducerPath]: studentJobsApi.reducer,
        [studentCoursesApi.reducerPath]: studentCoursesApi.reducer,
        [workplaceRequestApi.reducerPath]: workplaceRequestApi.reducer,
        [studentAppointmentsApi.reducerPath]: studentAppointmentsApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            studentJobsApi.middleware,
            studentCoursesApi.middleware,
            workplaceRequestApi.middleware,
            studentAppointmentsApi.middleware,
        ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
