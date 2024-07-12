import {
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi, SubAdminApi } from '@queries'
import { getCommonDates } from '@utils'
import { useRouter } from 'next/router'
import { FilterType } from 'pages/portals/sub-admin/history'
import React, { useState } from 'react'

export const WorkplaceHistoryView = ({ wpId }: { wpId: number }) => {
    const router = useRouter()

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

    const workplaceHistory = SubAdminApi.Student.studentWorkplaceHistory(
        {
            student: Number(wpId),
        },
        { skip: !wpId, refetchOnMountOrArgChange: true }
    )

    const dates = getCommonDates(workplaceHistory?.data)
    return (
        <>
            <div className="mt-5">
                <Typography variant="title">Workplace History</Typography>
            </div>
            {workplaceHistory.isError && <TechnicalError />}
            {workplaceHistory.isLoading || workplaceHistory.isFetching ? (
                <LoadingAnimation />
            ) : workplaceHistory.data && workplaceHistory.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => (
                    <HistoryDates
                        key={String(date)}
                        date={date}
                        history={workplaceHistory?.data}
                        filterType={filterType}
                        customRangeDate={customRangeDate}
                    />
                ))
            ) : (
                !workplaceHistory.isError && (
                    <EmptyData
                        title={'No Title were found'}
                        description={
                            'It may be due to you have perform any action yet'
                        }
                    />
                )
            )}
        </>
    )
}
