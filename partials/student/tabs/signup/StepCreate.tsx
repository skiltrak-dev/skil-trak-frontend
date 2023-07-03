import { Popup, ShowErrorNotifications } from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { AuthApi } from '@queries'
import {
    OptionType,
    RtoFormData,
    StudentFormQueryType,
    StudentFormType,
} from '@types'
import { AuthUtils, SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const StepCreate = () => {
    const router = useRouter()
    const formData: StudentFormType = SignUpUtils.getValuesFromStorage()
    const [register, registerResult] = AuthApi.useRegisterStudent()
    const [login, loginResult] = AuthApi.useLogin()
    const { notification } = useNotification()

    useEffect(() => {
        const createAccount = async () => {
            if (formData) {
                const values = {
                    ...formData,
                    courses: formData?.courses?.map(
                        (c: OptionType) => c?.value
                    ),
                    sectors: formData?.sectors?.map(
                        (s: OptionType) => s?.value
                    ),
                    role: UserRoles.STUDENT,
                }

                await register(values as StudentFormQueryType)
            }
        }

        createAccount()
    }, [])

    useEffect(() => {
        if (registerResult.isSuccess) {
            const loginUser = async () => {
                await login({
                    email: formData.email,
                    password: formData.password,
                })
            }

            loginUser()
        }
        if (registerResult.isError) {
            SignUpUtils.setEditingMode(true)
            router.push({ query: { step: 'account-info' } })
        }
    }, [registerResult])

    useEffect(() => {
        if (loginResult.isSuccess) {
            if (loginResult.data) {
                AuthUtils.setToken(loginResult.data.access_token)
            }

            router.push('/portals/student')
        }
    }, [loginResult])

    return (
        <div>
            <ShowErrorNotifications result={registerResult} />
            <Popup
                variant="info"
                title={'Creating Account...'}
                subtitle={
                    'You will be redirected to dashboard once your account is created'
                }
            />
        </div>
    )
}
