import { LoadingAnimation, NoData } from '@components'
import { RejectPlacementCard } from '@partials/rto-v2/approve-placement/card'
import { WpAppRequEnum } from '@partials/rto-v2/approve-placement/enum'
import { SubAdminApi } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const RejectedPlacementRequest = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const wpApproval = SubAdminApi.Workplace.useRtoWpApprovalRequestApprovedList(
        {
            search: `status:${WpAppRequEnum.REJECTED}`,
            limit: itemPerPage,
            skip: itemPerPage * page - itemPerPage,
        },
        {
            refetchOnMountOrArgChange: 30,
        }
    )

    return (
        <div>
            {wpApproval.isError && (
                <NoData text="There is some technical issue!" isError />
            )}
            {wpApproval.isLoading || wpApproval.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : wpApproval?.data?.data && wpApproval?.data?.data.length > 0 ? (
                <div className="space-y-3">
                    {wpApproval?.data?.data?.map(
                        (approval: RtoApprovalWorkplaceRequest) => (
                            <RejectPlacementCard
                                key={approval?.id}
                                approval={approval}
                            />
                        )
                    )}
                </div>
            ) : (
                wpApproval.isSuccess && (
                    <NoData text="There is no rejected list!" />
                )
            )}
        </div>
    )
}
