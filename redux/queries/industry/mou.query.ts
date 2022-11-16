import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthUtils } from '@utils'
export const mouApi = createApi({
  reducerPath: "mouApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_END_POINT,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState()).usersSlice.token;
      const token = AuthUtils.getToken();

      // // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["MOU"],
  endpoints: (builder) => ({
    getMOU: builder.query({
      query: ({ skip, limit, sort, search }) => {
        return {
          url: "industries/mou/list",
          params: { skip, limit, sort, search },
        };
      },
      providesTags: ["MOU"],
    }),
    getMOUDetail: builder.query({
      query: (id) => {
        return {
          url: `industries/mou/view/${id}`,
        };
      },
      providesTags: ["MOU"],
    }),
    mou: builder.mutation({
      query: (body) => ({
        url: `industries/mou/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["MOU"],
    }),
    cancelMOU: builder.mutation({
      query: (id) => ({
        url: `industries/mou/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MOU"],
    }),
    acceptSignRequest: builder.mutation({
      query: (body) => ({
        url: `industries/mou/sign/${body.id}`,
        method: "PATCH",
        body: { IndustrySignature: body.IndustrySignature },
      }),
      invalidatesTags: ["MOU"],
    }),
    rejectMOU: builder.mutation({
      query: (id) => ({
        url: `industries/mou/reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["MOU"],
    }),
    getDefaultMouContent: builder.query({
      query: () => "mou/default",
      providesTags: ["MOU"],
    }),
  }),
});
export const {
  useGetMOUQuery,
  useGetMOUDetailQuery,
  useGetDefaultMouContentQuery,
  useMouMutation,
  useCancelMOUMutation,
  useRejectMOUMutation,
  useAcceptSignRequestMutation,
} = mouApi;
