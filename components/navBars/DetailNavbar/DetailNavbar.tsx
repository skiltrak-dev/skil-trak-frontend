import { useEffect, useState } from 'react'
import { HeaderLogo } from '../NavbarLogo'

// Icons
import { IoMdNotifications } from 'react-icons/io'
import { MdMessage } from 'react-icons/md'

// components
import { useRouter } from 'next/router'
import OutsideClickHandler from 'react-outside-click-handler'
import { BadgeButton, MessageDropDown } from '../AdminNavbar/components'
import { NotificationDropDown } from '../AdminNavbar/components/notifications'

import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { DisplayNotifications } from '@components/Notification'
import { MediaQueries, UserRoles } from '@constants'
import { CommonApi } from '@queries'
import Link from 'next/link'
import {
    BsFillTicketDetailedFill,
    BsFillCloudDownloadFill,
} from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'
import { ProfileOptionsDropDown } from './components'
import { ProfileOptionButton } from './components/profileOption/ProfileOptionButton'
import { useSocketListener } from '@hooks'
export const DetailNavbar = () => {
    const router = useRouter()

    const { eventListener } = useSocketListener()

    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const data = CommonApi.Notifications.useNotifications({
        skip: undefined,
        limit: undefined,
    })
    const ticketCount = CommonApi.Tickets.useGetTicketCountQuery()

    const { data: mailCount } = CommonApi.Messages.useMailCount()
    const allMails = CommonApi.Messages.useRecentMails()

    const [isReadNotification, resultIsReadNotification] =
        CommonApi.Notifications.useIsReadNotification()
    const [seenMessage, resultSeenMessage] = CommonApi.Messages.useIsSeen()

    const [messagesExpanded, setMessagesExpanded] = useState(false)
    const [notificationsExpanded, setNotificationsExpanded] = useState(false)
    const [profileOptionsExpanded, setProfileOptionsExpanded] = useState(false)

    useEffect(() => {
        if (eventListener) {
            data.refetch()
        }
    }, [eventListener])

    // filter over data to get only unread notifications
    const unreadNotifications = data?.data?.data?.filter(
        (notification: any) => !notification?.isRead
    )
    const count = unreadNotifications?.length

    return (
        <div className="w-full z-50 px-2 md:px-8 py-2 bg-white border-b border-secondary-dark flex justify-between items-center">
            <div className="flex justify-between items-center">
                <HeaderLogo />
            </div>

            <div className="flex items-center gap-x-4 md:gap-x-8">
                <AuthorizedUserComponent roles={[UserRoles.STUDENT]}>
                    <Link legacyBehavior href={'/portals/student/history'}>
                        <a
                            className={` ${
                                router.pathname === '/portals/student/history'
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-slate-700'
                            } transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md hover:bg-green-100 hover:text-green-700`}
                        >
                            <span>
                                <BsFillTicketDetailedFill />
                            </span>
                            <span className="text-sm font-semibold">
                                History
                            </span>
                        </a>
                    </Link>
                </AuthorizedUserComponent>

                <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                    <div className="relative">
                        <Link
                            legacyBehavior
                            href={'/portals/sub-admin/tickets?tab=all-tickets'}
                        >
                            <a
                                className={` ${
                                    router.pathname ===
                                    '/portals/sub-admin/tickets'
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-slate-700'
                                } transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md hover:bg-green-100 hover:text-green-700`}
                            >
                                <span>
                                    <BsFillTicketDetailedFill />
                                </span>
                                <span className="text-sm font-semibold">
                                    Tickets
                                </span>
                            </a>
                        </Link>
                        <span className="w-5 h-5 flex items-center justify-center text-center text-white absolute -top-2 -right-2 bg-error rounded-full text-xs">
                            {ticketCount?.data}
                        </span>
                    </div>
                </AuthorizedUserComponent>
                <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                    <div className="relative">
                        <Link
                            legacyBehavior
                            href={'/portals/sub-admin/downloads'}
                        >
                            <a
                                className={` ${
                                    router.pathname ===
                                    '/portals/sub-admin/downloads'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-slate-700'
                                } transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md hover:bg-orange-100 hover:text-orange-700`}
                            >
                                <span>
                                    <BsFillCloudDownloadFill />
                                </span>
                                <span className="text-sm font-semibold">
                                    Downloads
                                </span>
                            </a>
                        </Link>
                        {/* <span className="w-5 h-5 flex items-center justify-center text-center text-white absolute -top-2 -right-2 bg-error rounded-full text-xs">
                            {ticketCount?.data}
                        </span> */}
                    </div>
                </AuthorizedUserComponent>

                <OutsideClickHandler
                    onOutsideClick={() => {
                        setMessagesExpanded(false)
                    }}
                >
                    <div className="relative">
                        <BadgeButton
                            icon={MdMessage}
                            count={mailCount?.count || 0}
                            max={9}
                            onClick={() => setMessagesExpanded(true)}
                            text={'E-mails'}
                        />

                        <MessageDropDown
                            data={allMails}
                            expanded={messagesExpanded}
                            resultSeenMessage={resultSeenMessage}
                            seenMessage={seenMessage}
                        />
                    </div>
                </OutsideClickHandler>

                <OutsideClickHandler
                    onOutsideClick={() => {
                        setNotificationsExpanded(false)
                    }}
                >
                    <div className="relative">
                        <BadgeButton
                            icon={IoMdNotifications}
                            count={count || 0}
                            max={9}
                            onClick={() =>
                                setNotificationsExpanded(!notificationsExpanded)
                            }
                            text={'Notifications'}
                        />

                        <NotificationDropDown
                            expanded={notificationsExpanded}
                            data={data?.data}
                            isReadNotification={isReadNotification}
                            resultIsReadNotification={resultIsReadNotification}
                            setNotificationsExpanded={(value: boolean) => {
                                setNotificationsExpanded(value)
                            }}
                        />
                    </div>
                </OutsideClickHandler>

                <OutsideClickHandler
                    onOutsideClick={() => {
                        setProfileOptionsExpanded(false)
                    }}
                >
                    <div className="relative">
                        <ProfileOptionButton
                            expanded={profileOptionsExpanded}
                            onClick={() => setProfileOptionsExpanded(true)}
                        />

                        <ProfileOptionsDropDown
                            expanded={profileOptionsExpanded}
                            setExpanded={setProfileOptionsExpanded}
                        />
                    </div>
                </OutsideClickHandler>
            </div>
            <DisplayNotifications />
        </div>
    )
}
