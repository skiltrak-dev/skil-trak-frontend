import request from '@query/request'
import { useMutation } from '@tanstack/react-query'

export type LoginParams = {
    email: string
    password: string
}

const login = async (body: LoginParams) => {
    const { data } = await request({
        url: '/auth/login',
        method: 'post',
        data: body,
    })
    return data
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
