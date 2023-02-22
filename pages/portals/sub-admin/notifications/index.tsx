import { ReactElement, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import { AllMails, MailDetail, ReadMails, UnReadMails } from '@partials/common'
import { Button, MailForm, TabNavigation, TabProps } from '@components'
import { CommonApi, useSendMessageMutation } from '@queries'
import { useContextBar } from '@hooks'

const SubAdminNotifications: NextPageWithLayout = () => {
    const onMessageClick = () => { }
    const [selectedMessage, setSelectedMessage] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const contextBar = useContextBar()
    const { data, isLoading } = CommonApi.Messages.useAllConversations()
    const { data: singleChat } = CommonApi.Messages.useSingleChat(selectedMessage,
        {
            skip: !selectedMessage,
        })
    console.log("data", data)
    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'notifications', query: { tab: 'all-mails' } },
            badge: {
                text: data?.length,
                loading: false,
            },
            element: (
                <div className="flex">
                    <div>
                        {data?.map((message: any) => (
                            <AllMails
                                key={message?.id}
                                title={message.name}
                                description={message.email}
                                timestamp={message.createdAt}
                                id={message.id}
                                onClick={() => setSelectedMessage(message.id)}
                            />
                        ))}
                    </div>
                    <MailDetail message={singleChat} />
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
                    <div>
                        {data?.map((message: any, i: any) => (
                            <UnReadMails
                                key={message?.id}
                                title={message.name}
                                description={message.email}
                                timestamp={message.createdAt}
                                // selectedMessage={message}
                                id={message.id}
                                onClick={() => setSelectedMessage(message.id)}
                            />
                        ))}
                    </div>
                    <MailDetail message={singleChat} />
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
                    <div>
                        {data?.map((message: any) => (
                            <ReadMails
                                key={message?.id}
                                title={message.name}
                                description={message.email}
                                timestamp={message.createdAt}
                                // selectedMessage={message}
                                id={message.id}
                                onClick={() => setSelectedMessage(message.id)}

                            />
                        ))}
                    </div>
                    <MailDetail message={singleChat} />
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
