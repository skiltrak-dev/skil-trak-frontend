import { ReactElement, useCallback, useEffect, useState } from 'react'
import {
    NextPageWithLayout,
    SubAdminStudentsFilterType,
    UserCount,
    UserStatus,
} from '@types'
import debounce from 'lodash/debounce'

//components
import {
    Button,
    Card,
    Filter,
    LoadingAnimation,
    PageTitle,
    RtoContextBarData,
    SidebarCalendar,
    StudentFilters,
    TechnicalError,
    SubAdminStudentFilters,
    TabNavigation,
    TabProps,
    TextInput,
} from '@components'
import {
    AllStudents,
    ArchivedStudents,
    BlockedStudents,
    FilteredStudents,
    MyStudents,
    PendingStudents,
    RejectedStudents,
} from '@partials/sub-admin/students'

// query
import { SubAdminApi, useGetSubAdminStudentsQuery } from '@queries'

// hooks
import { useContextBar } from '@hooks'

//Layouts
import { SubAdminLayout } from '@layouts'
import { checkFilteredDataLength, getCountData, getFilterQuery } from '@utils'
import { useRouter } from 'next/router'

type Props = {}

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

const Students: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const { setContent } = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<SubAdminStudentsFilterType>(
        {} as SubAdminStudentsFilterType
    )
    const [studentId, setStudentId] = useState<any | null>(null)
    const [studentIdValue, setStudentIdValue] = useState<string>('')
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
        const query = getFilterQuery<SubAdminStudentsFilterType>({
            router,
            filterKeys,
        })
        setFilter(query as SubAdminStudentsFilterType)
    }, [router])

    const count = SubAdminApi.Student.useCount()

    const filteredStudents = useGetSubAdminStudentsQuery(
        {
            search: `${JSON.stringify({ ...filter, ...studentId })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            skip: !Object.keys({
                ...filter,
                ...(studentId?.studentId ? studentId : {}),
            }).length,
        }
    )

    const studentCount = getCountData<{ [key: string]: number }>(count?.data)

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'students', query: { tab: UserStatus.Pending } },
            badge: {
                text: studentCount?.pending,
                loading: count.isLoading,
            },
            element: <PendingStudents />,
        },
        {
            label: 'Active',
            href: { pathname: 'students', query: { tab: 'all' } },
            badge: {
                text: studentCount?.approved,
                loading: count.isLoading,
            },
            element: <AllStudents />,
        },
        {
            label: 'My Students',
            badge: {
                text: studentCount?.myStudents,
                loading: count.isLoading,
            },
            href: { pathname: 'students', query: { tab: 'my-students' } },
            element: <MyStudents />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'students', query: { tab: UserStatus.Rejected } },
            badge: {
                text: studentCount?.rejected,
                loading: count.isLoading,
            },
            element: <RejectedStudents />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'students', query: { tab: UserStatus.Blocked } },
            badge: {
                text: studentCount?.blocked,
                loading: count.isLoading,
            },
            element: <BlockedStudents />,
        },
        {
            label: 'Archived',
            href: { pathname: 'students', query: { tab: UserStatus.Archived } },
            badge: {
                text: studentCount?.archived,
                loading: count.isLoading,
            },
            element: <ArchivedStudents />,
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
        <>
            <div className="flex justify-between items-end">
                <PageTitle title={'Students'} backTitle={'Users'} />

                <div className="flex gap-x-2">
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
            </div>

            <div className="py-4">
                <Filter<SubAdminStudentsFilterType>
                    setFilter={(f: SubAdminStudentsFilterType) => {
                        setStudentId(null)
                        setFilter(f)
                    }}
                    initialValues={filter}
                    filterKeys={filterKeys}
                    setFilterAction={setFilterAction}
                    component={SubAdminStudentFilters}
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

            {/* <div>
                {filteredStudents.isError && <TechnicalError />}
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
                    !filteredStudents.isError && (
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
                    )
                )} */}
            {/* </div> */}
        </>
    )
}
Students.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Students
