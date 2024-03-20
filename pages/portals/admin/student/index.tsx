import debounce from 'lodash/debounce'
import { ReactElement, useCallback, useEffect, useState } from 'react'

import {
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    StudentFilters,
    TabNavigation,
    TabProps,
    TechnicalError,
    TextInput,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    AllStudentsReport,
    ApprovedStudent,
    ArchivedStudent,
    BlockedStudent,
    CompletedStudents,
    FilteredStudents,
    PendingStudent,
    RejectedStudent,
} from '@partials/admin/student'
import { AdminApi } from '@queries'
import { NextPageWithLayout, StudentsFilterType, UserStatus } from '@types'
import { checkFilteredDataLength } from '@utils'
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
    'currentStatus',
]

const StudentList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [studentId, setStudentId] = useState<any | null>(null)
    const [studentIdValue, setStudentIdValue] = useState<string>('')
    const [studentName, setStudentName] = useState<any | null>(null)
    const [studentNameValue, setStudentNameValue] = useState<string>('')
    const [filter, setFilter] = useState<StudentsFilterType>(
        {} as StudentsFilterType
    )

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const { isLoading, data, isSuccess } = AdminApi.Students.useCountQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
        }
    )
    const filteredStudents = AdminApi.Students.useListQuery({
        search: `${JSON.stringify({ ...filter, ...studentId, ...studentName })
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
    }, [])

    useEffect(() => {
        const getScrollId = sessionStorage.getItem('scrollId')
        if (getScrollId) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, scrollId: getScrollId },
            })
        }
    }, [])

    // useEffect(() => {
    //     if (router.query?.scrollId && isSuccess) {
    //         setTimeout(() => {
    //             delete router.query.scrollId
    //             router.push({
    //                 pathname: router.pathname,
    //                 query: { ...router.query },
    //             })
    //         }, 2000)
    //     }
    // }, [router, isSuccess])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'student',
                query: { tab: UserStatus.Pending, page: 1, pageSize: 50 },
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
                query: { tab: UserStatus.Rejected, page: 1, pageSize: 50 },
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
                query: { tab: UserStatus.Blocked, page: 1, pageSize: 50 },
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
                query: { tab: UserStatus.Archived, page: 1, pageSize: 50 },
            },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedStudent />,
        },
        {
            label: 'Completed Students',
            href: {
                pathname: 'student',
                query: { tab: 'completed-students' },
            },
            badge: {
                text: data?.completed,
                loading: isLoading,
            },
            element: <CompletedStudents />,
        },
        {
            label: 'All Students Report',
            href: {
                pathname: 'student',
                query: { tab: 'all-students-report' },
            },
            element: <AllStudentsReport />,
        },
    ]

    const delayedSearch = useCallback(
        debounce((value) => {
            setStudentId({ studentId: value })
        }, 700),
        []
    )

    const delayedNameSearch = useCallback(
        debounce((value) => {
            setStudentName({ name: value })
        }, 700),
        []
    )

    const filteredDataLength = checkFilteredDataLength({
        ...filter,
        ...(studentId?.studentId ? studentId : {}),
        ...(studentName?.name ? studentName : {}),
    })

    return (
        <div>
            <SetDetaultQueryFilteres<StudentsFilterType>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex justify-end gap-x-2 mb-2">
                    <div className="w-60">
                        <TextInput
                            name={'name'}
                            placeholder={'Search by Student Name'}
                            value={studentNameValue}
                            onChange={(e: any) => {
                                setStudentNameValue(e.target.value)
                                delayedNameSearch(e.target.value)
                            }}
                        />
                    </div>
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
                <Filter<StudentsFilterType>
                    setFilter={(f: StudentsFilterType) => {
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
                            filter={filter}
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            student={filteredStudents}
                            setItemPerPage={setItemPerPage}
                            setStatusSuccessResult={setStatusSuccessResult}
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
