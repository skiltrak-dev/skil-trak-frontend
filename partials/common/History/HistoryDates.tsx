import { getDate, getUserCredentials } from '@utils'
import moment from 'moment'
import React from 'react'
import { HistoryCard } from './HistoryCard'
import { FigureCard } from '@components/sections/subAdmin'
import { UserRoles } from '@constants'
import { CommonApi } from '@queries'
import { FilterType } from 'pages/portals/sub-admin/history'

export const HistoryDates = ({
    date,
    history,
    subadmin,
    filterType,
    customRangeDate,
}: {
    date: Date
    history: any
    subadmin?: number
    filterType: FilterType
    customRangeDate: any
}) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

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
    return (
        <>
            <div
                className={`grid ${
                    getUserCredentials()?.role === UserRoles.ADMIN
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        : getUserCredentials()?.role === UserRoles.SUBADMIN
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                        : ''
                } mt-3 gap-4`}
            >
                <FigureCard
                    count={count?.data?.callsMadeToStudent}
                    title={'Calls Made to Students'}
                    imageUrl={'/images/history/call-made.png'}
                />
                <FigureCard
                    count={count?.data?.callsMadeToIndustry}
                    title={'Calls Made to Industry'}
                    imageUrl={'/images/history/industry-call.png'}
                />
                <FigureCard
                    count={count?.data?.notes}
                    title={'Notes Added'}
                    imageUrl={'/images/history/notes-added.png'}
                />
            </div>
            <div className="relative p-4 pt-6 rounded-md w-full mt-6 mb-2">
                <div className="flex items-center sticky top-4 z-20">
                    <div className="bg-gray-700 w-fit shadow-md px-4 py-2 rounded-md text-gray-100">
                        {moment(new Date()).isSame(date, 'day')
                            ? 'Today'
                            : moment(yesterday).isSame(date, 'day')
                            ? 'Yesterday'
                            : moment(date).format('MMM, DD YYYY')}
                    </div>
                </div>

                <div className="border-l-4 border-gray-700 ml-8 w-full">
                    {history?.map((item: any, i: number) => {
                        if (String(date) == getDate(item?.updatedAt)) {
                            return <HistoryCard key={item?.id} history={item} />
                        }
                    })}
                </div>
            </div>
        </>
    )
}
