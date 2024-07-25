import { Button, Typography } from '@components'
import { useContextBar } from '@hooks'
import { initialSchedule } from '@partials/industry/AvailableShifts/components'
import { useGetAvailableShiftsQuery } from '@queries'
import { Industry } from '@types'
import { useEffect, useState } from 'react'
import { TimingBreakCard, TimingCard } from './cards'
import { FreeShifts } from './components'
import { AddShiftsCB } from './contextBar'

export const IndustryShiftingHours = () => {
    const contextBar = useContextBar()

    const industryAvailableHours = useGetAvailableShiftsQuery()

    const [workingHoursTime, setWorkingHoursTime] = useState<any | null>([
        ...initialSchedule.map((day) => ({ ...day })), // shallow copy
    ])

    useEffect(() => {
        if (
            !industryAvailableHours.isLoading &&
            !industryAvailableHours.isFetching &&
            industryAvailableHours?.data &&
            industryAvailableHours?.isSuccess
        ) {
            if (industryAvailableHours?.data?.length > 0) {
                const tempWorkingHours: any = [...workingHoursTime]

                industryAvailableHours?.data?.forEach((schedule: any) => {
                    const dayIndex = tempWorkingHours.findIndex(
                        (d: any) => d.day === schedule.day
                    )
                    tempWorkingHours[dayIndex].id = schedule.id
                    tempWorkingHours[dayIndex].openingTime =
                        schedule.openingTime
                    tempWorkingHours[dayIndex].closingTime =
                        schedule.closingTime
                    tempWorkingHours[dayIndex].dayOn = schedule.dayOn
                    tempWorkingHours[dayIndex].break = schedule.break
                    tempWorkingHours[dayIndex].breakStart = schedule.breakStart
                    tempWorkingHours[dayIndex].breakEnd = schedule.breakEnd
                    tempWorkingHours[dayIndex].shifts = schedule.shifts
                })

                setWorkingHoursTime(tempWorkingHours)
            }
        }
    }, [industryAvailableHours])

    return (
        <div className="flex flex-col gap-y-2.5">
            <div className="bg-[#24556D] p-3.5 rounded-[10px]">
                <div className="flex justify-between items-center">
                    <Typography capitalize color={'text-white'}>
                        trading hours
                    </Typography>
                    <Button
                        text={
                            industryAvailableHours?.data &&
                            industryAvailableHours?.data?.length > 0
                                ? 'Edit Shifts'
                                : 'Add Shifts'
                        }
                        onClick={() => {
                            contextBar.show(false)
                            contextBar.setTitle('Add Shifts')
                            contextBar.setContent(
                                <AddShiftsCB
                                    industryAvailableHours={
                                        industryAvailableHours?.data
                                    }
                                />
                            )
                        }}
                        disabled={!industryAvailableHours?.isSuccess}
                    />
                </div>

                {/*  */}
                <div className="pt-3">
                    <div className="bg-[#FFFFFFCC] rounded border border-white grid grid-cols-7">
                        {workingHoursTime?.map((timing: any) => (
                            <div>
                                <div className="py-2.5 flex justify-center border-r border-b border-white">
                                    <Typography variant="small" capitalize>
                                        {timing?.day?.substring(0, 3)}
                                    </Typography>
                                </div>
                                <div
                                    key={timing?.day}
                                    className="w-full h-[68px] flex justify-center items-center"
                                >
                                    <TimingCard timing={timing} />
                                </div>
                                <div
                                    key={timing?.day}
                                    className="w-full rounded-b h-[72px] flex justify-center items-center"
                                >
                                    <TimingBreakCard timing={timing} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-[#384151] p-3.5 rounded-[10px]">
                <div className="flex justify-between items-center">
                    <Typography capitalize color={'text-white'}>
                        Free hours
                    </Typography>
                </div>

                {/*  */}
                <div className="pt-3">
                    <div className="h-40 overflow-auto custom-scrollbar bg-[#FFFFFFCC] rounded border border-white grid grid-cols-7">
                        {workingHoursTime?.map((timing: any) => (
                            <div>
                                <div className="py-2.5 flex justify-center border-r border-b border-white">
                                    <Typography variant="small" capitalize>
                                        {timing?.day?.substring(0, 3)}
                                    </Typography>
                                </div>
                                <div
                                    key={timing?.day}
                                    className="w-full flex justify-center items-center"
                                >
                                    <FreeShifts timing={timing} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
