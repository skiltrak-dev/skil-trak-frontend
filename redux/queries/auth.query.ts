import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials } from "@types";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_HOST}/auth`,
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body: LoginCredentials) => ({
				url: `login`,
				method: "POST",
				body,
			}),
		}),

		checkStatus: builder.mutation({
			query: () => ({
				url: `user-status`,
				method: "POST",
			}),
		}),
	}),
});

const { useLoginMutation, useCheckStatusMutation } = authApi;
export const AuthApi = {
	useLoginMutation,
	useCheckStatusMutation,
};
