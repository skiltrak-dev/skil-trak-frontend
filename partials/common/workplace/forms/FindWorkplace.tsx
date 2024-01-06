import React from 'react'
import { FindWorkplaceForm } from './FindWorkplaceForm'
import { FindWorkplaceByName } from './FindWorkplaceByName'
import { TabNavigation, TabProps } from '@components'
import { useRouter } from 'next/router'
import { Student } from '@types'

export const FindWorkplace = ({
    onSubmit,
    result,
    setWorkplaceData,
    setActive,
    student,
}: {
    setWorkplaceData: any
    setActive: any
    onSubmit: any
    result: any
    student: Student
}) => {
    const router = useRouter()
    const tabs: TabProps[] = [
        {
            label: 'Find By ABN',
            href: {
                pathname: `/portals/sub-admin/students/${router.query?.id}/provide-workplace-detail`,
                query: { tab: 'abn' },
            },

            element: <FindWorkplaceForm onSubmit={onSubmit} result={result} />,
        },
        {
            label: 'Find By Name',
            href: {
                pathname: `/portals/sub-admin/students/${router.query?.id}/provide-workplace-detail`,
                query: { tab: 'name' },
            },

            element: (
                <FindWorkplaceByName
                    student={student}
                    setActive={setActive}
                    setWorkplaceData={setWorkplaceData}
                />
            ),
        },
    ]
    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}
