import { AuthorizedUserComponent, Button, Typography } from '@components'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { ComposeMail } from '../tabs'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const AdminTopBar = ({ mailsTabs }: { mailsTabs: any }) => {
    const router = useRouter()

    const [isComposeMail, setIsComposeMail] = useState<boolean>(false)

    const onCancelComposeMail = useCallback(() => {
        setIsComposeMail(false)
    }, [])
    const role = getUserCredentials()?.role
    return (
        <div className="flex items-center gap-x-12 justify-between bg-white shadow-[inset_0_-1px_0_0_#EDEFF1] px-5">
            <div className="flex items-center gap-x-12">
                {mailsTabs.map((tab: any, i: number) => {
                    const active = router?.query?.tab
                        ? tab?.href?.query?.tab === router?.query?.tab
                        : i == 0

                    return (
                        <div>
                            <div
                                className={`py-4 flex items-center gap-x-3 cursor-pointer px-1.5 `}
                                onClick={() => {
                                    router.push(tab?.href)
                                }}
                            >
                                <tab.Icon
                                    className={`text-lg text-black font-bold ${
                                        active ? 'text-primary' : 'text-black'
                                    }`}
                                />
                                <Typography
                                    color={
                                        active ? 'text-primary' : 'text-black'
                                    }
                                    bold
                                    variant="label"
                                    cursorPointer
                                >
                                    {tab?.text}
                                </Typography>
                            </div>
                            <div
                                className={`border-t-[3px] rounded-t pb-[1.5px] ${
                                    active
                                        ? 'border-primary'
                                        : 'border-transparent'
                                }`}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center gap-x-2.5">
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                >
                    <>
                        <Button
                            onClick={() => {
                                if (role === UserRoles.ADMIN) {
                                    router.push('/portals/admin/bulk-email')
                                } else {
                                    router.push(
                                        '/portals/sub-admin/notifications/bulk-email'
                                    )
                                }
                            }}
                            text="Bulk Email"
                            variant="info"
                        />
                        <Button
                            onClick={() => {
                                if (role === UserRoles.ADMIN) {
                                    router.push('/portals/admin/email-draft')
                                } else {
                                    router.push(
                                        '/portals/sub-admin/email-draft'
                                    )
                                }
                            }}
                            text="Email Draft"
                            variant="info"
                        />
                    </>
                </AuthorizedUserComponent>
                <Button
                    onClick={() => {
                        setIsComposeMail(!isComposeMail)
                        // contextBar.setTitle('Compose Mail')
                        // contextBar.setContent(<SendMail />)
                        // contextBar.show()
                    }}
                    text="Compose"
                />
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
