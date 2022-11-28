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

    // useEffect(() => {}, [checkStatusResult])

    return (
        <div>
            {checkStatusResult.data?.status === 'pending' && (
                <Alert
                    title="Your Account is Under Review"
                    description="Your request is waiting for approval. Meanwhile, your functionalities will be limited "
                    variant="warning"
                    autoDismiss={false}
                />
            )}

            {checkStatusResult.data?.status === 'rejected' && (
                <Alert
                    title="Your Account is Rejected"
                    description="Your request is waiting for approval. Meanwhile, your functionalities will be limited "
                    variant="error"
                    autoDismiss={false}
                />
            )}
        </div>
    )
}
