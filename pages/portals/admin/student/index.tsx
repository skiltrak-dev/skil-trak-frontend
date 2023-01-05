import { ReactElement, useEffect, useState } from 'react'

import {
    Filter,
    StudentFilters,
    TabNavigation,
    TabProps,
    Card,
    LoadingAnimation,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ApprovedStudent,
    ArchivedStudent,
    BlockedStudent,
    FilteredStudents,
    PendingStudent,
    RejectedStudent,
} from '@partials/admin/student'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'

const RtoList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const { isLoading, data } = AdminApi.Students.useCountQuery()
    const filteredStudents = AdminApi.Students.useFilteredStudents(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { skip: !Object.keys(filter).length }
    )

    useEffect(() => {
        navBar.setTitle('Students')
        contextBar.hide()
        // contextBar.setContent(<UserProfile />)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'student', query: { tab: 'pending' } },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingStudent />,
        },
        {
            label: 'Approved',
            href: { pathname: 'student', query: { tab: 'approved' } },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedStudent />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'student', query: { tab: 'rejected' } },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedStudent />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'student', query: { tab: 'blocked' } },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedStudent />,
        },
        {
            label: 'Archived',
            href: { pathname: 'student', query: { tab: 'archived' } },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedStudent />,
        },
    ]

    return (
        <div>
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
                    component={StudentFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>
            {filteredStudents.isLoading ? (
                <div className="px-4 mt-4">
                    <Card>
                        <LoadingAnimation />
                    </Card>
                </div>
            ) : Object.keys(filter).length && filteredStudents.isSuccess ? (
                <FilteredStudents
                    setPage={setPage}
                    itemPerPage={itemPerPage}
                    student={filteredStudents}
                    setItemPerPage={setItemPerPage}
                />
            ) : (
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
            )}
        </div>
    )
}

RtoList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoList
