import React, { useState, useEffect } from 'react'

// components
import {
    LoadingAnimation,
    Mail,
    EmptyData,
    MailForm,
    TechnicalError,
} from '@components'

// query
// query
import { useGetIndustryMessagesQuery, useSendMessageMutation } from '@queries'

// hooks
import { useContextBar } from 'hooks'
// TODO: Can be deleted
export const MailsTab = () => {
    const { isVisible } = useContextBar()
    // const [messagesList, setMessagesList] = useState([])
    // const [approvedUser, setApprovedUser] = useState(
    //     industry?.user?.status === 'approved'
    // )

    // query
    const messages = useGetIndustryMessagesQuery()

    // useEffect(() => {
    //     setApprovedUser(industry?.user?.status === 'approved')
    // }, [industry])

    // useEffect(() => {
    //     messages.refetch()
    // }, [messages.refetch])

    return (
        <div
            className={`flex flex-col md:flex-row gap-y-2 md:gap-x-2.5 w-full ${
                isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div
                className={`${
                    isVisible ? 'w-full' : 'w-[71%]'
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

            <div className={`${isVisible ? 'w-full' : 'md:w-[29%] w-full'}`}>
                <MailForm
                    action={useSendMessageMutation}
                    // receiverId={Number(industry?.id)}
                    sender={'admin'}
                />
            </div>
        </div>
    )
}
