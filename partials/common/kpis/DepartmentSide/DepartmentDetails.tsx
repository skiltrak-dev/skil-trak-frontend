'use client'

import { Card, LoadingAnimation, NoData, Typography } from '@components'
import {
    DepartmentInfo,
    DoughnutChart,
    useDataContext,
} from '@partials/common/kpis'
import { AdminApi } from '@queries'
import { OptionType } from '@types'
import moment, { Moment } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { FaCaretUp } from 'react-icons/fa6'
import { GrDown } from 'react-icons/gr'

export const DepartmentDetails = ({
    startDate,
    endDate,
}: {
    startDate?: Moment | null
    endDate?: Moment | null
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDept, setSelectedDept] = useState<OptionType | null>(null)

    const departments = AdminApi.Department.getDepartmentFilterList()
    const employeeProgressCountsByDept = AdminApi.Kpi.employeeProgressByDept(
        {
            search: `startDate:${moment(startDate).format(
                'YYYY-MM-DD'
            )},endDate:${moment(endDate).format('YYYY-MM-DD')}`,
            deptId: Number(selectedDept?.value),
        },
        {
            skip: !selectedDept || !startDate || !endDate,
        }
    )

    const departmentsOptions = useMemo(
        () =>
            departments?.data?.map((department: any) => ({
                value: department?.id,
                label: department?.name,
            })) || [],
        [departments]
    )

    useEffect(() => {
        if (departmentsOptions && departmentsOptions?.length > 0) {
            setSelectedDept(departmentsOptions?.[0])
        }
    }, [departmentsOptions])

    const handleDepartmentChange = (dept: OptionType) => {
        setSelectedDept(dept)
        setIsOpen(false)
    }

    const currentDept = {
        name: 'Business 2 Business',
        growth: 9.64,
        metrics: [
            {
                label: 'Appointment',
                value: employeeProgressCountsByDept?.data?.appointments,
                maxValue: 10,
                color: '#0365F5',
            },
            {
                label: 'Workplace request',
                value: employeeProgressCountsByDept?.data?.workplaceRequest,
                maxValue: 10,
                color: '#F5A70C',
            },
            {
                label: 'Completed',
                value: employeeProgressCountsByDept?.data?.completed,
                maxValue: 10,
                color: '#FF0303',
            },
            {
                label: 'Agreement by student',
                value: employeeProgressCountsByDept?.data?.agreementByStudent,
                maxValue: 10,
                color: '#35E100',
            },
            {
                label: 'Agreement by workplace',
                value: employeeProgressCountsByDept?.data?.agreementByWorkplace,
                maxValue: 10,
                color: '#207D04',
            },
        ],
        activities: [
            {
                label: 'Call industries',
                value: employeeProgressCountsByDept?.data?.industryCalled,
            },
            {
                label: 'Call Student',
                value: employeeProgressCountsByDept?.data?.studentsCalled,
            },
            {
                label: 'new Signup industries',
                value: employeeProgressCountsByDept?.data?.newIndustries,
            },
            {
                label: 'new Student added',
                value: employeeProgressCountsByDept?.data?.newStudents,
            },
            {
                label: 'Flagged Student',
                value: employeeProgressCountsByDept?.data?.flaggedStudents,
            },
            {
                label: 'Snoozed Student',
                value: employeeProgressCountsByDept?.data?.snoozedStudents,
            },
        ],
        chartSegments: [
            {
                label: 'Appointment',
                value: employeeProgressCountsByDept?.data?.appointments || 0,
                color: '#0365F5',
            },
            {
                label: 'Workplace request',
                value:
                    employeeProgressCountsByDept?.data?.workplaceRequest || 0,
                color: '#F5A70C',
            },
            {
                label: 'Completed',
                value: employeeProgressCountsByDept?.data?.completed || 0,
                color: '#FF0303',
            },
            {
                label: 'Agreement by student',
                value:
                    employeeProgressCountsByDept?.data?.agreementByStudent || 0,
                color: '#35E100',
            },
            {
                label: 'Agreement by workplace',
                value:
                    employeeProgressCountsByDept?.data?.agreementByWorkplace ||
                    0,
                color: '#207D04',
            },
        ],
    }

    const valuesAdded = useMemo(
        () =>
            currentDept?.chartSegments?.reduce((acc, curr) => {
                return acc + curr?.value
            }, 0),
        [currentDept]
    )

    const chartSegments =
        valuesAdded > 0
            ? currentDept?.chartSegments
            : [
                  {
                      label: 'Empty',
                      value: 1,
                      color: '#d1caca',
                  },
              ]

    return (
        // <div className=" lg:max-w-2xl rounded-lg bg-white mx-auto p-4">
        <Card>
            <div className="relative mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-[#384455] font-semibold text-white text-lg px-8 py-3 rounded-lg flex justify-between items-center"
                >
                    <span>{selectedDept?.label}</span>
                    <GrDown
                        className={`transform ${
                            isOpen ? 'rotate-180' : ''
                        } transition-transform`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                        {departmentsOptions?.map((dept: OptionType) => (
                            <button
                                key={Number(dept?.value)}
                                className={`w-full px-4 py-2 text-left transition-colors 
                    ${
                        dept?.label === selectedDept?.label
                            ? 'bg-slate-200 font-bold'
                            : 'hover:bg-gray-100'
                    }`}
                                onClick={() => handleDepartmentChange(dept)}
                            >
                                {dept?.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {employeeProgressCountsByDept?.isError ? (
                <NoData text="Technical Error!" />
            ) : null}

            {employeeProgressCountsByDept?.isLoading ||
            employeeProgressCountsByDept?.isFetching ? (
                <LoadingAnimation />
            ) : employeeProgressCountsByDept?.data &&
              employeeProgressCountsByDept?.isSuccess ? (
                <>
                    <div className="lg:flex lg:flex-col lg:gap-0 md:grid md:grid-cols-2 md:gap-8">
                        <div className="">
                            <div className="max-w-2xl">
                                <DoughnutChart
                                    segments={chartSegments}
                                    empty={!valuesAdded}
                                />
                            </div>

                            <div className="">
                                <Typography
                                    variant="label"
                                    color="text-[#809FB8]"
                                    normal
                                >
                                    Department Of
                                </Typography>
                                <div className="flex items-center justify-between">
                                    <Typography variant="title" medium>
                                        {selectedDept?.label}
                                    </Typography>
                                    {/* <span className="flex flex-row items-center justify-between text-base font-bold text-[#1AD598] ">
                                        <FaCaretUp />{' '}
                                        {currentDept?.growth?.toFixed(2)}%
                                    </span> */}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 lg:mb-0 mt-10 lg:mt-4">
                            {currentDept?.metrics?.map((metric, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-x-2"
                                >
                                    <Typography
                                        variant="label"
                                        color={`text-[${metric?.color}]`}
                                        block
                                    >
                                        {metric?.label}
                                    </Typography>

                                    <div className="flex-1 bg-gray-200 rounded-lg">
                                        <div
                                            className="h-2 rounded-full transition-all duration-300"
                                            style={{
                                                backgroundColor: metric?.color,
                                                width: `${
                                                    metric?.value > 100
                                                        ? 100
                                                        : metric?.value
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                    <Typography variant="label">
                                        {metric?.value?.toFixed(1)}%
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="w-[70%] mx-auto my-6" />
                    <div className="space-y-2">
                        {currentDept.activities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex justify-between text-[#1F1717] font-normal items-center p-2 rounded-lg"
                            >
                                <span className="">{activity?.label}</span>
                                <span className="">
                                    {activity?.value?.toFixed(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            ) : employeeProgressCountsByDept?.isSuccess ? (
                <NoData text="No Data Found!" />
            ) : null}
        </Card>
    )
}
