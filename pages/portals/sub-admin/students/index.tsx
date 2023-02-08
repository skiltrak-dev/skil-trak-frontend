import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '@types'

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
    FilteredStudents,
    MyStudents,
} from '@partials/sub-admin/students'

// query
import {
    useSubAdminFilteredStudentsQuery,
    useGetSubAdminStudentsQuery,
} from '@queries'

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
            label: 'All Students',
            href: { pathname: 'students', query: { tab: 'all' } },
            element: <AllStudents />,
        },
        {
            label: 'My Students',
            href: { pathname: 'students', query: { tab: 'my-students' } },
            element: <MyStudents />,
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
