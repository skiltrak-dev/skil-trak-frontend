import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

export const subAdminRtosApi = createApi({
  reducerPath: 'subAdminRtosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/`,
    prepareHeaders: (headers, { getState }) => {
      const token = AuthUtils.getToken()

      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['SubAdminRtos'],
  endpoints: (builder) => ({
    getSubAdminRtos: builder.query<any[], void>({
      query: () => {
        return {
          url: 'rtos/list',
        }
      },
      providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRTODetail: builder.query<any, string>({
      query: (id) => `rto/profile/${id}`,
      providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRtosStudents: builder.query<any[], string>({
      query: (id) => {
        return {
          url: `rto/students/list/${id}`,
          params: { id },
        }
      },
      providesTags: ['SubAdminRtos'],
    }),
    getSubAdminRtoAppointments: builder.query<any[], string>({
      query: (id) => {
        return {
          url: `rto/appointments/${id}`,
          params: { id },
        }
      },
      providesTags: ['SubAdminRtos'],
    }),

    updateSubAdminRtoStudentStatus: builder.mutation<any, any | null>({
      query: ({ id, status }: any) => {
        return {
          url: `student/update-status/${id}`,
          method: 'PATCH',
          body: { status },
        }
      },
      invalidatesTags: ['SubAdminRtos'],
    }),
    getRTOAssessmentTools: builder.query<any[], string>({
      query: (id) => `rto/assessment-tool/list/${id}`,
      providesTags: ['SubAdminRtos'],
    }),
  }),
})

export const {
  useGetSubAdminRtosQuery,
  useGetSubAdminRTODetailQuery,
  useGetRTOAssessmentToolsQuery,
  useGetSubAdminRtosStudentsQuery,
  useGetSubAdminRtoAppointmentsQuery,
  useUpdateSubAdminRtoStudentStatusMutation,
} = subAdminRtosApi
