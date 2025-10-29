import React, { useEffect, useState } from 'react'
import { RtoApi } from '@queries'
import { ApprovedPlacementCard } from './card'
import { useRouter } from 'next/router'
import { WpAppRequEnum } from './enum'
import { LoadingAnimation, NoData } from '@components'
import { RtoApprovalWorkplaceRequest } from '@types'

export const ApprovedPlacement = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const wpApproval = RtoApi.Workplace.wpApprovalRequestByStatus(
        {
            search: `status:${WpAppRequEnum.APPROVED}`,
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
                            <ApprovedPlacementCard
                                key={approval?.id}
                                approval={approval}
                            />
                        )
                    )}
                </div>
            ) : (
                wpApproval.isSuccess && (
                    <NoData text="There is no approved list!" />
                )
            )}
        </div>
    )
}
