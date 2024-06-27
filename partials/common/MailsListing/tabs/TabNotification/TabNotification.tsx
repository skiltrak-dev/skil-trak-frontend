import { CommonApi } from '@queries'
import React, { useState } from 'react'
import { NotificationLoadingSkeleton, NotificationTopBar } from './components'
import { useFunctions } from '../hooks'
import { NotificationViewCard } from './Cards'
import { EmptyData } from '@components'

export const TabNotification = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(20)

    const notifications = CommonApi.Notifications.useNotifications({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onPageChange = (type: string) => {
        if (type === 'prev' && page > 1) {
            setPage(page - 1)
        } else if (
            type === 'next' &&
            notifications?.data?.pagination?.hasNext
        ) {
            setPage(page + 1)
        }
    }
    return (
        <div>
            <NotificationTopBar
                hasPrev={page > 1}
                refetch={notifications?.refetch}
                pagination={notifications?.data?.pagination}
                onPageChange={onPageChange}
            />

            <div>
                {notifications?.isLoading || notifications?.isFetching ? (
                    [...Array(10)].map((_, i) => (
                        <NotificationLoadingSkeleton key={i} />
                    ))
                ) : notifications?.data?.data &&
                  notifications?.data?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-2.5">
                        {notifications?.data?.data?.map((notification: any) => (
                            <NotificationViewCard
                                key={notification?.id}
                                notification={notification}
                            />
                        ))}
                    </div>
                ) : notifications?.isSuccess ? (
                    <EmptyData />
                ) : null}
            </div>
        </div>
    )
}
