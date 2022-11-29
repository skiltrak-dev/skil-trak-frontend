import { useEffect } from 'react'
import { AuthApi } from '@queries'
import { Alert } from '@components'
import { AuthUtils } from '@utils'

export const CheckStatus = () => {
    const credentials = AuthUtils.getUserCredentials()
    const [checkStatus, checkStatusResult] = AuthApi.useStatusCheck()

    useEffect(() => {
        if (credentials) {
            const checkUserStatus = async () => {
                await checkStatus(credentials.id)
            }

            checkUserStatus()
        }
    }, [])

    const getStatus = () => {
        const status = checkStatusResult.data?.status

        if (status) {
            switch (status) {
                case 'pending':
                    return (
                        <Alert
                            title="Your Account is Under Review"
                            description="Your request is waiting for approval. Meanwhile, your functionalities will be limited "
                            variant="warning"
                            autoDismiss={false}
                        />
                    )
                case 'rejected':
                    return (
                        <Alert
                            title="Your Account is Rejected"
                            description="Your request is waiting for approval. Meanwhile, your functionalities will be limited "
                            variant="error"
                            autoDismiss={false}
                        />
                    )
                default:
                    return null
            }
        }

        return null
    }

    return getStatus()
}
