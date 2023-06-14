import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi } from '@queries'
import { getCommonDates } from '@utils'
import { FilterType } from 'pages/portals/sub-admin/history'
import React, { useState } from 'react'

export const SubAdminHistory = ({ subadmin }: { subadmin: number }) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false)
    const [filterType, setFilterType] = useState<string>(FilterType['7Days'])
    const [customRangeDate, setCustomRangeDate] = useState<{
        startDate: any
        endDate: any
    }>({
        startDate: null,
        endDate: null,
    })
    const [searchedValue, setSearchedValue] = useState<string>('')

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
                coordinator: subadmin,
                search: `status:${searchedValue}`,
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

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => (
                    <HistoryDates history={data?.data} date={date} />
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
