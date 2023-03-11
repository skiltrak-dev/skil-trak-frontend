import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
export const stripeApi = createApi({
    reducerPath: 'stripeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/stripe/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Stripe'],
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation<any, void>({
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
