import { ReactElement, useState } from 'react'
// Layouts
import { StudentLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import { Card, EmptyData, LoadingAnimation, Pagination, TechnicalError, Typography } from '@components'
import { IoNotifications } from 'react-icons/io5'
import moment from 'moment'
import { GoPrimitiveDot } from 'react-icons/go'
import { CommonApi } from '@queries'
import { ellipsisText } from '@utils'


const SubAdminAllNotifications: NextPageWithLayout = () => {
    const { data: notifications, isError, isLoading } =
        CommonApi.Notifications.useNotifications()
    const [readNotifications, resultReadNotifications] =
        CommonApi.Notifications.useIsReadNotification()

    return (
        <Card>
            {isError && <TechnicalError />}
            {!isLoading ? (
                <>
                    <div className="flex flex-col">
                        {notifications?.length > 0 || notifications?.length > 0 ? (
                            <>
                                <div className="flex justify-end mb-4">
                                    {/* <Pagination
                                        pageCount={data?.pagination?.totalPage}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                    /> */}
                                </div>
                                {notifications?.map((notification: any, i: any) => (
                                    <div
                                        key={notification.id}
                                        onClick={() =>
                                            readNotifications(notification)
                                        }
                                        className={`${!notification.isRead
                                            ? "bg-gray-50"
                                            : ""
                                            } w-full flex items-center gap-x-4 rounded-md border-b border-secondary px-2 py-1.5 cursor-pointer hover:bg-secondary transition-all`}
                                    >
                                        <div className="w-12 h-11 relative">
                                            <img
                                                src={
                                                    notification.avatar ||
                                                    `https://picsum.photos/80/${80 + i
                                                    }`
                                                }
                                                alt="Notify"
                                                className="w-full h-full rounded-full"
                                            />
                                            <div className="p-0.5 rounded-full bg-gray-800 absolute bottom-0 right-0">
                                                <IoNotifications className="text-white text-xs" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <Typography
                                                    variant={"subtitle"}
                                                >
                                                    {notification.title}
                                                </Typography>
                                                <Typography
                                                    variant={"muted"}
                                                    color={
                                                        notification.isRead
                                                            ? "grayLight"
                                                            : "black"
                                                    }
                                                >
                                                    <span
                                                        className={`${!notification.isRead
                                                            ? "font-bold"
                                                            : ""
                                                            }`}
                                                    >
                                                        {ellipsisText(
                                                            notification.description,
                                                            70
                                                        )}
                                                    </span>
                                                </Typography>
                                                <Typography
                                                    variant={"muted"}
                                                    color={"grayLight"}
                                                >
                                                    {moment(
                                                        notification.createdAt,
                                                        "YYYYMMDD"
                                                    ).fromNow()}
                                                </Typography>
                                            </div>
                                            {!notification.isRead && (
                                                <GoPrimitiveDot className="text-xl" />
                                            )}
                                        </div>
                                    </div>
                                ))}
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

SubAdminAllNotifications.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'All Notifications' }}>
            {page}
        </StudentLayout>
    )
}

export default SubAdminAllNotifications
