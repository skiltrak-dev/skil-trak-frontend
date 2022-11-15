import React from 'react'
import update from 'immutability-helper'

// components
import { Typography, LoadingAnimation } from 'components'
import { ScheduleCard } from './components/ScheduleCard'

// redux
import { useUpdateEmployeeTaskOnDragMutation } from 'redux/query'

export const Schedule = ({
    EmployeeData,
    setEmployeesData,
    employeeTaskLoading,
}) => {
    // update Tasks
    const [updateTask, updateTaskResult] = useUpdateEmployeeTaskOnDragMutation()

    console.log('updateTaskResult', updateTaskResult)

    const moveCardHandler = async (
        outerIndex,
        dragIndex,
        hoverIndex,
        innerIndex
    ) => {
        const dragData = EmployeeData[outerIndex].tasks[dragIndex]

        // console.log("dragData", dragData, dropData);
        setEmployeesData((preVal) => {
            const dragData = preVal[outerIndex].tasks[dragIndex]
            const dropData = preVal[outerIndex].tasks[hoverIndex]
            const data = update(preVal, {
                [outerIndex]: {
                    tasks: {
                        $splice: [
                            [dragIndex, 1, dropData],
                            [hoverIndex, 1, dragData],
                        ],
                    },
                },
            })
            return data
        })

        await updateTask({
            innerIndex,
            outerIndex,
            day: hoverIndex,
            task: dragData.id,
        })
    }

    return (
        <div className={`w-full mt-6 border border-secondary-dark relative`}>
            {employeeTaskLoading && (
                <div className="absolute w-full h-full flex justify-center items-center bg-[#00000015]">
                    <LoadingAnimation />
                </div>
            )}
            <div className="w-full border-b border-secondary-dark px-2 py-4 grid grid-cols-7  items-center">
                <div className="col-span-2">
                    <Typography variant={'links'}>Employees</Typography>
                </div>
                <Typography variant={'links'}>Mon 1/7</Typography>
                <Typography variant={'links'}>Tue 2/7</Typography>
                <Typography variant={'links'}>Wed 3/7</Typography>
                <Typography variant={'links'}>Thu 4/7</Typography>
                <Typography variant={'links'}>Fri 5/7</Typography>
            </div>
            {/*  */}

            {EmployeeData?.map((employee, outerIndex) => {
                return (
                    <div
                        key={outerIndex}
                        className="grid grid-cols-7 items-center px-2"
                    >
                        <div className="col-span-2 flex items-center gap-x-2 py-3">
                            <img src={`/images/avatar.png`} alt="" />
                            <div>
                                <Typography
                                    variant={'links'}
                                >{`${employee.firstName} ${employee.lastName}`}</Typography>
                                <Typography variant={'smallText'}>
                                    {employee.status}
                                </Typography>
                            </div>
                        </div>
                        {employee?.tasks?.map((task, innerIndex) => (
                            <ScheduleCard
                                key={innerIndex}
                                employee={employee}
                                items={task}
                                note={task.note}
                                empty={task.empty}
                                endTime={task.endTime}
                                outerIndex={outerIndex}
                                innerIndex={innerIndex}
                                priority={task.priority}
                                startTime={task.startTime}
                                type={String(employee.id)}
                                moveCardHandler={moveCardHandler}
                                // employeeTaskLoading={employeeTaskLoading}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
