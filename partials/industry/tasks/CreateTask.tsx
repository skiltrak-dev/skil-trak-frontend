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
} from '@components'
import { Schedule } from './components'
import { SidebarCB } from './contextBar'
import { AddTaskForm } from './form'

// Context
import { useContextBar } from '@hooks'

import { useGetEmployeeQuery } from '@queries'
import { useRouter } from 'next/router'

export const CreateTask = () => {
    const [resultsPerPage] = useState(5)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)

    // Employee
    const EmployeeData = useGetEmployeeQuery({
        skip: resultsPerPage * (currentPage - 1),
        limit: resultsPerPage,
    })

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

    // useEffect(() => {
    //     setContent(
    //         <>
    //             {isSchedule ? (
    //                 <AddTaskForm setIsSchedule={setIsSchedule} />
    //             ) : (
    //                 <SidebarCB />
    //             )}
    //         </>
    //     )
    // }, [setContent, isSchedule])

    return (
        <DndProvider backend={HTML5Backend}>
            <Card>
                {EmployeeData.isError && <TechnicalError />}
                {EmployeeData.isLoading ? (
                    <LoadingAnimation />
                ) : EmployeeData.data && EmployeeData.data.data.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center">
                            <Typography variant={'small'}>Schedule</Typography>
                            {/* <Pagination
            data={EmployeeData.isSuccess ? EmployeeData.data.data : []}
            itemsPerPage={5}
            setCurrentItems={setEmployeesData}
          /> */}
                            {/* {EmployeeData?.data?.pagination?.totalPage > 1 && (
                <Pagination
                  pageCount={EmployeeData?.data?.pagination?.totalPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              )} */}
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
                                        router.push('/portals/industry/tasks/add-a-schedule/schedule/add-schedule-form')
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
