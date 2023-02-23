import { ReactElement, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import { AllMails, MailDetail, ReadMails, UnReadMails } from '@partials/common'
import {
    Button,
    EmptyData,
    LoadingAnimation,
    MailForm,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { CommonApi, useSendMessageMutation } from '@queries'
import { useContextBar } from '@hooks'

const SubAdminNotifications: NextPageWithLayout = () => {
    const onMessageClick = () => { }
    const [selectedMessageId, setSelectedMessageId] = useState(0)
    const [selectedMessage, setSelectedMessage] = useState<any>([])
    const [showForm, setShowForm] = useState(false)
    const contextBar = useContextBar()
    const { data, isLoading, isError, isFetching } =
        CommonApi.Messages.useAllConversations()
    const singleChat = CommonApi.Messages.useSingleChat(selectedMessageId, {
        skip: !selectedMessageId,
    })
    const [seenMessage, resultSeenMessage] = CommonApi.Messages.useIsSeen()

    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'notifications', query: { tab: 'all-mails' } },
            badge: {
                text: data?.length,
                loading: isLoading,
            },
            element: (
                <div className="flex">
                    {isError && <TechnicalError />}
                    <div className="h-screen border-r overflow-y-scroll remove-scrollbar">
                        {isLoading || isFetching ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation />
                            </div>
                        ) : !isError && data?.length > 0 ? (
                            <>
                                {data?.map((message: any) => (
                                    <AllMails
                                        key={message?.id}
                                        title={message.name}
                                        description={message.email}
                                        timestamp={message.createdAt}
                                        id={message.id}
                                        selectedMessageId={selectedMessageId}
                                        seenMessage={message?.isSeen}
                                        resultSeenMessage={resultSeenMessage}
                                        onClick={() => {
                                            setSelectedMessageId(message.id)
                                            setSelectedMessage(message)
                                        }}
                                    />
                                ))}
                            </>
                        ) : (
                            !isError && (
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
                    <MailDetail
                        selectedMessage={selectedMessage}
                        message={singleChat}
                    />
                </div>
            ),
        },
        {
            label: 'Unread',
            href: { pathname: 'notifications', query: { tab: 'unread-mails' } },
            badge: {
                text: data?.length,
                loading: isLoading,
            },
            element: (
                <div className="flex">
                    {isError && <TechnicalError />}
                    <div className="h-screen border-r overflow-y-scroll remove-scrollbar">
                        {isLoading || isFetching ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation />
                            </div>
                        ) : !isError && data?.length > 0 ? (
                            <>
                                {data?.map((message: any) => (
                                    <UnReadMails
                                        key={message?.id}
                                        title={message.name}
                                        description={message.email}
                                        timestamp={message.createdAt}
                                        id={message.id}
                                        selectedMessageId={selectedMessageId}
                                        onClick={() => {
                                            setSelectedMessageId(message.id)
                                            setSelectedMessage(message)
                                        }}
                                    />
                                ))}
                            </>
                        ) : (
                            !isError && (
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
                    <MailDetail
                        selectedMessage={selectedMessage}
                        message={singleChat}
                    />
                </div>
            ),
        },
        {
            label: 'Read',
            href: { pathname: 'notifications', query: { tab: 'read-mails' } },
            badge: {
                text: data?.length,
                loading: isLoading,
            },
            element: (
                <div className="flex">
                    {isError && <TechnicalError />}
                    <div className="h-screen border-r overflow-y-scroll remove-scrollbar">
                        {isLoading || isFetching ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation />
                            </div>
                        ) : !isError && data?.length > 0 ? (
                            <>
                                {data?.map((message: any) => (
                                    <ReadMails
                                        key={message?.id}
                                        title={message.name}
                                        description={message.email}
                                        timestamp={message.createdAt}
                                        id={message.id}
                                        selectedMessageId={selectedMessageId}
                                        onClick={() => {
                                            setSelectedMessageId(message.id)
                                            setSelectedMessage(message)
                                        }}
                                    />
                                ))}
                            </>
                        ) : (
                            !isError && (
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
                    <MailDetail
                        selectedMessage={selectedMessage}
                        message={singleChat}
                    />
                </div>
            ),
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="flex justify-between items-center">
                                <div>{header}</div>
                                <div>
                                    <Button
                                        onClick={() => {
                                            contextBar.setTitle('Compose Mail')
                                            contextBar.setContent(
                                                <MailForm
                                                    action={
                                                        useSendMessageMutation
                                                    }
                                                    receiverId={1}
                                                    sender={'sub-admin'}
                                                />
                                            )
                                            contextBar.show()
                                        }}
                                        text="Compose"
                                    />
                                </div>
                            </div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

SubAdminNotifications.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Notifications' }}>
            {page}
        </SubAdminLayout>
    )
}

export default SubAdminNotifications
