import { User } from '@types'
import { Tabs } from '../Tabs'
import { UserRoles } from '@constants'
import { Mails } from '../Mails/Mails'
import { ComposeMailModal } from '../../modals'
import { AllCommunication } from '../AllCommunication'
import { ReactElement, useCallback, useState } from 'react'
import { AuthorizedUserComponent, Button, Card, TabProps } from '@components'

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
            <ComposeMailModal
                user={user}
                userId={user?.id}
                onCancel={onCancelClicked}
            />
        )
    }

    const onSetSelectedElement = useCallback((tab: TabProps) => {
        setSelectedTab(tab)
    }, [])

    return (
        <div>
            {modal}
            <Card fullHeight noPadding>
                <Tabs
                    tabs={tabs}
                    defaultTabSelected={0}
                    onSetSelectedElement={onSetSelectedElement}
                >
                    {({ header, element }: any) => {
                        return (
                            <div className="h-full">
                                <div className="flex items-center justify-between pr-3 pl-1 py-3 border-b border-secondary-dark">
                                    <div>{header}</div>
                                    <AuthorizedUserComponent
                                        excludeRoles={[UserRoles.OBSERVER]}
                                    >
                                        {selectedTab?.label === 'Mails' ? (
                                            <Button
                                                onClick={() => {
                                                    onComposeMail()
                                                }}
                                            >
                                                Compose Mail
                                            </Button>
                                        ) : null}
                                    </AuthorizedUserComponent>
                                </div>
                                <div className="p-4 !h-[calc(633px-70px)] overflow-hidden">
                                    {element}
                                </div>
                            </div>
                        )
                    }}
                </Tabs>
            </Card>
        </div>
    )
}
