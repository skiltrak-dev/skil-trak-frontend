import { Button, Card, Typography } from '@components'
import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import { BsDownload, BsFiletypeXls } from 'react-icons/bs'
import { RtoReportsDates } from './components'
import { User } from '@types'
import { ReportTabs } from './ReportTabs'
import { FaChevronDown, FaFileCsv } from 'react-icons/fa'
import { ReportListModal } from '@partials/rto/components/ReportListModal'

export const RtoReports = ({
    user,
    createdAt,
}: {
    user?: User
    createdAt: Date
}) => {
    const monthEnd = new Date()
    monthEnd.setDate(monthEnd.getDate() - 30)
    const [showDropDown, setShowDropDown] = useState(false)

    const [startDate, setStartDate] = useState<Date>(monthEnd)
    const [endDate, setEndDate] = useState<Date>(new Date())

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onSetDates = useCallback((startDate: string, endDate: string) => {
        setStartDate(new Date(startDate))
        setEndDate(new Date(endDate))
    }, [])

    const onClose = () => setModal(null)

    const onViewClicked = () => {
        setModal(
            <ReportListModal
                onClose={() => onClose()}
                user={Number(user?.id)}
            />
        )
    }

    return (
        <>
            {modal}
            <Card fullHeight noPadding shadowType="profile">
                <div className="px-4 py-3.5 border-b border-secondary-dark flex items-center justify-between">
                    <div className="">
                        <Typography semibold>
                            <span className="text-[15px]">Reports</span>
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2.5">
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropDown(true)}
                            onMouseLeave={() => setShowDropDown(false)}
                        >
                            <Button variant="info" Icon={BsDownload}>
                                <span
                                    id="add-students"
                                    className="flex items-center gap-x-2"
                                >
                                    <span>Weekly Report</span>
                                    <FaChevronDown />
                                </span>
                            </Button>

                            {showDropDown ? (
                                <ul className="bg-white shadow-xl rounded-xl overflow-hidden z-30 absolute">
                                    <li>
                                        <a
                                            href={`${
                                                process.env
                                                    .NEXT_PUBLIC_END_POINT
                                            }/statistics/rto/summary/csv/${
                                                user?.id
                                            }?startDate=${startDate
                                                ?.toISOString()
                                                .slice(0, 10)}&endDate=${endDate
                                                ?.toISOString()
                                                .slice(0, 10)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            download
                                            className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                        >
                                            <span className="text-gray-500">
                                                <FaFileCsv />
                                            </span>
                                            <span className="whitespace-nowrap text-xs font-medium">
                                                {' '}
                                                Download As CSV
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`${
                                                process.env
                                                    .NEXT_PUBLIC_END_POINT
                                            }/statistics/rto/summary/${
                                                user?.id
                                            }?startDate=${startDate
                                                ?.toISOString()
                                                .slice(0, 10)}&endDate=${endDate
                                                ?.toISOString()
                                                .slice(0, 10)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            download
                                            className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                        >
                                            <span className="text-gray-500">
                                                <BsFiletypeXls />
                                            </span>
                                            <span className="text-xs font-medium">
                                                Download As XLS
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            ) : null}
                        </div>

                        <Button
                            Icon={BsDownload}
                            variant="info"
                            text="Range Download Report"
                            onClick={() => {
                                onViewClicked()
                            }}
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
        </>
    )
}
