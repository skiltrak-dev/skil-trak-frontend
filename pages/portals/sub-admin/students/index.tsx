import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout, UserCount } from '@types'

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

type Props = {}

const Students: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const count = SubAdminApi.Student.useCount()
    const [studentCount, setStudentCount] = useState<any>({})

    let test = {}

    const arr = [
        { pending: 0 },
        { approved: 0 },
        { archived: 0 },
        { blocked: 0 },
        { rejected: 0 },
    ]

    useEffect(() => {
        if (count?.isSuccess && count?.data) {
            count?.data?.forEach((count: any) =>
                Object.entries(count).map(([key, value]) => {
                    setStudentCount((preVal: any) => ({
                        ...preVal,
                        [key]: value,
                    }))
                })
            )
        }
    }, [count])

    const filteredStudents = useGetSubAdminStudentsQuery(
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
            label: 'Pending',
            href: { pathname: 'students', query: { tab: 'pending' } },
            badge: {
                text: studentCount?.pending,
                loading: count.isLoading,
            },
            element: <PendingStudents />,
        },
        {
            label: 'Approved',
            href: { pathname: 'students', query: { tab: 'all' } },
            badge: {
                text: studentCount?.approved,
                loading: count.isLoading,
            },
            element: <AllStudents />,
        },
        {
            label: 'My Students',
            href: { pathname: 'students', query: { tab: 'my-students' } },
            element: <MyStudents />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'students', query: { tab: 'rejected' } },
            badge: {
                text: studentCount?.rejected,
                loading: count.isLoading,
            },
            element: <RejectedStudents />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'students', query: { tab: 'blocked' } },
            badge: {
                text: studentCount?.blocked,
                loading: count.isLoading,
            },
            element: <BlockedStudents />,
        },
        {
            label: 'Archived',
            href: { pathname: 'students', query: { tab: 'archived' } },
            badge: {
                text: studentCount?.archived,
                loading: count.isLoading,
            },
            element: <ArchivedStudents />,
        },
    ]

    return (
        <>
            <div className="flex justify-between items-end">
                <PageTitle title={'Students'} backTitle={'Users'} />

                <div className="">{filterAction}</div>
            </div>

            <div className="py-4">
                <Filter
                    component={SubAdminStudentFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>

            <div>
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
                )}
            </div>
        </>
    )
}
Students.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Students
