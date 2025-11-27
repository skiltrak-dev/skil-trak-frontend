import { LoadingAnimation, PageNotFound } from '@components'
import { RtoApi } from '@queries'
import { ReactNode } from 'react'

export const AccessNewPortalOnPermission = ({
    children,
}: {
    children: ReactNode
}) => {
    const rto = RtoApi.Rto.useProfile()

    // useEffect(() => {
    //     if (rto?.isSuccess && !rto?.data?.canAccessNewPortal) {
    //         router.push('/portals/rto')
    //     }
    // }, [rto])

    if (rto?.isLoading)
        return (
            <div>
                <LoadingAnimation />
            </div>
        )

    return (
        <div>
            {rto?.isSuccess && rto?.data?.canAccessNewPortal ? (
                children
            ) : (
                <PageNotFound />
            )}
        </div>
    )
}
