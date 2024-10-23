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
                {!filteredDataLength && <DepartmentStudentList />}
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
