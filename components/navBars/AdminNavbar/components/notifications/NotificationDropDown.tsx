import { NoData, Typography } from '@components'
import { NotificationItem } from './NotificationItem'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PulseLoader } from 'react-spinners'
import { getUserCredentials } from '@utils'

interface NotificationDropDown {
    expanded: boolean
    data: any
    isReadNotification: any
    resultIsReadNotification: any
}
export const NotificationDropDown = ({
    expanded,
    data,
    isReadNotification,
    resultIsReadNotification,
}: NotificationDropDown) => {
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
        <div
            className={`absolute top-10 overflow-scroll -right-5 z-40 bg-white w-80 transition-all rounded-lg remove-scrollbar ${
                !expanded ? 'max-h-0' : 'max-h-96 shadow-md border'
            } `}
        >
            <div className="py-2 px-4 border-b flex justify-between items-center">
                <Typography variant="label">Your Messages</Typography>
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
                    <a className="text-sm text-primary font-semibold cursor-pointer">
                        View All
                    </a>
                </Link>
            </div>
            {data?.isLoading ? (
                <PulseLoader color={'white'} size={10} />
            ) : data?.data?.length > 0 ? (
                data?.data?.map((notification: any) => (
                    <NotificationItem
                        key={notification.id}
                        title={notification?.title}
                        description={notification?.description}
                        timestamp={notification?.createdAt}
                        resultIsReadNotification={resultIsReadNotification}
                        isRead={notification?.isRead}
                        onClick={() => {
                            // router.push(`/portals/${notification?.link}`)
                            router.push(
                                getRole?.role === 'admin'
                                    ? `/portals/admin/all-notifications`
                                    : `/portals/${role(
                                          getRole?.role
                                      )}/notifications/all-notifications`
                            )
                            isReadNotification(notification?.id)
                        }}
                    />
                ))
            ) : (
                <NoData text="No New Notifications were Found" />
            )}
        </div>
    )
}
