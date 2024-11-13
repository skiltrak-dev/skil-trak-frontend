import { FC, useState } from 'react'
import { Employee, ScheduleEntry } from '../types'
import { WeeklyGrid } from './WeeklyGrid'
import { EmployeeWeeklyScheduleRow } from './EmployeeWeeklyScheduleRow'
import { MonthlyGrid } from './MonthlyGrid'
import { EmployeeMonthlyScheduleRow } from './EmployeeMonthlyScheduleRow'
import { Typography } from '@components'
import { CiFilter } from 'react-icons/ci'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { getStartOfWeek } from '../utilsFunc'
import { ellipsisText } from '@utils'

interface ScheduleGridProps {
    employees: Employee[]
    schedules: ScheduleEntry[]
    startDate: Date
    view: string
    getDateDisplay: any
}

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const ScheduleGrid: FC<ScheduleGridProps> = ({
    employees,
    schedules,
    startDate,
    view,
    getDateDisplay,
}) => {
    const router = useRouter()
    const id = router.query.id
    const { data } = SubAdminApi.Industry.useIndustryStudentsSchedule(
        {
            id: id,
            params: {
                startDate: encodeURIComponent(getDateDisplay().slice(0, 10)),
                endDate: encodeURIComponent(getDateDisplay().slice(13, 23)),
            },
        },
        {
            skip: !id,
            refetchOnMountOrArgChange: true,
        }
    )

    return (
        <div className="flex-1">
            <div className="flex min-h-80 max-h-96 overflow-auto custom-scrollbar">
                {/* Schedule grid */}
                <div className="flex-1 w-full">
                    {view === 'month' ? (
                        <>
                            <div className="flex w-full bg-white">
                                <div className="w-[11.8rem] border-b px-4 flex items-center justify-between">
                                    <Typography variant="label" semibold>
                                        Student(s)
                                    </Typography>
                                    <div className="cursor-pointer">
                                        <CiFilter size={25} />
                                    </div>
                                </div>
                                <div className="w-full">
                                    {' '}
                                    <MonthlyGrid
                                        schedules={schedules}
                                        startDate={startDate}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full ">
                                <div className="bg-white w-48 min-h-80 max-h-96 overflow-y-auto custom-scrollbar">
                                    {data?.map((student: any) => (
                                        <div className="items-center p-2 border-r border-b border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                {student?.avatar ? (
                                                    <img
                                                        src={
                                                            student?.user
                                                                ?.avatar
                                                        }
                                                        alt={
                                                            student?.user?.name
                                                        }
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {student?.user?.name?.charAt(
                                                            0
                                                        )}
                                                    </div>
                                                )}
                                                <div className="">
                                                    <div
                                                        title={
                                                            student?.user?.name
                                                        }
                                                        className=""
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            medium
                                                        >
                                                            {ellipsisText(
                                                                student?.user
                                                                    ?.name,
                                                                10
                                                            )}
                                                        </Typography>
                                                    </div>
                                                    <div
                                                        title={
                                                            student?.user?.email
                                                        }
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            medium
                                                        >
                                                            {ellipsisText(
                                                                student?.user
                                                                    ?.email,
                                                                10
                                                            )}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <EmployeeMonthlyScheduleRow
                                    data={data}
                                    startDate={startDate}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {' '}
                            <div className="flex w-full bg-white">
                                <div className="w-[11.8rem] border-b p-4 flex items-center justify-between">
                                    <Typography variant="label" semibold>
                                        Student(s)
                                    </Typography>
                                    <div className="cursor-pointer">
                                        <CiFilter size={25} />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <WeeklyGrid startDate={startDate} />
                                </div>
                            </div>
                            {data?.map((student: any) => (
                                <div className="flex w-full">
                                    <div className="w-48 flex items-center p-2 border-r border-b bg-white border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            {student?.user?.avatar ? (
                                                <img
                                                    src={student?.user?.avatar}
                                                    alt={student?.user?.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                    {student?.user?.name.charAt(
                                                        0
                                                    )}
                                                </div>
                                            )}
                                            <div className="">
                                                <div
                                                    title={student?.user?.name}
                                                    className=""
                                                >
                                                    <Typography
                                                        variant="small"
                                                        medium
                                                    >
                                                        {ellipsisText(
                                                            student?.user?.name,
                                                            10
                                                        )}
                                                    </Typography>
                                                </div>
                                                <div
                                                    title={student?.user?.email}
                                                >
                                                    <Typography
                                                        variant="small"
                                                        medium
                                                    >
                                                        {ellipsisText(
                                                            student?.user
                                                                ?.email,
                                                            10
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <EmployeeWeeklyScheduleRow
                                        key={student.id}
                                        employee={student}
                                        schedules={student?.user?.schedules}
                                        startDate={startDate}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
