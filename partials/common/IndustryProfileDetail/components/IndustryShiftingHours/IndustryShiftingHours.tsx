import { Button, Card, LoadingAnimation, NoData, Typography } from '@components'
import React, { useEffect, useState } from 'react'
import { FreeShifts, TradingHours } from './components'
import { Waypoint } from 'react-waypoint'
import { useContextBar } from '@hooks'
import { AddShiftsCB } from './contextBar'
import { Industry } from '@types'
import { AdminApi } from '@queries'
import { initialSchedule } from '@partials/industry/AvailableShifts/components'

export const IndustryShiftingHours = ({ industry }: { industry: Industry }) => {
    const contextBar = useContextBar()

    const industryAvailableHours =
        AdminApi.Industries.useIndustryAvailableHours(industry?.user?.id, {
            skip: !industry,
        })

    const [workingHoursTime, setWorkingHoursTime] = useState<any | null>([
        ...initialSchedule.map((day) => ({ ...day })), // shallow copy
    ])

    console.log({ initialSchedule, workingHoursTime, industryAvailableHours })

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
        <Waypoint onEnter={() => {}}>
            <div>
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                        <Typography semibold>
                            <span className="text-[15px]">Overview</span>
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
                                        industryUserId={industry?.user?.id}
                                    />
                                )
                            }}
                            disabled={!industryAvailableHours?.isSuccess}
                        />
                    </div>

                    {/*  */}

                    {industryAvailableHours.isError ? (
                        <NoData text="There is some technical error!" />
                    ) : null}
                    {industryAvailableHours?.isLoading ? (
                        <LoadingAnimation size={90} />
                    ) : (
                        <div className="h-[475px] overflow-auto custom-scrollbar">
                            <TradingHours workingHoursTime={workingHoursTime} />
                            <FreeShifts workingHoursTime={workingHoursTime} />
                        </div>
                    )}
                </Card>
            </div>
        </Waypoint>
    )
}
