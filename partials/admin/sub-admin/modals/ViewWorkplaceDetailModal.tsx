import { Modal, TabNavigation, TabProps } from '@components'
import { Tabs } from '@partials/common/StudentProfileDetail/components/Tabs'
import React from 'react'
import { Within3Weeks, Over3Weeks } from '../SubadminProfileDetail'

export const ViewWorkplaceDetailModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const tabs: TabProps[] = [
        {
            label: 'With in 3 weeks',
            href: {
                pathname: 'student',
                query: { tab: 'snoozed-students' },
            },
            element: <Within3Weeks />,
        },
        {
            label: 'Over 3 weeks',
            href: {
                pathname: 'student',
                query: { tab: 'snoozed-students' },
            },

            element: <Over3Weeks />,
        },
    ]
    return (
        <Modal
            showActions={false}
            title="View Workplaces"
            subtitle="View Workplace Detail"
            onCancelClick={onCancel}
        >
            <div className="w-full lg:min-w-[800px]">
                <Tabs tabs={tabs} defaultTabSelected={0}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </Tabs>
            </div>
        </Modal>
    )
}
