import { ReactElement, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import {
    Button,
    ReactTable,
    RtoContextBarData,
    SidebarCalendar,
    Typography,
    TableActionOption,
    TableAction,
    TabNavigation,
    TabProps,
} from '@components'

// hooks
import { useContextBar } from '@hooks'
import { AllStudents, MyStudents } from '@partials/sub-admin/students'

type Props = {}

const Students: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])

    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'students', query: { tab: 'all' } },
            element: <AllStudents />,
        },
        {
            label: 'My Students',
            href: { pathname: 'students', query: { tab: 'my-students' } },
            element: <MyStudents />,
        },
    ]

    // console.log("useGetSubAdminStudentsQuery", useGetSubAdminStudentsQuery());

    return (
        <>
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
        </>
    )
}
Students.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="Students">{page}</SubAdminLayout>
}

export default Students
