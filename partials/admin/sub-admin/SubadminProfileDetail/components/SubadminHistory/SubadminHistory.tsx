import {
    Card,
    NoData,
    PageSize,
    Pagination,
    Typography,
    LoadingAnimation,
} from '@components'
import moment from 'moment'
import React, { useState } from 'react'
import { HistoryCountCard } from './cards'

import { CommonApi } from '@queries'
import { FilterType } from '@pages/portals/sub-admin/history'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { getCommonDates, removeEmptyValues } from '@utils'
import { Waypoint } from 'react-waypoint'

export const SubadminHistory = ({
    subadminUserId,
}: {
    subadminUserId: number
}) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filterType, setFilterType] = useState<FilterType>(
        FilterType['7Days']
    )
    const [customRangeDate, setCustomRangeDate] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: null,
        endDate: null,
    })
    const [targetStr, setTargetStr] = useState<string>('')
    const [searchedValue, setSearchedValue] = useState<string>('')
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false)
    const [isViewd, setIsViewd] = useState<boolean>(false)

    const { data, isError, isLoading, isFetching, isSuccess } =
        CommonApi.RecentActivities.useRecentActivities(
            {
                ...(filterType === FilterType.Today
                    ? { currentDate: 1 }
                    : filterType === FilterType.Range
                    ? {
                          startDate: customRangeDate?.startDate?.toISOString(),
                          endDate: moment(customRangeDate?.endDate)
                              .add(1, 'day')
                              .toISOString(),
                      }
                    : filterType === FilterType['7Days']
                    ? { last7days: undefined }
                    : ''),
                search: `${JSON.stringify(
                    removeEmptyValues({ targetStr, target: searchedValue })
                )
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
                coordinator: subadminUserId,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                skip: !isViewd,
                refetchOnMountOrArgChange: true,
            }
        )
    const count = CommonApi.RecentActivities.useRecentActivitiesCount(
        {
            ...(filterType === FilterType.Today
                ? { currentDate: 1 }
                : filterType === FilterType.Range
                ? {
                      startDate: moment(customRangeDate?.startDate)
                          .add(1, 'days')
                          ?.toISOString(),
                      endDate: moment(customRangeDate?.endDate)
                          .add(1, 'days')
                          ?.toISOString(),
                  }
                : filterType === FilterType['7Days']
                ? { last7days: undefined }
                : ''),
            user: subadminUserId,
        },
        {
            skip:
                filterType === FilterType.Range &&
                (!customRangeDate?.startDate || !customRangeDate?.endDate),
            refetchOnMountOrArgChange: true,
        }
    )

    const figureCardsData = [
        {
            count: count?.data?.callsMadeToStudent,
            title: 'Calls Made to Students',
            imageUrl: '/images/history/call-made.png',
            clickText: 'call made to  student',
            onClick: () => {
                setTargetStr('call made to  student')
            },
        },
        {
            count: count?.data?.callsMadeToIndustry,
            title: 'Calls Made to Industry',
            imageUrl: '/images/history/industry-call.png',
            clickText: 'call made to  industry',
            onClick: () => {
                setTargetStr('call made to  industry')
            },
        },
        {
            count: count?.data?.notes,
            title: 'Notes Added',
            imageUrl: '/images/history/notes-added.png',
            clickText: 'Note Added for',
            onClick: () => {
                setTargetStr('Note Added for')
            },
        },
        {
            count: count?.data?.studentProfileViewed,
            title: 'Student Profile Viewed',
            imageUrl: '/images/history/student-profile.png',
            clickText: ' Profile Viewed',
            onClick: () => {
                setTargetStr(' Profile Viewed')
            },
        },
    ]

    const dates = getCommonDates(data?.data)

    return (
        <Waypoint
            onEnter={() => {
                setIsViewd(true)
            }}
        >
            <div>
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="h-full overflow-hidden">
                        <div className="px-4 py-3.5 border-b border-secondary-dark">
                            <Typography semibold>
                                <span className="text-[15px]">History</span>
                            </Typography>
                        </div>
                    </div>

                    {/*  */}
                    <div className="p-4">
                        <div className="flex items-center gap-x-6">
                            <div className="w-full flex items-center gap-x-2">
                                {figureCardsData?.map((countData, i) => (
                                    <HistoryCountCard
                                        key={i}
                                        countData={countData}
                                        active={
                                            countData?.clickText === targetStr
                                        }
                                    />
                                ))}
                            </div>
                            <div>
                                <HistoryFilters
                                    filterType={filterType}
                                    isCustomRange={isCustomRange}
                                    setFilterType={setFilterType}
                                    customRangeDate={customRangeDate}
                                    setSearchedValue={setSearchedValue}
                                    setIsCustomRange={setIsCustomRange}
                                    setCustomRangeDate={setCustomRangeDate}
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="flex items-center justify-between py-4">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                                records={data?.data?.length}
                            />
                            <Pagination
                                pagination={data?.pagination}
                                setPage={setPage}
                            />
                        </div>
                        <div className="h-80 overflow-auto custom-scrollbar">
                            {isError && (
                                <NoData
                                    text="There is some technical issue!"
                                    isError
                                />
                            )}
                            {isLoading || isFetching ? (
                                <LoadingAnimation size={90} />
                            ) : data?.data && data?.data?.length > 0 ? (
                                dates?.map((date: Date, i: number) => (
                                    <HistoryDates
                                        history={data?.data}
                                        date={date}
                                        subadmin={subadminUserId}
                                        customRangeDate={customRangeDate}
                                        filterType={filterType}
                                    />
                                ))
                            ) : (
                                isSuccess && (
                                    <NoData
                                        text={
                                            'There is no history found for the admin!'
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
