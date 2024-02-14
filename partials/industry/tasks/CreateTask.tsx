import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// components
import {
    Button,
    Card,
    Typography,
    LoadingAnimation,
    // Pagination,
    TechnicalError,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'
import { Schedule } from './components'
import { SidebarCB } from './contextBar'
import { AddTaskForm } from './form'

// Context
import { useContextBar } from '@hooks'

import { useGetEmployeeQuery } from '@queries'
import { useRouter } from 'next/router'

export const CreateTask = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)
    // Employee
    const EmployeeData = useGetEmployeeQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])

    const { setContent, show } = useContextBar()

    const [isSchedule, setIsSchedule] = useState(false)

    // New Array for Employees
    const [employeesData, setEmployeesData] = useState([])

    //
    const [paginatedEmployeeData, setPaginatedEmployeeData] = useState<
        any[] | null
    >([])

    // Creating Empty divs against tasks

    useEffect(() => {
        setEmployeesData(EmployeeData?.data?.data)
    }, [EmployeeData])

    useEffect(() => {
        const Days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

        EmployeeData.isSuccess &&
            setPaginatedEmployeeData(
                employeesData?.map((data: any) => {
                    var arr = [...Array(5)].map((_) => ({
                        empty: true,
                    }))
                    for (let index = 0; index < arr.length; index++) {
                        for (let i = 0; i < data?.tasks?.length; i++) {
                            if (Days[index] === data?.tasks[i]?.day) {
                                arr[index] = data.tasks[i]
                            }
                        }
                    }
                    return {
                        ...data,
                        tasks: arr,
                    }
                })
            )
    }, [employeesData, EmployeeData.isSuccess])

    useEffect(() => {
        setContent(<SidebarCB />)
    }, [setContent])

    return (
        <DndProvider backend={HTML5Backend}>
            <Card>
                {EmployeeData.isError && <TechnicalError />}
                {EmployeeData.isLoading ? (
                    <LoadingAnimation />
                ) : EmployeeData.data && EmployeeData.data.data.length > 0 ? (
                    <>
                        <div className="">
                            <div className="flex items-center gap-x-2 mb-4">
                                <PageSize
                                    itemPerPage={itemPerPage}
                                    setItemPerPage={setItemPerPage}
                                    records={EmployeeData?.data?.data?.length}
                                />
                                <Pagination
                                    pagination={EmployeeData?.data?.pagination}
                                    setPage={setPage}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <Typography variant={'small'}>Schedule</Typography>
                        </div>
                        <div className="flex justify-between items-center">
                            <p></p>
                            <div className="flex items-center gap-x-2">
                                {/* <Button onClick={() => {}} text={'Publish'} /> */}
                                <Button
                                    variant={'dark'}
                                    onClick={() => {
                                        // setIsSchedule(true)
                                        // show(false)
                                        router.push(
                                            '/portals/industry/tasks/add-a-schedule/schedule/add-schedule-form'
                                        )
                                    }}
                                    text={'+ Add Shift'}
                                />
                            </div>
                        </div>

                        <Schedule
                            EmployeeData={paginatedEmployeeData}
                            setEmployeesData={setEmployeesData}
                            employeeTaskLoading={EmployeeData.isFetching}
                        />
                    </>
                ) : (
                    !EmployeeData.isError && (
                        <EmptyData actionLink={'/create-task'} />
                    )
                )}
            </Card>
        </DndProvider>
    )
}
