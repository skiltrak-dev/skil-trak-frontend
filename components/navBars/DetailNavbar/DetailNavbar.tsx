import React, { useState } from 'react'
import { HeaderLogo } from '../NavbarLogo'

// Icons
import { MdMessage, MdKeyboardArrowDown } from 'react-icons/md'
import { IoMdNotifications } from 'react-icons/io'

// components
import {
    BadgeButton,
    MessageDropDown,
    NavbarBreadCrumbs,
} from '../AdminNavbar/components'
import { useNavbar } from '@hooks'
import { useRouter } from 'next/router'
import OutsideClickHandler from 'react-outside-click-handler'
import { NotificationDropDown } from '../AdminNavbar/components/notifications'

import { ProfileOptionsDropDown } from './components'
import { ProfileOptionButton } from './components/profileOption/ProfileOptionButton'
import { DisplayNotifications } from '@components/Notification'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'
import { CommonApi } from '@queries'
export const DetailNavbar = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const data =
        CommonApi.Notifications.useNotifications({
            skip: undefined,
            limit: undefined,
        })

    const { data: mailCount } = CommonApi.Messages.useMailCount()
    const allMails = CommonApi.Messages.useRecentMails()

    const [isReadNotification, resultIsReadNotification] =
        CommonApi.Notifications.useIsReadNotification()
    const [seenMessage, resultSeenMessage] = CommonApi.Messages.useIsSeen()

    const [messagesExpanded, setMessagesExpanded] = useState(false)
    const [notificationsExpanded, setNotificationsExpanded] = useState(false)
    const [profileOptionsExpanded, setProfileOptionsExpanded] = useState(false)
    // filter over data to get only unread notifications
    const unreadNotifications = data?.data?.data?.filter(
        (notification: any) => notification?.isRead === false
    )
    const count = unreadNotifications?.length

    return (
        <div className="w-full z-50 px-2 md:px-8 py-2 bg-white border-b border-secondary-dark flex justify-between items-center">
            <div className="flex justify-between items-center">
                <HeaderLogo />
            </div>

            <div className="flex items-center gap-x-4 md:gap-x-8">
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
                            text={'Messages'}
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
