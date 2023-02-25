import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

// Icons
import { GoPrimitiveDot } from 'react-icons/go'
import { IoNotifications } from 'react-icons/io5'

// components
import {
    Card,
    LoadingAnimation,
    EmptyData,
    Pagination,
    Typography,
    TechnicalError,
} from 'components'

// hooks
import { useContextBar, useNotification } from 'hooks'

// query
import { useGetNotificationsQuery, useReadNotificationMutation } from '@queries'

// utills
import { ellipsisText } from '@utils'

export const Notifications = () => {
    const router = useRouter()

    // hooks
    const { notification } = useNotification()

    const [notifications, setNotifications] = useState([])
    const [resultsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    // query
    const { data, isLoading, refetch, isError } = useGetNotificationsQuery({
        skip: resultsPerPage * (currentPage - 1),
        limit: resultsPerPage,
    })
    const [readNotification] = useReadNotificationMutation()

    const { setContent } = useContextBar()

    useEffect(() => {
        setContent(<>SAAD</>)
    }, [setContent])

    useEffect(() => {
        refetch()
    }, [refetch])

    useEffect(() => {
        if (data) {
            setNotifications(data?.data)
        }
    }, [data])

    // useEffect(() => {
    //   if (notificationList) {
    //     setNotifications((n) => [notificationList, ...n])
    //     setNotificationList(null)
    //   }
    // }, [notificationList, setNotificationList])

    // const readNotifications = async (notification) => {
    //   await readNotification(notification.id)
    //   navigate(notification.link)
    // }

    return (
        <Card>
            {isError && <TechnicalError />}
            {!isLoading ? (
                <>
                    <div className="flex flex-col">
                        {data?.data?.length > 0 || notifications.length > 0 ? (
                            <>
                                <div className="flex justify-end mb-4">
                                    {/* <Pagination
                    pageCount={data?.pagination?.totalPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  /> */}
                                </div>
                                {notifications?.map((notification, i) => (
                                    <div
                                        key={i}
                                        // onClick={() => readNotifications(notification)}
                                        // className={`${
                                        //   !notification.isRead ? 'bg-gray-50' : ''
                                        // } w-full flex items-center gap-x-4 rounded-md border-b border-secondary px-2 py-1.5 cursor-pointer hover:bg-secondary transition-all`}
                                    >
                                        <div className="w-12 h-11 relative">
                                            <div className="p-0.5 rounded-full bg-gray-800 absolute bottom-0 right-0">
                                                <IoNotifications className="text-white text-xs" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <Typography
                                                    variant={'subtitle'}
                                                >
                                                    {/* {notification.title} */}
                                                </Typography>
                                                <Typography
                                                    variant={'muted'}
                                                    // color={notification.isRead ? 'grayLight' : 'black'}
                                                >
                                                    {/* <span
                            className={`${
                              !notification.isRead ? 'font-bold' : ''
                            }`}
                          >
                            {elipiciseText(notification.description, 70)}
                          </span> */}
                                                </Typography>
                                                <Typography
                                                    variant={'muted'}
                                                    color={'grayLight'}
                                                >
                                                    {/* {moment(notification.createdAt, 'YYYYMMDD').fromNow()} */}
                                                </Typography>
                                            </div>
                                            {/* {!notification.isRead && (
                        <GoPrimitiveDot className="text-xl" />
                      )} */}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            !isError && (
                                <EmptyData
                                    title={'No Notifications were found'}
                                    description={'No Notifications were found'}
                                />
                            )
                        )}
                    </div>
                </>
            ) : (
                <LoadingAnimation />
            )}
        </Card>
    )
}
