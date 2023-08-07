// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

// initialize an empty api service that we'll inject endpoints into later as needed

export const refreshTokenApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            // const token = AuthUtils.getToken()
            const token = AuthUtils.refreshToken()

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    endpoints: (build) => ({
        refreshToken: build.mutation<any, void>({
            query: () => ({
                url: `auth/refresh/token`,
                method: 'POST',
            }),
        }),
    }),
})

export const { useRefreshTokenMutation } = refreshTokenApi
