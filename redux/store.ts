import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
    adminApi,
    authApi,
    commonApi,
    industryApi,
    rtoApi,
    stripeApi,
    subAdminApi,
    studentApi,
    refreshTokenApi,
    managementApi,
    observerApi,
} from '@queries'
import { rtoV2Api } from '@queries/portals/rto-v2'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [industryApi.reducerPath]: industryApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [refreshTokenApi.reducerPath]: commonApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [managementApi.reducerPath]: managementApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [rtoApi.reducerPath]: rtoApi.reducer,
        [subAdminApi.reducerPath]: subAdminApi.reducer,
        [stripeApi.reducerPath]: stripeApi.reducer,
        [observerApi.reducerPath]: observerApi.reducer,
        [observerApi.reducerPath]: observerApi.reducer,
        [rtoV2Api.reducerPath]: rtoV2Api.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            industryApi.middleware,
            commonApi.middleware,
            adminApi.middleware,
            managementApi.middleware,
            studentApi.middleware,
            refreshTokenApi.middleware,
            rtoApi.middleware,
            subAdminApi.middleware,
            stripeApi.middleware,
            observerApi.middleware,
            rtoV2Api.middleware,
        ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
