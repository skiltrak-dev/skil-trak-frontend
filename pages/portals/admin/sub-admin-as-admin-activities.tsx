import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { AdminLayout } from '@layouts'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { getCommonDates, removeEmptyValues } from '@utils'
import { FilterType } from 'pages/portals/sub-admin/history'
import { ReactElement, useState } from 'react'

const SubAdminAsAdminActivities: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false)
    const [filterType, setFilterType] = useState<FilterType>(
        FilterType['7Days']
    )
    const [subAdminId, setSubAdminId] = useState('')
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
        CommonApi.RecentActivities.useSubAdminActivitiesAsAdmin(
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
                    removeEmptyValues({
                        targetStr,
                        target: searchedValue,
                    })
                )
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
                coordinator: subAdminId,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const dates = getCommonDates(data?.data)
    return (
        <div className="px-10 py-5">
            <div className="flex justify-between items-center">
                <PageTitle title={'SubAdmin As Admin Activities'} />
                <HistoryFilters
                    filterType={filterType}
                    isCustomRange={isCustomRange}
                    setFilterType={setFilterType}
                    customRangeDate={customRangeDate}
                    setSearchedValue={setSearchedValue}
                    setIsCustomRange={setIsCustomRange}
                    setCustomRangeDate={setCustomRangeDate}
                    setSubAdminId={setSubAdminId}
                />
            </div>

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => (
                    <div key={i}>
                        <HistoryDates
                            history={data?.data}
                            date={date}
                            customRangeDate={customRangeDate}
                            filterType={filterType}
                        />
                    </div>
                ))
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Activity found'}
                        description={
                            "It may be due to you haven't perform any action yet"
                        }
                    />
                )
            )}
        </div>
    )
}

SubAdminAsAdminActivities.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default SubAdminAsAdminActivities
