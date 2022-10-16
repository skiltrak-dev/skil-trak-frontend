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

export const DetailNavbar = () => {
    const [messagesExpanded, setMessagesExpanded] = useState(false)
    const [notificationsExpanded, setNotificationsExpanded] = useState(false)
    const [profileOptionsExpanded, setProfileOptionsExpanded] = useState(false)

    return (
        <div className="w-full z-50 px-8 py-2 bg-white border-b border-secondary-dark flex justify-between items-center">
            <div className="flex justify-between items-center">
                <HeaderLogo />
            </div>

            <div className="flex items-center gap-x-8">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setMessagesExpanded(false)
                    }}
                >
                    <div className="relative">
                        <BadgeButton
                            icon={MdMessage}
                            count={4}
                            max={5}
                            onClick={() => setMessagesExpanded(true)}
                            text={'Messages'}
                        />

                        <MessageDropDown expanded={messagesExpanded} />
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
                            count={6}
                            max={5}
                            onClick={() => setNotificationsExpanded(true)}
                            text={'Notifications'}
                        />

                        <NotificationDropDown
                            expanded={notificationsExpanded}
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
                        />
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    )
}
