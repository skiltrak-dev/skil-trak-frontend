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
import { HistoryCard, HistoryDates, HistoryFilters } from '@partials/common'
// components

export const FilterType = {
    Today: 'today',
    '7Days': '7days',
    Range: 'range',
}

const SubAdminHistory: NextPageWithLayout = () => {
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
                <PageTitle title={'History'} navigateBack />
                <HistoryFilters
                    filterType={filterType}
                    isCustomRange={isCustomRange}
                    setFilterType={setFilterType}
                    customRangeDate={customRangeDate}
                    setIsCustomRange={setIsCustomRange}
                    setSearchedValue={setSearchedValue}
                    setCustomRangeDate={setCustomRangeDate}
                />
            </div>

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => (
                    <HistoryDates
                        key={String(date)}
                        history={data?.data}
                        date={date}
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

SubAdminHistory.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default SubAdminHistory
