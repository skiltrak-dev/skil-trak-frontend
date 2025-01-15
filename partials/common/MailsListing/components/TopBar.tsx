import { AuthorizedUserComponent, Button, Typography } from '@components'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { ComposeMail } from '../tabs'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { FaPlus } from 'react-icons/fa6'
import { RiDraftFill } from 'react-icons/ri'
import { FaMailBulk } from 'react-icons/fa'

export const TopBar = ({ mailsTabs }: { mailsTabs: any }) => {
    const router = useRouter()

    const [isComposeMail, setIsComposeMail] = useState<boolean>(false)

    const onCancelComposeMail = useCallback(() => {
        setIsComposeMail(false)
    }, [])
    const role = getUserCredentials()?.role
    return (
        <div className="flex flex-col gap-y-6 gap-x-12 h-[690px] overflow-auto custom-scrollbar bg-white shadow-[inset_0_-1px_0_0_#EDEFF1] px-4 w-1/5 rounded-xl">
            <div className="mt-4">
                <Button
                    onClick={() => {
                        setIsComposeMail(!isComposeMail)
                        // contextBar.setTitle('Compose Mail')
                        // contextBar.setContent(<SendMail />)
                        // contextBar.show()
                    }}
                    fullWidth
                >
                    <span className="flex gap-x-2 items-center">
                        <FaPlus /> <span>Compose</span>
                    </span>
                </Button>
            </div>
            <div className="flex flex-col gap-y-4 gap-x-12">
                {mailsTabs.map((tab: any, i: number) => {
                    const active = router?.query?.tab
                        ? tab?.href?.query?.tab === router?.query?.tab
                        : i == 0

                    return (
                        <div>
                            <div
                                className={`py-3 w-full flex items-center gap-x-3 cursor-pointer px-5 rounded-lg ${
                                    active ? 'bg-[#ECEEFB]' : ''
                                }`}
                                onClick={() => {
                                    router.push(tab?.href)
                                }}
                            >
                                <tab.Icon
                                    className={`text-lg font-bold ${
                                        active
                                            ? 'text-primary'
                                            : 'text-[#24556D]'
                                    }`}
                                    size={25}
                                />
                                <div className="whitespace-nowrap">
                                    <Typography
                                        color={
                                            active
                                                ? 'text-primary'
                                                : 'text-black'
                                        }
                                        bold
                                        variant="label"
                                        cursorPointer
                                    >
                                        {tab?.text}
                                    </Typography>
                                </div>
                            </div>
                            {/* <div
                                className={`border-t-[3px] rounded-t pb-[1.5px] ${
                                    active
                                        ? 'border-primary'
                                        : 'border-transparent'
                                }`}
                            /> */}
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col gap-y-2 gap-x-2.5">
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                >
                    <>
                        {/* <Button
                            onClick={() => {
                                if (role === UserRoles.ADMIN) {
                                    router.push('/portals/admin/bulk-email')
                                } else {
                                    router.push(
                                        '/portals/sub-admin/notifications/bulk-email'
                                    )
                                }
                            }}
                            // text="Bulk Email"
                            variant="info"
                        >
                            {' '}
                            <span className="flex items-center gap-x-2">
                                <FaMailBulk size={18} />
                                <span>Bulk Email</span>
                            </span>
                        </Button> */}
                        <div
                            className={`py-3 w-full flex group hover:bg-[#ECEEFB] items-center gap-x-3 cursor-pointer px-5 rounded-lg `}
                            onClick={() => {
                                if (role === UserRoles.ADMIN) {
                                    router.push('/portals/admin/bulk-email')
                                } else {
                                    router.push(
                                        '/portals/sub-admin/notifications/bulk-email'
                                    )
                                }
                            }}
                        >
                            <FaMailBulk
                                className={`group-hover:text-primary text-lg font-bold text-[#24556D]`}
                                size={25}
                            />
                            <div className="whitespace-nowrap group-hover:text-primary">
                                <Typography
                                    color={`group-hover:text-primary text-black`}
                                    bold
                                    variant="label"
                                    cursorPointer
                                >
                                    Bulk Email
                                </Typography>
                            </div>
                        </div>

                        <div
                            className={`py-3 w-full flex group hover:bg-[#ECEEFB] items-center gap-x-3 cursor-pointer px-5 rounded-lg `}
                            onClick={() => {
                                if (role === UserRoles.ADMIN) {
                                    router.push('/portals/admin/email-draft')
                                } else {
                                    router.push(
                                        '/portals/sub-admin/email-draft'
                                    )
                                }
                            }}
                        >
                            <RiDraftFill
                                className={`group-hover:text-primary text-lg font-bold text-[#24556D]`}
                                size={25}
                            />
                            <div className="whitespace-nowrap group-hover:text-primary">
                                <Typography
                                    color={`group-hover:text-primary text-black`}
                                    bold
                                    variant="label"
                                    cursorPointer
                                >
                                    Email Draft
                                </Typography>
                            </div>
                        </div>

                        {/* <Button
                            onClick={() => {
                                if (role === UserRoles.ADMIN) {
                                    router.push('/portals/admin/email-draft')
                                } else {
                                    router.push(
                                        '/portals/sub-admin/email-draft'
                                    )
                                }
                            }}
                            // text=""
                            variant="info"
                        >
                            <span className="flex items-center gap-x-2">
                                <RiDraftFill size={18} />
                                <span>Email Draft</span>
                            </span>
                        </Button> */}
                    </>
                </AuthorizedUserComponent>
            </div>
            <div
                className={`fixed bottom-0 right-20 z-[333]  ${
                    isComposeMail ? 'block' : 'hidden'
                }`}
            >
                <ComposeMail onCancelComposeMail={onCancelComposeMail} />
            </div>
        </div>
    )
}
