import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'

// layouts
import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi } from '@queries'
import { getCommonDates } from '@utils'
import moment from 'moment'
export enum FilterType {
    Today = 'today',
    '7Days' = '7days',
    Range = 'range',
}

const SubAdminHistory: NextPageWithLayout = () => {
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

    const { data, isError, isLoading, isFetching } =
        CommonApi.RecentActivities.useRecentActivities(
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
                search: `status:${searchedValue}`,
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
                        date={date}
                        history={data?.data}
                        filterType={filterType}
                        customRangeDate={customRangeDate}
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
