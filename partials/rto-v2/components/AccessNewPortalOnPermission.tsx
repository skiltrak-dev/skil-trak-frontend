import { LoadingAnimation, PageNotFound } from '@components'
import { RtoApi } from '@queries'
import { ReactNode, useEffect } from 'react'
import { setRtoDetail, useAppDispatch } from '@redux'

export const AccessNewPortalOnPermission = ({
    children,
}: {
    children: ReactNode
}) => {
    const rto = RtoApi.Rto.useProfile()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (rto?.isSuccess && rto?.data) {
            dispatch(setRtoDetail(rto.data))
        }
    }, [rto?.isSuccess, rto?.data, dispatch])

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
