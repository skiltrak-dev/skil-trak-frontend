import { FC, useState } from 'react'
import { Employee, ScheduleEntry } from '../types'
import { WeeklyGrid } from './WeeklyGrid'
import { EmployeeWeeklyScheduleRow } from './EmployeeWeeklyScheduleRow'
import { MonthlyGrid } from './MonthlyGrid'
import { EmployeeMonthlyScheduleRow } from './EmployeeMonthlyScheduleRow'
import {
    LoadingAnimation,
    NoData,
    TechnicalError,
    Typography,
} from '@components'
import { CiFilter } from 'react-icons/ci'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { getStartOfWeek } from '../utilsFunc'
import { ellipsisText } from '@utils'
import { PulseLoader } from 'react-spinners'
import { Waypoint } from 'react-waypoint'

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
    const [isEntered, setIsEntered] = useState<boolean>(false)
    const router = useRouter()
    const id = router.query.id
    const { data, isError, isLoading } =
        SubAdminApi.Industry.useIndustryStudentsSchedule(
            {
                id: id,
                params: {
                    startDate: encodeURIComponent(
                        getDateDisplay().slice(0, 10)
                    ),
                    endDate: encodeURIComponent(getDateDisplay().slice(13, 23)),
                },
            },
            {
                skip: !id || !isEntered,
                refetchOnMountOrArgChange: true,
            }
        )

    return (
        <Waypoint onEnter={() => setIsEntered(true)}>
            <div className="flex-1">
                <div className="flex min-h-80 max-h-96 overflow-auto custom-scrollbar">
                    {/* Schedule grid */}
                    <div className="flex-1 w-full">
                        {isError && <NoData text="Something went wrong...!" />}
                        {
                            isLoading ? (
                                <LoadingAnimation />
                            ) : (
                                <>
                                    {view === 'month' ? (
                                        <>
                                            <div className="flex w-full bg-white">
                                                <div className="w-[11.8rem] border-b px-4 flex items-center justify-between">
                                                    <Typography
                                                        variant="label"
                                                        semibold
                                                    >
                                                        Student(s)
                                                    </Typography>
                                                    {/* <div className="cursor-pointer">
                                                        <CiFilter size={25} />
                                                    </div> */}
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
                                                    {isLoading ? (
                                                        <PulseLoader />
                                                    ) : data &&
                                                      data?.length > 0 ? (
                                                        <>
                                                            {data?.map(
                                                                (
                                                                    student: any
                                                                ) => (
                                                                    <div className="items-center p-2 border-r border-b border-gray-200">
                                                                        <div className="flex items-center space-x-3">
                                                                            {student?.avatar ? (
                                                                                <img
                                                                                    src={
                                                                                        student
                                                                                            ?.user
                                                                                            ?.avatar
                                                                                    }
                                                                                    alt={
                                                                                        student
                                                                                            ?.user
                                                                                            ?.name
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
                                                                                        student
                                                                                            ?.user
                                                                                            ?.name
                                                                                    }
                                                                                    className=""
                                                                                >
                                                                                    <Typography
                                                                                        variant="small"
                                                                                        medium
                                                                                    >
                                                                                        {ellipsisText(
                                                                                            student
                                                                                                ?.user
                                                                                                ?.name,
                                                                                            10
                                                                                        )}
                                                                                    </Typography>
                                                                                </div>
                                                                                <div
                                                                                    title={
                                                                                        student
                                                                                            ?.user
                                                                                            ?.email
                                                                                    }
                                                                                >
                                                                                    <Typography
                                                                                        variant="small"
                                                                                        medium
                                                                                    >
                                                                                        {ellipsisText(
                                                                                            student
                                                                                                ?.user
                                                                                                ?.email,
                                                                                            10
                                                                                        )}
                                                                                    </Typography>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </>
                                                    ) : (
                                                        <NoData text="No Student Found" />
                                                    )}
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
                                                    <Typography
                                                        variant="label"
                                                        semibold
                                                    >
                                                        Student(s)
                                                    </Typography>
                                                    {/* <div className="cursor-pointer">
                                                        <CiFilter size={25} />
                                                    </div> */}
                                                </div>
                                                <div className="w-full">
                                                    <WeeklyGrid
                                                        startDate={startDate}
                                                    />
                                                </div>
                                            </div>
                                            {data && data?.length > 0 ? (
                                                <>
                                                    {data?.map(
                                                        (student: any) => (
                                                            <div className="flex w-full">
                                                                <div className="w-48 flex items-center p-2 border-r border-b bg-white border-gray-200">
                                                                    <div className="flex items-center space-x-3">
                                                                        {student
                                                                            ?.user
                                                                            ?.avatar ? (
                                                                            <img
                                                                                src={
                                                                                    student
                                                                                        ?.user
                                                                                        ?.avatar
                                                                                }
                                                                                alt={
                                                                                    student
                                                                                        ?.user
                                                                                        ?.name
                                                                                }
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
                                                                                title={
                                                                                    student
                                                                                        ?.user
                                                                                        ?.name
                                                                                }
                                                                                className=""
                                                                            >
                                                                                <Typography
                                                                                    variant="small"
                                                                                    medium
                                                                                >
                                                                                    {ellipsisText(
                                                                                        student
                                                                                            ?.user
                                                                                            ?.name,
                                                                                        10
                                                                                    )}
                                                                                </Typography>
                                                                            </div>
                                                                            <div
                                                                                title={
                                                                                    student
                                                                                        ?.user
                                                                                        ?.email
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="small"
                                                                                    medium
                                                                                >
                                                                                    {ellipsisText(
                                                                                        student
                                                                                            ?.user
                                                                                            ?.email,
                                                                                        10
                                                                                    )}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <EmployeeWeeklyScheduleRow
                                                                    key={
                                                                        student.id
                                                                    }
                                                                    employee={
                                                                        student
                                                                    }
                                                                    schedules={
                                                                        student
                                                                            ?.user
                                                                            ?.schedules
                                                                    }
                                                                    startDate={
                                                                        startDate
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            ) : (
                                                <NoData text="No Weekly Schedule Found" />
                                            )}
                                        </>
                                    )}
                                </>
                            )
                            // : (
                            //     !isError && <NoData text="No schedule found" />
                            // )
                        }
                    </div>
                </div>
            </div>
        </Waypoint>
    )
}
