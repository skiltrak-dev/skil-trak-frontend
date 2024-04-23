import { Button, Card, TabProps } from '@components'
import React, { ReactElement, useCallback, useState } from 'react'
import { AllCommunication } from '../AllCommunication'
import { Mails } from '../Mails/Mails'
import { User } from '@types'
import { Tabs } from '../Tabs'
import { ComposeMailModal } from '../../modals'

export const MailsCommunication = ({ user }: { user: User }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [selectedTab, setSelectedTab] = useState<TabProps | null>(null)

    const tabs: TabProps[] = [
        {
            label: 'All Communication',
            href: {
                pathname: 'student',
                query: { tab: 'completed-students' },
            },

            element: <AllCommunication user={user} />,
        },
        {
            label: 'Mails',
            href: {
                pathname: 'student',
                query: { tab: 'all-students-report' },
            },
            element: <Mails user={user} />,
        },
    ]
    const onCancelClicked = () => setModal(null)

    const onComposeMail = () => {
        setModal(
            <ComposeMailModal userId={user?.id} onCancel={onCancelClicked} />
        )
    }

    const onSetSelectedElement = useCallback((tab: TabProps) => {
        setSelectedTab(tab)
    }, [])

    return (
        <>
            {modal}
            <Card fullHeight noPadding>
                <Tabs
                    tabs={tabs}
                    defaultTabSelected={0}
                    onSetSelectedElement={onSetSelectedElement}
                >
                    {({ header, element }: any) => {
                        console.log({ header })
                        return (
                            <div className="h-full">
                                <div className="flex items-center justify-between pr-3 pl-1 py-3 border-b border-secondary-dark">
                                    <div>{header}</div>
                                    {selectedTab?.label === 'Mails' ? (
                                        <Button
                                            onClick={() => {
                                                onComposeMail()
                                            }}
                                        >
                                            Compose Mail
                                        </Button>
                                    ) : null}
                                </div>
                                <div className="p-4 !h-[calc(633px-70px)] overflow-hidden">
                                    {element}
                                </div>
                            </div>
                        )
                    }}
                </Tabs>
            </Card>
        </>
    )
}
