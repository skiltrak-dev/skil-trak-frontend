import React, { useEffect, useState } from 'react'

// Components
import {
    Loading,
    EmptyData,
    EmailCard,
    ComposeEmail,
    TechnicalError,
    PrimaryActionLink,
} from 'components'

// hooks
import { useMessage } from 'hooks'
import { useContextBar } from 'hooks'

// functions
import { AuthUtils } from '@utils'

// query
import {
    useGetIndustryMessagesQuery,
    useSendMessageMutation,
} from 'redux/query'

export const Messages = () => {
    const { setContent, hide, isVisible } = useContextBar()
    const { message, setMessage } = useMessage()
    const [messagesList, setMessagesList] = useState([])
    // query
    const messages = useGetIndustryMessagesQuery()

    useEffect(() => {
        setContent(
            <>
                <PrimaryActionLink
                    border={'1'}
                    bgColor={'white'}
                    bgHoverColor={'secondary'}
                    borderColor={'secondary'}
                    shadow={1}
                    title={'Documentation Required'}
                    desc={'Some helping text'}
                    img={'./images/dashboardbtn.png'}
                />
            </>
        )
        hide()
    }, [setContent])

    useEffect(() => {
        messages.refetch()
    }, [messages.refetch])

    useEffect(() => {
        if (messages.isSuccess) {
            setMessagesList(messages.data)
        }
    }, [messages.data, messages.isSuccess])

    useEffect(() => {
        if (message) {
            setMessagesList((m) => [...m, message])
        }
        setMessage(null)
    }, [message, setMessage])

    return (
        <>
            <div
                className={`flex gap-x-2.5 w-full ${
                    isVisible ? 'flex-col' : 'flex-row'
                }`}
            >
                <div
                    className={`${
                        isVisible ? 'w-full' : 'w-[71%]'
                    } bg-gray-50 rounded-lg p-2`}
                >
                    {messages.isError && !messagesList.length && (
                        <TechnicalError />
                    )}
                    <div className={`flex flex-col gap-y-2.5 h-full `}>
                        {messages?.isLoading && !messagesList.length > 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <Loading />
                            </div>
                        ) : messages?.data?.length > 0 ||
                          messagesList.length > 0 ? (
                            messagesList?.map((message, i) => (
                                <EmailCard
                                    key={i}
                                    sender={
                                        AuthUtils.getUserCredentials()?.id ===
                                        message?.sender?.id
                                    }
                                    message={message}
                                    index={i}
                                />
                            ))
                        ) : (
                            !messages.isError && <EmptyData actionLink={null} />
                        )}
                    </div>
                </div>
                <div className={`${isVisible ? 'w-full' : 'w-[29%]'}`}>
                    <ComposeEmail action={useSendMessageMutation} />
                </div>
            </div>
        </>
    )
}
