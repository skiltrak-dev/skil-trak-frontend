import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// Icons
import { IoNotifications } from 'react-icons/io5'

// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'

// hooks
import { useNotification } from '@hooks'

// query
import { useGetIndustryNotificationsQuery } from '@queries'

// utills

export const Notifications = () => {
    const router = useRouter()

    // hooks
    const { notification } = useNotification()

    const [notifications, setNotifications] = useState([])
    const [resultsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    // query
    const { data, isLoading, isError } = useGetIndustryNotificationsQuery({
        skip: resultsPerPage * (currentPage - 1),
        limit: resultsPerPage,
    })

    useEffect(() => {
        if (data) {
            setNotifications(data?.data)
        }
    }, [data])

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
                                                    {' '}
                                                    {/* {notification.title} */}
                                                </Typography>
                                                <Typography
                                                    variant={'muted'}
                                                    // color={notification.isRead ? 'grayLight' : 'black'}
                                                >
                                                    {' '}
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
                                                    {' '}
                                                    {/* {moment(notification.createdAt, 'YYYYMMDD').fromNow()} */}
                                                </Typography>
                                            </div>
                                            {/* {!notification.isRead && (
                        <GoDotFill className="text-xl" />
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
