import { ReactElement, useState } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    PageSize,
    Pagination,
    TechnicalError,
    Typography,
} from '@components'
import { IoNotifications } from 'react-icons/io5'
import moment from 'moment'
import { GoDotFill } from 'react-icons/go'
import { CommonApi } from '@queries'
import { ellipsisText } from '@utils'

const RtoPlacementNotifications: NextPageWithLayout = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const {
        data: notifications,
        isError,
        isLoading,
    } = CommonApi.Notifications.usePlacementNotifications({
        status: `placementStarted`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const [readNotifications, resultReadNotifications] =
        CommonApi.Notifications.useIsReadNotification()

    console.log('from Placement Notifications page', notifications)

    return (
        <Card>
            {isError && <TechnicalError />}
            {!isLoading ? (
                <>
                    <div className="flex flex-col">
                        {notifications?.data?.length > 0 ||
                        notifications?.data?.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <PageSize
                                        itemPerPage={itemPerPage}
                                        setItemPerPage={setItemPerPage}
                                    />
                                    <Pagination
                                        pagination={notifications?.pagination}
                                        setPage={setPage}
                                    />
                                </div>
                                {notifications?.data?.map(
                                    (notification: any, i: any) => (
                                        <div
                                            key={notification.id}
                                            onClick={() =>
                                                readNotifications(notification)
                                            }
                                            className={`${
                                                !notification.isRead
                                                    ? 'bg-gray-50'
                                                    : ''
                                            } w-full flex items-center gap-x-4 rounded-md border-b border-secondary px-2 py-1.5 cursor-pointer hover:bg-secondary transition-all`}
                                        >
                                            <div className="w-12 h-11 relative">
                                                {notification.avatar ? (
                                                    <>
                                                        <img
                                                            src={
                                                                notification?.avatar
                                                            }
                                                            alt="Notify"
                                                            className="w-full h-full rounded-full"
                                                        />
                                                        <div className="p-0.5 rounded-full bg-gray-800 absolute bottom-0 right-0">
                                                            <IoNotifications className="text-white text-xs" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <InitialAvatar
                                                        name={
                                                            notification?.title ||
                                                            ' '
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <Typography
                                                        variant={'subtitle'}
                                                    >
                                                        {notification.title}
                                                    </Typography>
                                                    <Typography
                                                        variant={'muted'}
                                                        color={
                                                            notification.isRead
                                                                ? 'grayLight'
                                                                : 'black'
                                                        }
                                                    >
                                                        <span
                                                            className={`${
                                                                !notification.isRead
                                                                    ? 'font-bold'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {ellipsisText(
                                                                notification.description,
                                                                70
                                                            )}
                                                        </span>
                                                    </Typography>
                                                    <Typography
                                                        variant={'muted'}
                                                        color={'grayLight'}
                                                    >
                                                        {moment(
                                                            notification.createdAt,
                                                            'YYYYMMDD'
                                                        ).fromNow()}
                                                    </Typography>
                                                </div>
                                                {!notification.isRead && (
                                                    <GoDotFill className="text-xl" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            !isError && <EmptyData actionLink={null} />
                        )}
                    </div>
                </>
            ) : (
                <LoadingAnimation />
            )}
        </Card>
    )
}

RtoPlacementNotifications.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout pageTitle={{ title: 'Placement Notifications' }}>
            {page}
        </RtoLayout>
    )
}

export default RtoPlacementNotifications
