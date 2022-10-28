import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const workplaceRequestApi = createApi({
    reducerPath: 'workplaceRequestApi',
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
    tagTypes: ['Workplace'],
    endpoints: (builder) => ({
        workPlaceRequest: builder.mutation({
            query: (body) => ({
                url: `workplace-requests`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Workplace'],
        }),
        getCourseDocuments: builder.query({
            query: ({ id, courses }: any) => {
                return {
                    url: `requireddocs/${id}`,
                    params: { course: courses[0] },
                }
            },
            providesTags: ['Workplace'],
        }),
    }),
})

export const {
    useGetCourseDocumentsQuery,
    useWorkPlaceRequestMutation,
    //   useUpdateJobMutation,
    //   useRemoveJobMutation,
} = workplaceRequestApi
