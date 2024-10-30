import { AdminApi } from '@queries'
import { AdminLayout } from '@layouts'
import React, { ReactElement, useCallback, useState } from 'react'
import { NextPageWithLayout, StudentsFilterType } from '@types'
import { useRouter } from 'next/router'
import { checkFilteredDataLength } from '@utils'
import {
    DepartmentStudentList,
    DepartmentStudentsListProvider,
    FilterDepartmentStudents,
    FlaggedDepartmentStudents,
    NonContactableDepartmentStudents,
    SnoozedDepartmentStudents,
    useDepartmentStudentList,
} from '@partials/admin/departments'
import {
    Card,
    DepartmentStudentFilter,
    EmptyData,
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    StudentFilters,
    Table,
    TableChildrenProps,
    TabNavigation,
    TabProps,
    TechnicalError,
    TextInput,
} from '@components'
import { debounce } from 'lodash'
import { PageHeading } from '@components/headings'

const filterKeys = [
    'nowp',
    'name',
    'email',
    'phone',
    'rtoId',
    'suburb',
    'status',
    'sectorId',
    'courseId',
    'completed',
    'studentId',
    'industryId',
    'subadminId',
    'currentStatus',
]

const DepartmentStudent: NextPageWithLayout = () => {
    const [studentId, setStudentId] = useState<any | null>(null)
    const [studentIdValue, setStudentIdValue] = useState<string>('')
    const [studentName, setStudentName] = useState<any | null>(null)
    const [studentNameValue, setStudentNameValue] = useState<string>('')
    const router = useRouter()
    const { id } = router.query
    const {
        filter,
        setFilter,
        filterAction,
        setFilterAction,
        modal,
        passwordModal,
    } = useDepartmentStudentList()

    // const delayedSearch = useCallback(
    //     debounce((value) => {
    //         setStudentId({ studentId: value })
    //     }, 700),
    //     []
    // )

    // const delayedNameSearch = useCallback(
    //     debounce((value) => {
    //         setStudentName({ name: value })
    //     }, 700),
    //     []
    // )

    const filteredDataLength = checkFilteredDataLength({
        ...filter,
        ...(studentId?.studentId ? studentId : {}),
        ...(studentName?.name ? studentName : {}),
    })

    const tabs: TabProps[] = [
        {
            label: 'Department Student',
            href: {
                pathname: `/portals/admin/departments/${id}/students`,
                query: { tab: 'all' },
            },
            // badge: {
            //     text: studentCount?.pending,
            //     loading: count.isLoading,
            // },
            element: <DepartmentStudentList status={{ all: true }} />,
        },
        {
            label: 'Snoozed',
            href: {
                pathname: `/portals/admin/departments/${id}/students`,
                query: { tab: 'snoozed' },
            },
            // badge: {
            //     text: studentCount?.pending,
            //     loading: count.isLoading,
            // },
            element: <SnoozedDepartmentStudents status={{ snoozed: true }} />,
        },
        {
            label: 'Flagged',
            href: {
                pathname: `/portals/admin/departments/${id}/students`,
                query: { tab: 'flagged' },
            },
            // badge: {
            //     text: studentCount?.pending,
            //     loading: count.isLoading,
            // },
            element: <FlaggedDepartmentStudents status={{ flagged: true }} />,
        },
        {
            label: 'Non Contactable',
            href: {
                pathname: `/portals/admin/departments/${id}/students`,
                query: { tab: 'non-contactable' },
            },
            // badge: {
            //     text: studentCount?.pending,
            //     loading: count.isLoading,
            // },
            element: (
                <NonContactableDepartmentStudents
                    status={{ nonContactable: true }}
                />
            ),
        },
    ]

    return (
        <>
            {passwordModal && passwordModal}
            {modal && modal}
            <div className="mx-5 my-8">
                <div>
                    <SetDetaultQueryFilteres<StudentsFilterType>
                        filterKeys={filterKeys}
                        setFilter={setFilter}
                    />
                    <div className="px-4">
                        <div className="flex justify-end gap-x-2 mb-2">
                            {/* <div className="w-60">
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
                            </div> */}
                            <div className="flex-shrink-0">{filterAction}</div>
                        </div>
                        <Filter<StudentsFilterType>
                            setFilter={(f: StudentsFilterType) => {
                                setStudentId(null)
                                setFilter(f)
                            }}
                            initialValues={filter}
                            filterKeys={filterKeys}
                            component={DepartmentStudentFilter}
                            setFilterAction={setFilterAction}
                        />
                    </div>
                </div>
                <div className="my-4">
                    <PageHeading
                        title={'Department Students'}
                        subtitle={'List of Department Students'}
                    />
                </div>
                {/* Filter table */}
                {filteredDataLength && <FilterDepartmentStudents />}

                {/* Table */}
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
        </>
    )
}

DepartmentStudent.getLayout = (page: ReactElement) => {
    return (
        <AdminLayout>
            <DepartmentStudentsListProvider>
                {page}
            </DepartmentStudentsListProvider>
        </AdminLayout>
    )
}

export default DepartmentStudent
