import { Typography } from 'components/Typography'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { CgProfile } from 'react-icons/cg'
import { IoLogOut } from 'react-icons/io5'

import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'
import { SideBarItem } from '@components/sideBars/SideBarItem'

import Image from 'next/image'

export const UserActions = () => {
    const router = useRouter()
    const [showOptions, setShowOptions] = useState(false)
    const [credentials, setCredentials] = useState<any>(null)

    useEffect(() => {
        if (!credentials) {
            if (AuthUtils.isAuthenticated()) {
                setCredentials(AuthUtils.getUserCredentials())
            }
        }
    }, [credentials])

    const ProfileOptions = [
        {
            text: 'My Profile',
            link: '/my-profile',
            Icon: CgProfile,
        },
        {
            text: 'Log Out',
            onClick: () => {
                AuthUtils.logout()
                router.push('/login')
            },
            Icon: IoLogOut,
            color: true,
        },
    ]

    return credentials ? (
        <div className="hover:bg-gray-100 rounded-md p-2">
            <div
                className="flex justify-between items-center gap-x-2 cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
            >
                <Image
                    src="https://picsum.photos/80"
                    alt="User Name Here"
                    width={48}
                    height={48}
                    className="rounded-md"
                    layout="fixed"
                />
                <div>
                    <p className="text-sm font-medium">
                        {credentials.name ? (
                            <span title={credentials.name}>
                                {credentials.name.length > 13
                                    ? `${credentials.name.substring(0, 13)}`
                                    : credentials.name}
                            </span>
                        ) : (
                            'Not Provided'
                        )}
                    </p>
                    <Typography variant={'small'} color={'text-muted'}>
                        {credentials.username ? (
                            <span title={credentials.username}>
                                {credentials.username > 17
                                    ? `${credentials.username.substring(
                                          0,
                                          17
                                      )}...`
                                    : credentials.username}
                            </span>
                        ) : (
                            'Not Provided'
                        )}
                    </Typography>
                </div>
                <MdKeyboardArrowDown
                    className={`text-2xl text-gray transition-all ${
                        showOptions ? '-rotate-180' : 'rotate-0'
                    }`}
                />
            </div>

            <div
                className={`overflow-hidden transition-all ${
                    showOptions ? 'max-h-24 opacity-100' : 'opacity-0 max-h-0'
                }`}
            >
                <div
                    className={`mt-4 border-b border-secondary-dark flex flex-col items-start`}
                >
                    {ProfileOptions.map((option, index) => (
                        <SideBarItem
                            key={index}
                            Icon={option.Icon}
                            {...(option.link ? { link: option.link } : {})}
                            {...(option.onClick
                                ? { onClick: option.onClick }
                                : {})}
                            color={option.color}
                        >
                            {option.text}
                        </SideBarItem>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <>
            <div>Getting Them</div>
        </>
    )
}
