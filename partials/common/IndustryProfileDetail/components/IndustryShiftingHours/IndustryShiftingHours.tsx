import { AdminApi } from '@queries'
import { useContextBar } from '@hooks'
import { Waypoint } from 'react-waypoint'
import { AddShiftsCB } from './contextBar'
import { useEffect, useState } from 'react'
import { FreeShifts, TradingHours } from './components'
import {
    AuthorizedUserComponent,
    Button,
    Card,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { initialSchedule } from '@partials/industry/AvailableShifts/components'
import { UserRoles } from '@constants'

export const IndustryShiftingHours = ({
    industryUserId,
    showTitle = true,
    type,
}: {
    showTitle?: boolean
    industryUserId: number
    type?: string
}) => {
    console.log('IndustryShiftingHours', industryUserId, type)
    const contextBar = useContextBar()

    const [isEntered, setIsEntered] = useState<boolean>(false)

    const industryAvailableHours =
        AdminApi.Industries.useIndustryAvailableHours(industryUserId, {
            skip: !industryUserId || !isEntered,
        })

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
        <Waypoint
            onEnter={() => {
                setIsEntered(true)
            }}
            onLeave={() => {
                setIsEntered(false)
            }}
        >
            <div>
                <Card fullHeight shadowType="profile" noPadding>
                    {showTitle ? (
                        <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                            <Typography semibold>
                                <span className="text-[15px]">Overview</span>
                            </Typography>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
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
                                                industryUserId={industryUserId}
                                            />
                                        )
                                    }}
                                    disabled={
                                        !industryAvailableHours?.isSuccess
                                    }
                                />
                            </AuthorizedUserComponent>
                        </div>
                    ) : null}

                    {/*  */}

                    {industryAvailableHours.isError && (
                        <NoData text="There is some technical error!" />
                    )}
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
