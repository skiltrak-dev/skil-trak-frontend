import { NoData, Typography } from '@components'
import { NotificationItem } from './NotificationItem'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PulseLoader } from 'react-spinners'
import { getUserCredentials } from '@utils'
import { Bell } from 'lucide-react'

interface NotificationDropDown {
    expanded: boolean
    data: any
    isReadNotification: any
    resultIsReadNotification: any
    setNotificationsExpanded: (value: boolean) => void
}
export const NotificationDropDown = ({
    expanded,
    data,
    isReadNotification,
    resultIsReadNotification,
    setNotificationsExpanded,
}: NotificationDropDown) => {
    console.log('data', data)
    // const { data, error, isLoading } = CommonApi.Notifications.useNotifications()
    // const [isReadNotification, resultIsReadNotification] = CommonApi.Notifications.useIsReadNotification()
    const router = useRouter()
    const getRole = getUserCredentials()
    const role = (userRole: any) => {
        switch (userRole) {
            case 'subadmin':
                return 'sub-admin'
            case 'admin':
                return 'admin'
            case 'rto':
                return 'rto'
            case 'industry':
                return 'industry'
            case 'student':
                return 'student'
        }
        return userRole
    }
    return (
        <>
            <div
                className={`absolute top-10  -right-5 z-40 bg-white w-80 transition-all rounded-lg ${
                    !expanded ? 'max-h-0' : 'max-h-96 shadow-md border'
                } `}
            >
                <div className="relative">
                    <div className="absolute -top-5 right-20 !z-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="22"
                            viewBox="0 0 27 22"
                            fill="none"
                        >
                            <path
                                d="M13.5 0L26.0574 21.75H0.942632L13.5 0Z"
                                fill="#FD7A7C"
                            />
                        </svg>
                    </div>
                    <div className="py-2 bg-red-400 px-4 rounded-t-lg border-b flex gap-x-2 items-center">
                        <div>
                            {' '}
                            <Bell className="text-white" />
                        </div>
                        <Typography variant="label" color="text-white">
                            Notifications
                        </Typography>
                    </div>
                    <div className="overflow-auto max-h-80 remove-scrollbar">
                        {data?.isLoading ? (
                            <PulseLoader color={'white'} size={10} />
                        ) : data?.data?.length > 0 ? (
                            <div className="relative">
                                {data?.data?.map((notification: any) => (
                                    <NotificationItem
                                        key={notification.id}
                                        title={notification?.title}
                                        description={notification?.description}
                                        timestamp={notification?.createdAt}
                                        resultIsReadNotification={
                                            resultIsReadNotification
                                        }
                                        isRead={notification?.isRead}
                                        onClick={() => {
                                            // router.push(
                                            //     notification?.link ||
                                            //         `/portals/${role(getRole?.role)}`
                                            // )
                                            setNotificationsExpanded(false)
                                            // router.push(`/portals/${notification?.link}`)
                                            // router.push(
                                            //     getRole?.role === 'admin'
                                            //         ? `/portals/admin/all-notifications`
                                            //         : `/portals/${role(
                                            //               getRole?.role
                                            //           )}/notifications/all-notifications`
                                            // )
                                            isReadNotification(notification?.id)
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NoData text="No New Notifications were Found" />
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Link
                            legacyBehavior
                            href={
                                getRole?.role === 'admin'
                                    ? `/portals/admin/all-notifications`
                                    : `/portals/${role(
                                          getRole?.role
                                      )}/notifications/all-notifications`
                            }
                        >
                            <a className="text-sm w-full font-semibold cursor-pointer  bg-white border-t border-[#D0D0D0] shadow-lg py-3 px-4 text-center rounded-b-lg text-red-400">
                                View All
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
