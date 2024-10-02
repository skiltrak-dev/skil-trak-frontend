import { Typography } from '@components/Typography'
import { ReactElement, useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdOutlineSwitchAccount } from 'react-icons/md'

import { CgProfile } from 'react-icons/cg'
import { IoLogOut } from 'react-icons/io5'

import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { SideBarItem } from '@components/sideBars/SideBarItem'

import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { adminApi, commonApi, CommonApi } from '@queries'
import { LogoutType, useContextBar } from '@hooks'
import { UserRoles } from '@constants'
import { SwitchBackToSubAdmin } from './SwitchBackToSubAdmin'
import { signOut } from 'next-auth/react'

export const UserActions = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [showOptions, setShowOptions] = useState(false)
    const [credentials, setCredentials] = useState<any>(null)
    const role = getUserCredentials()?.role

    const contextBar = useContextBar()
    const dispatch = useDispatch()

    const [logoutActivity] = CommonApi.LogoutActivity.perFormAcivityOnLogout()
    const [switchUserRole, resultSwitchUserRole] =
        CommonApi.Impersonation.useImpersonationToggle()

    // SWITCH BACK TO SUB ADMIN MODAL
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onSwitchToAdminModalClicked = () => {
        setModal(
            <SwitchBackToSubAdmin
                // subAdmin={data}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        if (!credentials) {
            if (AuthUtils.isAuthenticated()) {
                setCredentials(AuthUtils.getUserCredentials())
            }
        }
    }, [credentials, AuthUtils.isAuthenticated()])
    const newOptionForSubAdmin: any = {
        text: 'Switch to Sub Admin',
        // link: '#',
        Icon: MdOutlineSwitchAccount,
        onClick: () => {
            onSwitchToAdminModalClicked()
            setShowOptions(false)
        },
    }

    const ProfileOptions = [
        {
            text: 'My Profile',
            link: '/portals/admin/my-profile',
            Icon: CgProfile,
            onClick: () => {
                setShowOptions(false)
            },
        },
        // {
        //     ...(role === UserRoles.SUBADMIN
        //         ? {
        //     text: 'Switch to Sub Admin',
        //     link: "#"
        //     Icon: MdOutlineSwitchAccount,
        //     onClick: () => {
        //         onSwitchToAdminModalClicked()
        //         setShowOptions(false)
        //     },
        //       }
        //     : {}),
        // },
        {
            text: 'Log Out',
            onClick: async () => {
                if (AuthUtils.token()) {
                    await logoutActivity({})
                }
                // await signOut({
                //     redirect: true,
                //     callbackUrl: '/auth/login-auth',
                // })
                AuthUtils.logout(router)
                contextBar.setContent(null)
                contextBar.setTitle(null)
                contextBar.hide()
                dispatch(adminApi.util.resetApiState())
                dispatch(commonApi.util.resetApiState())
            },
            Icon: IoLogOut,
            color: true,
        },
    ]
    if (role === UserRoles.SUBADMIN) {
        ProfileOptions.splice(1, 0, newOptionForSubAdmin)
    }

    return (
        <>
            {modal && modal}
            {credentials ? (
                <div className="hover:bg-gray-100 rounded-md p-2">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setShowOptions(!showOptions)}
                    >
                        <div className="flex items-center gap-x-2">
                            <div className="flex-shrink-0">
                                <Image
                                    src={
                                        credentials.avatar ||
                                        'https://hivedinn.s3.amazonaws.com/upload/photos/d-avatar.jpg'
                                    }
                                    alt={credentials.name}
                                    width="0"
                                    height={'0'}
                                    sizes="100vw"
                                    className="w-8 rounded-md"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    {credentials.name ? (
                                        <span title={credentials.name}>
                                            {credentials.name.length > 13
                                                ? `${credentials.name.substring(
                                                      0,
                                                      13
                                                  )}`
                                                : credentials.name}
                                        </span>
                                    ) : (
                                        'Not Provided'
                                    )}
                                </p>
                                <Typography
                                    variant={'small'}
                                    color={'text-muted'}
                                >
                                    {credentials.email ? (
                                        <span title={credentials.email}>
                                            {credentials.email.length > 17
                                                ? `${credentials.email.substring(
                                                      0,
                                                      17
                                                  )}...`
                                                : credentials.email}
                                        </span>
                                    ) : (
                                        'Not Provided'
                                    )}
                                </Typography>
                            </div>
                        </div>
                        <MdKeyboardArrowDown
                            className={`text-2xl text-gray transition-all ${
                                showOptions ? '-rotate-180' : 'rotate-0'
                            }`}
                        />
                    </div>

                    <div
                        className={`overflow-hidden overflow-y-scroll custom-scrollbar remove-custom-scroll transition-all ${
                            showOptions
                                ? 'max-h-24 opacity-100'
                                : 'opacity-0 max-h-0'
                        }`}
                    >
                        <div
                            className={`mt-4 border-b border-secondary-dark flex flex-col items-start`}
                        >
                            {ProfileOptions?.map((option, index) => (
                                <SideBarItem
                                    key={index}
                                    Icon={option?.Icon}
                                    {...(option?.link
                                        ? { link: option?.link }
                                        : {})}
                                    {...(option?.onClick
                                        ? { onClick: option?.onClick }
                                        : {})}
                                    color={option?.color}
                                >
                                    {option?.text}
                                </SideBarItem>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div>Getting Them</div>
                </>
            )}
        </>
    )
}
