import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const studentProfileApi = createApi({
    reducerPath: 'studentProfileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/students/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()

            // // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['StudentProfile'],
    endpoints: (builder) => ({
        getStudentProfileDetail: builder.query<any, void>({
            query: () => 'profile',
            providesTags: ['StudentProfile'],
        }),
        updateStudentProfile: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: 'profile/update',
                method: 'PATCH',
                // using student id to update when updating from admin or subadmin portal
                params: { student: id },
                body,
            }),
            invalidatesTags: ['StudentProfile'],
        }),
    }),
})

export const {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,
} = studentProfileApi
