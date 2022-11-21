import { useMutation } from '@tanstack/react-query'

export type LoginParams = {
   email: string
   password: string
}

const login = async (body: LoginParams) => {
   // return data
}

export const AuthQuery = {
   useLogin: () => useMutation(login),
   useRegisterRto: null,
   useRegisterStudent: null,
   useRegisterIndustry: null,
   useRegisterSubAdmin: null,
   useRtoPackages: null,
   useUserStatus: null,
   useCheckEmail: null,
}
