import { ReactElement, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import { AllMails, MailDetail, ReadMails, UnReadMails } from '@partials/common'
import { Button, MailForm, TabNavigation, TabProps } from '@components'
import { useSendMessageMutation } from '@queries'
import { useContextBar } from '@hooks'

const SubAdminNotifications: NextPageWithLayout = () => {
    const onMessageClick = () => { }
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const contextBar = useContextBar()
    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'notifications', query: { tab: 'all-mails' } },
            badge: {
                text: 2,
                loading: false,
            },
            element: (
                <div className="flex">
                    <div>
                        {[...Array(10)].fill(null).map((_, i:any) => (
                            <AllMails
                                key={i}
                                title={`Message`}
                                description={`janedoe@gmail.com`}
                                timestamp={'Tue 9 Aug'}
                                selectedMessage={selectedMessage}
                                id={i}
                                onClick={()=> setSelectedMessage(i)}
                            />
                        ))}
                    </div>
                    <MailDetail />
                </div>
            ),
        },
        {
            label: 'Unread',
            href: { pathname: 'notifications', query: { tab: 'unread-mails' } },
            badge: {
                text: 10,
                loading: false,
            },
            element: (
                <div className="flex">
                    <div>
                        {[...Array(8)].fill(null).map((_, i) => (
                            <UnReadMails
                                key={i}
                                title={`Message`}
                                description={`Description for Message`}
                                timestamp={'Tue 9 Aug'}
                                onClick={onMessageClick}
                            />
                        ))}
                    </div>
                    <MailDetail />
                </div>
            ),
        },
        {
            label: 'Read',
            href: { pathname: 'notifications', query: { tab: 'read-mails' } },
            badge: {
                text: 10,
                loading: false,
            },
            element: (
                <div className="flex">
                    <div>
                        {[...Array(5)].fill(null).map((_, i) => (
                            <ReadMails
                                key={i}
                                title={`Message`}
                                description={`janedoe@gmail.com`}
                                timestamp={'Tue 9 Aug'}
                                onClick={onMessageClick}
                            />
                        ))}
                    </div>
                    <MailDetail />
                </div>
            ),
        },
    ]
    {
        /* <>
                    {[...Array(10)].fill(null).map((_, i) => (
                        <AllMails
                            key={i}
                            title={`Message`}
                            description={`Description for Message`}
                            timestamp={'Tue 9 Aug'}
                            onClick={onMessageClick}
                        />
                    ))}
                </> */
    }
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
