import { useEffect, useState } from 'react'

import {
    Card,
    EmptyData,
    LoadingAnimation,
    PageSize,
    Pagination,
    TechnicalError,
} from '@components'
import { CommonApi } from '@queries'
import { NotificationCard } from './components'
import { useRouter } from 'next/router'

export const AllNotifications = ({ userId }: { userId?: number }) => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const notifications = CommonApi.Notifications.useNotifications(
        {
            id: userId,
            limit: itemPerPage,
            skip: itemPerPage * page - itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    return (
        <>
            <Card>
                {notifications?.isError && <TechnicalError />}
                {notifications?.isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : notifications?.data && notifications?.data?.data?.length ? (
                    <div className="flex flex-col">
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <PageSize
                                    itemPerPage={itemPerPage}
                                    setItemPerPage={setItemPerPage}
                                    records={notifications?.data?.data?.length}
                                />
                                <Pagination
                                    pagination={notifications?.data?.pagination}
                                    setPage={setPage}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                {notifications?.data?.data?.map(
                                    (notification: any) => (
                                        <NotificationCard
                                            userId={userId}
                                            key={notification?.id}
                                            notification={notification}
                                        />
                                    )
                                )}
                            </div>
                        </>
                    </div>
                ) : notifications?.isSuccess ? (
                    <EmptyData
                        title={'No Pending Student!'}
                        description={'You have no pending Student request yet'}
                        height={'50vh'}
                    />
                ) : null}
            </Card>
        </>
    )
}
