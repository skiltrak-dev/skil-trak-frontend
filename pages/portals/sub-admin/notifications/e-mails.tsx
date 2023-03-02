import { ReactElement, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { Button, TabNavigation, TabProps } from '@components'
import { useContextBar } from '@hooks'
import { AllMails, ReadMail, SendMail, UnReadMail } from '@partials/common'
import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'

const SubAdminEmailsNotifications: NextPageWithLayout = () => {
    const [selectedMessage, setSelectedMessage] = useState<any>(null)
    const contextBar = useContextBar()

    const [seenMessage, resultSeenMessage] = CommonApi.Messages.useIsSeen()

    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'e-mails', query: { tab: 'all-mails' } },
            // badge: {
            //     text: data?.length,
            //     loading: isLoading,
            // },
            element: (
                <AllMails
                    selectedMessage={selectedMessage}
                    setSelectedMessage={setSelectedMessage}
                />
            ),
        },
        // {
        //     label: 'Unread',
        //     href: { pathname: 'emails', query: { tab: 'unread-mails' } },
        //     // badge: {
        //     //     text: data?.length,
        //     //     loading: isLoading,
        //     // },
        //     element: (
        //         <UnReadMail
        //             selectedMessage={selectedMessage}
        //             setSelectedMessage={setSelectedMessage}
        //         />
        //     ),
        // },
        // {
        //     label: 'Read',
        //     href: { pathname: 'e-mails', query: { tab: 'read-mails' } },
        //     // badge: {
        //     //     text: data?.length,
        //     //     loading: isLoading,
        //     // },
        //     element: (
        //         <ReadMail
        //             selectedMessage={selectedMessage}
        //             setSelectedMessage={setSelectedMessage}
        //         />
        //     ),
        // },
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
                                            contextBar.setContent(<SendMail />)
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

SubAdminEmailsNotifications.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Notifications' }}>
            {page}
        </SubAdminLayout>
    )
}

export default SubAdminEmailsNotifications
