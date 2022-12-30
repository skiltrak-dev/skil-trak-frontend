import { ReactElement, useEffect, useState } from 'react'
//Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    Button,
    Card,
    Filter,
    LoadingAnimation,
    PageTitle,
    StudentFilters,
    TabNavigation,
    TabProps,
} from '@components'
import { useContextBar, useJoyRide } from '@hooks'
import {
    ApprovedStudent,
    ArchivedStudent,
    BlockedStudent,
    FilteredStudents,
    PendingStudent,
    RejectedStudent,
} from '@partials/rto/student'
import { useRouter } from 'next/router'
import { FaChevronDown, FaFileImport, FaUserGraduate } from 'react-icons/fa'
import { useGetRtoStudentsQuery } from '@queries'

type Props = {}

const RtoStudents: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)

    const filteredStudents = useGetRtoStudentsQuery(
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

    // ADD STUDENT JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // ADD STUDENT JOY RIDE - END
    useEffect(() => {
        contextBar.show(false)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'students', query: { tab: 'pending' } },
            element: <PendingStudent />,
        },
        {
            label: 'Approved',
            href: { pathname: 'students', query: { tab: 'approved' } },
            element: <ApprovedStudent />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'students', query: { tab: 'rejected' } },
            element: <RejectedStudent />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'students', query: { tab: 'blocked' } },
            element: <BlockedStudent />,
        },
        {
            label: 'Archived',
            href: { pathname: 'students', query: { tab: 'archived' } },
            element: <ArchivedStudent />,
        },
    ]

    const [showDropDown, setShowDropDown] = useState(false)

    return (
        <>
            <div>
                <div className="flex items-end justify-between mb-6">
                    <PageTitle title="Students" backTitle="Users" />

                    <div className="flex items-center gap-x-3">
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropDown(true)}
                            onMouseLeave={() => setShowDropDown(false)}
                        >
                            <Button>
                                <span
                                    id="add-students"
                                    className="flex items-center gap-x-2"
                                >
                                    <span>Add Students</span>
                                    <FaChevronDown />
                                </span>
                            </Button>

                            {showDropDown ? (
                                <ul className="bg-white shadow-xl rounded-xl overflow-hidden absolute">
                                    <li>
                                        <button
                                            onClick={() => {
                                                router.push(
                                                    'students/import-students'
                                                )
                                            }}
                                            className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                        >
                                            <span className="text-gray-500">
                                                <FaFileImport />
                                            </span>
                                            <span className="whitespace-nowrap">
                                                {' '}
                                                Import Students
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                router.push(
                                                    'students/import-students'
                                                )
                                            }}
                                            className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                        >
                                            <span className="text-gray-500">
                                                <FaUserGraduate />
                                            </span>
                                            <span> Add Individual</span>
                                        </button>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                        {/* <Button
                            onClick={() => {
                                router.push('students/import-students')
                            }}
                        >
                            Import Students
                        </Button>
                        <Button
                            text="Add Individual Student"
                            onClick={() => {
                                router.push('students/add-individual-student')
                            }}
                        /> */}
                    </div>
                </div>

                <div>
                    <div className="px-4">
                        <div className="flex justify-end mb-2">
                            {filterAction}
                        </div>
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
                    ) : Object.keys(filter).length &&
                      filteredStudents.isSuccess ? (
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
            </div>
        </>
    )
}
RtoStudents.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RtoStudents
