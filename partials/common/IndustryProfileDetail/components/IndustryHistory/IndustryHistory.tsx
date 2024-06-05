import { Card, TabProps, Typography } from '@components'
import { Tabs } from '@partials/common/StudentProfileDetail/components/Tabs'
import React, { useCallback, useState } from 'react'
import { OverallHistory } from './OverallHistory'
import { StatusHistory } from './StatusHistory'
import { Industry } from '@types'

export const IndustryHistory = ({ industry }: { industry: Industry }) => {
    const [selectedTab, setSelectedTab] = useState<TabProps | null>(null)

    const tabs: TabProps[] = [
        {
            label: 'Over All History',
            href: {
                pathname: 'student',
                query: { tab: 'completed-students' },
            },
            element: <OverallHistory industry={industry?.user?.id} />,
        },
        {
            label: 'Status History',
            href: {
                pathname: 'student',
                query: { tab: 'all-students-report' },
            },
            element: <StatusHistory industry={industry} />,
        },
    ]

    const onSetSelectedElement = useCallback((tab: TabProps) => {
        setSelectedTab(tab)
    }, [])
    return (
        <div>
            <Card fullHeight noPadding>
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">History</span>
                    </Typography>
                </div>
                <Tabs
                    tabs={tabs}
                    defaultTabSelected={0}
                    onSetSelectedElement={onSetSelectedElement}
                >
                    {({ header, element }: any) => {
                        return (
                            <div className="h-full">
                                <div className="flex items-center justify-between pr-3 pl-1 py-1.5 border-b border-secondary-dark">
                                    <div>{header}</div>
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
