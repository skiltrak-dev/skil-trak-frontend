import {
    EmptyData,
    LoadingAnimation,
    NoData,
    PageSize,
    PageTitle,
    Pagination,
    TechnicalError,
} from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi } from '@queries'
import { getCommonDates, removeEmptyValues } from '@utils'
import moment from 'moment'
import { FilterType } from 'pages/portals/sub-admin/history'
import React, { useState } from 'react'

export const SubAdminHistory = ({ subadmin }: { subadmin: number }) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false)
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
    const [searchedValue, setSearchedValue] = useState<string>('')
    const [targetStr, setTargetStr] = useState<string>('')

    const { data, isError, isLoading, isFetching } =
        CommonApi.RecentActivities.useRecentActivities(
            {
                ...(filterType === FilterType.Today
                    ? { currentDate: 1 }
                    : filterType === FilterType.Range
                    ? {
                          startDate: customRangeDate?.startDate?.toISOString(),
                          endDate: customRangeDate?.endDate?.toISOString(),
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
                coordinator: subadmin,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
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
            user: subadmin,
        },
        {
            skip:
                filterType === FilterType.Range &&
                (!customRangeDate?.startDate || !customRangeDate?.endDate),
            refetchOnMountOrArgChange: true,
        }
    )

    const dates = getCommonDates(data?.data)
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title={'History'} />
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

            {count.isError && (
                <NoData
                    text={'There is some technical issue in history count'}
                    isError
                />
            )}
            {count.isLoading ? (
                <LoadingAnimation size={60} />
            ) : (
                count.isSuccess && (
                    <div
                        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4`}
                    >
                        <FigureCard
                            count={count?.data?.callsMadeToStudent}
                            title={'Calls Made to Students'}
                            imageUrl={'/images/history/call-made.png'}
                            onClick={() => {
                                setTargetStr('call made to  student')
                            }}
                        />
                        <FigureCard
                            count={count?.data?.callsMadeToIndustry}
                            title={'Calls Made to Industry'}
                            imageUrl={'/images/history/industry-call.png'}
                            onClick={() => {
                                setTargetStr('call made to  industry')
                            }}
                        />
                        <FigureCard
                            count={count?.data?.notes}
                            title={'Notes Added'}
                            imageUrl={'/images/history/notes-added.png'}
                            onClick={() => {
                                setTargetStr('Note Added for')
                            }}
                        />
                        <FigureCard
                            count={count?.data?.studentProfileViewed}
                            title={'Student Profile Viewed'}
                            imageUrl={'/images/history/student-profile.png'}
                            onClick={() => {
                                setTargetStr(' Profile Viewed')
                            }}
                        />
                    </div>
                )
            )}

            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={data?.data?.length}
                />
                <Pagination pagination={data?.pagination} setPage={setPage} />
            </div>

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => (
                    <HistoryDates
                        history={data?.data}
                        date={date}
                        subadmin={subadmin}
                        customRangeDate={customRangeDate}
                        filterType={filterType}
                    />
                ))
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
