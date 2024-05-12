import { Button, Card, Typography } from '@components'
import React, { useCallback, useRef, useState } from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { RtoReportsDates } from './components'
import { User } from '@types'
import { ReportTabs } from './ReportTabs'

export const RtoReports = ({
    user,
    createdAt,
}: {
    user?: User
    createdAt: Date
}) => {
    const monthEnd = new Date()
    monthEnd.setDate(monthEnd.getDate() - 30)
    const [startDate, setStartDate] = useState<Date>(monthEnd)
    const [endDate, setEndDate] = useState<Date>(new Date())

    const onSetDates = useCallback((startDate: string, endDate: string) => {
        setStartDate(new Date(startDate))
        setEndDate(new Date(endDate))
    }, [])

    return (
        <Card fullHeight noPadding shadowType="profile">
            <div className="px-4 py-3.5 border-b border-secondary-dark flex items-center justify-between">
                <div className="">
                    <Typography semibold>
                        <span className="text-[15px]">Reports</span>
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2.5">
                    <Button
                        Icon={BsDownload}
                        variant="info"
                        text="Weekly Report"
                    />
                    <Button
                        Icon={BsDownload}
                        variant="info"
                        text="Monthly Report"
                    />
                </div>
            </div>

            {/*  */}
            <div className="px-4 py-3.5 bg-[#F5F7FB]">
                <RtoReportsDates
                    user={user}
                    createdAt={createdAt}
                    startDate={startDate}
                    onSetDates={onSetDates}
                />
            </div>

            {/*  */}
            <div className="pb-3.5">
                <ReportTabs
                    endDate={endDate}
                    startDate={startDate}
                    user={user?.id}
                />
            </div>
        </Card>
    )
}
