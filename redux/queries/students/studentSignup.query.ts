import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const studentSignUpApi = createApi({
    reducerPath: 'studentSignUpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentSignUp'],
    endpoints: (builder) => ({
        updateStudentSignUp: builder.mutation<any[], void>({
            query: (body) => ({
                url: `students`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['StudentSignUp'],
        }),
    }),
})

export const { useUpdateStudentSignUpMutation } = studentSignUpApi
