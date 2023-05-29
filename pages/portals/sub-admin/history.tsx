import { NextPageWithLayout, UserStatus } from '@types'
import { ReactElement, useState } from 'react'
import { CalendarStyles } from '@components/Calendar/style'
import Calendar from 'react-calendar'

// layouts
import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    Table,
    TechnicalError,
    Timeline,
    Typography,
    UserCreatedAt,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { CommonApi, SubAdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { getCommonDates, getDate } from '@utils'
import moment from 'moment'
import OutsideClickHandler from 'react-outside-click-handler'
// components

const SubAdminHistory: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false)
    const [filterType, setFilterType] = useState<string>('')
    const [customRangeDate, setCustomRangeDate] = useState<{
        startDate: Date
        endDate: Date
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const { data, isError, isLoading, isFetching } =
        CommonApi.RecentActivities.useRecentActivities(
            {
                ...(filterType === 'today'
                    ? { currentDate: 1 }
                    : filterType === 'range'
                    ? {
                          startDate: customRangeDate?.startDate.toISOString(),
                          endDate: customRangeDate?.endDate.toISOString(),
                      }
                    : filterType === '7days'
                    ? { last7days: undefined }
                    : ''),
                // skip: itemPerPage * page - itemPerPage,
                // limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const dates = getCommonDates(data?.data)

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title={'History'} navigateBack />
                <div className="flex items-center gap-x-2">
                    <Button
                        text={'Today'}
                        variant={'action'}
                        onClick={() => {
                            setFilterType('today')
                        }}
                    />
                    <Button
                        text={'Last 7 Days'}
                        variant={'dark'}
                        onClick={() => {
                            setFilterType('7days')
                        }}
                    />
                    <div className="relative">
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                setIsCustomRange(false)
                            }}
                        >
                            <Button
                                text={'Range'}
                                variant={'secondary'}
                                onClick={() => {
                                    setFilterType('range')
                                    setIsCustomRange(!isCustomRange)
                                }}
                            />

                            {isCustomRange && (
                                <div className="absolute top-full right-0 flex-shrink-0 z-50 min-w-[550px] mt-5">
                                    <Card>
                                        <div className="flex justify-between w-[inherit]">
                                            <CalendarStyles>
                                                <Calendar
                                                    onChange={(e: Date) => {
                                                        setCustomRangeDate({
                                                            ...customRangeDate,
                                                            startDate: e,
                                                        })
                                                    }}
                                                    value={
                                                        customRangeDate?.startDate
                                                    }
                                                />
                                            </CalendarStyles>
                                            <CalendarStyles>
                                                <Calendar
                                                    onChange={(e: Date) => {
                                                        setCustomRangeDate({
                                                            ...customRangeDate,
                                                            endDate: e,
                                                        })
                                                    }}
                                                    value={
                                                        customRangeDate?.endDate
                                                    }
                                                />
                                            </CalendarStyles>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </OutsideClickHandler>
                    </div>
                </div>
            </div>

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => {
                    return (
                        <div
                            key={i}
                            className="relative p-4 pt-6 rounded-md w-full mt-6 mb-2"
                        >
                            <div className="flex items-center sticky top-4 z-20">
                                {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                <div className="bg-gray-700 w-fit shadow-md px-4 py-2 rounded-md text-gray-100">
                                    {moment(date).format('MMDDYYYY') ===
                                    moment(new Date()).format('MMDDYYYY')
                                        ? 'Today'
                                        : new Date(date).getDate() ===
                                          new Date().getDate() - 1
                                        ? 'Yesterday'
                                        : moment(date).format('MMM, DD YYYY')}
                                </div>
                                {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                            </div>

                            <div className="border-l-4 border-gray-700 ml-8 w-full">
                                {data?.data.map((item: any, i: number) => {
                                    if (
                                        String(date) == getDate(item?.updatedAt)
                                    ) {
                                        return (
                                            <Timeline
                                                key={item?.id}
                                                updatedAt={item?.updatedAt}
                                            >
                                                <div className="grid grid-cols-3 items-center bg-white rounded-md px-3 py-1 w-full">
                                                    <Typography>
                                                        <span className="text-[11px] block">
                                                            Task
                                                        </span>
                                                        {item?.title}
                                                    </Typography>
                                                    <Typography>
                                                        <span className="text-[11px] block">
                                                            Description
                                                        </span>
                                                        {item?.description}
                                                    </Typography>
                                                    <div className="ml-auto">
                                                        <span className="text-[11px] block">
                                                            Date
                                                        </span>
                                                        <UserCreatedAt
                                                            createdAt={
                                                                item?.createdAt
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Timeline>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                })
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Title were found'}
                        description={
                            'It may be due to you have perform any action yet'
                        }
                    />
                )
            )}
        </div>
    )
}

SubAdminHistory.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default SubAdminHistory
