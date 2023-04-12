import React, { useState, useEffect } from 'react'

// components
import {
    Mail,
    MailForm,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
} from '@components'

// utils
import { AuthUtils } from '@utils'

// query
import { AdminApi, useSendIndustryMessageMutation } from '@queries'

// hooks
import { useContextBar } from '@hooks'
// import { useMessage } from 'hooks'

export const MailsTab = ({ subAdmin }: any) => {
    const { isVisible } = useContextBar()
    const [messagesList, setMessagesList] = useState([])
    const [approvedUser, setApprovedUser] = useState<boolean>(
        subAdmin?.status === 'approved'
    )

    useEffect(() => {
        if (subAdmin) {
            setApprovedUser(subAdmin?.status === 'approved')
        }
    }, [subAdmin])

    // query
    const messages = AdminApi.Messages.useList(
        { id: subAdmin?.id },
        {
            skip: !subAdmin?.id,
        }
    )

    // useEffect(() => {
    //     messages?.refetch()
    // }, [])

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div
                className={`${
                    isVisible ? 'w-full' : !approvedUser ? 'w-full' : 'w-[71%]'
                } bg-gray-50 rounded-lg p-2`}
            >
                {messages.isError && <TechnicalError />}
                <div className={`flex flex-col gap-y-2.5 h-full `}>
                    {messages?.isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <LoadingAnimation />
                        </div>
                    ) : messages?.data?.length > 0 ? (
                        messages?.data?.map(
                            (message: any, i: number) =>
                                message && (
                                    <Mail
                                        key={i}
                                        sender={
                                            message?.sender?.role === 'admin'
                                        }
                                        message={message}
                                        index={i}
                                    />
                                )
                        )
                    ) : (
                        !messages.isError && (
                            <EmptyData
                                imageUrl="/images/icons/common/mails.png"
                                title={'No Mails'}
                                description={
                                    'You have not sent/received any mail yet'
                                }
                                height={'40vh'}
                            />
                        )
                    )}
                </div>
            </div>
            {approvedUser && (
                <div className={`${isVisible ? 'w-full' : 'w-[29%]'}`}>
                    <MailForm
                        action={useSendIndustryMessageMutation}
                        receiverId={Number(subAdmin?.id)}
                        sender={'admin'}
                    />
                </div>
            )}
        </div>
    )
}
