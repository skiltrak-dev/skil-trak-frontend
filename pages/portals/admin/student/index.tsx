import { ReactElement, useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

import {
    Filter,
    StudentFilters,
    TabNavigation,
    TabProps,
    Card,
    LoadingAnimation,
    TechnicalError,
    TextInput,
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

const StudentList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [studentId, setStudentId] = useState<any | null>(null)
    const [studentIdValue, setStudentIdValue] = useState<string>('')
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const query = getFilterQuery({ router, filterKeys })
    useEffect(() => {
        setFilter(query)
    }, [router])

    const { isLoading, data } = AdminApi.Students.useCountQuery()
    const filteredStudents = AdminApi.Students.useListQuery({
        search: `${JSON.stringify({ ...filter, ...studentId })
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const [statusSuccessResult, setStatusSuccessResult] =
        useState<boolean>(false)

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

    const delayedSearch = useCallback(
        debounce((value) => {
            setStudentId({ studentId: value })
        }, 700),
        []
    )

    const filteredDataLength = checkFilteredDataLength({
        ...filter,
        ...(studentId?.studentId ? studentId : {}),
    })

    return (
        <div>
            <div className="px-4">
                <div className="flex justify-end gap-x-2 mb-2">
                    <div>
                        <TextInput
                            name={'studentId'}
                            placeholder={'Search by Student Id'}
                            value={studentIdValue}
                            onChange={(e: any) => {
                                setStudentIdValue(e.target.value)
                                delayedSearch(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex-shrink-0">{filterAction}</div>
                </div>
                <Filter
                    setFilter={(f: any) => {
                        setStudentId(null)
                        setFilter(f)
                    }}
                    initialValues={filter}
                    filterKeys={filterKeys}
                    component={StudentFilters}
                    setFilterAction={setFilterAction}
                />
            </div>
            {filteredDataLength && filteredStudents.isError && (
                <TechnicalError />
            )}
            {filteredDataLength ? (
                filteredStudents.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredStudents.isSuccess && (
                        <FilteredStudents
                            setStatusSuccessResult={setStatusSuccessResult}
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

StudentList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default StudentList
