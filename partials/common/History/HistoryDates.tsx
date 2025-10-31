import { getDate } from '@utils'
import moment from 'moment'
import { FilterType } from 'pages/portals/sub-admin/history'
import { HistoryCard } from './HistoryCard'

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
    filterType?: FilterType
    customRangeDate?: any
}) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return (
        <>
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
