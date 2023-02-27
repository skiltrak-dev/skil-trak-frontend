import { ReactElement, useEffect, useState } from 'react'

import {
    Filter,
    StudentFilters,
    TabNavigation,
    TabProps,
    Card,
    LoadingAnimation,
    TechnicalError,
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
import { checkFilteredDataLength, getFilterQuery } from '@utils'
import { useRouter } from 'next/router'

const filterKeys = [
    'name',
    'email',
    'phone',
    'studentId',
    'status',
    'rtoId',
    'industryId',
    'courseId',
]

const RtoList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    useEffect(() => {
        const query = getFilterQuery({ router, filterKeys })
        setFilter(query)
    }, [router])

    const { isLoading, data } = AdminApi.Students.useCountQuery()
    const filteredStudents = AdminApi.Students.useListQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        navBar.setTitle('Students')
        contextBar.hide()
        // contextBar.setContent(<UserProfile />)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'student',
                query: { tab: 'pending', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingStudent />,
        },
        {
            label: 'Active',
            href: {
                pathname: 'student',
                query: { tab: 'active', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedStudent />,
        },
        {
            label: 'Rejected',
            href: {
                pathname: 'student',
                query: { tab: 'rejected', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedStudent />,
        },
        {
            label: 'Blocked',
            href: {
                pathname: 'student',
                query: { tab: 'blocked', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedStudent />,
        },
        {
            label: 'Archived',
            href: {
                pathname: 'student',
                query: { tab: 'archived', page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedStudent />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter
                    setFilter={setFilter}
                    initialValues={filter}
                    filterKeys={filterKeys}
                    component={StudentFilters}
                    setFilterAction={setFilterAction}
                />
            </div>
            {filteredStudents.isError && <TechnicalError />}
            {filteredDataLength ? (
                filteredStudents.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredStudents.isSuccess && (
                        <FilteredStudents
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            student={filteredStudents}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null}

            {!filteredDataLength && (
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
