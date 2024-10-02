import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { getSession } from 'next-auth/react'
export const stripeApi = createApi({
    reducerPath: 'stripeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/stripe/`,
        prepareHeaders: async (headers, { getState }) => {
            // const token = AuthUtils.getToken()
            // const token = AuthUtils.token()

            const session: any = await getSession()

            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`)
            // }
            if (session?.accessToken) {
                headers.set('authorization', `Bearer ${session?.accessToken}`)
            }

            return headers
        },
    }),
    tagTypes: ['Stripe'],
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation<any, any>({
            query: (body: any) => {
                return {
                    url: 'checkout',
                    method: 'POST',
                    body,
                }
            },
        }),

        activateUser: builder.mutation<any, any>({
            query: (body: any) => {
                return {
                    url: 'activate-user',
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const { useCreateCheckoutSessionMutation, useActivateUserMutation } =
    stripeApi
